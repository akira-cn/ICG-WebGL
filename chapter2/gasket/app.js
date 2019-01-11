import {initShaders, setupWebGL, pointsToBuffer} from 'GLHelper';
import {vec2} from 'gl-matrix';

import vertexShader from './vertex.glsl';
import fragmentShader from './fragment.glsl';

let gl;
let points;

const NumPoints = 5000;

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
    vec2.set(vec2.create(), -1, -1),
    vec2.set(vec2.create(), 0, 1),
    vec2.set(vec2.create(), 1, -1),
  ];

  // Specify a starting point p for our iterations
  // p must lie inside any set of three vertices

  const u = vec2.add(vec2.create(), vertices[0], vertices[1]);
  const v = vec2.add(vec2.create(), vertices[0], vertices[2]);
  let p = vec2.scale(vec2.create(), vec2.add(vec2.create(), u, v), 0.25);

  // And, add our initial point into our array of points

  points = [p];

  // Compute new points
  // Each new point is located midway between
  // last point and a randomly chosen vertex

  for(let i = 0; points.length < NumPoints; ++i) {
    const j = Math.floor(Math.random() * 3);
    p = vec2.add(vec2.create(), points[i], vertices[j]);
    vec2.scale(p, p, 0.5);
    points.push(p);
  }

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
  gl.drawArrays(gl.POINTS, 0, points.length);
}

init();