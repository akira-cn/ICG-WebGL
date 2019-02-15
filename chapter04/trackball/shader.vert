attribute  vec4 vPosition;
attribute  vec4 vColor;
varying vec4 fColor;

uniform vec4 r;

// quaternion multiplier
vec4 multq(vec4 a, vec4 b) {
   return(vec4(a.x*b.x - dot(a.yzw, b.yzw), a.x*b.yzw+b.x*a.yzw+cross(b.yzw, a.yzw)));
}

// inverse quaternion
vec4 invq(vec4 a) {
   return(vec4(a.x, -a.yzw)/dot(a,a));
}

void main() {
  vec4 p;

  p = vec4(0.0, vPosition.xyz);  // input point quaternion
  p = multq(r, multq(p, invq(r))); // rotated point quaternion
  gl_Position = vec4( p.yzw, 1.0); // convert back to homogeneous coordinates
  fColor = vColor;
}