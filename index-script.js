class Website {
    constructor(name, url, background_image) {
        this.name = name;
        this.url = url;
        this.bg = background_image;
    }
}

websites = [
    new Website("Red box blue box", "https://soalyer.github.io/red-box-blue-box/", "rbbb.png"),
    new Website("Mandelbrot", "https://soalyer.github.io/random/fractal", "fractal.png"),
    new Website("Find the emoji", "https://soalyer.github.io/random/emoji", "emoji.png"),
    new Website("Search algorithm", "https://soalyer.github.io/random/search", "search.png"),
    new Website("Color guesser", "https://soalyer.github.io/random/colours", "colours.png"),
    new Website("Maze generator", "https://soalyer.github.io/random/maze", "maze.png"),
    new Website("Icosahedron", "http://soalyer.github.io/random/icosahedron", "icosahedron.png"),
    new Website("Buffon's needle", "https://soalyer.github.io/random/buffon", "buffon.png"),
    new Website("Bogosort", "https://soalyer.github.io/random/bogo", "bogo.png"),
];

project_container = document.getElementById("projects");

for (let site of websites) {
    const button = document.createElement("a");
    button.classList.add("site");
    button.style.backgroundImage = "url(site-icons/" + site.bg + ")"; 
    button.href = site.url; 
    button.innerText = site.name;
    project_container.appendChild(button);
}
