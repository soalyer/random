let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight * 0.84;

const draw_speed = 10;
const size = Math.floor(canvas.height / 12);
const width = Math.ceil(canvas.width / size);
const height = 12;
const grid = [...Array(height)].map(_=>Array(width).fill(0))   
/**
 * 0 - nothing
 * 1 - wall tile 
 * 2 - start tile
 * 3 - end tile
 */

const s_color = "salmon";
const e_color = "limegreen";
let start_x = 1;
let start_y = 10;
let end_x = width-3;
let end_y = 1;

function draw(y, x, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x*size,y*size,size,size);
}

// default grid
grid[start_y][start_x] = 2;
draw(start_y, start_x, s_color);
grid[end_y][end_x] = 3; 
draw(end_y, end_x, e_color);
for (let i = 0; i < 8; i++) {
    grid[height-1-i][3] = 1;
    draw(height-1-i,3,"#273C2C");
}

if (width > 10) {
    for (let i = 0; i < 4; i++) {
        grid[i][width-5] = 1;
        draw(i,width-5,"#273C2C");
    }
}
mouse = false;

addEventListener('mousedown', md);
addEventListener('touchstart', md);
addEventListener('mousemove', mm);
addEventListener('touchmove', md);
addEventListener('mouseup', mu);
addEventListener('touchend', md);

function md(e) {
    mouse = true;
}
function mu(e) {
    mouse = false;
}

// mouse pos
let mx = 0
let my = 0

// mouse pos updated when moving over tile
let old_mx = 0;
let old_my = 0;
function mm(e) {
    mx = Math.floor(e.pageX / size);
    my = Math.floor((e.pageY - (window.innerHeight * 0.16)) / size);
    if (!mouse) return;

    if (old_my == my && old_mx == mx) return;
    old_my = my;
    old_mx = mx;
    try {
        if (grid[my][mx] == 3) return
        if (grid[my][mx] == 2) return
    }
    catch {
        return;
    }
    change = grid[my][mx] == 1 ? 0 : 1;
    grid[my][mx] = change;
    draw(my, mx, ["#5f6960","#273C2C"][change]);

}

window.addEventListener('keydown',this.check,false);
function check(e) {
    var code = e.keyCode;
    switch (code) {
        case 83:
            if (grid[my][mx] == 3) break
            grid[start_y][start_x] = 0;
            draw(start_y, start_x, "#5f6960");
            start_y = my
            start_x = mx
            grid[start_y][start_x] = 2;
            draw(start_y, start_x, s_color);
            break;
        case 69:
            if (grid[my][mx] == 2) break
            grid[end_y][end_x] = 0;
            draw(end_y, end_x, "#5f6960");
            end_y = my
            end_x = mx
            grid[end_y][end_x] = 3;
            draw(end_y, end_x, e_color);
            break;
    }
}

function start() {
    reset();
    let option = document.getElementById("list").value;

    switch (option) {
        case "BFS":
            bfs();
            break;
        case "DFS":
            dfs();
            break;
        case "A-star":
            a_star();
            break;
        default:
            alert("error");
    }
}

function reset() {
    // https://stackoverflow.com/a/8345837
    var highestTimeoutId = setTimeout(";");
    for (var i = 0 ; i < highestTimeoutId ; i++) {
        clearTimeout(i); 
    }

    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            let color = ["#5f6960","#273C2C",s_color,e_color][grid[i][j]];
            draw(i,j,color);
        }
    }
}

