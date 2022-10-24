const container = document.getElementById("button-container");

let level = 0;

let misc = [["🍎","🍐","🍊","🍋","🍓","🍇","🍉","🍌"],
            ["⚽️", "🏀", "🏐", "🏈", "⚾️", "🎱"],
            ["📱", "💻", "📷", "💿", "📞", "🧭", "🎚"],
            ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎"],
            ["🐶", "🦊", "🐱", "🐻", "🐭", "🐼", "🐹", "🐻‍❄️","🐰"],
            ["🐢", "🐙", "🐡", "🦍", "🐳", "🦃", "🐇", "🦜"]];
            
            
let faces = [["❤️", "💔", "🖍️", "⭕️", "🍎", "🔴", "🟥"],
            ["💙", "🌀", "🔵", "🔷", "🥏", "🧢", "🟦"],
            ["💛", "🟡", "🟨", "🍋", "⭐"],
            ["💚", "✅", "🍏", "🟩", "🍐", "🟢"],
            ["⬛️", "⚫️", "♠️", "🖤", "✔️", "🏴", "♣️", "♟️"]];

let color = [["😀", "😃", "😄", "😆", "😫"],
            ["😅", "🤣", "😢", "😓"],
            ["😯", "😦", "😮", "😲", "😵"],
            ["😝", "😜", "🤪", "😛"],
            ["🙂", "🙃", "☹️", "😕", "😟", "😐"]];

let flags = ["🇦🇲", "🇦🇹", "🇦🇿", "🇧🇴", "🇧🇬", "🇨🇴", "🇪🇪", "🇪🇬", "🇪🇨", "🇭🇷", "🇬🇶", "🇸🇻", "🇪🇹", "🇬🇦", "🇩🇪", "🇬🇭", "🇭🇳", "🇮🇷", "🇭🇺", "🇮🇶", "🇰🇼", "🇱🇺", "🇱🇹", "🇳🇱", "🇳🇮", "🇷🇺", "🇸🇱", "🇸🇩", "🇸🇾", "🇦🇪", "🇾🇪", "🇪🇭"]

// https://www.foolishdeveloper.com/2021/10/simple-stopwatch-using-javascript.html
let milliseconds = 0;
let seconds = 0;
let minutes = 0;
function displayTimer() {
    milliseconds += 10;
}

function start() {
    container.textContent = "";
    container.style.flexDirection = "row"; 
    container.style.flexWrap = "wrap";
    timer = setInterval(displayTimer,10);
    populate();
}

function populate() {
    
    let t = ""
    if (level < 3) {
        size = 3;
        let ind = Math.floor(Math.random()*misc.length);
        t = misc[ind];
        misc.splice(ind,1);
    }
    else if (level < 6) {
        size = 6;
        let ind = Math.floor(Math.random()*color.length);
        t = color[ind];
        color.splice(ind,1);
    }
    else if (level < 9) {
        size = 9;
        let ind = Math.floor(Math.random()*color.length);
        t = faces[ind];
        faces.splice(ind,1);
    }
    else if (level = 10) {
        size = 9;
        t = flags;
    }
    container.style.width = size * 5 + "rem";
    container.style.height = size * 5 + "rem";

    let eInd = Math.floor(Math.random() * t.length)
    let targetEmoji = t[eInd];
    document.getElementById("title").textContent = "Find " + targetEmoji;
    
    t.splice(eInd,1);
    let x = Math.floor(Math.random() * (size));
    let y = Math.floor(Math.random() * (size));
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            let emoji = document.createElement("span");
            if (i==x && j==y) {
                emoji.textContent = targetEmoji;
                emoji.setAttribute("onclick","next()");
            }
            else {
                emoji.textContent = t[Math.floor(Math.random() * t.length)];
            }
            container.appendChild(emoji);
        }
    }
}

function next() {
    container.textContent = "";
    level++;
    
    if (level < 11) {
        document.getElementById("level").textContent = "Level: " + (level+1);
        populate();
    }
    else {
        clearInterval(displayTimer);
        document.getElementById("title").textContent = "Good job!   "
        let congratulation = document.createElement("h2");
        congratulation.textContent = "Congratulations! Your time was: " + milliseconds / 1000.0 + " seconds";
        container.style.justifyContent = "center";
        container.append(congratulation);
    }
    
}