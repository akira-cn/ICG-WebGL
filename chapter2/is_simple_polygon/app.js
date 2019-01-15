import {createProgram, setupWebGL, parseColor} from 'GLHelper';
import {vec2, vec3} from 'gl-matrix';

import vertexShader from './shader.vert';
import fragmentShader from './shader.frag';

let gl;

const hintEl = document.getElementById('hint');
const clearBtn = document.getElementById('clear');

const maxNumVerticles = 4000;

let colorLoc;
let isSimple = true;

const points = [];

function checkSimple(newPoint) {
  const len = points.length;
  if(isSimple && len >= 3) {
    const lastPoint = points[len - 1];
    const firstPoint = points[0];

    // 判定新增的顶点的两条边和多边形其他边是否相交
    // 相交判断使用二维向量叉乘的符号来判断即可
    // 可进一步优化点：可预先缓存多边形的各条边
    for(let i = 1; i < len; i++) {
      const p1 = points[i - 1],
        p2 = points[i];

      const v0 = vec2.subtract(vec2.create(), p2, p1);
      const v1 = vec2.subtract(vec2.create(), newPoint, p1);
      const z1 = vec2.cross(vec3.create(), v0, v1)[2];

      if(p2 !== lastPoint) {
        const v2 = vec2.subtract(vec2.create(), lastPoint, p1);
        const z2 = vec2.cross(vec3.create(), v0, v2)[2];

        if(z1 * z2 < 0) {
          isSimple = false;
          return;
        }
      }

      if(p1 !== firstPoint) {
        const v2 = vec2.subtract(vec2.create(), firstPoint, p1);
        const z2 = vec2.cross(vec3.create(), v0, v2)[2];

        if(z1 * z2 < 0) {
          isSimple = false;
          return;
        }
      }
    }
  }
}

function addVertex(vBuffer, ox, oy, w, h) {
  const x = -1 + 2 * ox / w;
  const y = -1 + 2 * (h - oy) / h;

  const vertex = vec2.fromValues(x, y);

  const idx = points.length;

  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.bufferSubData(gl.ARRAY_BUFFER, 8 * idx, vertex);

  checkSimple(vertex);

  points.push(vertex);
}

function init() {
  const canvas = document.getElementById('gl-canvas');
  const {width, height} = canvas;

  gl = setupWebGL(canvas);

  if(!gl) {
    console.error('WebGL isn\'t available');
  }

  //
  //  Configure WebGL
  //
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1.0, 1.0, 1.0, 1.0);

  //  Load shaders and initialize attribute buffers

  const program = createProgram(gl, vertexShader, fragmentShader);
  gl.useProgram(program);

  // Load the data into the GPU

  const vBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, 8 * maxNumVerticles, gl.STATIC_DRAW);

  const vPosition = gl.getAttribLocation(program, 'vPosition');
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);

  canvas.addEventListener('mousedown', (event) => {
    const {offsetX: x, offsetY: y} = event;
    hintEl.className = 'show';
    hintEl.style.top = `${event.clientY}px`;
    hintEl.style.left = `${event.clientX}px`;
    addVertex(vBuffer, x, y, width, height);
  });

  clearBtn.addEventListener('click', () => {
    hintEl.className = '';
    isSimple = true;
    points.length = 0;
  });

  colorLoc = gl.getUniformLocation(program, 'color');

  render();
}

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.uniform4fv(colorLoc, parseColor(isSimple ? '#0000ff' : '#ff0000'));
  if(points.length) {
    gl.drawArrays(gl.LINE_LOOP, 0, points.length);
  }
  requestAnimationFrame(render);
}

init();