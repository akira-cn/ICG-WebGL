import {createProgram, setupWebGL, pointsToBuffer} from 'GLHelper';
import {vec3, vec4} from 'gl-matrix';
import colorString from 'color-string';

import vertexShader from './shader.vert';
import fragmentShader from './shader.frag';

let gl;

const points = [];
const colors = [];

let rotationQuaternion;
let rotationQuaternionLoc;

let angle = 0.0;
let axis = [0, 0, 1];

let trackingMouse = false;
let trackballMove = false;

let lastPos = [0, 0, 0];
let startX,
  startY;

function multq(a, b) {
  const s = vec3(a[1], a[2], a[3]);
  const t = vec3(b[1], b[2], b[3]);

  return vec4(a[0] * b[0] - vec3.dot(s, t), vec3(t) * vec3(s) + vec3(t) * a[0] + vec3(s) * b[0]);
}

function trackballView(x, y) {
  let a;
  const v = [];

  v[0] = x;
  v[1] = y;

  const d = v[0] * v[0] + v[1] * v[1];

  if(d < 1.0) {
    v[2] = Math.sqrt(1.0 - d);
  } else {
    v[2] = 0.0;
    a = 1.0 / Math.sqrt(d);
    v[0] *= a;
    v[1] *= a;
  }
  return v;
}

function mouseMotion(x, y) {
  let dx,
    dy,
    dz;

  const curPos = trackballView(x, y);

  if(trackingMouse) {
    dx = curPos[0] - lastPos[0];
    dy = curPos[1] - lastPos[1];
    dz = curPos[2] - lastPos[2];

    if(dx || dy || dz) {
      angle = 0.5 * Math.sqrt(dx ** 2 + dy ** 2 + dz ** 2);

      axis[0] = lastPos[1] * curPos[2] - lastPos[2] * curPos[1];
      axis[1] = lastPos[2] * curPos[0] - lastPos[0] * curPos[2];
      axis[2] = lastPos[0] * curPos[1] - lastPos[1] * curPos[0];

      lastPos[0] = curPos[0];
      lastPos[1] = curPos[1];
      lastPos[2] = curPos[2];
    }
  }
}

function startMotion(x, y) {
  trackingMouse = true;
  startX = x;
  startY = y;

  lastPos = trackballView(x, y);
  trackballMove = true;
}

function stopMotion(x, y) {
  trackingMouse = false;
  if(startX === x && startY === y) {
    angle = 0.0;
    trackballMove = false;
  }
}

function colorCube() {
  quad(1, 0, 3, 2);
  quad(2, 3, 7, 6);
  quad(3, 0, 4, 7);
  quad(6, 5, 1, 2);
  quad(4, 5, 6, 7);
  quad(5, 4, 0, 1);
}

const vertices = [
  vec4(-0.5, -0.5, 0.5, 1.0),
  vec4(-0.5, 0.5, 0.5, 1.0),
  vec4(0.5, 0.5, 0.5, 1.0),
  vec4(0.5, -0.5, 0.5, 1.0),
  vec4(-0.5, -0.5, -0.5, 1.0),
  vec4(-0.5, 0.5, -0.5, 1.0),
  vec4(0.5, 0.5, -0.5, 1.0),
  vec4(0.5, -0.5, -0.5, 1.0),
];

const vertexColors = [
  'black',
  'red',
  'yellow',
  'green',
  'blue',
  'magenta',
  'cyan',
  'white',
].map((color) => {
  return colorString.get(color).value.slice(0, 3);
});

// console.log(vertexColors);

function quad(a, b, c, d) {
  // We need to parition the quad into two triangles in order for
  // WebGL to be able to render it.  In this case, we create two
  // triangles from the quad indices

  // vertex color assigned by the index of the vertex
  const indices = [a, b, c, a, c, d];

  for(let i = 0; i < indices.length; ++i) {
    points.push(vertices[indices[i]]);
    // colors.push( vertexColors[indices[i]] );

    // for solid colored faces use
    colors.push(vertexColors[a]);
  }
}


function init() {
  const canvas = document.getElementById('gl-canvas');
  const {width, height} = canvas;

  gl = setupWebGL(canvas);
  if(!gl) {
    console.error('WebGL isn\'t available');
  }

  colorCube();

  gl.viewport(0, 0, width, height);
  gl.clearColor(1.0, 1.0, 1.0, 1.0);

  gl.enable(gl.DEPTH_TEST);

  //
  //  Load shaders and initialize attribute buffers
  //
  const program = createProgram(gl, vertexShader, fragmentShader);
  gl.useProgram(program);

  const cBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, pointsToBuffer(colors, Uint8Array), gl.STATIC_DRAW);

  const vColor = gl.getAttribLocation(program, 'vColor');
  gl.vertexAttribPointer(vColor, 3, gl.UNSIGNED_BYTE, true, 0, 0);
  gl.enableVertexAttribArray(vColor);

  const vBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, pointsToBuffer(points), gl.STATIC_DRAW);

  const vPosition = gl.getAttribLocation(program, 'vPosition');
  gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);

  rotationQuaternion = vec4(1, 0, 0, 0);
  rotationQuaternionLoc = gl.getUniformLocation(program, 'r');
  gl.uniform4fv(rotationQuaternionLoc, rotationQuaternion);

  canvas.addEventListener('mousedown', (event) => {
    const x = 2 * event.clientX / width - 1;
    const y = 2 * (height - event.clientY) / height - 1;
    startMotion(x, y);
  });

  canvas.addEventListener('mouseup', (event) => {
    const x = 2 * event.clientX / width - 1;
    const y = 2 * (height - event.clientY) / height - 1;
    stopMotion(x, y);
  });

  canvas.addEventListener('mousemove', (event) => {
    const x = 2 * event.clientX / width - 1;
    const y = 2 * (height - event.clientY) / height - 1;
    mouseMotion(x, y);
  });

  render();
}

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  if(trackballMove) {
    axis = vec3.normalize(axis);
    const c = Math.cos(angle / 2.0);
    const s = Math.sin(angle / 2.0);

    const rotation = vec4(c, s * axis[0], s * axis[1], s * axis[2]);
    rotationQuaternion = multq(rotationQuaternion, rotation);
    // console.log(rotationQuaternion);
    gl.uniform4fv(rotationQuaternionLoc, rotationQuaternion);
  }

  gl.drawArrays(gl.TRIANGLES, 0, 36);
  requestAnimationFrame(render);
}

init();
