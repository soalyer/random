let page = 1;
const max_page = 5;
let page_num = document.getElementById("page-number");
let page_text = document.getElementById("page-text");
const pages_text = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque blandit, felis ut posuere mollis, at fermentum nulla sem sit amet metus. Aenean mollis tempor purus, at tempor ante facilisis eu.
    
    Nullam semper leo nec est lacinia tempus. Morbi congue rutrum est ut volutpat. Phasellus ut commodo arcu, at auctor nisi.
    `,
    `test text
    abc
    blablablalblablabl
    `,
    ``,
    ``,
    ``
]

function next() {
    if (page == max_page) return;
    page++;
    page_num.innerText = page + "/" + max_page;
    page_text.innerText = pages_text[page-1];
}

function previous() {
    if (page == 1) return;
    page--;
    page_num.innerText = page + "/" + max_page;
    page_text.innerText = pages_text[page-1];
}


const fractals_list = [
    {
        "name": "Mandelbrot",
        "equation": "f(z) = z^2 + c",
        "iterations": 30
    },
    {
        "name": "test",
        "equation": "f(z) = cos(z) + c",
        "iterations": 20
    },
    {
        "name": "test3",
        "equation": "f(z) = cos(z) + c",
        "iterations": 20
    },
    {
        "name": "test4",
        "equation": "f(z) = cos(z) + c",
        "iterations": 20
    }
]

function isPositiveInteger(n) {
    return n >>> 0 === parseFloat(n);
}

function start() {
    document.getElementById("sidebar").innerHTML = ` <div id="buttons-list"> <h1>Select Fractal</h1> <br> <input type="text" id="iter" name="iter" placeholder="Enter iterations (default 500)"> <br><br> </div>`;
    let list = document.getElementById("buttons-list");

    for (let i = 0; i < fractals_list.length; i++) {
        let d = document.createElement("div");
        d.setAttribute("onclick","fractal("+i+");");
        let b = document.createElement("p");
        b.innerText = fractals_list[i].name;
        d.appendChild(b);

        list.appendChild(d);

        

    }
    let iter = document.getElementById("iter");
    iter.addEventListener('input', () => {
        if (iter.value === "") {
            maxIter = 500;
            fractal(currentf);
        }
        if (isPositiveInteger(iter.value)) {
            maxIter = parseInt(iter.value);
            fractal(currentf);
        }
    });
}
