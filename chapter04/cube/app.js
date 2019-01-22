import {createProgram, setupWebGL, pointsToBuffer} from 'GLHelper';
import {vec4} from 'gl-matrix';
import colorString from 'color-string';

import vertexShader from './shader.vert';
import fragmentShader from './shader.frag';

let gl;

const points = [];
const colors = [];

let axis = 0;
const theta = [0, 0, 0];

let thetaLoc;

function colorCube() {
  quad(1, 0, 3, 2);
  quad(2, 3, 7, 6);
  quad(3, 0, 4, 7);
  quad(6, 5, 1, 2);
  quad(4, 5, 6, 7);
  quad(5, 4, 0, 1);
}

const vertices = [
  vec4.fromValues(-0.5, -0.5, 0.5, 1.0),
  vec4.fromValues(-0.5, 0.5, 0.5, 1.0),
  vec4.fromValues(0.5, 0.5, 0.5, 1.0),
  vec4.fromValues(0.5, -0.5, 0.5, 1.0),
  vec4.fromValues(-0.5, -0.5, -0.5, 1.0),
  vec4.fromValues(-0.5, 0.5, -0.5, 1.0),
  vec4.fromValues(0.5, 0.5, -0.5, 1.0),
  vec4.fromValues(0.5, -0.5, -0.5, 1.0),
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
  gl = setupWebGL(canvas);
  if(!gl) {
    console.error('WebGL isn\'t available');
  }

  colorCube();

  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1.0, 1.0, 1.0, 1.0);

  gl.enable(gl.DEPTH_TEST);

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

  thetaLoc = gl.getUniformLocation(program, 'theta');

  /* globals xButton:true yButton:true zButton:true */
  [xButton, yButton, zButton].forEach((button, i) => {
    button.addEventListener('click', () => {
      axis = i;
    });
  });

  render();
}

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  theta[axis] += 2.0;
  gl.uniform3fv(thetaLoc, theta);
  gl.drawArrays(gl.TRIANGLES, 0, 36);
  requestAnimationFrame(render);
}

init();
