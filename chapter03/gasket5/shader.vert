attribute vec4 vPosition;

void main()
{
  gl_PointSize = 2.0;
  gl_Position = vPosition;
}
