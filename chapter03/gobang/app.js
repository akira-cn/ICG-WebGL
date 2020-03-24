import {createProgram, setupWebGL, pointsToBuffer} from 'GLHelper';
import {vec2, vec4} from 'gl-matrix';

import vertexShader from './shader.vert';
import fragmentShader from './shader.frag';

let gl;
const canvasSize = Math.min(window.innerHeight, window.innerWidth);
// 棋盘分段数 10*10
const boardSegment = 20;
// 棋盘顶点数量
const boardVertexNumber = (boardSegment + 1) * 4;
// 棋盘顶点坐标
const boardVertex = [];
// 棋盘顶点颜色
const boardColors = new Array(boardVertexNumber).fill(vec4(0.0, 0.0, 0.0, 1.0));
// 棋子分段数,越大越接近圆
const chessSegment = 20;
// 棋子半径
const chessRadius = 2 / boardSegment / 2;
// 棋子颜色标识
let colorFlag = true;
// 棋子顶点数
let index = 0;
// 最大棋子数
const maxChess = 100;
// 最大顶点数
const maxPoints = boardVertexNumber + maxChess * chessSegment;
// 棋盘落子状态
const boardState = [];
// 获胜方
let winner;
// 标记最后棋子
const lastEl = document.getElementById('last');
const winnerEl = document.getElementById('winner');
window.onload = function () {
  const canvas = document.getElementById('gl-canvas');
  canvas.width = canvasSize;
  canvas.height = canvasSize;
  gl = setupWebGL(canvas);

  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(204 / 255, 161 / 255, 129 / 255, 1.0);

  const program = createProgram(
    gl,
    vertexShader,
    fragmentShader,
  );
  gl.useProgram(program);

  // 顶点
  const vBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    8 * (maxPoints + boardVertexNumber),
    gl.STATIC_DRAW,
  );
  const vPosition = gl.getAttribLocation(program, 'vPosition');
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);

  // 颜色
  const cBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    16 * (maxPoints + boardVertexNumber),
    gl.STATIC_DRAW,
  );

  const vColor = gl.getAttribLocation(program, 'vColor');
  gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vColor);

  // 初始化棋盘
  initBoardState();
  initBoard();
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.bufferSubData(gl.ARRAY_BUFFER, 0, pointsToBuffer(boardVertex));
  gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
  gl.bufferSubData(gl.ARRAY_BUFFER, 0, pointsToBuffer(boardColors));
  render();

  canvas.addEventListener('click', (evt) => {
    if(winner) return;
    const {clientX: x, clientY: y} = evt;
    const {width, height} = canvas;
    addChess(vBuffer, cBuffer, x, y, width, height);
  });
};

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  // 棋盘
  gl.drawArrays(gl.LINES, 0, boardVertexNumber);
  // 棋子
  for(let i = 0; i < index; i += chessSegment) {
    gl.drawArrays(gl.TRIANGLE_FAN, boardVertexNumber + i, chessSegment);
  }
}
// 棋盘顶点
function initBoard() {
  const rowLineNumber = boardSegment + 1;
  const columnLineNumber = boardSegment + 1;
  const rowHeight = 2 / boardSegment;
  const columnWidth = 2 / boardSegment;
  for(let i = 0; i < rowLineNumber + columnLineNumber; i++) {
    if(i < rowLineNumber) {
      boardVertex.push(
        vec2(-1.0, -1 + i * rowHeight),
        vec2(1.0, -1 + i * rowHeight),
      );
    } else {
      boardVertex.push(
        vec2(-1 + (i % rowLineNumber) * columnWidth, -1),
        vec2(-1 + (i % rowLineNumber) * columnWidth, 1),
      );
    }
  }
}

// 添加棋子
function addChess(vBuffer, cBuffer, x, y, width, height) {
  // 获取gl坐标
  const {x: x_gl, y: y_gl} = vertex2Gl(x, y, width, height);
  // 获取棋盘坐标
  const {x: x_board, y: y_board} = vertex2Board(x_gl, y_gl, width, height);
  // 获取棋盘状态坐标
  const {x: x_state, y: y_state} = vertex2State(x_board, y_board);
  // 该位置有棋子return
  if(boardState[y_state][x_state]) return;
  // 1为黑子,2为白子
  boardState[y_state][x_state] = colorFlag ? 1 : 2;
  const chessVertex = vertexChess(x_board, y_board);
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.bufferSubData(
    gl.ARRAY_BUFFER,
    (boardVertexNumber + index) * 8,
    pointsToBuffer(chessVertex),
  );
  // 颜色
  gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
  const color = colorFlag ? vec4(0.0, 0.0, 0.0, 1.0) : vec4(1.0, 1.0, 1.0, 1.0);
  gl.bufferSubData(
    gl.ARRAY_BUFFER,
    16 * (boardVertexNumber + index),
    pointsToBuffer(new Array(chessSegment).fill(color)),
  );
  index += chessSegment;
  render();
  // 获取棋子屏幕坐标,标记最后一个棋子的位置
  const {x: x_screen, y: y_screen} = vertex2Screen(x_board, y_board, width, height);
  lastEl.style.display = 'block';
  lastEl.style.left = `${x_screen}px`;
  lastEl.style.top = `${y_screen}px`;
  // 检查是否获胜
  checkFinished(x_state, y_state, colorFlag);
  colorFlag = !colorFlag;
}

/**
 * 屏幕坐标转化为webGL坐标
 * @param {Number} x 屏幕坐标x坐标
 * @param {Number} y 屏幕坐标y坐标
 */
