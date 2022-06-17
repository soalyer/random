let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

canvas.height = window.innerHeight
canvas.width = window.innerWidth * 0.6

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

liveUpdate = true
function dropLine(x) {
    for (let i = 0; i < x; i++) {

        let p1x = Math.random() * canvas.width
        let p1y = Math.random() * (canvas.height / 2) + canvas.height / 4
        let angle = Math.random()*Math.PI*2;
        let p2x = p1x + Math.cos(angle) * canvas.height / 4
        let p2y = p1y + Math.sin(angle) * canvas.height / 4
        drops++;
        ctx.strokeStyle = 'hsl('+ (20 + 10*Math.random()) +',80%,40%)';

        if (p1y >= l1y && p2y <= l1y || p1y <= l2y && p2y >= l2y) {
            hits++;
            ctx.strokeStyle = 'hsl('+ (40 + 10*Math.random()) +',80%,50%)';;
        }

        ctx.beginPath();
        ctx.moveTo(p1x, p1y);
        ctx.lineTo(p2x, p2y);
        ctx.stroke(); 
    }
    document.getElementById("drops").innerHTML = drops
    document.getElementById("drops-1").innerHTML = drops
    document.getElementById("hits").innerHTML = hits
    document.getElementById("hits-1").innerHTML = hits

    let pi = (drops/hits).toFixed(10)
    if (pi == Infinity) {pi = 0}
    document.getElementById("pi").innerHTML = '= ' + pi
}