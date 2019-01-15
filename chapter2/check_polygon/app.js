import {createProgram, setupWebGL, parseColor} from 'GLHelper';
import {vec2, vec3} from 'gl-matrix';

import vertexShader from './shader.vert';
import fragmentShader from './shader.frag';

let gl;

const hintEl = document.getElementById('hint');
const clearBtn = document.getElementById('clear');

const maxNumVerticles = 4000;

let colorLoc;
let isSimple = true;
let isConvex = true;

const points = [];

function isCross(p1, p2, p3, p4) {
  const v1 = vec2.subtract(vec2.create(), p4, p3);
  const v2 = vec2.subtract(vec2.create(), p1, p3);
  const v3 = vec2.subtract(vec2.create(), p2, p3);

  const z1 = vec2.cross(vec3.create(), v1, v2)[2];
  const z2 = vec2.cross(vec3.create(), v1, v3)[2];

  return z1 * z2 <= 0;
}

function checkSimple(newPoint) {
  const len = points.length;
  if(isSimple && len >= 3) {
    const lastPoint = points[len - 1];
    const firstPoint = points[0];

    // 判定新增的顶点的两条边和多边形其他边是否相交
    // 相交判断使用二维向量叉乘的符号来判断即可
    // 优化点：可缓存边，减少重复计算
    for(let i = 1; i < len; i++) {
      const p1 = points[i - 1],
        p2 = points[i];

      if(p2 !== lastPoint && isCross(p1, p2, lastPoint, newPoint) && isCross(lastPoint, newPoint, p1, p2)) {
        isSimple = false;
        return;
      }

      if(p1 !== firstPoint && isCross(p1, p2, newPoint, firstPoint && isCross(newPoint, firstPoint, p1, p2))) {
        isSimple = false;
        return;
      }
    }
  }
}

let direction = 0;

function checkConvex(newPoint) {
  if(isSimple && isConvex) {
    // 用多边形内角判断
    const len = points.length;
    if(len < 2) return true;

    // 优化点：可缓存边，减少重复计算
    const edges = [
      vec2.subtract(vec2.create(), points[len - 1], points[len - 2]),
      vec2.subtract(vec2.create(), newPoint, points[len - 1]),
      vec2.subtract(vec2.create(), points[0], newPoint),
      vec2.subtract(vec2.create(), points[1], points[0]),
    ];

    for(let i = 1; i < 4; i++) {
      const d = vec2.cross(vec3.create(), edges[i - 1], edges[i])[2];
      if(d === 0) {
        isConvex = false;
        return;
      }
      if(direction === 0) direction = d > 0 ? 1 : -1;
      else if(direction === 1 && d < 0 || direction === -1 && d > 0) {
        isConvex = false;
        return;
      }
    }
  }
}

function addVertex(vBuffer, ox, oy, w, h) {
  const x = -1 + 2 * ox / w;
  const y = -1 + 2 * (h - oy) / h;

  const vertex = vec2.fromValues(x, y);

  const idx = points.length;

  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.bufferSubData(gl.ARRAY_BUFFER, 8 * idx, vertex);

  checkSimple(vertex);
  checkConvex(vertex);

  points.push(vertex);
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
  gl.clearColor(1.0, 1.0, 1.0, 1.0);

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

  canvas.addEventListener('mousedown', (event) => {
    const {offsetX: x, offsetY: y} = event;
    hintEl.className = 'show';
    hintEl.style.top = `${event.clientY}px`;
    hintEl.style.left = `${event.clientX}px`;
    addVertex(vBuffer, x, y, width, height);
  });

  clearBtn.addEventListener('click', () => {
    hintEl.className = '';
    isSimple = true;
    points.length = 0;
    direction = 0;
  });

  colorLoc = gl.getUniformLocation(program, 'color');

  render();
}

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.uniform4fv(colorLoc, parseColor(isSimple ? isConvex ? '#0000ff' : '#009900' : '#ff0000')); // eslint-disable-line no-nested-ternary
  if(points.length) {
    gl.drawArrays(gl.LINE_LOOP, 0, points.length);
  }
  requestAnimationFrame(render);
}

init();