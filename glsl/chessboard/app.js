import GlslCanvas from 'glslCanvas';
import shader from './shader.frag';

const canvas = document.getElementById('gl-canvas');
const sandbox = new GlslCanvas(canvas);

sandbox.load(shader);