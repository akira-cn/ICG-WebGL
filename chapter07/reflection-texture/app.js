import {createProgram, setupWebGL, pointsToBuffer} from 'GLHelper';
import {vec2, vec4, mat4} from 'gl-matrix';
import vertexShader from './shader.vert';
import fragmentShader from './shader.frag';

function createTexture(gl) {
    const red = new Uint8Array([255, 0, 0, 255]);
    const green = new Uint8Array([0, 255, 0, 255]);
    const blue = new Uint8Array([0, 0, 255, 255]);
    const cyan = new Uint8Array([0, 255, 255, 255]);
    const magenta = new Uint8Array([255, 0, 255, 255]);
    const yellow = new Uint8Array([255, 255, 0, 255]);

    gl.activeTexture(gl.TEXTURE0);
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
    gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, red);
    gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, green);
    gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, blue);
    gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, cyan);
    gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, magenta);
    gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, yellow);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
}


function init() {
    // Init 
    const canvas = document.getElementById('gl-canvas');
    const {width, height} = canvas;
    const gl = setupWebGL(canvas);
    if(!gl) {
        console.error('WebGL isn\'t available');
    }
    gl.viewport(0, 0, width, height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    const program = createProgram(gl, vertexShader, fragmentShader);
    gl.useProgram(program);

    // Cube related constant
    // 立方体点位置
    //    v0----- v3
    //   /|      /|
    //  v1------v2|
    //  | |     | |
    //  | |v4---|-|v7
    //  |/      |/
    //  v5------v6
    // 顺序为前后左右上下

    const vertices = [
        // v0-v1-v2-v3-up
        vec4(-0.5, 0.5, -0.5, 1),
        vec4(-0.5, 0.5, 0.5, 1),
        vec4(0.5, 0.5, 0.5, 1),
        vec4(0.5, 0.5, -0.5, 1),
        // v0-v4-v5-v1-left
        vec4(-0.5, 0.5, -0.5, 1),
        vec4(-0.5, -0.5, -0.5, 1),
        vec4(-0.5, -0.5, 0.5, 1),
        vec4(-0.5, 0.5, 0.5, 1),
        // v1-v5-v6-v2-front
        vec4(-0.5, 0.5, 0.5, 1),
        vec4(-0.5, -0.5, 0.5, 1),
        vec4(0.5, -0.5, 0.5, 1),
        vec4(0.5, 0.5, 0.5, 1),
        // v2-v6-v7-v3-right
        vec4(0.5, 0.5, 0.5, 1),
        vec4(0.5, -0.5, 0.5, 1),
        vec4(0.5, -0.5, -0.5, 1),
        vec4(0.5, 0.5, -0.5, 1),
        // v3-v7-v4-v0-back
        vec4(0.5, 0.5, -0.5, 1),
        vec4(0.5, -0.5, -0.5, 1),
        vec4(-0.5, -0.5, -0.5, 1),
        vec4(-0.5, 0.5, -0.5, 1),
        // v4-v7-v6-v5-bottom
        vec4(-0.5, -0.5, -0.5, 1),
        vec4(0.5, -0.5, -0.5, 1),
        vec4(0.5, -0.5, 0.5, 1),
        vec4(-0.5, -0.5, 0.5, 1),
    ];

    const normals = [
        // up
        vec4(0, 1, 0, 0),
        vec4(0, 1, 0, 0),
        vec4(0, 1, 0, 0),
        vec4(0, 1, 0, 0),
        // left
        vec4(-1, 0, 0, 0),
        vec4(-1, 0, 0, 0),
        vec4(-1, 0, 0, 0),
        vec4(-1, 0, 0, 0),
        // font
        vec4(0, 0, 1, 0),
        vec4(0, 0, 1, 0),
        vec4(0, 0, 1, 0),
        vec4(0, 0, 1, 0),
        // right
        vec4(1, 0, 0, 0),
        vec4(1, 0, 0, 0),
        vec4(1, 0, 0, 0),
        vec4(1, 0, 0, 0),
        // back
        vec4(-1, 0, 0, 0),
        vec4(-1, 0, 0, 0),
        vec4(-1, 0, 0, 0),
        vec4(-1, 0, 0, 0),
        // bottom
        vec4(0, -1, 0, 0),
        vec4(0, -1, 0, 0),
        vec4(0, -1, 0, 0),
        vec4(0, -1, 0, 0),
    ];

    // Create indexs
    const indexs = [
        // up
        0, 1, 2,
        0, 2, 3,
        // left
        4, 5, 6,
        4, 6, 7,
        // font
        8, 9, 10,
        8, 10, 11,
        // right
        12, 13, 14,
        12, 14, 15,
        // back
        16, 17, 18,
        16, 18, 19,
        // bottom
        20, 21, 22,
        20, 22, 23,
    ];

    // Camera related constant
    let eye = vec4(0, 0, 2, 1);
    const up = vec4(0, 1, 0, 0);
    const at = vec4(0, 0, 0, 1);

    // Load vertcies to buffer
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, pointsToBuffer(vertices), gl.STATIC_DRAW);
    const vPosition = gl.getAttribLocation(program, 'vPosition');
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    // Load normals to buffer
    const normalsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, pointsToBuffer(normals), gl.STATIC_DRAW);
    const vNormals = gl.getAttribLocation(program, 'vNormals');
    gl.vertexAttribPointer(vNormals, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vNormals);
        
    // Load element index
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indexs), gl.STATIC_DRAW);

    // Load model view matrix
    let modelViewMatrix = mat4.create();
    mat4.lookAt(modelViewMatrix, eye, at, up);
    const modelViewMatrixLoc = gl.getUniformLocation(program, 'modelViewMatrix');
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, modelViewMatrix);

    // Load proejection matrix
    let projectionMatrix = mat4.create();
    mat4.ortho(projectionMatrix, -5.0, 5.0, -5.0, 5.0, 0.5, 10);
    const projectionMatrixLoc = gl.getUniformLocation(program, 'projectionMatrix');
    gl.uniformMatrix4fv(projectionMatrixLoc, false, projectionMatrix);

    // Load eye position
    gl.uniform4fv(gl.getUniformLocation(program, 'eyePosition'), eye);
    
    // Create texture
    gl.activeTexture(gl.TEXTURE0);
    createTexture(gl);
    gl.uniform1i(gl.getUniformLocation(program, 'texMap'), 0);

    // Render function
    let theta = 0.0;
    const render = () => {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.drawElements(gl.TRIANGLES, indexs.length, gl.UNSIGNED_BYTE, 0);
        requestAnimationFrame(render);

        // Update theta and model view Matrix
        theta += 0.01;
        if (theta > 2 * Math.PI) {
            theta -= 2 * Math.PI;
        }

        eye = mat4(
            2 * Math.cos(theta) * Math.sin(theta),
            2 * Math.sin(theta),
            2 * Math.cos(theta) * Math.cos(theta),
            1,
        );
        mat4.lookAt(modelViewMatrix, eye, at, up);
        gl.uniformMatrix4fv(modelViewMatrixLoc, false, modelViewMatrix);
        gl.uniform4fv(gl.getUniformLocation(program, 'eyePosition'), eye);
    }

    render();
}

init();