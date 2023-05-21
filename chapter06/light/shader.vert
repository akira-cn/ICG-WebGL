attribute vec4 vPosition;
attribute vec4 vNormal;
varying vec4 fColor;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform vec4 lightPosition;
uniform vec4 ambientProduct;
uniform vec4 specularProduct;
uniform vec4 diffuseProduct;
uniform float shiness;

void main() {
    vec3 pos = (modelViewMatrix * vPosition).xyz;
    vec3 light = (modelViewMatrix * lightPosition).xyz;
    float distanceSquare = dot(light - pos, light - pos);

    vec3 L = normalize(light - pos);
    vec3 E = -pos;
    vec3 H = normalize(L + E);
    vec3 N = normalize(modelViewMatrix * vNormal).xyz;
    
    // Ambient light
    vec4 ambient = ambientProduct;

    // Diffusion light
    vec4 diffuse = max(dot(L, N), 0.0) * diffuseProduct;

    // Speculation light
    vec4 specular = pow(max(dot(N, H), 0.0), shiness) * specularProduct;

    fColor = ambient + (diffuse + specular) / distanceSquare;
    gl_Position = projectionMatrix * modelViewMatrix * vPosition;
}
