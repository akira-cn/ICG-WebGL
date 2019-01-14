import {initShaders, setupWebGL, pointsToBuffer} from 'GLHelper';
import {vec2} from 'gl-matrix';

import vertexShader from './vertex.glsl';
import fragmentShader from './fragment.glsl';

let gl,
  thetaLoc;

function init() {
  const canvas = document.getElementById('gl-canvas');
  gl = setupWebGL(canvas);

  if(!gl) {
    console.error('WebGL isn\'t available');
  }

  const vertices = [
    vec2.fromValues(0.0, 0.5),
    vec2.fromValues(0.5, 0.0),
    vec2.fromValues(-0.5, 0.0),
    vec2.fromValues(0.0, -0.5),
  ];

  //
  //  Configure WebGL
  //
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1.0, 1.0, 1.0, 1.0);

  //  Load shaders and initialize attribute buffers

  const program = initShaders(gl, vertexShader, fragmentShader);
  gl.useProgram(program);

  // Load the data into the GPU

  const bufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
  gl.bufferData(gl.ARRAY_BUFFER, pointsToBuffer(vertices), gl.STATIC_DRAW);
  // Associate out shader variables with our data buffer

  const vPosition = gl.getAttribLocation(program, 'vPosition');
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);

  thetaLoc = gl.getUniformLocation(program, 'theta');

  render();
}

const speedRange = document.getElementById('speedRange');
const directionSel = document.getElementById('direction');

let speed = parseInt(speedRange.value, 10);
let theta = 0.0;
let direction = parseInt(directionSel.value, 10);

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.uniform1f(thetaLoc, theta);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  theta += direction * 0.002 * speed;
  requestAnimationFrame(render);
}

const btnSpeedUp = document.getElementById('speedUp');
const btnSlowDown = document.getElementById('slowDown');
const elSpeed = document.getElementById('speed');

function changeSpeed(delta) {
  setSpeed(Math.max(0, Math.min(speed + delta, 100)));
}

function setSpeed(value) {
  speed = parseInt(value, 10);
  speedRange.value = value;
  elSpeed.innerHTML = value;
}

btnSpeedUp.addEventListener('click', () => changeSpeed(1));
btnSlowDown.addEventListener('click', () => changeSpeed(-1));
speedRange.addEventListener('change', () => {
  setSpeed(speedRange.value);
});

directionSel.addEventListener('change', () => {
  direction = parseInt(directionSel.value, 10);
});

init();