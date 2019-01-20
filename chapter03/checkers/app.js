import {createProgram, setupWebGL, pointsToBuffer} from 'GLHelper';
import {vec3, mat4} from 'gl-matrix';

import vertexShader from './shader.vert';
import fragmentShader from './shader.frag';

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
let pieces = [];
const piecesIndices = [];
let piecesColors = [];
const points = [];
const colors = [];
const indices = [];
const nums = [];
const piecesNums = [];
let counter = 0;
let piecesCounter = 0;
let isPieces1Clicked = false;
let isPieces2Clicked = false;
let lastPosition;
// 棋盘建模，棋盘是1*1的单位矩阵
//  v0------v3------|
//  |  \     |  \   |
//  |    \   |    \ |
//  v1------v2------
//  |  \     |  \   |
//  |    \   |    \ |
//  | ------ |------|

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

function gePiecesPoints() {
  for(let i = 0; i < 8; i++) {
    for(let j = 0; j < 8; j++) {
      if(gameBoard[i][j] != 0) {
        console.log(gameBoard[i][j]);
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

function getPiecesIndex() {
  for(let i = 0; i < 8; i++) {
    for(let j = 0; j < 8; j++) {
      if(gameBoard[i][j] != 0) {
        //    v0----- v3
        //   /|      /|
        //  v1------v2|
        //  | |     | |
        //  | |v4---|-|v7
        //  |/      |/
        //  v5------v6
        // 前后左右上下
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
function getClickContent(num) {
  const i = Math.floor((num % 64) / 8);
  const j = (num % 64) % 8;
  return [i, j];
}


function updateGameBoard() {
  pieces = [];
  piecesColors = [];

  gePiecesPoints();
}

function getPiecesPointCenter(i, j) {
  return [(2 * j + 1) / 16, 1 - (2 * i + 1) / 16];
}
function init() {
  const canvas = document.getElementById('gl-canvas');
  gl = setupWebGL(canvas);

  if(!gl) {
    console.error("WebGL isn't available");
  }

  // gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1.0, 1.0, 1.0, 1.0);

  const program = createProgram(gl, vertexShader, fragmentShader);
  gl.useProgram(program);

  gl.enable(gl.DEPTH_TEST);

  const u_PickedNumber = gl.getUniformLocation(program, 'u_PickedNumber');
  gl.uniform1i(u_PickedNumber, -1);

  const u_MvpMatrix = gl.getUniformLocation(program, 'u_MvpMatrix');
  const eye = vec3.fromValues(0.5, -1, 2),
    center = vec3.fromValues(0.5, 0.5, 0),
    up = vec3.fromValues(0, 1, 0),
    viewMatrix = mat4.create(),
    projMatrix = mat4.create(),
    modelMatrix = mat4.create(),
    mvpMatrix = mat4.create();

  mat4.lookAt(viewMatrix, eye, center, up);
  // mat4.translate(modelMatrix, modelMatrix, vec3.fromValues(0.75, 0.0, 0.0));
  mat4.perspective(projMatrix, (Math.PI * 30) / 180, 1, 1, 100);
  mat4.multiply(mvpMatrix, projMatrix, viewMatrix);
  mat4.multiply(mvpMatrix, mvpMatrix, modelMatrix);
  gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix);

  getBoardPoints();
  gePiecesPoints();
  getPiecesIndex();

  const vColor = gl.getAttribLocation(program, 'a_Color');
  const vPosition = gl.getAttribLocation(program, 'a_Position');
  const vNumber = gl.getAttribLocation(program, 'a_Number');
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
  canvas.onmousedown = function handlerMousedown(evt) {
    const x = evt.clientX;
    const y = evt.clientY;
    const rect = evt.target.getBoundingClientRect();
    if(rect.left <= x && x < rect.right && rect.top <= y && y < rect.bottom) {
      const x_in_canvas = x - rect.left;
      const y_in_canvas = rect.bottom - y;
      const face = checkPieces(gl, x_in_canvas, y_in_canvas, u_PickedNumber, vColor, vPosition, vNumber);
      gl.uniform1i(u_PickedNumber, -1);
      // console.log(face);
      debugger;
      // draw(gl, vColor, vPosition, vNumber);
      const position = getClickContent(face - 1);
      if(!isPieces1Clicked && !isPieces2Clicked) {
        if(gameBoard[position[0]][position[1]] === 1) {
          gameBoard[position[0]][position[1]] = 3;
          isPieces1Clicked = true;
        } else if(gameBoard[position[0]][position[1]] === 2) {
          gameBoard[position[0]][position[1]] = 4;
          isPieces2Clicked = true;
        }
        lastPosition = position;
        updateGameBoard();
      } else if(isPieces1Clicked && (position[0] + position[1]) % 2 != 0 && gameBoard[position[0]][position[1]] === 0) {
        gameBoard[lastPosition[0]][lastPosition[1]] = 0;
        gameBoard[position[0]][position[1]] = 1;
        updateGameBoard();
      } else if(isPieces2Clicked && (positionP[0] + position[1]) % 2 != 0 && gameBoard[position[0]][position[1]] === 0) {
        gameBoard[lastPosition[0]][lastPosition[1]] = 0;
        gameBoard[position[0]][position[1]] = 2;
        updateGameBoard();
      }
      draw(gl, vColor, vPosition, vNumber);
    }
  };
}
function draw(gl, vColor, vPosition, vNumber) {
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

function checkPieces(gl, x, y, u_PickedNumber, vColor, vPosition, vNumber) {
  const pixels = new Uint8Array(4); // Array for storing the pixel value
  gl.uniform1i(u_PickedNumber, 0); // Draw by writing surface number into alpha value
  draw(gl, vColor, vPosition, vNumber);
  // Read the pixel value of the clicked position. pixels[3] is the surface number
  gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

  return pixels[3];
}

function initArrayBuffer(gl, a_attribute, data, type, num) {
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
  gl.enableVertexAttribArray(a_attribute);
  return true;
}
function arrayToBuffer(indices, Type = Uint8Array) {
  const deminsion = 1;
  const len = indices.length;
  const buffer = new Type(deminsion * len);
  let idx = 0;
  for(let i = 0; i < len; i++) {
    buffer[idx++] = indices[i];
  }
  return buffer;
}

init();
