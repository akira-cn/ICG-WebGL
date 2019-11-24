import { pointsToBuffer } from "GLHelper";
import { vec2 } from "gl-matrix";


/**
 * @param {vec2} A
 * @param {vec2} B
 * @param {vec2} C
 * @param {number} recursionTime
 * @returns {vec2[]}
 */
export function generateSierpinskiTriangle(A, B, C, recursionTime) {
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




/**
 * 将顶点坐标传入着色器
 * @param {WebGLRenderingContext} gl
 * @param {WebGLProgram} program
 * @param {string} attribute
 * @param {vec2[]} vertices
 */
export function setProgramAttributeArray(gl, program, attribute, vertices) {

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
 * @param {{
 *   isClearBeforeDrawing: boolean
 *   target: WebGLFramebuffer
 *   source: WebGLTexture
 *   destination: WebGLTexture
 * }}
 * @param {WebGLFramebuffer} target
 * @param {WebGLTexture} source 
 * @param {WebGLTexture} destination 
 * @returns {WebGLTexture}
 */
export function drawImage(gl, vertices, { isClearBeforeDrawing, target, source, destination } = {}) {

  // 将当前屏幕渲染的上下文环境切到我们创建的帧缓冲区上
  // 这样之后绘制出的图像会被保存在当前绑定的帧缓冲区中
  // 用于离屏渲染（Off-screen rendering）， 也被称作后处理（Post-processing）
  gl.bindFramebuffer(gl.FRAMEBUFFER, target || null);

  if (source) {
    gl.bindTexture(gl.TEXTURE_2D, source);
  }
  
  if (destination) {

    // 将纹理作为颜色附件绑定到当前的帧缓冲区上
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, destination, 0);

    // 检查状态是否为完成
    const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    if (status != gl.FRAMEBUFFER_COMPLETE) {
      alert('Frame Buffer Not Complete!');
    }
  }

  isClearBeforeDrawing && gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, vertices.length);
}



/**
 * @param {WebGLRenderingContext} gl
 * @param {number} width
 * @param {number} height
 * @returns {WebGLFramebuffer}
 */
export function createFramebufferObject(gl, width, height) {
  // 分配一段 GPU 内存做为新的帧缓冲对象（FBO, Framebuffer Object）
  const fbo = gl.createFramebuffer();

  fbo.width = width;
  fbo.height = height;

  return fbo;
}



/**
 * @param {WebGLRenderingContext} gl
 * @param {number} textureNumber 
 * @returns {Generator<{ front: WebGLTexture, back: WebGLTexture }, void, void>}
 */
export function *createDoubleBuffer2D(gl, width, height) {
  const doubleBuffer = {
    back: null,
    front: null
  }

  const texture1 =  createTexture2D(gl, width, height, {
    needsGenerateMipmaps: true,
    minFilter: gl.NEAREST_MIPMAP_LINEAR,
    magFilter: gl.NEAREST
  });
  const texture2 = createTexture2D(gl, width, height, {
    minFilter: gl.NEAREST,
    magFilter: gl.NEAREST,
    wrapS: gl.CLAMP_TO_EDGE,
    wrapT: gl.CLAMP_TO_EDGE
  });

  // switch buffers
  while (true) {
    doubleBuffer.front = texture1;
    doubleBuffer.back = texture2;
    yield doubleBuffer;

    doubleBuffer.front = texture2;
    doubleBuffer.back = texture1;
    yield doubleBuffer;
  }
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
function createTexture2D(gl, width, height, { needsGenerateMipmaps, magFilter, minFilter, wrapS, wrapT } = {} ) {
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


