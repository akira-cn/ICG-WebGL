/**
 * @see [chapter7_example_render3]{@link https://github.com/esangel/WebGL/blob/master/Chap7/render3.js}
 * @todo 添加一些可交互元素，如输入框设定模糊半径、播放暂停等等
 */

import { createProgram, setupWebGL, pointsToBuffer } from "GLHelper";
import { vec2 } from "gl-matrix";

import vertexShader from "./shader.vert";
import fragmentShader from "./shader.frag";
import blurPassVertexShader from "./blur.vert";
import blurPassFragmentShader from "./blur.frag";



/**
 * @param {vec2} A
 * @param {vec2} B
 * @param {vec2} C
 * @param {number} recursionTime
 * @returns {vec2[]}
 */
function generateSierpinskiTriangle(A, B, C, recursionTime) {
  return divideTriangle(A, B, C, recursionTime, []);
}

/**
 * @param {vec2} A
 * @param {vec2} B
 * @param {vec2} C
 * @param {number} count
 * @param {vec2[]} points
 * @returns {vec2}
 */
function divideTriangle(A, B, C, count, points) {
  if (count === 0) {
    points.push(A, B, C);
  } else {
    const midOfAB = vec2.lerp(A, B, 0.5);
    const midOfAC = vec2.lerp(A, C, 0.5);
    const midOfBC = vec2.lerp(B, C, 0.5);

    count--;

    divideTriangle(A, midOfAB, midOfAC, count, points);
    divideTriangle(C, midOfAC, midOfBC, count, points);
    divideTriangle(B, midOfBC, midOfAB, count, points);
  }

  return points
}



const TexCoord = [
  vec2(0, 0),
  vec2(0, 1),
  vec2(1, 1),

  vec2(1, 1),
  vec2(1, 0),
  vec2(0, 0)
];

const ScreenCoord = [
  vec2( -1, -1 ),
  vec2(  -1,  1 ),
  vec2(  1, 1 ),

  vec2( 1, 1 ),
  vec2(  1,  -1 ),
  vec2(  -1, -1 )
];



const InitialTriangleVertices = [
  vec2(-1, -1),
  vec2(0, 1),
  vec2(1, -1)
]
const RECURSION_NUM = 5;
const SierpinskiTriangleVertices = generateSierpinskiTriangle(...InitialTriangleVertices, RECURSION_NUM);

let CANVAS_WIDTH = 1024;
let CANVAS_HEIGHT = 1024;



main();



function main() {

  /** @type {HTMLCanvasElement} */
  const canvas = document.getElementById("gl-canvas");
  const gl = setupWebGL(canvas);

  // 加载着色器，初始化属性缓冲区
  const defaultProgram = createProgram(gl, vertexShader, fragmentShader);
  const blurPassProgram = createProgram(gl, blurPassVertexShader, blurPassFragmentShader);

  // drawSierpinskiTriangle(gl, SierpinskiTriangleVertices, defaultProgram);
  drawSierpinskiTriangleWithBlurPass(gl, SierpinskiTriangleVertices, defaultProgram, blurPassProgram);
}



/**
 * @param {WebGLRenderingContext} gl
 * @param {vec2[]} vertices
 * @param {WebGLProgram} program
 */
function drawSierpinskiTriangle(gl, vertices, program) {
  gl.useProgram(program);
  setProgramAttribute(gl, program, 'vPosition', vertices);
  drawOriginImage(gl, vertices);
}





/**
 * @param {WebGLRenderingContext} gl
 * @param {vec2[]} vertices
 * @param {WebGLProgram} program
 * @param {WebGLProgram} effect
 */
function drawSierpinskiTriangleWithBlurPass(gl, vertices, program, effect) {
  const colorBuffer = setTexture2D(gl, CANVAS_WIDTH, CANVAS_HEIGHT, {
    needsGenerateMipmaps: true,
    minFilter: gl.NEAREST_MIPMAP_LINEAR,
    magFilter: gl.NEAREST
  });

  const fbo = createFramebufferObject(gl, CANVAS_WIDTH, CANVAS_HEIGHT);

  // 将当前屏幕渲染的上下文环境切到我们创建的帧缓冲区上
  // 绑定帧缓冲区对象，将绘制出的图像保存在当前绑定的帧缓冲区中
  // 用于离屏渲染（Off-screen rendering）， 也被称作后处理（Post-processing）
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
 
  attachColorBufferToFramebuffer(gl, colorBuffer);

  gl.useProgram(program);
  setProgramAttribute(gl, program, 'vPosition', vertices);
  drawOriginImage(gl, vertices);



  // 解绑帧缓冲区上下文（即绑定到默认的屏幕帧缓冲器）
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);

  gl.useProgram(effect);
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, colorBuffer);

  setProgramAttribute(gl, effect, 'vPosition', ScreenCoord);
  setProgramAttribute(gl, effect, 'vTexCoord', TexCoord);
  gl.uniform1i(gl.getUniformLocation(effect, 'texture'), 0)


  const effectBuffer = setTexture2D(gl, CANVAS_WIDTH, CANVAS_HEIGHT, {
    magFilter: gl.NEAREST,
    minFilter: gl.NEAREST,
    wrapS: gl.CLAMP_TO_EDGE,
    wrapT: gl.CLAMP_TO_EDGE
  });

  createAnimation(gl, program, colorBuffer, effect, effectBuffer, fbo)();
}