function bfs() {
    let dir_y = [-1, 1, 0, 0];
    let dir_x = [0, 0, 1, -1];
    /**
     * index 0 - up
     * index 1 - down
     * index 2 - right
     * index 3 - left
     */

    let y_queue = [];
    let x_queue = [];

    let nodes_left = 1;
    let nodes_added = 0;

    let reached_end = false;

    let visited = [...Array(height)].map(_=>Array(width).fill(false));
    let prev = [...Array(height)].map(_=>Array(width).fill(false));

    let v = 0; // for use with settimeout 
    let v_tiles = []; // for use with settimeout

    y_queue.push(start_y);
    x_queue.push(start_x);
    visited[start_y][start_x] = true;
    
    function explore_neighbours(y, x) {
        for (i = 0; i < 4; i++) {
            let yy = y + dir_y[i];
            let xx = x + dir_x[i];

            if (yy < 0 || yy >= height) continue;
            if (xx < 0 || xx >= width) continue;
            if (visited[yy][xx]) continue;
            if (grid[yy][xx] == 1) continue;

            y_queue.push(yy);
            x_queue.push(xx);
            visited[yy][xx] = true;

            v += 1;
            v_tiles.push([yy,xx])
            setTimeout(function drawPath() {
                let s = v_tiles.shift();
                if (!(s[0] == end_y && s[1] == end_x)) {
                    draw(s[0], s[1], "darkgray");
                }
            }, v * draw_speed);

            prev[yy][xx] = i;
            nodes_added++;
        }
    }

    while (y_queue.length != 0) {
        let y = y_queue.shift();
        let x = x_queue.shift();

        if (grid[y][x] == 3) {
            reached_end = true;
            break;
        }

        v += 1;
        v_tiles.push([y, x])
        
        setTimeout(function drawPath() {
            let s = v_tiles.shift();
            if (!(s[0] == end_y && s[1] == end_x) && !(s[0] == start_y && s[1] == start_x)) {
                draw(s[0], s[1], "gray");
            }
        }, v * draw_speed); 

        explore_neighbours(y,x);

        nodes_left--

        if (nodes_left == 0) { // moving to next layer
            nodes_left = nodes_added;
            nodes_added = 0;
        }
    }

    if (reached_end) {
        let path_y = end_y;
        let path_x = end_x;
        let path = []; // for use with settimeout
        let j = 0;
        while (true) {
            j++
            let i = prev[path_y][path_x];
            path_x -= dir_x[i];
            path_y -= dir_y[i];
            if (path_y == start_y && path_x == start_x) break;

            path.push([path_y,path_x])
            setTimeout(function drawPath() {
                let s = path.shift();
                draw(s[0], s[1], "mistyrose");
            }, j * draw_speed * 2 + v * draw_speed);
        }
    }
}

function dfs() {
    let dir_y = [-1, 0, 1, 0];
    let dir_x = [0, 1, 0, -1];
    /**
     * index 0 - up
     * index 2 - down
     * index 1 - right
     * index 3 - left
     */

    let y_queue = [];
    let x_queue = [];

    let nodes_left = 1;
    let nodes_added = 0;

    let reached_end = false;

    let visited = [...Array(height)].map(_=>Array(width).fill(false));
    let prev = [...Array(height)].map(_=>Array(width).fill(false));

    let v = 0; // for use with settimeout 
    let v_tiles = []; // for use with settimeout

    y_queue.push(start_y);
    x_queue.push(start_x);
    visited[start_y][start_x] = true;
    
    function explore_neighbours(y, x) {
        for (i = 0; i < 4; i++) {
            let yy = y + dir_y[i];
            let xx = x + dir_x[i];

            if (yy < 0 || yy >= height) continue;
            if (xx < 0 || xx >= width) continue;
            if (visited[yy][xx]) continue;
            if (grid[yy][xx] == 1) continue;

            y_queue.push(yy);
            x_queue.push(xx);
            visited[yy][xx] = true;

            v += 1;
            v_tiles.push([yy,xx])
            setTimeout(function drawPath() {
                let s = v_tiles.shift();
                if (!(s[0] == end_y && s[1] == end_x)) {
                    draw(s[0], s[1], "darkgray");
                }
            }, v * draw_speed);

            prev[yy][xx] = i;
            nodes_added++;
        }
    }

    while (y_queue.length != 0) {
        let y = y_queue.pop();
        let x = x_queue.pop();

        if (grid[y][x] == 3) {
            reached_end = true;
            break;
        }

        v += 1;
        v_tiles.push([y, x])
        
        setTimeout(function drawPath() {
            let s = v_tiles.shift();
            if (!(s[0] == end_y && s[1] == end_x) && !(s[0] == start_y && s[1] == start_x)) {
                draw(s[0], s[1], "gray");
            }
        }, v * draw_speed); 

        explore_neighbours(y,x);

        nodes_left--

        if (nodes_left == 0) { // moving to next layer
            nodes_left = nodes_added;
            nodes_added = 0;
        }
    }

    if (reached_end) {
        let path_y = end_y;
        let path_x = end_x;
        let path = []; // for use with settimeout
        let j = 0;
        while (true) {
            j++
            let i = prev[path_y][path_x];
            path_x -= dir_x[i];
            path_y -= dir_y[i];
            if (path_y == start_y && path_x == start_x) break;

            path.push([path_y,path_x])
            setTimeout(function drawPath() {
                let s = path.shift();
                draw(s[0], s[1], "mistyrose");
            }, j * draw_speed * 2 + v * draw_speed);
        }
    }
}

