import * as THREE from 'three';
import {MeshLine, MeshLineMaterial} from 'three.meshline';

// once everything is loaded, we run our Three.js stuff.
function init() {
  // create a scene, that will hold all our elements such as objects, cameras and lights.
  const scene = new THREE.Scene();

  // create a camera, which defines where we're looking at.

  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 100;
  camera.target = new THREE.Vector3();

  // create a render and set the size
  const renderer = new THREE.WebGLRenderer({alpha: true});
  // renderer.setClearColorHex();
  renderer.setClearColor(0x000000, 0);
  renderer.setSize(window.innerWidth, window.innerHeight);

  const curve = new THREE.CubicBezierCurve(
    new THREE.Vector2(-10, 0),
    new THREE.Vector2(-5, 15),
    new THREE.Vector2(20, 15),
    new THREE.Vector2(10, 0)
  );

  const points = curve.getPoints(50).map(({x, y}) => new THREE.Vector3(x, y, 0));
  const geometry = new THREE.Geometry().setFromPoints(points);

  const line = new MeshLine();
  line.setGeometry(geometry);

  const material = new MeshLineMaterial({
    color: 0xff00ff,
    lineWidth: 10,
  });

  // Create the final object to add to the scene
  const curveObject = new THREE.Mesh(line.geometry, material);
  scene.add(curveObject);

  // create a cube
  const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
  const cubeMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

  // position the cube
  cube.position.x = -4;
  cube.position.y = 3;
  cube.position.z = 0;

  // add the cube to the scene
  scene.add(cube);

  // create a sphere
  const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
  const sphereMaterial = new THREE.MeshBasicMaterial({color: 0x7777ff, wireframe: true});
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

  // position the sphere
  sphere.position.x = 20;
  sphere.position.y = 4;
  sphere.position.z = 2;

  // add the sphere to the scene
  scene.add(sphere);

  // add the output of the renderer to the html element
  document.getElementById('WebGL-output').appendChild(renderer.domElement);

  // render the scene
  renderer.render(scene, camera);
}
window.onload = init;
window.THREE = THREE;