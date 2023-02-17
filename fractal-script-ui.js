let page = 1;
const max_page = 5;
let page_num = document.getElementById("page-number");
let page_text = document.getElementById("page-text");
const pages_text = [
    `The mandelbrot set is a famous fractal, and my favourite example of mathematical beauty.
    
    It is an excellent example of how an intricate structure can be generated from very simple rules.

    Read through the next few pages to see how it is made, or click start to view the different fractals.
    `,
    `From Wikipedia:

    The Mandelbrot set is the set of complex numbers \\(c\\) for which the function \\(f_{c}\\left( z \\right)=z^{2}+c\\) does not diverge to infinity when iterated from \\(z=0\\), i.e., for which the sequence \\(f_{c}\\left( 0 \\right)\\), \\(f_{c}\\left(f_{c}\\left( 0 \\right)\\right)\\), etc., remains bounded in absolute value.
    
    So what exactly does this mean?
    `,
    `For every point on the complex plane, let's start with two complex numbers: 

    \\(z\\), which starts at 0.
    \\(c\\), which is the complex number for that point. 
    
    Now, we can take \\(z\\), and repeatedly apply the following function to it:

    \\(f_{c}\\left( z \\right)=z^{2}+c\\)

    If \\(z\\) diverges to infinity, then, we can colour that pixel black.
    `,
    `Let's say that we apply the function 10 times, and we see that \\(z\\) does not diverge to infinity, so we can colour the pixel black.

    But what if it does diverge to infinity, after 100 iterations of the function? 

    We can't apply the function forever, so we need a certain cutoff point. By default, this is 500 iterations.
    `,
    `Click start to see all the different fractals generated this way.
    
    Each fractal is created using a different equation.`
]
page_text.innerText = pages_text[page-1];
function next() {
    if (page == max_page) return;
    page++;
    page_num.innerText = page + "/" + max_page;
    page_text.innerText = pages_text[page-1];
    MathJax.typeset();
}

function previous() {
    if (page == 1) return;
    page--;
    page_num.innerText = page + "/" + max_page;
    page_text.innerText = pages_text[page-1];
    MathJax.typeset();
}


const fractals_list = [
    {
        "name": "Mandelbrot",
        "equation": "\\(f_{c}\\left( z \\right)=z^{2}+c\\)",
        "iterations": 30
    },
    {
        "name": "interesting fractal",
        "equation": "\\(f_{c}\\left( z \\right)=e^{z}+c\\)",
        "iterations": 20
    },
    {
        "name": "test2",
        "equation": "",
        "iterations": 20
    },
    {
        "name": "test3",
        "equation": "",
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
        let invis = document.createElement("p");
        let b = document.createElement("p");
        let eq = document.createElement("p");
        invis.innerText = "";
        b.innerText = fractals_list[i].name;
        eq.innerText = fractals_list[i].equation;
        d.appendChild(invis);
        d.appendChild(b);
        d.appendChild(eq);
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
    MathJax.typeset();
}
