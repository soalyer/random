let canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');

/* https://stackoverflow.com/a/12646864 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


ctx.fillStyle = "#DCB0BA";
ctx.fillRect(0,0,1080,720);



function drawGraph(array) {
    ctx.fillStyle = "#DCB0BA";
    ctx.fillRect(0,0,1080,720);
    let unit = 1080 / (array.length * 2 + 1)
    let x = unit / 1.5
    for (let i = 0; i < array.length; i++) {
        ctx.fillStyle = "#A675A1";
        ctx.fillRect(x,710,unit*1.66,-unit*1.33*array[i])
        x += unit*2
    }
}

function isSorted(array) {
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i] > array[i+1]) {
            return false;
        }
    }
    return true;
}

function shuffle() {
    shuffleArray(nums);
    drawGraph(nums);
}

function sort() {
    if (isSorted(nums)) {return};
    shuffleArray(nums);
    drawGraph(nums);
    requestAnimationFrame(sort);
    
}

/* https://stackoverflow.com/a/10835227 */
function isPositiveInteger(n) {
    return n >>> 0 === parseFloat(n);
}
let length = document.getElementById("length")
length.value = "6";

let nums = [1, 2, 3, 4, 5, 6]

length.addEventListener('input', () => {
    if (isPositiveInteger(length.value)) {
        nums = [...Array(parseInt(length.value)+1).keys()].slice(1);
        drawGraph(nums);
    }
  });


drawGraph(nums);