import {createProgram, setupWebGL, pointsToBuffer} from 'GLHelper';
import {vec2, vec4} from 'gl-matrix';

import vertexShader from './vertex.glsl';
import fragmentShader from './fragment.glsl';

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

const colorCache = {};
function parseColor(colorStr) {
  if(colorCache[colorStr]) {
    return colorCache[colorStr];
  }
  const r = parseInt(colorStr.charAt(1) + colorStr.charAt(2), 16);
  const g = parseInt(colorStr.charAt(3) + colorStr.charAt(4), 16);
  const b = parseInt(colorStr.charAt(5) + colorStr.charAt(6), 16);
  colorCache[colorStr] = vec4.fromValues(r / 255, g / 255, b / 255, 1.0);
  return colorCache[colorStr];
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