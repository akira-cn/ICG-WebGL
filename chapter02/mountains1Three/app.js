import * as THREE from 'three';
import {vec3} from 'gl-matrix';

const points = [];
const colors = [];
const indices = [];
let counter = 0;
const GREEN1 = [0.1, 0.5, 0.1];
const GREEN2 = [0.2, 0.6, 0.2];
const GREEN3 = [0.1, 0.6, 0.1];
const BROWN = [0.8, 0.6, 0.3];

const numTimesToSubdivide = 5;

function perturb(value, range = 0.2) {
  return value * (1 + 2 * range * (Math.random() - 0.5));
}

function triangle(a, b, c, color) {
  colors.push(...color, ...color, ...color);
  points.push(...a, ...b, ...c);
  indices.push(counter, counter + 1, counter + 2);
  counter += 3;
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
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 3;
  camera.lookAt(new THREE.Vector3(0, 0, -1));
  const renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setClearColor(new THREE.Color(0xffffff));
  renderer.setSize(512, 512);
  const vertices = [
    vec3.fromValues(0.0, 0.0, 1.0),
    vec3.fromValues(0.0, 1.0, 0.3333),
    vec3.fromValues(-1.0, -1.0, 0.3333),
    vec3.fromValues(1.0, -1.0, 0.3333),
  ];

  triangle(vertices[1], vertices[2], vertices[3], BROWN);
  divideTetra(...vertices);

  const geometry = new THREE.BufferGeometry();
  geometry.setIndex(indices);
  geometry.addAttribute(
    'position',
    new THREE.Float32BufferAttribute(points, 3)
  );
  geometry.addAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

  const material = new THREE.MeshBasicMaterial({
    vertexColors: THREE.VertexColors,
    side: THREE.DoubleSide,
  });

  const mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);

  document.getElementById('gl-canvas').appendChild(renderer.domElement);

  renderer.render(scene, camera);
}

init();
