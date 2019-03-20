import {createProgram, setupWebGL, pointsToBuffer} from 'GLHelper';
import {vec2} from 'gl-matrix';

import vertexShader from './shader.vert';
import fragmentShader from './shader.frag';

let gl;

const points = [];
const MAX_DEPTH = 5;

function divideLineSegment(a, b, depth = 0) {
  const c = vec2.lerp(a, b, 1 / 3);
  const d = vec2.lerp(a, b, 2 / 3);
  const e = vec2.rotate(d, c, Math.PI / 3);
  if(depth < MAX_DEPTH) {
    depth++;
    divideLineSegment(a, c, depth);
    divideLineSegment(c, e, depth);
    divideLineSegment(e, d, depth);
    divideLineSegment(d, b, depth);
  } else {
    points.push(a, c, e, d, b);
  }
}

function divideTriangle(a, b, c) {
  divideLineSegment(a, b);
  divideLineSegment(b, c);
  divideLineSegment(c, a);
}

function init() {
  const canvas = document.getElementById('gl-canvas');
  gl = setupWebGL(canvas);

  if(!gl) {
    console.error('WebGL isn\'t available');
  }

  const vertices = [
    vec2(-0.5, -0.5),
    vec2(0, 0.5),
    vec2(0.5, -0.5),
  ];

  divideTriangle(...vertices);

  //
  //  Configure WebGL
  //
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1.0, 1.0, 1.0, 1.0);

  //  Load shaders and initialize attribute buffers

  const program = createProgram(gl, vertexShader, fragmentShader);
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
  gl.drawArrays(gl.LINE_STRIP, 0, points.length);
}

init();