import {createProgram, setupWebGL, pointsToBuffer} from 'GLHelper';
import { vec3, vec4, mat4 } from 'gl-matrix';
import vertexShader from './shader.vert';
import fragmentShader from './shader.frag';

let gl;
let width;
let height;

// Mouse Settings
let lastMousePosition = vec3(0, 0, 0);
let isMouseDown = false;
let isMouseRotation = false;
let rotationLongitude = 0;
let rotationLatitude = 0;
const RotationVelocity = 1000;

// Transform setting
let transitionMatrix;
let rotationMatrix;
let projectionMatrix;
let scaleMatrix;
let transformMatrix = mat4(vec4(1,0,0,0), vec4(0,1,0,0), vec4(0,0,1,0), vec4(0,0,0,1));
let transformMatrixLoc;

// Camera setting
let fov = Math.PI / 2;
let aspect;
let near = 0.1;
let far = 5;
let cameraPosition = vec3(0, 0, 1);
let cameraLookAtPosition = vec3(0, 0, 0);
let cameraLookUp = vec3(0, 1, 0);
let upLatitude = Math.PI / 2;
const cameraUpRadius = Math.sqrt(2);


function setTransitionMatrix() {
    // Move the camera to 0, 0, 0
    transitionMatrix = mat4(
        1, 0, 0, -cameraPosition[0],
        0, 1, 0, -cameraPosition[1],
        0, 0, 1, -cameraPosition[2],
        0, 0, 0, 1,
    );
}

function setRotationMatrix() {
    // Rotate camera, making it looking at -z and up vector equals to y
    const crossAxis = vec3.create();
    const cameraLookAtVec = vec3.create();
    vec3.subtract(cameraLookAtVec, cameraLookAtPosition, cameraPosition);
    vec3.normalize(cameraLookAtVec, cameraLookAtVec);
    vec3.cross(crossAxis, cameraLookAtVec, cameraLookUp);
    vec3.normalize(crossAxis, crossAxis);
    rotationMatrix = mat4(
        vec4(crossAxis[0], crossAxis[1], crossAxis[2], 0),
        vec4(cameraLookUp[0], cameraLookUp[1], cameraLookUp[2], 0),
        vec4(-cameraLookAtVec[0], -cameraLookAtVec[1], -cameraLookAtVec[2], 0),
        vec4(0, 0, 0, 1)
    );
}

function setProjectionMarix() {
    // Transform view space to cubeic
    const coefficentA = -near - far;
    const coefficentB = -near * far;

    projectionMatrix = mat4(
        vec4(-near, 0, 0, 0),
        vec4(0, -near, 0, 0),
        vec4(0, 0, coefficentA, coefficentB),
        vec4(0, 0, 1, 0),
    );
}

function setScaleMatirx() {
    const top = near * Math.tan(fov / 2);
    const right = top * aspect;

    scaleMatrix = mat4(
        vec4(1/right, 0, 0, 0),
        vec4(0, 1/top, 0, 0),
        vec4(0, 0, 2/(far - near), (far + near) / (far - near)),
        vec4(0, 0, 0, 1),
    );
}

function setMVPTransformMatrix() {
    setTransitionMatrix();
    setRotationMatrix();
    setProjectionMarix();
    setScaleMatirx();
    const lookatMatrix = mat4.create();
    const perspectiveMatrix =  mat4.create();
    mat4.lookAt(lookatMatrix, cameraPosition, vec3(0, 0, 0), cameraLookUp);
    mat4.perspective(perspectiveMatrix, fov, width / height, near, far);
    
    const iMat = mat4(vec4(1,0,0,0), vec4(0,1,0,0), vec4(0,0,1,0), vec4(0,0,0,1));

    const test = mat4.create();
    mat4.multiply(test, transitionMatrix, iMat);
    mat4.multiply(test, rotationMatrix, test);
    mat4.multiply(transformMatrix, lookatMatrix, iMat);
    mat4.multiply(transformMatrix, projectionMatrix, transformMatrix);
    mat4.multiply(transformMatrix, scaleMatrix, transformMatrix);
}

function setMVPTransformMatrix2() {
    const lookatMatrix = mat4.create();
    const perspectiveMatrix =  mat4.create();
   
    mat4.lookAt(lookatMatrix, cameraPosition, vec3(0, 0, 0), cameraLookUp);
    mat4.perspective(perspectiveMatrix, fov, width / height, near, far);

    const iMat = mat4(vec4(1,0,0,0), vec4(0,1,0,0), vec4(0,0,1,0), vec4(0,0,0,1));
    mat4.multiply(transformMatrix, lookatMatrix, iMat);
    mat4.multiply(transformMatrix, perspectiveMatrix, transformMatrix);
}

