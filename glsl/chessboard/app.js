import GlRenderer from 'gl-renderer';
import shader from './shader.frag';

(async function () {
  const canvas = document.getElementById('gl-canvas');
  const renderer = new GlRenderer(canvas);

  const program = await renderer.compile(shader);
  renderer.useProgram(program);

  renderer.render();
}());
