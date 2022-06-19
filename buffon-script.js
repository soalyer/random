let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d', { alpha: false });

canvas.height = window.innerHeight
canvas.width = window.innerWidth * 0.6

drops = 0
hits = 0
function reset() {
    ctx.fillStyle = "#9991d9";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.lineCap = "round";
    ctx.lineWidth = canvas.height / 200
    
    l1y = canvas.height / 4
    
    ctx.beginPath();
    ctx.moveTo(0, l1y);
    ctx.lineTo(canvas.width, l1y);
    ctx.stroke();
    
    l2y = canvas.height / 4 * 3
    
    ctx.beginPath();
    ctx.moveTo(0, l2y);
    ctx.lineTo(canvas.width, l2y);
    ctx.stroke();
    
    drops = 0
    hits = 0
}

reset();

const pi180 = (Math.PI/180);
const angles =[...new Array(360).fill(0)].map((_,i) => ({
  cos: Math.cos(i * pi180),
  sin: Math.sin(i * pi180)
}));

custom = document.getElementById("custom")
liveUpdate = true
gap = canvas.height / 4
doublegap = canvas.height / 2
width = canvas.width
tau = Math.PI*2;
function dropLine(x) {
    if (x == -1) {
        x = parseInt(custom.value)
    }
    if (isNaN(x) || x < 1) {return;}
    for (let i = 0; i < x; i++) {
        
        let p1y = Math.random() * (doublegap) + gap
        let angle = Math.random() * tau
        
        let p2y = p1y + Math.sin(angle) * gap
        
        if (i < 1000) {
            ctx.strokeStyle = 'hsl('+ (20 + 10*Math.random()) +',80%,40%)';
        }
        if (p1y > l1y && p2y < l1y || p1y < l2y && p2y > l2y) {
            hits++;
            if (i < 1000) {
                ctx.strokeStyle = 'hsl('+ (40 + 10*Math.random()) +',80%,50%)';
            }
            
        }

        if (i < 1000) {
            let p1x = Math.random() * width
            let p2x = p1x + Math.cos(angle) * gap   
            ctx.beginPath();
            ctx.moveTo(p1x, p1y);
            ctx.lineTo(p2x, p2y);
            ctx.stroke(); 
        }
    }
    drops += x
    document.getElementById("drops").innerHTML = drops
    document.getElementById("drops-1").innerHTML = drops
    document.getElementById("hits").innerHTML = hits
    document.getElementById("hits-1").innerHTML = hits
    
    let pi = (drops/hits).toFixed(10)
    if (pi == Infinity) {pi = 0}
    document.getElementById("pi").innerHTML = '= ' + pi
}