function updateCameraSettings(horizontalAngle, verticalAngle) {
    rotationLatitude += verticalAngle;
    rotationLongitude += horizontalAngle;
    
    // Set camera new position
    const radius = vec3.length(vec3(cameraPosition) - vec3(cameraLookAtPosition));
    const temp = Math.cos(rotationLatitude) * radius;
    cameraPosition = vec3(
        temp * Math.sin(rotationLongitude),
        radius * Math.sin(rotationLatitude),
        temp * Math.cos(rotationLongitude),
    );

    // Update new up vector
    upLatitude += horizontalAngle;
    const temp2 = Math.cos(upLatitude) * cameraUpRadius;
    vec3.normalize(cameraLookUp, vec3(
        temp2 * Math.sin(rotationLongitude),
        cameraUpRadius * Math.sin(upLatitude),
        temp2 * Math.cos(rotationLongitude),
    ));
}

function getCordinatePositionFromMouse(x, y) {
    const newX = 2 * x / width - 1;
    const newY = 2 * (height - y) / height - 1;
    return vec3(newX, newY, 0);
}

function handleMouseDown() {
    isMouseDown = true;
}

function handleMouseUp() {
    isMouseDown = false;
    isMouseRotation = false;
    lastMousePosition = vec3(0, 0, 0);
}

function handleMouseMove(e) {
    if (isMouseDown === false) {
        return;
    }
    isMouseRotation = true;

    const { clientX, clientY } = e;
    const currentVec = getCordinatePositionFromMouse(clientX, clientY);
    const deltaVec = vec3(currentVec) - vec3(lastMousePosition);

    // Calculate verlocity coefficent and update mouse settings
    const horizontalVelocityCoefficent = deltaVec[0] / width;
    const verticalVelocityCoffeicent = deltaVec[1] / height;
    const deltahorizontalAngle = horizontalVelocityCoefficent * RotationVelocity;
    const deltaVerticalAngle = verticalVelocityCoffeicent * RotationVelocity;
    updateCameraSettings(deltahorizontalAngle, deltaVerticalAngle);

    // Set last position to current one
    lastMousePosition = currentVec;
}

function throttleCallback(interval, fn) {
    let lastTime = Date.now();
    const throttledCallback = (e) => {
        const currentTime = Date.now();
        if ((currentTime - lastTime) > interval) {
            fn(e);
            lastTime = currentTime;
        }
    }
    return throttledCallback;
}

function initEvent() {
    const canvas = document.getElementById('gl-canvas');
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mousemove', throttleCallback(100, handleMouseMove));
}

function init() {
    const vertices = [
        vec4(-0.5, -0.5, 0.5, 1.0),
        vec4(-0.5, 0.5, 0.5, 1.0),
        vec4(0.5, 0.5, 0.5, 1.0),
        vec4(0.5, -0.5, 0.5, 1.0),
        vec4(-0.5, -0.5, -0.5, 1.0),
        vec4(-0.5, 0.5, -0.5, 1.0),
        vec4(0.5, 0.5, -0.5, 1.0),
        vec4(0.5, -0.5, -0.5, 1.0),
    ];

    const vertexColors = [
        [0.0, 0.0, 0.0, 1.0],
        [1.0, 0.0, 0.0, 1.0],
        [1.0, 1.0, 0.0, 1.0],
        [0.0, 1.0, 0.0, 1.0],
        [0.0, 0.0, 1.0, 1.0],
        [1.0, 0.0, 1.0, 1.0],
        [1.0, 1.0, 1.0, 1.0],
        [0.0, 1.0, 1.0, 1.0],
    ];

    const vertexIndex = [
        1, 0, 3,
        3, 2, 1,
        2, 3, 7,
        7, 6, 2,
        3, 0, 4,
        4, 7, 3,
        6, 5, 1,
        1, 2, 6,
        4, 5, 6,
        6, 7, 4,
        5, 4, 0,
        0, 1, 5,
    ];

    // Make gl 
    const canvas = document.getElementById('gl-canvas');
    height = canvas.height;
    width = canvas.width;
    aspect = width / height;
    
    gl = setupWebGL(canvas);

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    // Create program with shader
    const program = createProgram(gl, vertexShader, fragmentShader);
    gl.useProgram(program);

    // Load data
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, pointsToBuffer(vertices), gl.STATIC_DRAW);

    // Set shader position variable
    const vPosition = gl.getAttribLocation(program, 'vPosition');
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, pointsToBuffer(vertexColors), gl.STATIC_DRAW);

    // Set shader color variable
    const vColor = gl.getAttribLocation(program, 'vColor');
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(vertexIndex), gl.STATIC_DRAW);

    // get uniform variable
    transformMatrixLoc = gl.getUniformLocation(program, 'r');
    gl.uniformMatrix4fv(transformMatrixLoc, false, transformMatrix);

    // Init Event
    initEvent();

    render();
}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    if (isMouseRotation) {
        // Set new transformMatrix
        setMVPTransformMatrix();
        
        // Set uniform variable
        gl.uniformMatrix4fv(transformMatrixLoc, false, new Float32Array(transformMatrix));
    }

    gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_BYTE, 0);
    requestAnimationFrame(render);
}

init();