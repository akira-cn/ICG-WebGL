import GlRenderer from 'gl-renderer';

const d = 'M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2 c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z';

(async function () {
  const canvas = document.getElementById('gl-canvas');
  const renderer = new GlRenderer(canvas);

  const parse = require('parse-svg-path');
  const simplify = require('simplify-path');
  const contours = require('svg-path-contours');
  // const getBounds = require('bound-points');
  const normalize = require('normalize-path-scale');

  const lines = contours(parse(d)).map((path) => {
    return simplify(path, 0);
  });

  const stroke = require('extrude-polyline')({
    thickness: 5,
    cap: 'butt',
    join: 'miter',
    miterLimit: 50,
  });

  const mesh = stroke.build(lines[0]);
  mesh.positions = mesh.positions.map((p) => {
    p[1] *= -1;
    p.push(0);
    return p;
  });

  normalize(mesh.positions, [[-128, -128], [128, 128]]);
  // const mesh = svgMesh3d(d);
  console.log(mesh);

  const program = await renderer.load('./shader.frag');
  renderer.useProgram(program);

  renderer.setMeshData(mesh);

  renderer.render();
}());