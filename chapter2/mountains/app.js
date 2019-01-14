import {initShaders, setupWebGL, pointsToBuffer} from 'GLHelper';
import {vec2} from 'gl-matrix';

import vertexShader from './vertex.glsl';
import fragmentShader from './fragment.glsl';

let gl;

const points = [];
const numTimesToSubdivide = 5;

function perturb(value, range = 0.2) {
  return value * (1 + 2 * range * (Math.random() - 0.5));
}

function divideTriangle(a, b, c, count = numTimesToSubdivide) {
  if(count <= 0) {
    points.push(a, b, c);
  } else {
    const ab = vec2.lerp(vec2.create(), a, b, perturb(0.5));
    const ac = vec2.lerp(vec2.create(), a, c, perturb(0.5));
    const bc = vec2.lerp(vec2.create(), b, c, perturb(0.5));

    --count;

    divideTriangle(a, ab, ac, count);
    divideTriangle(c, ac, bc, count);
    divideTriangle(b, bc, ab, count);
  }
}

function init() {
  const canvas = document.getElementById('gl-canvas');
  gl = setupWebGL(canvas);

  if(!gl) {
    console.error('WebGL isn\'t available');
  }

  const vertices = [
    vec2.fromValues(-1, -1),
    vec2.fromValues(0, 1),
    vec2.fromValues(1, -1),
  ];

  divideTriangle(...vertices);

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
  gl.bufferData(gl.ARRAY_BUFFER, pointsToBuffer(points), gl.STATIC_DRAW);
  // Associate out shader variables with our data buffer

  const vPosition = gl.getAttribLocation(program, 'vPosition');
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);

  render();
}

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, points.length);
}

init();