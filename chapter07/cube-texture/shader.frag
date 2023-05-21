precision mediump float;
varying vec2 fTexCoord;
varying vec4 fColor;
uniform int isAddedTexMap;
uniform sampler2D texMap;
uniform sampler2D addedTexMap;

void main() {
    if (isAddedTexMap == 0) {
        gl_FragColor = fColor * texture2D(texMap, fTexCoord);
    } else {
        gl_FragColor = fColor * texture2D(texMap, fTexCoord) * texture2D(addedTexMap, fTexCoord);
    }
}
