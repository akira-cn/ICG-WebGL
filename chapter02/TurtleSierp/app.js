import {createProgram, setupWebGL, pointsToBuffer} from 'GLHelper';
import {vec2} from 'gl-matrix';

import vertexShader from './shader.vert';
import fragmentShader from './shader.frag';

class Turtle {
  /**
   * 初始化位置和角度
   * @param {Number} x 初始x坐标，范围[-1,1]，默认值:0
   * @param {Number} y 初始x坐标，范围[-1,1]，默认值:0
   * @param {Number} theta 初始角度，单位:度，，默认值:0
   */
  constructor(x = 0, y = 0, theta = 0) {
    this.theta = theta;
    this.x = x;
    this.y = y;
    this._penStatus = 'down';
    this._points = [[vec2.fromValues(x, y)]];
    this._initGl();
    this._timer = null;
  }

  /**
   * 前进的距离
   * @param {Number} distance
   */
  forward(distance) {
    // 根据移动的距离计算画笔坐标并保存位置进行绘制
    this.x += distance * Math.cos((Math.PI * this.theta) / 180.0);
    this.y += distance * Math.sin((Math.PI * this.theta) / 180.0);
    if(this._penStatus === 'down') {
      const points = this._points;
      points[points.length - 1].push(vec2.fromValues(this.x, this.y));
      // 防抖
      clearTimeout(this._timer);
      this._timer = setTimeout(() => {
        this._render();
      });
    }
  }

  /**
   * 右转角度,单位:度
   * @param {Number} angle
   */
  right(angle) {
    this.theta += angle * -1;
  }

  /**
   * 左转角度,单位:度
   * @param {Number} angle
   */
  left(angle) {
    this.theta += angle;
  }

  /**
   * 调整画笔状态，可选值为：up或 down，up不绘制，down落下画笔绘制
   * @param {String} action
   */
  pen(action) {
    this._penStatus = action;
    if(action === 'up' && this._points[this._points.length - 1].length !== 0) {
      this._points.push([]);
    } else if(action === 'down') {
      const segment = this._points[this._points.length - 1];
      segment[0] = vec2.fromValues(this.x, this.y);
    }
  }

  /**
   * 内部私有方法，初始化webGl
   */
  _initGl() {
    const canvas = document.getElementById('gl-canvas');
    const gl = setupWebGL(canvas);

    if(!gl) {
      console.error("WebGL isn't available");
    }
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    //  Load shaders and initialize attribute buffers
    const program = createProgram(gl, vertexShader, fragmentShader);
    gl.useProgram(program);
    this._gl = gl;
    this._program = program;
  }

  /**
   * 内部方法，执行绘制
   */
  _render() {
    const gl = this._gl;
    gl.clear(gl.COLOR_BUFFER_BIT);
    const vPosition = gl.getAttribLocation(this._program, 'vPosition');
    // 循环所有路径进行绘制
    for(let i = 0; i < this._points.length; i++) {
      const bufferId = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
      gl.bufferData(gl.ARRAY_BUFFER, pointsToBuffer(this._points[i]), gl.STATIC_DRAW);
      gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(vPosition);
      gl.drawArrays(gl.LINE_STRIP, 0, this._points[i].length);
    }
  }
}

const numTimesToSubdivide = 1;
const MAX_LENGTH = 2;

function divideTriangle(t, length = MAX_LENGTH, count = numTimesToSubdivide) {
  if(count <= 0) {
    for(let i = 0; i < 3; i++) {
      t.forward(length);
      t.left(120);
    }
  } else {
    // 在原点绘制第一个三角形
    divideTriangle(t, length / 2, count - 1);
    // 移动到水平边的中点绘制第二个三角形
    t.forward(length / 2);
    divideTriangle(t, length / 2, count - 1);
    // 回到原点
    t.forward(-length / 2);
    // 前往侧边边的中点
    t.left(60);
    t.forward(length / 2);
    // 角度调整为水平
    t.right(60);
    // 绘制一个三角形
    divideTriangle(t, length / 2, count - 1);
    // 回到原点
    t.left(60);
    t.forward(-length / 2);
    t.right(60);
  }
}

// 起点为(-1,-1)
const turtle = new Turtle(-1, -1, 0);
divideTriangle(turtle);
