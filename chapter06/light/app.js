import {createProgram, setupWebGL, pointsToBuffer} from 'GLHelper';
import {vec3, vec4, mat4} from 'gl-matrix';
import vertexShader from './shader.vert';
import fragmentShader from './shader.frag';

function init() {
    // Init webgl context
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

    // Init light related constant
    const lightPosition = vec4(1.0, 2.0, 3.0, 1.0);
    const lightAmbient = vec4(0.7, 0.7, 0.2, 1.0);
    const lightDiffuse = vec4(1.0, 1.0, 1.0, 1.0);
    const lightSpecular = vec4(1.0, 1.0, 1.0, 1.0);
    const shiness = 100.0;

    // Init material related (ka, kd, ks)
    const materialAmbient = vec4(1.0, 0.0, 1.0, 1.0);
    const materialDiffuse = vec4(1.0, 0.8, 0.0, 1.0);
    const materialSpecular = vec4(1.0, 0.8, 0.0, 1.0);

    // Caculate product
    let ambientProduct = vec4.create();
    let diffuseProduct = vec4.create();
    let specularProdcut = vec4.create();
    vec4.multiply(ambientProduct, lightAmbient, materialAmbient);
    vec4.multiply(diffuseProduct, lightDiffuse, materialDiffuse);
    vec4.multiply(specularProdcut, lightSpecular, materialSpecular);

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
    const eye = vec4(-1, 1, 1, 1);
    const up = vec4(0, 1, 0, 0);
    const at = vec4(0, 0, 0, 1);


    // Load vertices to buffer
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
    const vNormal = gl.getAttribLocation(program, 'vNormal');
    gl.vertexAttribPointer(vNormal, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vNormal);

    // Load element index
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indexs), gl.STATIC_DRAW);

    // Load uniform variable
    let modelViewMatrix = mat4.create();
    mat4.lookAt(modelViewMatrix, eye, at, up);
    const modelViewMatrixLoc = gl.getUniformLocation(program, 'modelViewMatrix');
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, modelViewMatrix);

    let projectionMatrix = mat4.create();
    mat4.ortho(projectionMatrix, -5.0, 5.0, -5.0, 5.0, 0.5, 10);
    const projectionMatrixLoc = gl.getUniformLocation(program, 'projectionMatrix');
    gl.uniformMatrix4fv(projectionMatrixLoc, false, projectionMatrix);

    const ambientProductLoc = gl.getUniformLocation(program, 'ambientProduct');
    gl.uniform4fv(ambientProductLoc, ambientProduct);

    const diffuseProductLoc = gl.getUniformLocation(program, 'diffuseProduct');
    gl.uniform4fv(diffuseProductLoc, diffuseProduct);

    const specularProdcutLoc = gl.getUniformLocation(program, 'specularProdcut');
    gl.uniform4fv(specularProdcutLoc, specularProdcut);

    const lightPosnitionLoc = gl.getUniformLocation(program, 'lightPosition');
    gl.uniform4fv(lightPosnitionLoc, lightPosition);

    const shinessLoc = gl.getUniformLocation(program, 'shiness');
    gl.uniform1f(shinessLoc, shiness);

    // Render function
    let theta = 0.0;

    const render = () => {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        theta += 0.1;
        if (theta > 2*Math.PI) {
            theta -= 2*Math.PI;
        }

        // Rotate light
        lightPosition[0] = Math.sin(theta);
        lightPosition[2] = Math.cos(theta);
        gl.uniform4fv(lightPosnitionLoc, lightPosition);

        // Redraw
        gl.drawElements(gl.TRIANGLES, indexs.length, gl.UNSIGNED_BYTE, 0);
        requestAnimationFrame(render);
    }

    render();
}

init();