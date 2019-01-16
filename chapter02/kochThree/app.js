import * as THREE from 'three';
import {vec3} from 'gl-matrix';

const points = [];
const MAX_DEPTH = 4;

function divideLineSegment(a, b, depth = 0) {
  const c = vec3.lerp(vec3.create(), a, b, 1 / 3);
  const d = vec3.lerp(vec3.create(), a, b, 2 / 3);
  const e = vec3.rotateZ(vec3.create(), d, c, Math.PI / 3);
  if(depth < MAX_DEPTH) {
    depth++;
    divideLineSegment(a, c, depth);
    divideLineSegment(c, e, depth);
    divideLineSegment(e, d, depth);
    divideLineSegment(d, b, depth);
  } else {
    points.push(a, c, e, d, b);
  }
}

function divideTriangle(a, b, c) {
  divideLineSegment(a, b);
  divideLineSegment(b, c);
  divideLineSegment(c, a);
}

function init() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 2;
  camera.lookAt(new THREE.Vector3(0, 0, -1));
  const renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setClearColor(new THREE.Color(0xffffff));
  renderer.setSize(512, 512);

  const vertices = [
    vec3.fromValues(-0.5, -0.5, 0),
    vec3.fromValues(0, 0.5, 0),
    vec3.fromValues(0.5, -0.5, 0),
  ];

  divideTriangle(...vertices);

  const lines = new THREE.Geometry();
  points.forEach((e) => {
    lines.vertices.push(new THREE.Vector3(e[0], e[1], e[2]));
  });

  const material = new THREE.LineBasicMaterial({
    opacity: 1.0,
    linewidth: 1,
    color: 0xff0000,
  });

  const line = new THREE.Line(lines, material);

  scene.add(line);

  document.getElementById('gl-canvas').appendChild(renderer.domElement);

  renderer.render(scene, camera);
}
init();
