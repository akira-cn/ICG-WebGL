import {createProgram, setupWebGL, pointsToBuffer} from 'GLHelper';
import {vec3} from 'gl-matrix';

import vertexShader from './shader.vert';
import fragmentShader from './shader.frag';

let gl;

const points = [];
const colors = [];

const GREEN1 = [0.1, 0.5, 0.1, 1.0];
const GREEN2 = [0.2, 0.6, 0.2, 1.0];
const GREEN3 = [0.1, 0.6, 0.1, 1.0];
const BROWN = [0.8, 0.6, 0.3, 1.0];

const numTimesToSubdivide = 5;

function perturb(value, range = 0.2) {
  return value * (1 + 2 * range * (Math.random() - 0.5));
}
function triangle(a, b, c, color) {
  colors.push(color, color, color);
  points.push(a, b, c);
}

function tetra(a, b, c, d) {
  // tetrahedron with each side using
  // a different color
  triangle(a, c, b, GREEN1);
  triangle(a, c, d, GREEN2);
  triangle(a, b, d, GREEN3);
  // triangle(b, c, d, BLACK);
}

function divideTetra(a, b, c, d, count = numTimesToSubdivide) {
  if(count <= 0) {
    tetra(a, b, c, d);
  } else {
    const ab = vec3.lerp(vec3.create(), a, b, perturb(0.5));
    const ac = vec3.lerp(vec3.create(), a, c, perturb(0.5));
    const ad = vec3.lerp(vec3.create(), a, d, perturb(0.5));
    const bc = vec3.lerp(vec3.create(), b, c, perturb(0.5));
    const bd = vec3.lerp(vec3.create(), b, d, perturb(0.5));
    const cd = vec3.lerp(vec3.create(), c, d, perturb(0.5));

    --count;

    divideTetra(a, ab, ac, ad, count);
    divideTetra(ab, b, bc, bd, count);
    divideTetra(ac, bc, c, cd, count);
    divideTetra(ad, bd, cd, d, count);
  }
}

function init() {
  const canvas = document.getElementById('gl-canvas');
  gl = setupWebGL(canvas);

  if(!gl) {
    console.error("WebGL isn't available");
  }

  const vertices = [
    vec3.fromValues(0.0, 0.0, -1.0),
    vec3.fromValues(0.0, 1, 0.3333),
    vec3.fromValues(-1, -1, 0.3333),
    vec3.fromValues(1, -1, 0.3333),
  ];

  triangle(vertices[1], vertices[2], vertices[3], BROWN);
  divideTetra(...vertices);

  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1.0, 1.0, 1.0, 1.0);

  const program = createProgram(gl, vertexShader, fragmentShader);
  gl.useProgram(program);

  gl.enable(gl.DEPTH_TEST);

  const cBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, pointsToBuffer(colors), gl.STATIC_DRAW);

  const vColor = gl.getAttribLocation(program, 'vColor');
  gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vColor);

  const vBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, pointsToBuffer(points), gl.STATIC_DRAW);
  // Associate out shader variables with our data buffer

  const vPosition = gl.getAttribLocation(program, 'vPosition');
  gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);

  render();
}

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, points.length);
}

init();
