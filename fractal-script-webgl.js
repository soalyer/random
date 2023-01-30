let height = document.documentElement.clientHeight;
let width = document.documentElement.clientWidth;


const canvas = document.getElementById("c");
canvas.height = height;
canvas.width = width * 0.7;
let gl = canvas.getContext("webgl");
if (!gl) {
    canvas.getContext("experimental-webgl");
}
if (!gl) {
    alert("unable to initialize webgl :(");
}

gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


let vShaderText = `precision highp float;

attribute vec2 vPos;

void main() {
    gl_Position = vec4(vPos, 0.0, 1.0);
}`;

let f = [`for (int i = 0; i < maxIt; i++) {
    float a = 2.0 * z.x * z.y + c.y;
    z.x = z.x * z.x - z.y * z.y + c.x;
    z.y = a;
    
    if (z.x * z.x + z.y * z.y > 4.0) {
        break;
    }
    n += 1.0;
}`, `for (int i = 0; i < maxIt; i++) {
    float a = z.x * z.y + c.y;
    z.x = z.x / z.y + c.x;
    z.y = a;
    
    if (z.x * z.x + z.y * z.y > 4.0) {
        break;
    }
    n += 1.0;
}`,
`for (int i = 0; i < maxIt; i++) {
    float a = 2.0 * z.x * z.y + c.y;
    z.x = z.y * z.y - z.x * z.x + c.x;
    z.y = a;


    
    if (z.x * z.x + z.y * z.y > 4.0) {
        break;
    }
    n += 1.0;
}`,
`
float e = 2.71828183;
for (int i = 0; i < maxIt; i++) {
    float a = pow(e, z.x);
    z.x = a * cos(z.y) + c.x;
    z.y = a * sin(z.y) + c.y;
    
    if (z.x * z.x + z.y * z.y > 500.0) {
        break;
    }
    n += 1.0;
}`];
let currentf = 0;
let maxIter = 500;
function fractal(i) {
    currentf = i;
    fShaderText = `precision highp float;

uniform vec2 vpDimensions;
uniform float minI;
uniform float maxI;
uniform float minR;
uniform float maxR;

vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
    vec2 c = vec2(
        gl_FragCoord.x * (maxR - minR) / vpDimensions.x + minR,
        gl_FragCoord.y * (maxI - minI) / vpDimensions.y + minI    
    );

    // mandelbrot formula 
    
    vec2 z = c;
    float maxIterations = ` + maxIter + `.0;
    const int maxIt = ` + maxIter + `;
    float n = 0.0;`
    + f[currentf] + `
    if (n >= maxIterations) {
        gl_FragColor = vec4(0, 0, 0, 1.0);
    }
    else {
        float a = mod(n, 100.0) / 100.0;
        gl_FragColor = vec4(hsv2rgb(vec3(a, 0.8, 0.8)), 1.0);
    }
}`;
    gl.shaderSource(fragmentShader, fShaderText);
    gl.compileShader(fragmentShader);
    gl.linkProgram(program);
    uniforms = {
        vpDimensions: gl.getUniformLocation(program, "vpDimensions"),
        minI: gl.getUniformLocation(program, "minI"),
        maxI: gl.getUniformLocation(program, "maxI"),
        minR: gl.getUniformLocation(program, "minR"),
        maxR: gl.getUniformLocation(program, "maxR")
    }
}



let fShaderText = `precision highp float;

uniform vec2 vpDimensions;
uniform float minI;
uniform float maxI;
uniform float minR;
uniform float maxR;

vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
    vec2 c = vec2(
        gl_FragCoord.x * (maxR - minR) / vpDimensions.x + minR,
        gl_FragCoord.y * (maxI - minI) / vpDimensions.y + minI    
    );

    // mandelbrot formula 
    
    vec2 z = c;
    float maxIterations = 500.0;
    const int maxIt = 500;
    float n = 0.0;`
    + f[currentf] + `
    if (n >= maxIterations) {
        gl_FragColor = vec4(0, 0, 0, 1.0);
    }
    else {
        float a = mod(n, 100.0) / 100.0;
        gl_FragColor = vec4(hsv2rgb(vec3(a, 0.8, 0.8)), 1.0);
    }
}`;

let vertexShader = gl.createShader(gl.VERTEX_SHADER);
let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(vertexShader, vShaderText);
gl.shaderSource(fragmentShader, fShaderText);

gl.compileShader(vertexShader);
gl.compileShader(fragmentShader);

if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.error("error compiling vertex shader", gl.getShaderInfoLog(vertexShader));
}
if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    console.error("error compiling fragment shader", gl.getShaderInfoLog(fragmentShader));
}

let program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("error linking program")
}

gl.useProgram(program);

let uniforms = {
    vpDimensions: gl.getUniformLocation(program, "vpDimensions"),
    minI: gl.getUniformLocation(program, "minI"),
    maxI: gl.getUniformLocation(program, "maxI"),
    minR: gl.getUniformLocation(program, "minR"),
    maxR: gl.getUniformLocation(program, "maxR")
}

let cvDimensions = [canvas.height/0.7, canvas.height/0.7];
let minI = -1.5;
let maxI = 2.5;
let minR = -2.5;
let maxR = 1.5;

let vertexBuffer = gl.createBuffer();
let vertices = [ // two triangles to cover screen
    -1, 1,
    -1, -1,
    1, -1,

    -1, 1,
    1, 1,
    1, -1
]
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

let vPosA = gl.getAttribLocation(program, "vPos");
gl.vertexAttribPointer(vPosA, 2, gl.FLOAT, gl.FALSE, 8, 0);
gl.enableVertexAttribArray(vPosA);


// MAIN LOOP

let loop = function () {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

    gl.uniform2fv(uniforms.vpDimensions, cvDimensions);
    gl.uniform1f(uniforms.minI, minI);
    gl.uniform1f(uniforms.maxI, maxI);
    gl.uniform1f(uniforms.minR, minR);
    gl.uniform1f(uniforms.maxR, maxR);

    gl.drawArrays(gl.TRIANGLES, 0, 6);

    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

addEventListener('wheel', zoom);

function zoom(e) {
    var iRange = maxI - minI;
    var rRange = maxR - minR;
    var niRange;
    var nrRange;
    if (e.deltaY < 0) { //zooming in
        niRange = iRange * 0.9;
        nrRange = rRange * 0.9;
    }
    else {
        niRange = iRange * 1.1;
        nrRange = rRange * 1.1;
    }
    var iDelta = niRange - iRange;
    var rDelta = nrRange - rRange;
    minI -= iDelta / 2;
    maxI = minI + niRange;
    minR -= rDelta / 2;
    maxR = minR + nrRange;
}

addEventListener('mousemove', pan);
function pan(e) {
    if (e.buttons === 1) {
        var iRange = maxI - minI;
        var rRange = maxR - minR;
        var iDelta = (e.movementY / canvas.height) * iRange;
        var rDelta = (e.movementX / canvas.width) * rRange;
        minI += iDelta;
        maxI += iDelta;
        minR -= rDelta;
        maxR -= rDelta;
    }
}