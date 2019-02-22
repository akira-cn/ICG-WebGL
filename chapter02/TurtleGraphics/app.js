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
    this._points = [[vec2(x, y)]];
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
      points[points.length - 1].push(vec2(this.x, this.y));
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
      segment[0] = vec2(this.x, this.y);
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

const turtle = new Turtle();
for(let i = 0; i < 360 * 3; i += 5) {
  turtle.theta = i;
  for(let j = 0; j < 4; j++) {
    turtle.forward((1 / 360 / 5) * i);
    turtle.right(90);
  }
}
