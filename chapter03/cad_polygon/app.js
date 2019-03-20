import {createProgram, setupWebGL, parseColor} from 'GLHelper';
import {vec2} from 'gl-matrix';

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

function addVertex(vBuffer, cBuffer, ox, oy, w, h) {
  const x = -1 + 2 * ox / w;
  const y = -1 + 2 * (h - oy) / h;

  const polygon = polygons[polygons.length - 1];
  const vertex = vec2(x, y);

  const idx = polygon.index + polygon.vertexes;

  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.bufferSubData(gl.ARRAY_BUFFER, 8 * idx, vertex);

  gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
  gl.bufferSubData(gl.ARRAY_BUFFER, 3 * idx, color);

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
      polygons.push({
        index: previousPolygon.index + previousPolygon.vertexes,
        vertexes: 0,
      });
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
        gl.drawArrays(gl.TRIANGLE_FAN, polygon.index, polygon.vertexes);
      } else {
        gl.drawArrays(gl.LINE_STRIP, polygon.index, polygon.vertexes);
      }
    }
  }
  // gl.drawArrays(gl.POINTS, 0, pointsCount);
  requestAnimationFrame(render);
}

init();