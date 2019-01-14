import {initShaders, setupWebGL, pointsToBuffer} from 'GLHelper';
import {vec3} from 'gl-matrix';

import vertexShader from './vertex.glsl';
import fragmentShader from './fragment.glsl';

let gl;

const points = [];
const colors = [];

const RED = [1.0, 0.0, 0.0];
const GREEN = [0.0, 1.0, 0.0];
const BLUE = [0.0, 0.0, 1.0];
const BLACK = [0.0, 0.0, 0.0];

const numTimesToSubdivide = 3;

function triangle(a, b, c, color) {
  colors.push(color, color, color);
  points.push(a, b, c);
}

function tetra(a, b, c, d) {
  // tetrahedron with each side using
  // a different color
  triangle(a, c, b, RED);
  triangle(a, c, d, GREEN);
  triangle(a, b, d, BLUE);
  triangle(b, c, d, BLACK);
}

function divideTetra(a, b, c, d, count = numTimesToSubdivide) {
  if(count <= 0) {
    tetra(a, b, c, d);
  } else {
    const ab = vec3.lerp(vec3.create(), a, b, 0.5);
    const ac = vec3.lerp(vec3.create(), a, c, 0.5);
    const ad = vec3.lerp(vec3.create(), a, d, 0.5);
    const bc = vec3.lerp(vec3.create(), b, c, 0.5);
    const bd = vec3.lerp(vec3.create(), b, d, 0.5);
    const cd = vec3.lerp(vec3.create(), c, d, 0.5);

    --count;

    divideTetra(a, ab, ac, ad, count);
    divideTetra(ab, b, bc, bd, count);
    divideTetra(ac, bc, c, cd, count);
    divideTetra(ad, bd, cd, d, count);
  }
}

function init() {
  const canvas = document.getElementById('gl-canvas');
  gl = setupWebGL(canvas);

  if(!gl) {
    console.error('WebGL isn\'t available');
  }

  //
  //  Initialize our data for the Sierpinski Gasket
  //

  // First, initialize the corners of our gasket with three points.

  const vertices = [
    vec3.fromValues(0.0000, 0.0000, -1.0000),
    vec3.fromValues(0.0000, 0.9428, 0.3333),
    vec3.fromValues(-0.8165, -0.4714, 0.3333),
    vec3.fromValues(0.8165, -0.4714, 0.3333),
  ];

  divideTetra(...vertices);

  //
  //  Configure WebGL
  //
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1.0, 1.0, 1.0, 1.0);

  //  Load shaders and initialize attribute buffers

  const program = initShaders(gl, vertexShader, fragmentShader);
  gl.useProgram(program);

  // enable hidden-surface removal

  gl.enable(gl.DEPTH_TEST);

  // Load the data into the GPU

  const cBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, pointsToBuffer(colors), gl.STATIC_DRAW);

  const vColor = gl.getAttribLocation(program, 'vColor');
  gl.vertexAttribPointer(vColor, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vColor);

  const vBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, pointsToBuffer(points), gl.STATIC_DRAW);
  // Associate out shader variables with our data buffer

  const vPosition = gl.getAttribLocation(program, 'vPosition');
  gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);

  render();
}

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, points.length);
}

init();