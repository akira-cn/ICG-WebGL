precision mediump float;

varying vec2 fTexCoord;

uniform sampler2D texture;

void main()
{
  float s = 4.0;
  float d = 1.0 / 1024.0;
  float x = fTexCoord.x;
  float y = fTexCoord.y;

  vec4 convCore = ( texture2D( texture, vec2( x + d, y))
                   + texture2D( texture, vec2( x, y + d))
                   + texture2D( texture, vec2( x - d, y))
                   + texture2D( texture, vec2( x, y - d)) ) / s;

  gl_FragColor = convCore;
}
