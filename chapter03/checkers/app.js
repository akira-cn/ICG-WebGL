import {createProgram, setupWebGL, pointsToBuffer} from 'GLHelper';
import {vec3, mat4} from 'gl-matrix';

import vertexShader from './shader.vert';
import fragmentShader from './shader.frag';

// 棋盘内容初始数组，0绘制非棋子，1、2绘制双方棋子
const gameBoard = [
  [0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [2, 0, 2, 0, 2, 0, 2, 0],
  [0, 2, 0, 2, 0, 2, 0, 2],
  [2, 0, 2, 0, 2, 0, 2, 0],
];

let gl;
// 棋子大小
const piecesSize = 0.05;
// 棋子坐标
let pieces = [];
// 棋子三角索引
const piecesIndices = [];
// 棋子颜色
let piecesColors = [];
// 棋子编号
let piecesNums = [];
// 棋子三角索引计数
let piecesCounter = 0;
// 棋盘坐标
const points = [];
// 棋盘颜色
const colors = [];
// 棋盘三角索引
const indices = [];
// 棋盘编号
const nums = [];
// 棋盘三角索引计数
let counter = 0;
// 是否点击棋子1
let isPieces1Clicked = false;
// 是否点击棋子2
let isPieces2Clicked = false;
// 上次点击位置
let lastPosition;


// 棋盘建模，棋盘尺寸是1*1
//  v0------v3
//  |  \     |
//  |    \   |
//  v1------v2
// 8*8格子，每个格子四个顶点两个三角形
function getBoardPoints() {
  for(let i = 0; i < 8; i++) {
    for(let j = 0; j < 8; j++) {
      points.push([j / 8, 1 - i / 8, 0]);
      points.push([j / 8, 1 - (i + 1) / 8, 0]);
      points.push([(j + 1) / 8, 1 - (i + 1) / 8, 0]);
      points.push([(j + 1) / 8, 1 - i / 8, 0]);
      nums.push(i * 8 + j + 1, i * 8 + j + 1, i * 8 + j + 1, i * 8 + j + 1);
      if((i + j) % 2 === 0) {
        colors.push([1.0, 1.0, 0], [1.0, 1.0, 0], [1.0, 1.0, 0], [1.0, 1.0, 0]);
      } else {
        colors.push([1.0, 0, 0], [1.0, 0, 0], [1.0, 0, 0], [1.0, 0, 0]);
      }
      indices.push(
        0 + counter,
        1 + counter,
        2 + counter,
        0 + counter,
        2 + counter,
        3 + counter
      );

      counter += 4;
    }
  }
}

// 棋子建模
function gePiecesPoints() {
  for(let i = 0; i < 8; i++) {
    for(let j = 0; j < 8; j++) {
      if(gameBoard[i][j] != 0) {
        piecesNums.push(64 + i * 8 + j + 1, 64 + i * 8 + j + 1, 64 + i * 8 + j + 1, 64 + i * 8 + j + 1,
          64 + i * 8 + j + 1, 64 + i * 8 + j + 1, 64 + i * 8 + j + 1, 64 + i * 8 + j + 1);
        const center = getPiecesPointCenter(i, j);
        if(gameBoard[i][j] === 1) {
          piecesColors.push(
            [1, 0, 1],
            [1, 0, 1],
            [1, 0, 1],
            [1, 0, 1],
            [0, 1, 1],
            [0, 1, 1],
            [0, 1, 1],
            [0, 1, 1]
          );
        } else if(gameBoard[i][j] == 2) {
          piecesColors.push(
            [0, 0, 1],
            [0, 0, 1],
            [0, 0, 1],
            [0, 0, 1],
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0]
          );
        } else if(gameBoard[i][j] == 3) {
          piecesColors.push(
            [1, 0, 0.5],
            [1, 0, 0.5],
            [1, 0, 0.5],
            [1, 0, 0.5],
            [1, 0, 1],
            [1, 0, 1],
            [1, 0, 1],
            [1, 0, 1]
          );
        } else if(gameBoard[i][j] == 4) {
          piecesColors.push(
            [0, 0.5, 0],
            [0, 0.5, 0],
            [0, 0.5, 0],
            [0, 0.5, 0],
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0]
          );
        }
        pieces.push([
          center[0] - piecesSize / 2,
          center[1] - piecesSize / 2,
          0.1,
        ]);
        pieces.push([
          center[0] - piecesSize / 2,
          center[1] + piecesSize / 2,
          0.1,
        ]);
        pieces.push([
          center[0] + piecesSize / 2,
          center[1] + piecesSize / 2,
          0.1,
        ]);
        pieces.push([
          center[0] + piecesSize / 2,
          center[1] - piecesSize / 2,
          0.1,
        ]);
        pieces.push([
          center[0] - piecesSize / 2,
          center[1] - piecesSize / 2,
          0,
        ]);
        pieces.push([
          center[0] - piecesSize / 2,
          center[1] + piecesSize / 2,
          0,
        ]);
        pieces.push([
          center[0] + piecesSize / 2,
          center[1] + piecesSize / 2,
          0,
        ]);
        pieces.push([
          center[0] + piecesSize / 2,
          center[1] - piecesSize / 2,
          0,
        ]);
      }
    }
  }
}

