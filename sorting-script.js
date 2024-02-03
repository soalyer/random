var sidebar = document.getElementById("sidebar");

let canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');

names = ["bubble sort",
        "selection sort",
        "insertion sort",
        "merge sort",
        "heap sort",
        "quick sort",
        "shell sort",
        "bogo sort",
        "stooge sort",];

funcs = [bubbleSort,selectionSort,insertionSort,mergeSort,heapSort,quickSort,shellSort,bogoSort,stoogeSort,bubbleSort,
        ]


var play = document.getElementById("sort");
for (let i = 0; i < names.length; i++) {
    var b = document.createElement("button");
    b.innerText = names[i];
    b.onclick = function() {
        setSelectedButton(i);
        shuffle();
        play.onclick = function() {
            counter = 0;
            funcs[i]();
        };
    };
    sidebar.appendChild(b);
}

var selectedButton = 0;
setSelectedButton(0);
play.onclick = function() {
    counter = 0;
    funcs[0]();
};

function setSelectedButton(n) {
    sidebar.childNodes[selectedButton].style.background = "none";
    selectedButton = n;
    sidebar.childNodes[selectedButton].style.background = "rgba(255, 255, 255, 0.2)";
}

/* https://stackoverflow.com/a/12646864 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

var extraSettings = document.getElementById("extra-settings");
var settingsModal = document.getElementById("settings-modal");

extraSettings.onclick = function() {
    settingsModal.style.display = "block";
}

var r = document.querySelector(':root');
var rs = getComputedStyle(r);
var colors = ["#F5F1ED", "#090604", "#DCB990", "#895920", "#E1953B",
            "#E8E4E6", "#0C080A", "#D2A9BC", "#742E4E", "#CB4B87",
            "#E8E6E9", "#100E11", "#BDB2C2", "#54445A", "#8A6B96",
            "#EEF4E8", "#13180C", "#BFD1A3", "#366C3D", "#5CAE79",
            "#F1E5E5", "#160D0C", "#C99D9D", "#396865", "#6B78AE"]
var primary = rs.getPropertyValue("--primary");
var secondary = rs.getPropertyValue("--secondary");
function changeColor(n) {
    r.style.setProperty("--text", colors[n*5])
    r.style.setProperty("--background", colors[n*5+1])
    r.style.setProperty("--primary", colors[n*5+2])
    r.style.setProperty("--secondary", colors[n*5+3])
    r.style.setProperty("--accent", colors[n*5+4])
    primary = rs.getPropertyValue("--primary")
    secondary = rs.getPropertyValue("--secondary");
    drawGraph(nums);
}

window.onclick = function(event) {
    if (event.target == settingsModal) {
      settingsModal.style.display = "none";
    }
}
ctx.fillStyle = primary
ctx.fillRect(0,0,1080,720);


let highlightSwapped = false;
function switchHighlight() {
    highlightSwapped = document.getElementById("highlight-check").checked;
}
function drawGraph(array, rA = -1, rB = -1) {
    ctx.fillStyle = primary;
    ctx.fillRect(0,0,1080,720);
    let unit = 1080 / (array.length * 2 + 1)
    let x = unit / 1.5
    for (let i = 0; i < array.length; i++) {
        ctx.fillStyle = secondary;
        if (highlightSwapped && (i == rA || i == rB)) {
            ctx.fillStyle = "red";
            console.log(ctx.fillStyle)
        }
        ctx.fillRect(x,710,unit*1.66,-unit*1.33*array[i])
        x += unit*2
    }
}

function delayDrawGraph(arr, rA, rB) {
    let copy = JSON.parse(JSON.stringify(arr));
    let rrA = rA;
    let rrB = rB;
    setTimeout(() => {

        drawGraph(copy, rrA, rrB);
    }, counter * delay);
    counter++;
    
}
function isSorted(array) {
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i] > array[i+1]) {
            return false;
        }
    }
    return true;
}
/* https://stackoverflow.com/a/8860203 */
function stopSorting() {
    var id = window.setTimeout(function() {}, 0);
    while (id--) {
        window.clearTimeout(id); // will do nothing if no timeout with id is present
    }
}
function shuffle() {
    stopSorting();
    shuffleArray(nums);
    drawGraph(nums);
}

let recentA, recentB;
function swapNums(a,b) {
    recentA = a; recentB = b;
    temp = nums[b];
    nums[b] = nums[a];
    nums[a] = temp;
}

let counter = 0;
let delay = 30;
let nums = [...Array(parseInt(20)+1).keys()].slice(1);

let length = document.getElementById("count-input");
let del = document.getElementById("speed-input");
length.value = 20;
del.value = 30;

/* https://stackoverflow.com/a/10835227 */
function isPositiveInteger(n) {
    return n >>> 0 === parseFloat(n);
}

length.addEventListener('input', () => {
    if (isPositiveInteger(length.value)) {
        nums = [...Array(parseInt(length.value)+1).keys()].slice(1);
        drawGraph(nums);
    }
});

