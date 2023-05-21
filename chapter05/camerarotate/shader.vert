attribute vec4 vPosition;
attribute vec4 vColor;
varying vec4 fColor;
uniform mat4 r;

void main()
{
    gl_Position = r * vPosition;
    fColor = vColor;
}