// 棋子三角索引
//    v0----- v3
//   /|      /|
//  v1------v2|
//  | |     | |
//  | |v4---|-|v7
//  |/      |/
//  v5------v6
// 顺序为前后左右上下
function getPiecesIndex() {
  for(let i = 0; i < 8; i++) {
    for(let j = 0; j < 8; j++) {
      if(gameBoard[i][j] != 0) {
        piecesIndices.push(
          1 + piecesCounter,
          2 + piecesCounter,
          5 + piecesCounter,
          2 + piecesCounter,
          5 + piecesCounter,
          6 + piecesCounter,

          0 + piecesCounter,
          4 + piecesCounter,
          7 + piecesCounter,
          0 + piecesCounter,
          3 + piecesCounter,
          7 + piecesCounter,

          0 + piecesCounter,
          1 + piecesCounter,
          4 + piecesCounter,
          1 + piecesCounter,
          4 + piecesCounter,
          5 + piecesCounter,

          2 + piecesCounter,
          3 + piecesCounter,
          7 + piecesCounter,
          2 + piecesCounter,
          6 + piecesCounter,
          7 + piecesCounter,

          0 + piecesCounter,
          1 + piecesCounter,
          2 + piecesCounter,
          0 + piecesCounter,
          2 + piecesCounter,
          3 + piecesCounter,

          4 + piecesCounter,
          5 + piecesCounter,
          7 + piecesCounter,
          5 + piecesCounter,
          6 + piecesCounter,
          7 + piecesCounter
        );
        piecesCounter += 8;
      }
    }
  }
}

// 得到点击的二维坐标
function getClickContent(num) {
  const i = Math.floor((num % 64) / 8);
  const j = (num % 64) % 8;
  return [i, j];
}

// 更新棋子布局
function updateGameBoard() {
  pieces = [];
  piecesColors = [];
  piecesNums = [];
  gePiecesPoints();
}

// 计算棋子绘制中心点
function getPiecesPointCenter(i, j) {
  return [(2 * j + 1) / 16, 1 - (2 * i + 1) / 16];
}

let canvas,
  u_PickedNumber,
  u_MvpMatrix,
  viewMatrix,
  projMatrix,
  modelMatrix,
  mvpMatrix,
  vColor,
  vPosition,
  vNumber;

(function init() {
  canvas = document.getElementById('gl-canvas');
  gl = setupWebGL(canvas);

  if(!gl) {
    console.error("WebGL isn't available");
  }

  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1.0, 1.0, 1.0, 1.0);

  const program = createProgram(gl, vertexShader, fragmentShader);
  gl.useProgram(program);

  gl.enable(gl.DEPTH_TEST);

  u_PickedNumber = gl.getUniformLocation(program, 'u_PickedNumber');
  gl.uniform1i(u_PickedNumber, -1);

  u_MvpMatrix = gl.getUniformLocation(program, 'u_MvpMatrix');
  const eye = vec3.fromValues(0, 0, 3),
    center = vec3.fromValues(0, 0, 0),
    up = vec3.fromValues(0, 1, 0);
  viewMatrix = mat4.create(),
  projMatrix = mat4.create(),
  modelMatrix = mat4.create(),
  mvpMatrix = mat4.create();

  // 初始角度为x轴旋转320
  mat4.rotateX(modelMatrix, modelMatrix, Math.PI * 2 * 320 / 360);
  mat4.lookAt(viewMatrix, eye, center, up);
  // 建模坐标在0-1之间,移至中心点，便于旋转计算
  mat4.translate(modelMatrix, modelMatrix, vec3.fromValues(-0.5, -0.5, 0.0));
  mat4.perspective(projMatrix, (Math.PI * 30) / 180, 1, 1, 100);
  mat4.multiply(mvpMatrix, projMatrix, viewMatrix);
  mat4.multiply(mvpMatrix, mvpMatrix, modelMatrix);
  gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix);

  getBoardPoints();
  gePiecesPoints();
  getPiecesIndex();

  vColor = gl.getAttribLocation(program, 'a_Color');
  vPosition = gl.getAttribLocation(program, 'a_Position');
  vNumber = gl.getAttribLocation(program, 'a_Number');
  draw();
}());

