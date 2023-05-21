attribute vec4 vPosition;
attribute vec4 vNormals;
varying vec3 transformedNormals;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform vec4 eyePosition;

void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vPosition;
    vec3 modelViewedNormals = (modelViewMatrix * vNormals).xyz;
    transformedNormals = reflect(eyePosition.xyz, modelViewedNormals);
}