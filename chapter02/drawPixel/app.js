import {createProgram, setupWebGL, pointsToBuffer} from 'GLHelper';
import {vec2} from 'gl-matrix';

import vertexShader from './shader.vert';
import fragmentShader from './shader.frag';

class DrawPixel {
  constructor() {
    this._points = [];
    this._drawType = '';
    this._initGl();
  }

  /**
   *
   * @param {Array} points 需要绘制的做标数组
   */
  writePixel(points) {
    // 清空坐标
    this._points = [];
    if(!Array.isArray(points)) return;
    points.forEach((item) => {
      if(Array.isArray(item) && item.length === 2) {
        this._points.push(vec2(item[0], item[1]));
      }
    });
  }

  /**
   *
   * @param {String} type 绘制类型
   */
  readPixel(type = 'LINE_STRIP') {
    this._drawType = type;
    this._render();
  }

  /**
   *
   * @param {Array} center 圆心坐标
   * @param {Number} radius 半径
   * @param {Number} segment 分段数 (正整数)
   */
  drawCircle(center = [0, 0], radius = 0.2, segment = 10) {
    // 清空坐标
    this._points = [];
    // 获取各个分段位置的坐标
    for(let i = 0; i < segment; i++) {
      const x = center[0] + radius * Math.cos(Math.PI * 2 / segment * i);
      const y = center[1] + radius * Math.sin(Math.PI * 2 / segment * i);
      this._points.push(vec2(x, y));
    }
    this.readPixel('LINE_LOOP');
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
    const bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, pointsToBuffer(this._points), gl.STATIC_DRAW);

    const vPosition = gl.getAttribLocation(this._program, 'vPosition');
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    // 每次渲染不清除之前的
    // gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl[this._drawType], 0, this._points.length);
  }
}


const drawPixel = new DrawPixel();
drawPixel.writePixel([[-0.3, 0.8], [-0.7, 0.8], [-0.7, 0.3], [-0.3, 0.3], [-0.3, 0.5], [-0.5, 0.5]]);
drawPixel.readPixel('LINE_STRIP');
drawPixel.writePixel([[-0.1, 0.8], [-0.1, 0.3], [0.3, 0.3]]);
drawPixel.readPixel('LINE_STRIP');
drawPixel.drawCircle([0.0, -0.4], 0.5, 40);
drawPixel.drawCircle([0.0, -0.4], 0.4, 10);
drawPixel.drawCircle([0.0, -0.4], 0.3, 5);
drawPixel.drawCircle([0.0, -0.4], 0.2, 3);