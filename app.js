const canvas = document.getElementById("canvas");
const sliderH = document.getElementById("H");
const sliderS = document.getElementById("S");
const sliderL = document.getElementById("L");
const colorDiv = document.getElementById("color");

canvas.width = window.innerWidth < 420 ? window.innerWidth : 420;
canvas.height = canvas.width;
const WIDTH = canvas.width;

const CTX = canvas.getContext("2d");
const MARGIN = 40;

const GRAY = "#F0F0F0";
let GRID = [];
const UNIT = (WIDTH - 2*MARGIN)/5;


/*
 * Events
 */

canvas.addEventListener("touchstart", function(e) {
    onClick(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
    e.preventDefault();
});

canvas.addEventListener("click", function(e) {
    onClick(e.clientX, e.clientY);
});

sliderH.oninput = function() {
    updateColor();
}
sliderS.oninput = function() {
    updateColor();
}
sliderL.oninput = function() {
    updateColor();
}

function onClick(x, y) {
    let coords = getColRow(x - canvas.offsetLeft, y - canvas.offsetTop);
    if (coords !== null) {
        updateBlock(coords[0], coords[1], getColor());
    }
}


function getColor() {
    return "hsl(" + sliderH.value + "," + sliderS.value+ "%," + sliderL.value+"%)";
}


function init()
{
    // Set width for wrapper div
    document.getElementById("wrapper").style.width = WIDTH + "px";

    CTX.fillStyle = GRAY;
    CTX.fillRect(0, 0, WIDTH, WIDTH);

    initGrid();
    updateColor();

    // Show Instructions

    CTX.fillStyle = "black";
    CTX.font = "20px Arial";
    CTX.fillText("Click/Tap to add blocks", WIDTH/4.5, WIDTH/2);
}

function initGrid() {
    GRID = [];
    for (let i = 0; i < 5; i++) {
        GRID.push([]);
        for (let j = 0; j < 5; j++) {
            GRID[i].push(GRAY);
        }
    }

    update();
}



function getColRow(x, y) {
    x -= MARGIN;
    y -= MARGIN;

    if (x < 0 || y < 0 || x >= WIDTH || y >= WIDTH) {
        return null;
    }

    return [Math.floor(x/UNIT), Math.floor(y/UNIT)];
}

/*
 * Update Functions
 */
function updateBlock(i, j, color)
{
    if (color === null || color === GRID[i][j]) {
        color = GRAY;
    }

    GRID[i][j] = color;
    update();
}

function updateColor() {
    colorDiv.style.backgroundColor = getColor();
}

function update() {
    for (let i = 0; i < GRID.length; i++) {
        for (let j = 0; j < GRID.length; j++) {
            CTX.fillStyle = GRID[i][j];
            CTX.fillRect(MARGIN + i*UNIT, MARGIN + j*UNIT, UNIT, UNIT);
        }
    }
}

function getImageURL() {
    let url = canvas.toDataURL();
    location.href = url;
}

init();
