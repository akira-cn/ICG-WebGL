import {createProgram, setupWebGL, pointsToBuffer} from 'GLHelper';
import generateMaze from '../../common/maze';

import vertexShader from './shader.vert';
import fragmentShader from './shader.frag';

const generateMazeBtn = document.getElementById('generateMaze');
const rowsInput = document.getElementById('mazeRows');
const colsInput = document.getElementById('mazeCols');

let gl;
let vBuffer;
let iBuffer;

const MAX_ROW = 99;
const MAX_COL = 99;

function init() {
  const canvas = document.getElementById('gl-canvas');
  gl = setupWebGL(canvas);

  if(!gl) {
    console.error('WebGL isn\'t available');
  }

  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1.0, 1.0, 1.0, 1.0);

  const program = createProgram(gl, vertexShader, fragmentShader);
  gl.useProgram(program);

  const maxNumVerticles = (MAX_ROW + 1) * (MAX_COL + 1);

  vBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, 8 * maxNumVerticles, gl.STATIC_DRAW);

  const vPosition = gl.getAttribLocation(program, 'vPosition');
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);

  iBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, 8 * maxNumVerticles, gl.STATIC_DRAW);
}

function drawMaze() {
  const row = parseInt(rowsInput.value, 10);
  const col = parseInt(colsInput.value, 10);

  if(row >= 3 && col >= 3 && row <= MAX_ROW && col <= MAX_COL) {
    const maze = generateMaze(row, col);
    renderMaze(row, col, maze);
  }
}

function renderMaze(row, col, maze) {
  const points = [];

  const m = Math.max(row, col);

  // 生成所有的点
  for(let i = 0; i <= row; i++) {
    for(let j = 0; j <= col; j++) {
      points.push([2 * (j / m) - col / m, row / m - 2 * (i / m)]);
    }
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.bufferSubData(gl.ARRAY_BUFFER, 0, pointsToBuffer(points));

  const indices = [];

  for(let i = 0; i < row; i++) {
    for(let j = 0; j < col; j++) {
      const a = i * (col + 1) + j + 1;
      const b = (i + 1) * (col + 1) + j;
      const c = (i + 1) * (col + 1) + j + 1;
      const data = maze[i][j];
      if(data & 0b0010) indices.push(a, c);
      if(data & 0b0100) indices.push(b, c);
    }
  }

  for(let i = 0; i < col; i++) {
    indices.push(i, i + 1);
  }

  for(let i = 0; i < row; i++) {
    const data = maze[i][0];
    if(data & 0b1000) indices.push(i * (col + 1), (i + 1) * (col + 1));
  }

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
  gl.bufferSubData(gl.ELEMENT_ARRAY_BUFFER, indices, new Uint16Array(indices));

  gl.clear(gl.COLOR_BUFFER_BIT);
  // gl.drawArrays(gl.LINE_LOOP, 0, points.length);

  gl.drawElements(gl.LINES, indices.length, gl.UNSIGNED_SHORT, 0);
}

init();
generateMazeBtn.addEventListener('click', drawMaze);
