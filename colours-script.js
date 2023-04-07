
var lines
fetch('color.names.rgbonly.txt')
  .then(response => response.text())
  .then(text => lines = text.split('\n'))
  .then(text => setColour())
var colorPicker = new iro.ColorPicker("#picker", {
    width: window.innerWidth <= 850 ? window.innerWidth * 0.60 : window.innerWidth * 0.20,
    color: "#f00"
  });
colorPicker.on('color:change', function(color) {
    document.getElementById("colour").style.backgroundColor = color.hexString;
    document.getElementById("guess-colour").style.backgroundColor = color.hexString;
});

var rr, gg, bb, nam;
function setColour() {
    col = lines[Math.floor(Math.random()*lines.length)].split(' ')
    rr = col[0];
    gg = col[1];
    bb = col[2];
    nam = col.slice(3,col.length).join(' ');
    document.getElementById("colour-name").innerText = nam;
    document.getElementById("colour-name-after").innerText = nam + ":";
    document.getElementById("real-colour").style.backgroundColor = `rgb(${rr},${gg},${bb})`;
}

function select() {
    let real_rgb = Object.values(colorPicker.color.rgb);
    let [L1, A1, B1] = Colour.rgba2lab(real_rgb[0],real_rgb[1],real_rgb[2])
    let [L2, A2, B2] = Colour.rgba2lab(rr,gg,bb)
    console.log(L1, A1, B1, L2, A2, B2)
    console.log(Colour.deltaE00(L1, A1, B1, L2, A2, B2))
    document.getElementById("modal-title").innerText = "Good job! Similarity: " + (Math.round((100-Colour.deltaE00(L1, A1, B1, L2, A2, B2)) * 100)/100) + "%";
    document.getElementById("modal").style.display = "flex";
}

function try_again() {
    setColour();
    document.getElementById("modal").style.display = "none";
}

//https://github.com/antimatter15/rgb-lab
function deltaE(rgbA, rgbB) {
    let labA = rgb2lab(rgbA);
    let labB = rgb2lab(rgbB);
    let deltaL = labA[0] - labB[0];
    let deltaA = labA[1] - labB[1];
    let deltaB = labA[2] - labB[2];
    let c1 = Math.sqrt(labA[1] * labA[1] + labA[2] * labA[2]);
    let c2 = Math.sqrt(labB[1] * labB[1] + labB[2] * labB[2]);
    let deltaC = c1 - c2;
    let deltaH = deltaA * deltaA + deltaB * deltaB - deltaC * deltaC;
    deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH);
    let sc = 1.0 + 0.045 * c1;
    let sh = 1.0 + 0.015 * c1;
    let deltaLKlsl = deltaL / (1.0);
    let deltaCkcsc = deltaC / (sc);
    let deltaHkhsh = deltaH / (sh);
    let i = deltaLKlsl * deltaLKlsl + deltaCkcsc * deltaCkcsc + deltaHkhsh * deltaHkhsh;
    return i < 0 ? 0 : Math.sqrt(i);
  }
  
  function rgb2lab(rgb){
    let r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255, x, y, z;
    r = (r > 0.04045) ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
    g = (g > 0.04045) ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
    b = (b > 0.04045) ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
    x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
    y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000;
    z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;
    x = (x > 0.008856) ? Math.pow(x, 1/3) : (7.787 * x) + 16/116;
    y = (y > 0.008856) ? Math.pow(y, 1/3) : (7.787 * y) + 16/116;
    z = (z > 0.008856) ? Math.pow(z, 1/3) : (7.787 * z) + 16/116;
    return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)]
  }