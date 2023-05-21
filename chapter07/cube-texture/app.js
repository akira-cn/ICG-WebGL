import {createProgram, setupWebGL, pointsToBuffer} from 'GLHelper';
import {vec2, vec4, mat4} from 'gl-matrix';
import vertexShader from './shader.vert';
import fragmentShader from './shader.frag';

function createTexture(gl) {
    const texSize = 64;
    const numRows = 8;
    const numCols = 8;

    const myTexels = new Uint8Array(4 * texSize * texSize);
    for (let i = 0; i < texSize; i++) {
        for (let j = 0; j < texSize; j++) {
            const patchX = Math.floor(i / (texSize / numRows));
            const patchY = Math.floor(j / (texSize / numCols));
            const c = (patchX % 2 !== patchY % 2) ? 255 : 0;
            myTexels[4 * i * texSize + 4 * j] = c;
            myTexels[4 * i * texSize + 4 * j + 1] = c;
            myTexels[4 * i * texSize + 4 * j + 2] = c;
            myTexels[4 * i * texSize + 4 * j + 3] = 255;
        }
    }
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, texSize, texSize, 0, gl.RGBA, gl.UNSIGNED_BYTE, myTexels);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
}

function createAdditionTexture(gl) {
    const texSize = 64;

    const myTexels = new Uint8Array(4 * texSize * texSize);
    for (let i = 0; i < texSize; i++) {
        for (let j = 0; j < texSize; j++) {
            const c = 127 + 127 * Math.sin(0.1 * i + j);
            myTexels[4 * i * texSize + 4 * j] = c;
            myTexels[4 * i * texSize + 4 * j + 1] = c;
            myTexels[4 * i * texSize + 4 * j + 2] = c;
            myTexels[4 * i * texSize + 4 * j + 3] = 255;
        }
    }
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, texSize, texSize, 0, gl.RGBA, gl.UNSIGNED_BYTE, myTexels);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
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
    
    const colors = [
        // 黄色-up
        vec4(1, 1, 0, 0.8),
        vec4(1, 1, 0, 0.8),
        vec4(1, 1, 0, 0.8),
        vec4(1, 1, 0, 0.8),
        // 绿色-left
        vec4(0, 1, 0, 0.8),
        vec4(0, 1, 0, 0.8),
        vec4(0, 1, 0, 0.8),
        vec4(0, 1, 0, 0.8),
        // 蓝色-front
        vec4(0, 0, 1, 0.8),
        vec4(0, 0, 1, 0.8),
        vec4(0, 0, 1, 0.8),
        vec4(0, 0, 1, 0.8),
        // 紫色-right
        vec4(1, 0, 1, 0.8),
        vec4(1, 0, 1, 0.8),
        vec4(1, 0, 1, 0.8),
        vec4(1, 0, 1, 0.8),
        // 青色-back
        vec4(0, 1, 1, 0.8),
        vec4(0, 1, 1, 0.8),
        vec4(0, 1, 1, 0.8),
        vec4(0, 1, 1, 0.8),
        // unknown-bottom
        vec4(0.5, 0.5, 0.5, 0.8),
        vec4(0.5, 0.5, 0.5, 0.8),
        vec4(0.5, 0.5, 0.5, 0.8),
        vec4(0.5, 0.5, 0.5, 0.8),
    ];

    // Create texures
    const texCord = [
        vec2(0.0, 0.0),
        vec2(0.0, 1.0),
        vec2(1.0, 1.0),
        vec2(1.0, 0.0),
    ];

    let textures = [];
    new Array(6).fill(0).forEach(() => {
        textures = [...texCord, ...textures];
    });

    console.log(textures);

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

    // Texture toogle
    let isShowAdditionTexture = 0;

    // Load vertcies to buffer
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, pointsToBuffer(vertices), gl.STATIC_DRAW);
    const vPosition = gl.getAttribLocation(program, 'vPosition');
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    // Load colors to buffer
    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    console.log(pointsToBuffer(colors));
    gl.bufferData(gl.ARRAY_BUFFER, pointsToBuffer(colors), gl.STATIC_DRAW);
    const vColor = gl.getAttribLocation(program, 'vColor');
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    // Load element index
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indexs), gl.STATIC_DRAW);

    // Load textures
    const textureBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
    console.log(pointsToBuffer(textures));
    gl.bufferData(gl.ARRAY_BUFFER, pointsToBuffer(textures), gl.STATIC_DRAW);
    const vTexCoord = gl.getAttribLocation(program, 'vTexCoord');
    gl.vertexAttribPointer(vTexCoord, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vTexCoord);

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

    // Create texture
    gl.activeTexture(gl.TEXTURE0);
    createTexture(gl);
    gl.uniform1i(gl.getUniformLocation(program, 'texMap'), 0);

    gl.activeTexture(gl.TEXTURE1);
    createAdditionTexture(gl);
    gl.uniform1i(gl.getUniformLocation(program, 'addedTexMap'), 1);

    // Add event listener
    const button = document.getElementById('textureButton');
    if (button) {
        button.addEventListener('click', () => {
            isShowAdditionTexture = !isShowAdditionTexture ? 1 : 0;
            gl.uniform1i(gl.getUniformLocation(program, 'isAddedTexMap'), isShowAdditionTexture);
        })
    }

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
    }

    render();
}

init();