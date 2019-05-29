import {vec4, mat4} from 'gl-matrix';
import {createProgram, setupWebGL, pointsToBuffer} from '../../src/index';
import vertexShader from './shader.vert';
import fragmentShader from './shader.frag';

const canvas = document.getElementById('gl-canvas');
const gl = setupWebGL(canvas);

gl.viewport(0, 0, canvas.width, canvas.height);
// gl.clearColor(1.0, 1.0, 1.0, 1.0);

const program = createProgram(gl, vertexShader, fragmentShader);
gl.useProgram(program);
gl.enable(gl.DEPTH_TEST);

gl.enable(gl.BLEND);
// Set blending function
gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

let axis = 0;
const theta = [0, 0, 0];

const points = [];
const colors = [];
// 立方体点位置
//    v0----- v3
//   /|      /|
//  v1------v2|
//  | |     | |
//  | |v4---|-|v7
//  |/      |/
//  v5------v6
// 顺序为前后左右上下

const vertices = [
  vec4(-0.5, 0.5, -0.5, 1),
  vec4(-0.5, 0.5, 0.5, 1),
  vec4(0.5, 0.5, 0.5, 1),
  vec4(0.5, 0.5, -0.5, 1),
  vec4(-0.5, -0.5, -0.5, 1),
  vec4(-0.5, -0.5, 0.5, 1),
  vec4(0.5, -0.5, 0.5, 1),
  vec4(0.5, -0.5, -0.5, 1),
];

const vertexColors = [
  [0, 0, 0, 0.8],
  [1, 0, 0, 0.8], // 红色
  [1, 1, 0, 0.8], // 黄色
  [0, 1, 0, 0.8], // 绿色
  [0, 0, 1, 0.8], // 蓝色
  [1, 0, 1, 0.8], // 紫色
  [0, 1, 1, 0.8], // 青色
  [1, 1, 1, 0.8],
];

function colorCube() {
  quad(1, 0, 3, 2);
  quad(2, 3, 7, 6);
  quad(3, 0, 4, 7);
  quad(5, 4, 0, 1);
  quad(6, 5, 1, 2);
  quad(4, 5, 6, 7);
}

function quad(a, b, c, d) {
  const indices = [a, b, c, a, c, d];
  for(let i = 0; i < indices.length; ++i) {
    points.push(vertices[indices[i]]);
    colors.push(vertexColors[a]);
  }
}

colorCube();

const cBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
gl.bufferData(gl.ARRAY_BUFFER, pointsToBuffer(colors), gl.STATIC_DRAW);

const vColor = gl.getAttribLocation(program, 'vColor');
gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(vColor);


const vBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
gl.bufferData(gl.ARRAY_BUFFER, pointsToBuffer(points), gl.STATIC_DRAW);

const vPosition = gl.getAttribLocation(program, 'vPosition');
gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(vPosition);


const modelViewMatrix = gl.getUniformLocation(program, 'modelViewMatrix');

[xButton, yButton, zButton].forEach((button, i) => {
  button.addEventListener('click', () => {
    axis = i;
  });
});

render();

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  theta[axis] += 0.02;
  const mymat4 = mat4.create();
  mat4.rotateX(mymat4, mymat4, theta[0]);
  mat4.rotateY(mymat4, mymat4, theta[1]);
  mat4.rotateZ(mymat4, mymat4, theta[2]);
  gl.uniformMatrix4fv(modelViewMatrix, false, mymat4);
  gl.drawArrays(gl.TRIANGLES, 0, 36);
  requestAnimationFrame(render);
}
