import { vec2 } from "gl-matrix";

export const texVertices = [
  vec2(0, 0),
  vec2(0, 1),
  vec2(1, 1),

  vec2(1, 1),
  vec2(1, 0),
  vec2(0, 0)
];

export const screenVertices = [
  vec2( -1, -1 ),
  vec2(  -1,  1 ),
  vec2(  1, 1 ),

  vec2( 1, 1 ),
  vec2(  1,  -1 ),
  vec2(  -1, -1 )
];


export const initialTriangleVertices = [
  vec2(-1, -1),
  vec2(0, 1),
  vec2(1, -1)
];