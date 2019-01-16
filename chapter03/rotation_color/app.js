import {createProgram, setupWebGL, pointsToBuffer, parseColor} from 'GLHelper';
import {vec2} from 'gl-matrix';

import vertexShader from './shader.vert';
import fragmentShader from './shader.frag';

let gl,
  thetaLoc,
  colorLoc;

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

  const program = createProgram(gl, vertexShader, fragmentShader);
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
  colorLoc = gl.getUniformLocation(program, 'color');

  render();
}

const colorPicker = document.getElementById('colorPicker');

let theta = 0.0;
let color = parseColor(colorPicker.value);

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.uniform1f(thetaLoc, theta);
  gl.uniform4fv(colorLoc, color);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  theta += 0.02;
  requestAnimationFrame(render);
}

colorPicker.addEventListener('change', () => {
  color = parseColor(colorPicker.value);
});

init();