// 鼠标点击canvas
canvas.onmousedown = function handlerMousedown(evt) {
  const x = evt.clientX;
  const y = evt.clientY;
  const rect = evt.target.getBoundingClientRect();
  if(rect.left <= x && x < rect.right && rect.top <= y && y < rect.bottom) {
    const x_in_canvas = x - rect.left;
    const y_in_canvas = rect.bottom - y;
    const face = checkPieces(gl, x_in_canvas, y_in_canvas, u_PickedNumber, vColor, vPosition, vNumber);
    gl.uniform1i(u_PickedNumber, -1);
    const position = getClickContent(face - 1);
    if(!isPieces1Clicked && !isPieces2Clicked && face > 64 && face < 129) { // 当首次点击棋子，改变棋子颜色
      if(gameBoard[position[0]][position[1]] === 1) { // 棋子1变色
        gameBoard[position[0]][position[1]] = 3;
        isPieces1Clicked = true;
        lastPosition = position;
        updateGameBoard();
      } else if(gameBoard[position[0]][position[1]] === 2) { // 棋子2变色
        gameBoard[position[0]][position[1]] = 4;
        isPieces2Clicked = true;
        lastPosition = position;
        updateGameBoard();
      }
    } else if(isPieces1Clicked && face < 65 && (position[0] + position[1]) % 2 != 0
    && gameBoard[position[0]][position[1]] === 0) {
      // 棋子1变色后点击棋盘红色区域，棋子跳至点击处
      gameBoard[lastPosition[0]][lastPosition[1]] = 0;
      gameBoard[position[0]][position[1]] = 1;
      updateGameBoard();
      isPieces1Clicked = false;
    } else if(isPieces2Clicked && face < 65 && (position[0] + position[1]) % 2 != 0
    && gameBoard[position[0]][position[1]] === 0) {
      // 棋子2变色后点击棋盘红色区域，棋子跳至点击处
      gameBoard[lastPosition[0]][lastPosition[1]] = 0;
      gameBoard[position[0]][position[1]] = 2;
      updateGameBoard();
      isPieces2Clicked = false;
    }
    draw();
  }
};

const pitchRange = document.getElementById('pitchRange');
const pitch = document.getElementById('pitch');
const btnPitchUp = document.getElementById('pitchUp');
const btnPitchDown = document.getElementById('pitchDown');
const yawRange = document.getElementById('yawRange');
const yaw = document.getElementById('yaw');
const btnYawUp = document.getElementById('yawUp');
const btnYawDown = document.getElementById('yawDown');
const xTranslateRange = document.getElementById('xTranslateRange');
const xTranslate = document.getElementById('xTranslate');
const btnXTranslateUp = document.getElementById('xTranslateUp');
const btnXTranslateDown = document.getElementById('xTranslateDown');
const zTranslateRange = document.getElementById('zTranslateRange');
const zTranslate = document.getElementById('zTranslate');
const btnZTranslateUp = document.getElementById('zTranslateUp');
const btnZTranslateDown = document.getElementById('zTranslateDown');

pitchRange.addEventListener('change', () => {
  setPitch(parseInt(pitchRange.value, 10));
});
btnPitchUp.addEventListener('click', () => {
  setPitch(parseInt(pitchRange.value, 10) + 2);
});
btnPitchDown.addEventListener('click', () => {
  setPitch(parseInt(pitchRange.value, 10) - 2);
});
yawRange.addEventListener('change', () => {
  setYaw(parseInt(yawRange.value, 10));
});
btnYawUp.addEventListener('click', () => {
  setYaw(parseInt(yawRange.value, 10) + 2);
});
btnYawDown.addEventListener('click', () => {
  setYaw(parseInt(yawRange.value, 10) - 2);
});
xTranslateRange.addEventListener('change', () => {
  setXTranslate(parseFloat(xTranslateRange.value));
});
btnXTranslateUp.addEventListener('click', () => {
  setXTranslate(Math.round((parseFloat(xTranslateRange.value) + 0.2) * 100) / 100);
});
btnXTranslateDown.addEventListener('click', () => {
  setXTranslate(Math.round((parseFloat(xTranslateRange.value) - 0.2) * 100) / 100);
});
zTranslateRange.addEventListener('change', () => {
  setZTranslate(parseFloat(zTranslateRange.value));
});
btnZTranslateUp.addEventListener('click', () => {
  setZTranslate(Math.round((parseFloat(zTranslateRange.value) + 0.2) * 100) / 100);
});
btnZTranslateDown.addEventListener('click', () => {
  setZTranslate(Math.round((parseFloat(zTranslateRange.value) - 0.2) * 100) / 100);
});

