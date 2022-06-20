let canvas = document.getElementById("mandelbrot");
var ctx = canvas.getContext('2d', { alpha: false });

function complexSquare(f) {
    a = f[0];
    b = f[1];
    const x = a * a - b * b;
    const y = a * b * 2;
    return [x,y]
};

function complexAdd(f,g) {
    return [f[0]+g[0],f[1]+g[1]]
}
ctx.canvas.width = 2133
ctx.canvas.height = 1200
ctx.fillStyle = 'white';
ctx.fillRect(0,0,canvas.width,canvas.height);
ctx.fillStyle = 'green';

function mandel(m,s,x1,x2,y1,y2,a) {
    let maxIterations = m;
    let step = s
    let cutoff = y2 - step
    let instep = 1 / step
    let previousPixel = 0
    let drawLength = 0
    let offsetX = -(x1 * instep)
    let offsetY = -(y1 * instep)
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    for (let x = x1; x <= x2; x += step) {
        for (let y = y1; y <= y2; y += step) {
            let iterations = 0
            let c = [x,y]
            let z = [0,0]
            while( (z[0] * [0] + z[1] * z[1] < 4) && iterations < maxIterations) {
                z = complexAdd(complexSquare(z),c)
                iterations++
            }
            if (iterations == previousPixel && y < cutoff) {
                drawLength++
            }
            else {
                if (previousPixel < 30) {
                    ctx.fillStyle = 'hsl('+(240+previousPixel*4)+',90%,' + (20+previousPixel*3) +'%)';
                    ctx.fillRect(x*instep + offsetX,y*instep + offsetY - drawLength,1,drawLength+1);
                }
                drawLength = 0;
                previousPixel = iterations;
            }
    
        }
    } 
}

let quality = 0.5
/*s
canvas.width = 2133
canvas.height = 1200
mandel(20,0.002,2.5,2)
*/
canvas.width = 1066 * quality
canvas.height = 600 * quality

window.onload = function() {
    mandel(30,0.004 * (1/quality),-2.633,1.633,-1.2,1.2);
    document.getElementById('title').innerHTML = 'Mandelbrot <br> Set';
    document.getElementById('text').innerHTML = 'Press Space to zoom';
}
document.body.onkeyup = function(e) {
    if (e.key == " " ||
        e.code == "Space" ||      
        e.keyCode == 32      
    ) {
      zoomMandel()
    }
}

let zoom = 1;

function zoomMandel() {
    zoom *= 0.8
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    mandel(30,0.004 * zoom * (1/quality),-1.653*(1-zoom)+-2.633*zoom,-1.653*(1-zoom)+1.633*zoom,-1.4*zoom,1.0*zoom);
}

function less() {
    quality /= 2; 
    canvas.width = 1066 * quality
    canvas.height = 600 * quality
    if (zoom < 1) {
        mandel(30,0.004 * zoom * (1/quality),-1.653*(1-zoom)+-2.633*zoom,-1.653*(1-zoom)+1.633*zoom,-1.4*zoom,1.0*zoom);
    } else {
        mandel(30,0.004 * (1/quality),-2.633,1.633,-1.2,1.2);}
    }

function more() {
    quality *= 2; 
    canvas.width = 1066 * quality
    canvas.height = 600 * quality
    if (zoom < 1) {
        mandel(30,0.004 * zoom * (1/quality),-1.653*(1-zoom)+-2.633*zoom,-1.653*(1-zoom)+1.633*zoom,-1.4*zoom,1.0*zoom);
    } else {
        mandel(30,0.004 * (1/quality),-2.633,1.633,-1.2,1.2);}
    }
   