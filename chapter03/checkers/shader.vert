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

  if(u_PickedNumber == 0){
    v_Color = vec4(a_Color.rgb, a_Number/255.0);
  }else{
  v_Color = a_Color;
  }
}