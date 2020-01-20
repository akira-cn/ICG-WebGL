/**
 * @see [chapter7_example_render3]{@link https://github.com/esangel/WebGL/blob/master/Chap7/render3.js}
 */

import { createProgram, setupWebGL } from "GLHelper";

import vertexShader from "./shader.vert";
import fragmentShader from "./shader.frag";
import blurPassVertexShader from "./blur.vert";
import blurPassFragmentShader from "./blur.frag";

import { texVertices, screenVertices, initialTriangleVertices } from "./data";
import { generateSierpinskiTriangle, createDoubleBuffer2D, createFramebufferObject, drawImage, setProgramAttributeArray } from "./lib";



/** @type {HTMLCanvasElement} */
const canvas = document.querySelector('#gl-canvas');
const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;

const gl = setupWebGL(canvas);
const defaultProgram = createProgram(gl, vertexShader, fragmentShader);
const blurPassProgram = createProgram(gl, blurPassVertexShader, blurPassFragmentShader);

// 设置屏幕坐标系数 x, y, w, h（用于视口转换，将标准化设备坐标转换成屏幕坐标）
// 可以将传入的顶点 x0, y0 转换成 x1, y1
// 其中：
//     x1 = x + (x0 + 1) * w / 2
//     y1 = y + (y0 + 1) * h / 2
gl.viewport(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
gl.clearColor(1.0, 1.0, 1.0, 1.0);



// 一些设置项
/** @type {HTMLInputElement} */
const inputDivideTime = document.querySelector('#divide');
/** @type {HTMLInputElement} */
const inputBlurDistance = document.querySelector('#distance');
/** @type {HTMLButtonElement} */
const btnOnce = document.querySelector('#once');
/** @type {HTMLButtonElement} */
const btnPlay = document.querySelector('#play');
/** @type {HTMLButtonElement} */
const btnReset = document.querySelector('#reset');



/**
 * @typedef animeFunctions 
 * @property {() => void} once
 * @property {() => void} play
 * @property {() => void} pause
 * @property {() => void} reset
 * @property {() => boolean} isPlaying
 * @property {() => void} setBlurDistance
 * 
 * @param {WebGLRenderingContext} gl
 * @param {WebGLProgram} program
 * @param {WebGLProgram} effect
 * @returns {animeFunctions}
 */
function createAnimation(gl, program, effect) {
  let requestId = 0;

  const fbo = createFramebufferObject(gl, CANVAS_WIDTH, CANVAS_HEIGHT);
  const doubleBuffer = createDoubleBuffer2D(gl, CANVAS_WIDTH, CANVAS_HEIGHT);

  return {
    isPlaying() {
      return !!requestId;
    },

    setBlurDistance(blurDistance) {
      gl.useProgram(effect);
      setProgramAttributeArray(gl, effect, 'vPosition', screenVertices);
      setProgramAttributeArray(gl, effect, 'vTexCoord', texVertices);
      gl.activeTexture(gl.TEXTURE0);
      gl.uniform1i(gl.getUniformLocation(effect, 'texture'), 0);
      gl.uniform1f(gl.getUniformLocation(effect, 'blurDistance'), blurDistance);
    },

    once() {
      const { value: { front, back } } = doubleBuffer.next();

      drawImage(gl, screenVertices, {
        target: fbo,
        source: back,
        destination: front
      });

      drawImage(gl, screenVertices, {
        isClearBeforeDrawing: true,
        source: front
      });
    },

    play() {
      if (this.isPlaying()) {
        return;
      }
      
      const animeFrame = () => {
        this.once();
        requestId = requestAnimationFrame(animeFrame)
      }

      animeFrame();
    }, 

    pause() {
      this.isPlaying() && cancelAnimationFrame(requestId);
      requestId = 0;
    },

    reset(recursionTime, blurDistance) {
      this.pause();

      let sierpinskiTriangleVertices = generateSierpinskiTriangle(...initialTriangleVertices, recursionTime);

      gl.useProgram(program);
      setProgramAttributeArray(gl, program, 'vPosition', sierpinskiTriangleVertices);

      // 在屏幕上先画出原图
      drawImage(gl, sierpinskiTriangleVertices, {
        isClearBeforeDrawing: true
      });

      // 同时将原图保存在一个纹理图像中，为之后的模糊准备原图
      let { value: { front } } = doubleBuffer.next();
      drawImage(gl, sierpinskiTriangleVertices, {
        isClearBeforeDrawing: true,
        target: fbo,
        destination: front
      });

      this.setBlurDistance(blurDistance);
    }
  }
}


const safeRangeOfNumber = (min, max) => (x) => Math.max(Math.min(isNaN(x) ? 1 : x, max), min)
const getSafeBlurDistance = (x) => safeRangeOfNumber(-Infinity, Infinity)(x);
const getSafeRecursionTime = (x) => safeRangeOfNumber(0, 13)(x);


/** @description add interactive elements */
const anime = createAnimation(gl, defaultProgram, blurPassProgram);
let blurDistance = getSafeBlurDistance(inputBlurDistance.valueAsNumber);
let recursionTime = getSafeRecursionTime(inputDivideTime.valueAsNumber);
anime.reset(recursionTime, blurDistance);


inputBlurDistance.onchange = function (event) {
  blurDistance = getSafeBlurDistance(event.target.valueAsNumber);
  anime.setBlurDistance(blurDistance);
}

inputDivideTime.onchange = function (event) {
  recursionTime = getSafeRecursionTime(event.target.valueAsNumber);
}


btnReset.onclick = function () {
  anime.reset(recursionTime, blurDistance);
}

btnOnce.onclick = function () {
  anime.once();
}

btnPlay.onclick = function () {
  anime.isPlaying() ? anime.pause() : anime.play();
}

