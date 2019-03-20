attribute vec4 vPosition;

void main()
{
  gl_Position = vec4(0.95 * vPosition.x, 0.95 * vPosition.y, vPosition.z, vPosition.w);
}
