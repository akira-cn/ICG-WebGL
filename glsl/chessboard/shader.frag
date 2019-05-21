#ifdef GL_ES
precision mediump float;
#endif

/**
 * Returns accurate MOD when arguments are approximate integers.
 */
int modI(float a,float b) {
    float m = a - floor(a / b) * b;
    return int(m);
}

void main() {
  float bcolor = 0.0;
  int a = modI(gl_FragCoord.x / 64.0, 2.0);
  int b = modI(gl_FragCoord.y / 64.0, 2.0);
  if(a + b != 0 && a * b == 0) {
    bcolor = 1.0;
  }
	gl_FragColor = vec4(bcolor, 0.0, 0.0, 1.0);
}
