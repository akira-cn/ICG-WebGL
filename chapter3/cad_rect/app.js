import {createProgram, setupWebGL, pointsToBuffer, parseColor} from 'GLHelper';
import {vec2} from 'gl-matrix';

import vertexShader from './shader.vert';
import fragmentShader from './shader.frag';

let gl;

const hintEl = document.getElementById('hint');

const maxNumVerticles = 4000;

const colorPicker = document.getElementById('colorPicker');
let color = parseColor(colorPicker.value, 'uv3');
let pointsTemp = null;
let colorTemp = null;
let pointsCount = 0;

function makeRect(vBuffer, cBuffer, ox, oy, w, h) {
  const x = -1 + 2 * ox / w;
  const y = -1 + 2 * (h - oy) / h;

  if(pointsTemp) {
    const p1 = vec2.fromValues(pointsTemp[0], y);
    const p2 = vec2.fromValues(x, y);
    const p3 = vec2.fromValues(x, pointsTemp[1]);

    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferSubData(gl.ARRAY_BUFFER, 8 * pointsCount, pointsToBuffer([p1, p2, p3]));

    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferSubData(gl.ARRAY_BUFFER, 3 * pointsCount, pointsToBuffer([colorTemp, color, color], Uint8Array));
    pointsTemp = null;
    colorTemp = null;
    pointsCount += 3;
  } else {
    pointsTemp = vec2.fromValues(x, y);
    colorTemp = color;

    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferSubData(gl.ARRAY_BUFFER, 8 * pointsCount, pointsToBuffer([pointsTemp]));

    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferSubData(gl.ARRAY_BUFFER, 3 * pointsCount, pointsToBuffer([colorTemp], Uint8Array));

    pointsCount++;
  }
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
    if(!pointsTemp) {
      hintEl.className = 'show';
      hintEl.style.top = `${event.clientY}px`;
      hintEl.style.left = `${event.clientX}px`;
    } else {
      hintEl.className = '';
    }
    makeRect(vBuffer, cBuffer, x, y, width, height);
  });

  render();
}

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  for(let i = 0; i < pointsCount; i += 4) {
    gl.drawArrays(gl.TRIANGLE_FAN, i, 4);
  }
  // gl.drawArrays(gl.POINTS, 0, pointsCount);
  requestAnimationFrame(render);
}

init();