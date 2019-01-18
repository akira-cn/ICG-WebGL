attribute vec4 a_Position;
attribute vec4 a_Color;
attribute float a_Number;
uniform int u_PickedNumber;
uniform mat4 u_MvpMatrix;

varying vec4 v_Color;
void main()
{
  gl_Position = u_MvpMatrix * a_Position;
  int num = int(a_Number);
  vec3 color = (num == u_PickedNumber)?vec3(1.0):a_Color.rgb;
  if(u_PickedNumber == 0){
    v_Color = vec4(color, a_Number/255.0);
  }else{
  v_Color = vec4(color, a_Color.a);
  }
}