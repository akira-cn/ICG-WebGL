import {createProgram, setupWebGL, parseColor} from 'GLHelper';
import {vec2, vec3} from 'gl-matrix';

import vertexShader from './shader.vert';
import fragmentShader from './shader.frag';

let gl;

const hintEl = document.getElementById('hint');
const closeBtn = document.getElementById('close');

const maxNumVerticles = 4000;

const colorPicker = document.getElementById('colorPicker');
let color = parseColor(colorPicker.value, 'uv3');

const polygons = [
  {
    index: 0,
    vertexes: 0,
  },
];

const points = [];

// 判断一个多边形的方向，1表示逆时针，-1表示顺时针，0表示无方向
function getDirection(points) {
  const len = points.length;
  if(len < 3) return 0;

  let minx = Infinity;
  let minIdx = 0;
  for(let i = 0; i < len; i++) {
    const x = points[i][0];
    if(x < minx) {
      minx = x;
      minIdx = i;
    }
  }

  const p1 = points[(len + minIdx - 1) % len];
  const p2 = points[minIdx];
  const p3 = points[(minIdx + 1) % len];

  const v1 = vec2.subtract(vec2.create(), p1, p2);
  const v2 = vec2.subtract(vec2.create(), p3, p2);

  const d = vec2.cross(vec3.create(), v1, v2)[2];

  if(d === 0) return 0;
  return d > 0 ? 1 : -1;
}

function getAngle(points, idx, direction) {
  const len = points.length;
  if(len < 3) return 0;

  // 待优化点：可以保存之前的计算结果，大大减少重复计算
  const p1 = points[(len + idx - 1) % len];
  const p2 = points[idx];
  const p3 = points[(idx + 1) % len];

  const v1 = vec2.subtract(vec2.create(), p1, p2);
  const v2 = vec2.subtract(vec2.create(), p3, p2);

  const angle = vec2.angle(v1, v2);
  const d = vec2.cross(vec3.create(), v1, v2)[2];

  if(direction * d >= 0) return angle;
  return 2 * Math.PI - angle;
}

function isCross(p1, p2, p3, p4) {
  const v1 = vec2.subtract(vec2.create(), p4, p3);
  const v2 = vec2.subtract(vec2.create(), p1, p3);
  const v3 = vec2.subtract(vec2.create(), p2, p3);

  const z1 = vec2.cross(vec3.create(), v1, v2)[2];
  const z2 = vec2.cross(vec3.create(), v1, v3)[2];

  return z1 * z2 <= 0;
}

function isSimple(points) {
  const len = points.length;

  for(let i = 0; i < len; i++) {
    const point = points[i];
    const nextPoint = points[(i + 1) % len];

    for(let j = 0; j < len; j++) {
      const p1 = points[j],
        p2 = points[(j + 1) % len];

      if(p1 !== point && p2 !== point && p1 !== nextPoint && p2 !== nextPoint
        && isCross(p1, p2, point, nextPoint) && isCross(point, nextPoint, p1, p2)) {
        return false;
      }
    }
  }
  return true;
}

function triangleDivide(points, map, idx) {
  const len = points.length;

  if(len <= 3) {
    return points.map(p => map.get(p) + idx);
  }

  // 获取多边形的方向，以便于判断凹角、凸角
  const d = getDirection(points);
  // console.log(getAngle(points, 1, d), isSimple(points));

  for(let i = 0; i < len; i++) {
    const angle = getAngle(points, i, d);
    if(angle <= Math.PI) { // 找到一个凸角
      const p = [...points];
      p.splice(i, 1);

      if(isSimple(p) && getDirection(p) === d) {
        return [map.get(points[(len + i - 1) % len]) + idx,
          map.get(points[i]) + idx,
          map.get(points[(i + 1) % len]) + idx, ...triangleDivide(p, map, idx)];
      }
    }
  }
}

function setIndices(iBuffer, points) {
  const map = new Map();
  points.forEach((p, i) => map.set(p, i));

  const polygon = polygons[polygons.length - 1];
  const idx = polygon.index;
  const indices = triangleDivide(points, map, idx);

  console.log(indices);

  polygon.vertexes = indices.length;

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
  gl.bufferSubData(gl.ELEMENT_ARRAY_BUFFER, idx, new Uint8Array(indices));
}

function addVertex(vBuffer, cBuffer, ox, oy, w, h) {
  const x = -1 + 2 * ox / w;
  const y = -1 + 2 * (h - oy) / h;

  const polygon = polygons[polygons.length - 1];
  const vertex = vec2.fromValues(x, y);

  const idx = polygon.index + polygon.vertexes;

  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.bufferSubData(gl.ARRAY_BUFFER, 8 * idx, vertex);

  gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
  gl.bufferSubData(gl.ARRAY_BUFFER, 3 * idx, color);

  points.push(vertex);

  polygon.vertexes++;
}

function init() {
  const canvas = document.getElementById('gl-canvas');
  const {width, height} = canvas;

  gl = setupWebGL(canvas);

  if(!gl) {
    console.error('WebGL isn\'t available');
  }

  //
  //  Configure WebGL
  //
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0.8, 0.8, 0.8, 1.0);

  //  Load shaders and initialize attribute buffers

  const program = createProgram(gl, vertexShader, fragmentShader);
  gl.useProgram(program);

  // Load the data into the GPU

  const vBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, 8 * maxNumVerticles, gl.STATIC_DRAW);

  const vPosition = gl.getAttribLocation(program, 'vPosition');
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);

  const cBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, 3 * maxNumVerticles, gl.STATIC_DRAW);

  const vColor = gl.getAttribLocation(program, 'vColor');
  gl.vertexAttribPointer(vColor, 3, gl.UNSIGNED_BYTE, true, 0, 0);
  gl.enableVertexAttribArray(vColor);

  const iBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, 3 * maxNumVerticles, gl.STATIC_DRAW);

  colorPicker.addEventListener('change', () => {
    color = parseColor(colorPicker.value, 'uv3');
  });

  canvas.addEventListener('mousedown', (event) => {
    const {offsetX: x, offsetY: y} = event;
    hintEl.className = 'show';
    hintEl.style.top = `${event.clientY}px`;
    hintEl.style.left = `${event.clientX}px`;
    addVertex(vBuffer, cBuffer, x, y, width, height);
  });

  closeBtn.addEventListener('click', () => {
    const previousPolygon = polygons[polygons.length - 1];
    if(previousPolygon.vertexes >= 3) {
      hintEl.className = '';
      if(isSimple(points)) {
        previousPolygon.isSimple = true;
        setIndices(iBuffer, points);
      }
      polygons.push({
        index: previousPolygon.index + previousPolygon.vertexes,
        vertexes: 0,
      });
      points.length = 0;
    }
  });

  render();
}

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  const len = polygons.length;
  for(let i = 0; i < len; i++) {
    const polygon = polygons[i];
    if(polygon.vertexes) {
      const isClosed = i < len - 1;
      if(isClosed) {
        if(polygon.isSimple) {
          gl.drawElements(gl.TRIANGLES, polygon.vertexes, gl.UNSIGNED_BYTE, polygon.index);
        } else {
          gl.drawArrays(gl.TRIANGLE_FAN, polygon.index, polygon.vertexes);
        }
      } else {
        gl.drawArrays(gl.LINE_STRIP, polygon.index, polygon.vertexes);
      }
    }
  }
  // gl.drawArrays(gl.POINTS, 0, pointsCount);
  requestAnimationFrame(render);
}

init();