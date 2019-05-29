attribute vec4 vPosition;
attribute vec4 vColor;
varying vec4 fColor;
uniform vec3 theta;
uniform mat4 modelViewMatrix;
void main(){
  fColor = vColor;
  gl_Position = modelViewMatrix * vPosition;
}