// hacky implementation - possibly rewrite 
function a_star() {
    let dir_y = [-1, 1, 0, 0];
    let dir_x = [0, 0, 1, -1];
    /**
     * index 0 - up
     * index 1 - down
     * index 2 - right
     * index 3 - left
     */

    // https://stackoverflow.com/a/21822316
    function sortedIndex(value) {
        var low = 0,
            high = open.length;
    
        while (low < high) {
            var mid = (low + high) >>> 1;
            if (f_cost(open[mid].y, open[mid].x, open[mid].d) < value) low = mid + 1;
            else high = mid;
        }
        return low;
    }

    function f_cost(y, x, d) {
        g = d;
        h = Math.abs(end_y - y) + Math.abs(end_x - x);
        return g+h;
    }
    class Node {
        constructor(y, x, f_score, distance) {
            this.y = y;
            this.x = x;
            this.f = f_score;
            this.d = distance;
        }
    }

    let open = [];
    let state = [...Array(height)].map(_=>Array(width).fill(0)); // 0-none 1-open 2-closed
    let dist = [...Array(height)].map(_=>Array(width).fill(100000));
    let prev = [...Array(height)].map(_=>Array(width).fill(false));
    let v = 0;
    let v_tiles = [];
    let reached_end = false;
    open.push(new Node(start_y,start_x,0,0))
    
    function explore_neighbours(y, x, d) {
        for (i = 0; i < 4; i++) {
            let yy = y + dir_y[i];
            let xx = x + dir_x[i];

            if (yy < 0 || yy >= height) continue;
            if (xx < 0 || xx >= width) continue;
            if (state[yy][xx] == 2) continue;
            if (grid[yy][xx] == 1) continue;

            if (dist[yy][xx] > d+1 || state[yy][xx] == 0) {
                prev[yy][xx] = i;
                dist[yy][xx] = d+1;
                if (state[yy][xx] == 0) {
                    state[yy][xx] = 1;
                    let f_new = f_cost(yy, xx, d+1);
                    open.splice(sortedIndex(f_new), 0, new Node(yy, xx, f_new, d+1))
                    
                    v += 1;
                    v_tiles.push([yy,xx])
                    
                    setTimeout(function drawPath() {
                        let s = v_tiles.shift();
                        if (!(s[0] == end_y && s[1] == end_x)) {
                            draw(s[0], s[1], "darkgray");
                        }
                    }, v * draw_speed); 
                }
                else {
                    for (i = 0; i < open.length; i++) {
                        if (yy == open[i].y && xx == open[i].x) {
                            open.splice(i,1);
                            let f_new = f_cost(yy, xx, d+1);
                            open.splice(sortedIndex(f_new), 0, new Node(yy, xx, f_new, d+1))
                        }
                    }
                }
                
            }

            
        }
    }

    while (open.length != 0) {
        let current = open.shift();
        state[current.y][current.x] = 2;
        v += 1;
        v_tiles.push([current.y,current.x])
        
        setTimeout(function drawPath() {
            let s = v_tiles.shift();
            if (!(s[0] == end_y && s[1] == end_x) && !(s[0] == start_y && s[1] == start_x)) {
                draw(s[0], s[1], "gray");
            }
        }, v * draw_speed); 

        if (current.y == end_y && current.x == end_x) {reached_end = true; break;}

        explore_neighbours(current.y, current.x, current.d);

    }

    if (reached_end) {
        let path_y = end_y;
        let path_x = end_x;
        let path = []; // for use with settimeout
        let j = 0;
        while (true) {
            j++
            let i = prev[path_y][path_x];
            path_x -= dir_x[i];
            path_y -= dir_y[i];
            if (path_y == start_y && path_x == start_x) break;

            path.push([path_y,path_x])
            setTimeout(function drawPath() {
                let s = path.shift();
                draw(s[0], s[1], "mistyrose");
            }, j * draw_speed * 2   + v * draw_speed);
        }
    }
}
