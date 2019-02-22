import {createProgram, setupWebGL, pointsToBuffer} from 'GLHelper';
import {vec2} from 'gl-matrix';

import vertexShader from './shader.vert';
import fragmentShader from './shader.frag';

let gl;
let points;
let counter = 0;
const NumPoints = 5000;
let startDraw = false;
const otherTips = document.getElementById('ohterTips');
function init() {
  const canvas = document.getElementById('gl-canvas');
  gl = setupWebGL(canvas);

  if(!gl) {
    console.error("WebGL isn't available");
  }

  //
  //  Initialize our data for the Sierpinski Gasket
  //

  // First, initialize the corners of our gasket with three points.

  const vertices = [
    vec2(-1, -1),
    vec2(0, 1),
    vec2(1, -1),
  ];

  // Specify a starting point p for our iterations
  // p must lie inside any set of three vertices

  const u = vec2(vertices[0]) + vec2(vertices[1]);
  const v = vec2(vertices[0]) + vec2(vertices[2]);
  let p = (vec2(u) + vec2(v)) * 0.25;

  // And, add our initial point into our array of points

  points = [p];

  // Compute new points
  // Each new point is located midway between
  // last point and a randomly chosen vertex

  for(let i = 0; points.length < NumPoints; ++i) {
    const j = Math.floor(Math.random() * 3);
    p = (vec2(points[i]) + vec2(vertices[j])) * 0.5;
    points.push(p);
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

  canvas.onmousedown = function (ev) {
    mouseClickHandler(ev);
  };

  const bufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
  gl.bufferData(gl.ARRAY_BUFFER, pointsToBuffer(points), gl.STATIC_DRAW);
  // Associate out shader variables with our data buffer

  const vPosition = gl.getAttribLocation(program, 'vPosition');
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);
}

function mouseClickHandler(ev) {
  if(ev.button === 0) {
    startDraw = true;
    draw();
  } else if(ev.button === 1) {
    startDraw = false;
    counter = NumPoints;
  } else if(ev.button === 2) {
    startDraw = false;
  }
}

async function draw() {
  counter++;
  if(startDraw === false || counter > NumPoints) {
    return;
  }
  render(counter);
  await timeout(10);
  draw();
}

function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function render(n) {
  otherTips.innerHTML = `当前绘制点数量${n}`;
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.POINTS, 0, n);
}

init();
