precision mediump float;
varying vec3 transformedNormals;
uniform samplerCube texMap;

void main() {
    vec4 texColor = textureCube(texMap, transformedNormals);
    gl_FragColor = texColor;
}
