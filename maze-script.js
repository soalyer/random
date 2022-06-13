let canvas = document.getElementById("maze");
let ctx = canvas.getContext('2d');

ctx.canvas.width = window.innerWidth*0.3;
ctx.canvas.height = window.innerWidth*0.3;
ctx.strokeStyle = "#41232e";
ctx.lineWidth = canvas.width*0.01;
ctx.strokeRect(0,0,canvas.width,canvas.height);

allTiles = [];

class Tile {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.right = true;
        this.down = true;
        this.color = null;
        allTiles.push(this);
    }
    
    draw(ctx) {
        ctx.lineWidth = canvas.width*0.01;
        if (this.color) {
            ctx.fillStyle = this.color
            ctx.fillRect(canvas.width*0.1*this.x + canvas.width * 0.005,canvas.width*0.1*this.y + canvas.width * 0.005,canvas.width*0.1,canvas.width*0.1)
        }
        if (this.right) {
            ctx.strokeStyle = "#41232e";
            ctx.lineWidth = canvas.width*0.01;
            ctx.beginPath();
            ctx.moveTo(canvas.width*0.1*(this.x+1),canvas.width*0.1*(this.y));
            ctx.lineTo(canvas.width*0.1*(this.x+1),canvas.width*0.1*(this.y+1.05));
            ctx.stroke();
        }
        if (this.down) {
            ctx.strokeStyle = "#41232e";
            ctx.lineWidth = canvas.width*0.01;
            ctx.beginPath();
            ctx.moveTo(canvas.width*0.1*(this.x),canvas.width*0.1*(this.y+1));
            ctx.lineTo(canvas.width*0.1*(this.x+1.05),canvas.width*0.1*(this.y+1));
            ctx.stroke();
        }
    }
    colore(ctx, i) {
        let oldColor = this.color
        this.colori = i;
        this.color = 'hsl(' + i + ', 100%, 75%)';
        if (this.x < 9 && !this.right && oldColor && maze[this.y][this.x+1].color == oldColor) {
            maze[this.y][this.x+1].colore(ctx, i)
        }
        if (this.y < 9 && !this.down && oldColor && maze[this.y+1][this.x].color == oldColor) {
            maze[this.y+1][this.x].colore(ctx, i)
        }
        if (this.x > 0 && !maze[this.y][this.x-1].right && oldColor && maze[this.y][this.x-1].color == oldColor) {
            maze[this.y][this.x-1].colore(ctx, i)
        }
        if (this.y > 0 && !maze[this.y-1][this.x].down && oldColor && maze[this.y-1][this.x].color == oldColor) {
            maze[this.y-1][this.x].colore(ctx, i)
        }
        this.draw(ctx);
    }

}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

maze = new Array(10).fill(null).map(() => new Array(10).fill(0))
for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
        maze[y][x] = new Tile(x, y);
        maze[y][x].draw(ctx);    
    }
    
}
function generate() {

    let randomColor = Math.floor(Math.random() * 359)
    console.log(randomColor)
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            maze[y][x].color = null;
            maze[y][x].colori = null;  
            maze[y][x].right = true;
            maze[y][x].down = true;
        }
    }
    
    allTiles = shuffle(allTiles);
    for (let i = 0; i < allTiles.length; i++) {
        setTimeout(function(){ 
                if (Math.random() > 0.5) {
                    if (allTiles[i].x < 9) {
                        if (allTiles[i].color != maze[allTiles[i].y][allTiles[i].x+1].color) { 
                            allTiles[i].right = false;
                            if (allTiles[i].color) {
                                maze[allTiles[i].y][allTiles[i].x+1].colore(ctx, allTiles[i].colori)
                                allTiles[i].draw(ctx)
                            }
                            else {
                                allTiles[i].colore(ctx, maze[allTiles[i].y][allTiles[i].x+1].colori)
                            }
                        }
                        else if (allTiles[i].color == null && maze[allTiles[i].y][allTiles[i].x+1].color == null) {
                            
                            allTiles[i].right = false
                            allTiles[i].colore(ctx, i*3 + randomColor)
                            maze[allTiles[i].y][allTiles[i].x+1].colore(ctx, i*3 + randomColor)
                        }
                    }
                }
                else {
                    if (allTiles[i].y < 9) {
                        if (allTiles[i].color != maze[allTiles[i].y+1][allTiles[i].x].color) { 
                            allTiles[i].down = false;
                            if (allTiles[i].color) {
                                maze[allTiles[i].y+1][allTiles[i].x].colore(ctx, allTiles[i].colori)
                                allTiles[i].draw(ctx)
                            }
                            else {
                                allTiles[i].colore(ctx, maze[allTiles[i].y+1][allTiles[i].x].colori)
                            }
                        }
                        else if (allTiles[i].color == null && maze[allTiles[i].y+1][allTiles[i].x].color == null) {
                            
                            allTiles[i].down = false
                            allTiles[i].colore(ctx, i*3 + randomColor)
                            maze[allTiles[i].y+1][allTiles[i].x].colore(ctx, i*3 + randomColor)
                        }
                    }
                }
        }, i*10) 
    }
    for (let i = 0; i < allTiles.length; i++) {
        setTimeout(function(){ 
            if ((allTiles[i].down == false || allTiles[i].right == true && allTiles[i].y == 9) && allTiles[i].x < 9) {
                if (allTiles[i].color != maze[allTiles[i].y][allTiles[i].x+1].color) { 
                    allTiles[i].right = false;
                    if (allTiles[i].color) {
                        maze[allTiles[i].y][allTiles[i].x+1].colore(ctx, allTiles[i].colori)
                        allTiles[i].draw(ctx)
                    }
                    else {
                        allTiles[i].colore(ctx, maze[allTiles[i].y][allTiles[i].x+1].colori)
                    }
                }
                else if (allTiles[i].color == null && maze[allTiles[i].y][allTiles[i].x+1].color == null) {
                    
                    allTiles[i].right = false
                    allTiles[i].colore(ctx, i*3 + randomColor)
                    maze[allTiles[i].y][allTiles[i].x+1].colore(ctx, i*3 + randomColor)
                }
            }
            else if ((allTiles[i].right == false || allTiles[i].down == true && allTiles[i].x == 9) && allTiles[i].y < 9){
                if (allTiles[i].color != maze[allTiles[i].y+1][allTiles[i].x].color) { 
                    allTiles[i].down = false;
                    if (allTiles[i].color) {
                        maze[allTiles[i].y+1][allTiles[i].x].colore(ctx, allTiles[i].colori)
                        allTiles[i].draw(ctx)
                    }
                    else {
                        allTiles[i].colore(ctx, maze[allTiles[i].y+1][allTiles[i].x].colori)
                    }
                }
                else if (allTiles[i].color == null && maze[allTiles[i].y+1][allTiles[i].x].color == null) {
                    
                    allTiles[i].down = false
                    allTiles[i].colore(ctx, i*3 + randomColor)
                    maze[allTiles[i].y+1][allTiles[i].x].colore(ctx, i*3 + randomColor)
                }
            }    
        }, i*10+1000) 
    }
}

