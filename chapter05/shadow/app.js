import {createProgram, setupWebGL, pointsToBuffer} from 'GLHelper';
import {vec3, vec4, mat4} from 'gl-matrix';
import vertexShader from './shader.vert';
import fragmentShader from './shader.frag';

let gl;
let fColorLoc;
let modelViewMatrixLoc;
let projectionMatrixLoc;
let theta = 0.0;
let red, black;
let at, eye, up, light;
let shadowProjectionMatrix;

function init() {
    const canvas = document.getElementById('gl-canvas');
    const {width, height} = canvas;
    gl = setupWebGL(canvas);
    if(!gl) {
        console.error('WebGL isn\'t available');
    }
    gl.viewport(0, 0, width, height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    const program = createProgram(gl, vertexShader, fragmentShader);
    gl.useProgram(program);

    const pointsArray = [
        vec4(-0.5, 0.5, -0.5, 1.0),
        vec4(-0.5, 0.5, 0.5, 1.0),
        vec4(0.5, 0.5, 0.5, 1.0),
        vec4(0.5, 0.5, -0.5, 1.0),
    ];
    // Light related
    light = vec3(0.0, 2.0, 0.0);

    // Camera related
    at = vec3(0.0, 0.0, 0.0);
    up = vec3(0.0, 1.0, 0.0);
    eye = vec3(1.0, 1.0, 1.0);

    // Color related
    red = vec4(1.0, 0.0, 0.0, 1.0);
    black = vec4(0.0, 0.0, 0.0, 1.0);

    // Shadow projection matrix
    shadowProjectionMatrix = mat4(
        vec4(1, 0, 0, 0),
        vec4(0, 1, 0, -1 / light[1]),
        vec4(0, 0, 1, 0),
        vec4(0, 0, 0, 0),
    );

    console.log(shadowProjectionMatrix);
    
    // Init position buffer and push the data
    const vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, pointsToBuffer(pointsArray), gl.STATIC_DRAW);
    const vPosition = gl.getAttribLocation(program, 'vPosition');
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    // Init uniform color variable
    fColorLoc = gl.getUniformLocation(program, 'fColor');

    // Init transform matrix location
    modelViewMatrixLoc = gl.getUniformLocation(program, 'modelViewMatrix');
    projectionMatrixLoc = gl.getUniformLocation(program, 'projectionMatrix');

    // Generate transform matrix
    const projectionMatrix = mat4.ortho(-5.0, 5.0, -5, 5, 0.1, 10.0);
    gl.uniformMatrix4fv(projectionMatrixLoc, false, projectionMatrix);

    render();
}

function render() {
    theta += 0.1;
    if (theta > 2*Math.PI) {
        theta -= 2*Math.PI;
    }

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Create model view matrix
    let modelViewMatrix = mat4.create();
    mat4.lookAt(modelViewMatrix, eye, at, up);

    gl.uniformMatrix4fv(modelViewMatrixLoc, false, modelViewMatrix);
    gl.uniform4fv(fColorLoc, red);

    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

    // Rotate light
    light[0] = Math.sin(theta);
    light[2] = Math.cos(theta);

    // Create model view matrix for shadow
    let translateMatrix = mat4.create();
    let translateMatrixReverse = mat4.create();
    let shadowModelViewMatrix = mat4.create();

    mat4.translate(translateMatrix, mat4.create(), -1 * vec3(light));
    mat4.translate(translateMatrixReverse, mat4.create(), vec3(light));

    mat4.multiply(shadowModelViewMatrix, translateMatrix, shadowModelViewMatrix);
    mat4.multiply(shadowModelViewMatrix, shadowProjectionMatrix, shadowModelViewMatrix);
    mat4.multiply(shadowModelViewMatrix, translateMatrixReverse, shadowModelViewMatrix);
    mat4.multiply(shadowModelViewMatrix, modelViewMatrix, shadowModelViewMatrix);

    // Send shadow color and matrix
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, shadowModelViewMatrix);
    gl.uniform4fv(fColorLoc, black);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

    requestAnimationFrame(render);
}

init();