function vertex2Gl(x, y, width, height) {
  return {
    x: (x / width) * 2 - 1,
    y: ((height - y) / height) * 2 - 1,
  };
}
/**
 * webGL坐标转化为棋子坐标
 * @param {Number} x  webGL x坐标
 * @param {Number} y  webGL y坐标
 */
function vertex2Board(x, y) {
  const diameter = chessRadius * 2;
  return {
    x: Math.round(x / diameter) * diameter,
    y: Math.round(y / diameter) * diameter,
  };
}

/**
 * 由棋子坐标得到棋子顶点坐标
 * @param {Number} x 棋子x坐标
 * @param {Number} y 棋子y坐标
 */
function vertexChess(x, y) {
  const chessVertex = [];
  for(let i = 0; i < chessSegment; i++) {
    const x_chess
      = x + chessRadius * Math.cos(((Math.PI * 2) / chessSegment) * i);
    const y_chess
      = y + chessRadius * Math.sin(((Math.PI * 2) / chessSegment) * i);
    chessVertex.push(vec2(x_chess, y_chess));
  }
  return chessVertex;
}

/**
 * 由棋子坐标得到棋盘状态中的坐标
 * @param {Number} x 棋子x坐标
 * @param {Number} y 棋子y坐标
 */
function vertex2State(x, y) {
  const width = boardSegment;
  const height = boardSegment;
  return {
    x: Math.round(((x + 1) * width) / 2),
    y: Math.round(height - ((y + 1) * height) / 2),
  };
}

/**
 * 由棋子坐标得到屏幕坐标
 * @param {Number} x 棋子x坐标
 * @param {Number} y 棋子y坐标
 */
function vertex2Screen(x, y, width, height) {
  return {
    x: (x + 1) / 2 * width,
    y: height - (y + 1) / 2 * height,
  };
}

/**
 * 初始化棋盘落子状态 0无棋子,1黑子,2白子
 * [
 *  [0,0,0...],
 *  [0,0,0...],
 *  ...
 * ]
 */
function initBoardState() {
  for(let i = 0; i < boardSegment + 1; i++) {
    boardState[i] = [];
    for(let j = 0; j < boardSegment + 1; j++) {
      boardState[i][j] = 0;
    }
  }
}

/**
 *
 * @param {Number} x 落下棋子在棋盘状态中的x坐标
 * @param {Number} y 落下棋子在棋盘状态中的x坐标
 * @param {Boolean} flag 目前棋子颜色标识 true黑色 false白色
 */
function checkFinished(x, y, flag) {
  const chessType = flag ? 1 : 2;
  if(check(x, y, chessType, 'row') >= 5) {
    winHandle(chessType);
  } else if(check(x, y, chessType, 'col') >= 5) {
    winHandle(chessType);
  } else if(check(x, y, chessType, 'diagonal_left') >= 5) {
    winHandle(chessType);
  } else if(check(x, y, chessType, 'diagonal_right') >= 5) {
    winHandle(chessType);
  }
}

function winHandle(flag) {
  winner = flag ? '黑子' : '白子';
  winnerEl.innerText = `${winner}胜`;
}

/**
 *
 * @param {Number} x 落下棋子在棋盘状态中的x坐标
 * @param {Number} y 落下棋子在棋盘状态中的x坐标
 * @param {Number} chessType 棋子类别 1或2
 * @param {String} checkType 检查类型 row,col,diagonal_left(左上-右下),diagonal_left(右上-左下)
 */
function check(x, y, chessType, checkType) {
  let connected = 1;
  // index减少方向的个数 分别是 左,上,左上,右上
  let decreaseDirection = 1;
  // index增加方向的个数 分别是 右,下,右下,左下
  let increaseDirection = 1;
  for(let i = 0; i < 4; i++) {
    // 每个检查类型index增加方向和减少方向的 坐标和落子状态检验
    const nextChessMap = {
      row: {
        // 下一个位置不为边缘且棋盘状态为当前落下棋子颜色(下同)
        decrease: x - decreaseDirection >= 0 && boardState[y][x - decreaseDirection] === chessType,
        increase: x + increaseDirection <= boardSegment && boardState[y][x + increaseDirection] === chessType,
      },
      col: {
        decrease: y - decreaseDirection >= 0 && boardState[y - decreaseDirection][x] === chessType,
        increase: y + increaseDirection <= boardSegment && boardState[y + increaseDirection][x] === chessType,
      },
      diagonal_left: {
        decrease: (x - decreaseDirection >= 0 && y - decreaseDirection >= 0)
          && boardState[y - decreaseDirection][x - decreaseDirection] === chessType,
        increase: (x + increaseDirection <= boardSegment && y + increaseDirection <= boardSegment)
        && boardState[y + increaseDirection][x + increaseDirection] === chessType,
      },
      diagonal_right: {
        decrease: (x + increaseDirection <= boardSegment && y - decreaseDirection >= 0)
        && boardState[y - decreaseDirection][x + increaseDirection] === chessType,
        increase: (x - decreaseDirection >= 0 && y + increaseDirection <= boardSegment)
        && boardState[y + increaseDirection][x - decreaseDirection] === chessType,
      },
    };
    const {decrease, increase} = nextChessMap[checkType];
    if(decrease) {
      connected += 1;
      // 除了diagonal_right 其他类型decreaseDirection和increaseDirection增减一致
      if(checkType !== 'diagonal_right') {
        decreaseDirection++;
      } else {
        decreaseDirection++;
        increaseDirection++;
      }
    } else if(increase) {
      connected += 1;
      if(checkType !== 'diagonal_right') {
        increaseDirection++;
      } else {
        decreaseDirection++;
        increaseDirection++;
      }
    }
  }
  return connected;
}