/* https://stackoverflow.com/a/175787 */
function isNumeric(str) {
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

del.addEventListener('input', () => {
    if (isNumeric(del.value)) {
        delay = parseFloat(del.value);
    }
});

shuffle();
drawGraph(nums);

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

function bubbleSort() {
    for (let i = 0; i < nums.length - 1; i++) {
        for (let j = 0; j < nums.length - i - 1; j++) {
            if (nums[j] > nums[j+1]) {
                swapNums(j,j+1);
                delayDrawGraph(nums, recentA, recentB);
            }
        }
    }
}

function selectionSort() {
    for (let i = 0; i < nums.length - 1; i++) {
        let min_idx = i;
        for (j = i + 1; j < nums.length; j++) {
            if (nums[j] < nums[min_idx]) {
                min_idx = j;
            }
        }

        if (min_idx != i) {
            swapNums(min_idx, i);
            delayDrawGraph(nums, recentA, recentB);
        }

    }
}

function insertionSort() {
    for (let i = 1; i < nums.length; i++) {
        let j = i;

        while (j > 0 && nums[j] < nums[j-1]) {
            swapNums(j, j - 1);
            delayDrawGraph(nums, recentA, recentB);
            j--;
        }    
    }
}

function merge(l, m, r) {
    let l2 = m + 1;

    if (nums[m] <= nums[l2]) return;

    while (l <= m && l2 <= r) {
        if (nums[l] <= nums[l2]) {
            l++;
        }
        else {
            let val = nums[l2];
            let ind = l2;

            while (ind != l) {
                nums[ind] = nums[ind - 1];
                delayDrawGraph(nums, ind, -1);
                ind--;
            }
            nums[l] = val;
            delayDrawGraph(nums, l, -1);

            l++; m++; l2++;
        }
    }
}

function mergeSort(l = 0, r = nums.length - 1) {
    if (l < r) {
        let m = Math.floor((l + r) / 2);

        mergeSort(l, m);
        mergeSort(m + 1, r);
        merge(l, m, r);
    }
}

function heapify(N, i) {
    let largest = i;

    let l = 2 * i + 1;
    let r = 2 * i + 2;

    if (l < N && nums[l] > nums[largest]) largest = l;
    if (r < N && nums[r] > nums[largest]) largest = r;

    if (largest != i) {
        swapNums(i, largest);
        delayDrawGraph(nums, recentA, recentB);
        
        heapify(N, largest);
    }
}
function heapSort() {
    for (let i = Math.floor(nums.length / 2) - 1; i >= 0; i--) {
        heapify(nums.length, i);
    }
    for (let i = nums.length - 1; i > 0; i--) {
        swapNums(0, i);
        delayDrawGraph(nums, recentA, recentB);
        
        heapify(i, 0);
    }
}

function partition(low, high) {
    let pivot = nums[high];

    let i = low - 1;

    for (let j = low; j <= high - 1; j++) {
        if (nums[j] < pivot) {
            i++;
            swapNums(i, j);
            delayDrawGraph(nums, recentA, recentB);
        }
    }

    swapNums(i + 1, high);
    delayDrawGraph(nums, recentA, recentB);
    return i + 1;
}
function quickSort(low = 0, high = nums.length - 1) {
    if (low < high) {
        
        let pi = partition(low, high);

        quickSort(low, pi - 1);
        quickSort(pi + 1, high);
    }
}

function shellSort() {
    for (let gap = Math.floor(nums.length / 2); gap > 0; gap = Math.floor(gap/2)) {
        for (let i = gap; i < nums.length; i++) {
            let temp = nums[i];
            let j;
            for (j = i; j >= gap && nums[j - gap] > temp; j -= gap) {
                nums[j] = nums[j - gap];
                delayDrawGraph(nums, j, -1);
            }

            nums[j] = temp;
            delayDrawGraph(nums, j, -1);
        }
    }
}

function gnomeSort() {
    let i = 0;

    while (i < nums.length) {
        if (i == 0) i++;
        if (nums[i] > nums[i-1]) i++;
        else {
            swapNums(i, i-1);
            delayDrawGraph(nums, recentA, recentB);
            i--;
        }
    }
}

function bogoSort() {
    let timeout = 0;
    while (!isSorted(nums)) {
        timeout++;
        for (let i = nums.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            swapNums(i, j);
            
        }
        delayDrawGraph(nums, recentA, recentB);
        if (timeout > 10000) break;
    }
}

function stoogeSort(i = 0, j = nums.length - 1) {
    if (nums[i] > nums[j]) {
        swapNums(i, j);
        delayDrawGraph(nums, recentA, recentB);
    }
    if ((j - i + 1) > 2) {
        let t = Math.floor((j - i + 1) / 3);
        stoogeSort(i, j-t);
        stoogeSort(i+t, j);
        stoogeSort(i, j-t);
    }
}