function setPitch(val) {
  if(val > parseInt(pitchRange.max, 0) || val < parseInt(pitchRange.min, 0)) { return }
  resetControl();
  pitchRange.value = val;
  pitch.innerHTML = val;
  setMVPMatrix(2 * Math.PI * val / 360, 'rotatePitch');
  draw();
}
function setYaw(val) {
  if(val > parseInt(yawRange.max, 0) || val < parseInt(yawRange.min, 0)) { return }
  resetControl();
  yawRange.value = val;
  yaw.innerHTML = val;
  setMVPMatrix(2 * Math.PI * val / 360, 'rotateYaw');
  draw();
}
function setXTranslate(val) {
  if(val > parseInt(xTranslateRange.max, 0) || val < parseInt(xTranslateRange.min, 0)) { return }
  resetControl();
  xTranslateRange.value = val;
  xTranslate.innerHTML = val;
  setMVPMatrix(val, 'xTranslate');
  draw();
}
function setZTranslate(val) {
  if(val > parseInt(zTranslateRange.max, 0) || val < parseInt(zTranslateRange.min, 0)) { return }
  resetControl();
  zTranslateRange.value = val;
  zTranslate.innerHTML = val;
  setMVPMatrix(val, 'zTranslate');
  draw();
}

function resetControl() {
  pitchRange.value = 0;
  pitch.innerHTML = 0;
  yawRange.value = 0;
  yaw.innerHTML = 0;
  xTranslateRange.value = 0;
  xTranslate.innerHTML = 0;
  zTranslateRange.value = 0;
  zTranslate.innerHTML = 0;
}
function setMVPMatrix(val, type) {
  mvpMatrix = mat4.create();
  modelMatrix = mat4.create();
  switch (type) {
    case 'rotatePitch':
      mat4.rotateX(modelMatrix, modelMatrix, val);
      break;
    case 'rotateYaw':
      mat4.rotateY(modelMatrix, modelMatrix, val);
      break;
    case 'xTranslate':
      mat4.translate(modelMatrix, modelMatrix, vec3.fromValues(val, 0.0, 0.0));
      break;
    case 'zTranslate':
      mat4.translate(modelMatrix, modelMatrix, vec3.fromValues(0.0, 0.0, val));
      break;
    default:
      break;
  }
  mat4.translate(modelMatrix, modelMatrix, vec3.fromValues(-0.5, -0.5, 0.0));
  mat4.multiply(mvpMatrix, projMatrix, viewMatrix);
  mat4.multiply(mvpMatrix, mvpMatrix, modelMatrix);
  gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix);
}

// 绘制canvas
function draw() {
  if(!initArrayBuffer(gl, vColor, pointsToBuffer(colors), gl.FLOAT, 3)) {
    return -1;
  }
  if(!initArrayBuffer(gl, vPosition, pointsToBuffer(points), gl.FLOAT, 3)) {
    return -1;
  }
  if(!initArrayBuffer(gl, vNumber, arrayToBuffer(nums, Uint8Array), gl.UNSIGNED_BYTE, 1)) {
    return -1;
  }

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    arrayToBuffer(indices, Uint8Array),
    gl.STATIC_DRAW
  );

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_BYTE, 0);


  if(!initArrayBuffer(gl, vColor, pointsToBuffer(piecesColors), gl.FLOAT, 3)) {
    return -1;
  }
  if(!initArrayBuffer(gl, vPosition, pointsToBuffer(pieces), gl.FLOAT, 3)) {
    return -1;
  }
  if(!initArrayBuffer(gl, vNumber, arrayToBuffer(piecesNums, Uint8Array), gl.UNSIGNED_BYTE, 1)) {
    return -1;
  }

  const piecesIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, piecesIndexBuffer);
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    arrayToBuffer(piecesIndices, Uint8Array),
    gl.STATIC_DRAW
  );

  gl.drawElements(gl.TRIANGLES, piecesIndices.length, gl.UNSIGNED_BYTE, 0);
}

// 找出棋子编号
function checkPieces(gl, x, y, u_PickedNumber, vColor, vPosition, vNumber) {
  const pixels = new Uint8Array(4);
  gl.uniform1i(u_PickedNumber, 0);
  draw();
  gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
  return pixels[3];
}

// 给buffer传值
function initArrayBuffer(gl, a_attribute, data, type, num) {
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
  gl.enableVertexAttribArray(a_attribute);
  return true;
}

// 类型转换
function arrayToBuffer(arr, Type = Uint8Array) {
  const len = arr.length;
  const buffer = new Type(len);
  let idx = 0;
  for(let i = 0; i < len; i++) {
    buffer[idx++] = arr[i];
  }
  return buffer;
}