/**
 * @param {WebGLRenderingContext} gl
 * @param {WebGLProgram} program 
 * @param {WebGLTexture} defaultTexture
 * @param {WebGLProgram} effect 
 * @param {WebGLTexture} effectTexture
 * @param {WebGLFramebuffer} fbo 
 */
function createAnimation(gl, program, defaultTexture, effect, effectTexture, fbo) {
  let flag = true
  let requestId = 0

  return function play() {
    let frontColorBuffer = flag ? effectTexture : defaultTexture
    let backColorBuffer = flag ? defaultTexture : effectTexture


    gl.useProgram(program);
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.bindTexture(gl.TEXTURE_2D, backColorBuffer);
    attachColorBufferToFramebuffer(gl, frontColorBuffer)

    gl.useProgram(effect);
    gl.drawArrays(gl.TRIANGLES, 0, ScreenCoord.length);

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.bindTexture(gl.TEXTURE_2D, frontColorBuffer);
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays(gl.TRIANGLES, 0, ScreenCoord.length);

    flag = !flag;

    requestId = requestAnimationFrame(play);
  }
}



/**
 * 将顶点坐标传入着色器
 * @param {WebGLRenderingContext} gl
 * @param {WebGLProgram} program
 * @param {string} attribute
 * @param {vec2[]} vertices
 */
function setProgramAttribute(gl, program, attribute, vertices) {

  // 创建顶点缓冲区对象
  const buffer = gl.createBuffer();
  gl.bindBuffer( gl.ARRAY_BUFFER, buffer);

  // 复制顶点数据到 GPU 顶点缓冲区
  gl.bufferData( gl.ARRAY_BUFFER, pointsToBuffer(vertices), gl.STATIC_DRAW );

  // 让应用获取 attribute 在 WebGLProgram 中的位置
  const attributeLocation = gl.getAttribLocation(program, attribute);

  // 将缓冲区对象分配给对应的 attribute 变量，这里都是二维的点
  gl.vertexAttribPointer(attributeLocation, 2, gl.FLOAT, false, 0, 0);

  // 开启 attribute 变量
  gl.enableVertexAttribArray(attributeLocation);
}



/**
 * @param {WebGLRenderingContext} gl
 * @param {vec2[]} vertices
 */
function drawOriginImage(gl, vertices) {

  // 设置屏幕坐标系数 x, y, w, h（用于视口转换，将标准化设备坐标转换成屏幕坐标）
  // 可以将传入的顶点 x0, y0 转换成 x1, y1
  // 其中：
  //     x1 = x + (x0 + 1) * w / 2
  //     y1 = y + (y0 + 1) * h / 2
  gl.viewport(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  gl.clearColor(1.0, 1.0, 1.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // 将图像绘制在当前绑定的帧缓冲区内
  gl.drawArrays(gl.TRIANGLES, 0, vertices.length);
}



/**
 * @param {WebGLRenderingContext} gl 
 * @param {width} number
 * @param {height} number
 * @param {{
 *   needsGenerateMipmaps?: boolean
 *   magFilter?: number
 *   minFilter?: number
 *   wrapS?: number
 *   wrapT?: number
 * }} options
 * @returns {WebGLTexture}
 */
function setTexture2D(gl, width, height, { needsGenerateMipmaps, magFilter, minFilter, wrapS, wrapT } = {} ) {
  const texture = gl.createTexture();

  // 将创建的纹理绑定为当前上下文中的二维纹理对象
  gl.bindTexture( gl.TEXTURE_2D, texture );

  // WebGL 纹理坐标系 y 轴垂直向上，图片（如 PNG, JPG等）坐标系 y 轴垂直向下，所以需要对纹理图像做 Y 坐标翻转
  gl.pixelStorei( gl.UNPACK_FLIP_Y_WEBGL, true );

  gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

  needsGenerateMipmaps && gl.generateMipmap(gl.TEXTURE_2D);

  // 设定纹理放大方法
  // gl.NEAREST
  magFilter && gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter );

  // 设定纹理缩小方法
  minFilter && gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter );

  // 设定纹理水平填充方法
  // gl.CLAMP_TO_EDGE
  wrapS && gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapS );

  // 设定纹理水平垂直方法
  wrapT && gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapT );

  return texture;
}



/**
 * @param {WebGLRenderingContext} gl
 * @param {number} width
 * @param {number} height
 * @returns {WebGLFramebuffer}
 */
function createFramebufferObject(gl, width, height) {
  // 分配一段 GPU 内存做为新的帧缓冲对象（FBO, Framebuffer Object）
  const fbo = gl.createFramebuffer();

  fbo.width = width;
  fbo.height = height;

  return fbo;
}



/**
 * @param {WebGLRenderingContext} gl
 * @param {WebGLTexture} texture
 */
function attachColorBufferToFramebuffer(gl, texture) {

  // 将纹理作为颜色附件绑定到当前的帧缓冲区上
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

  // 检查状态是否为完成
  const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
  if (status != gl.FRAMEBUFFER_COMPLETE) {
    alert('Frame Buffer Not Complete!');
  }
}
