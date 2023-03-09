ready(function () {
    initializeBackground();
});

var resizeTimeout;
var resizeCooldown = 500;
var lastResizeTime = Date.now();

function initializeBackground() {
    canvas = document.getElementById("stars");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener("resize", function () {
        if (Date.now() - lastResizeTime < resizeCooldown && resizeTimeout) {
            clearTimeout(resizeTimeout);
            delete resizeTimeout;
        }

        lastResizeTime = Date.now();
        resizeTimeout = setTimeout(function () {
            fadeIn(canvas, 500);
            initializeStars();
        }, 500);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    initializeStars();
    (window.requestAnimationFrame && requestAnimationFrame(paintLoop)) ||
    setTimeout(paintLoop, ms);
}

var canvas;
var stars = [];

function rand(max) {
    return Math.random() * max;
}

function Star(canvas, size, speed) {
    this.ctx = canvas.getContext("2d");
    this.size = size;
    this.speed = speed;
    this.x = rand(window.innerWidth);
    this.y = rand(window.innerHeight);
}

function Comet(canvas, size, speed) {
    this.ctx = canvas.getContext("2d");
    this.size = size;
    this.speed = speed;
    this.x = 5;
    this.y = canvas.height;
    this.rotation = 0;
}

Star.prototype.animate = function (delta) {
    this.x += this.speed * delta;
    this.y -= this.speed * delta;
    if (this.y < 0) {
        this.y = window.innerHeight;
    }
    if (this.x > window.innerWidth) {
        this.x = 0;
    }
    this.ctx.fillStyle = "#f5f5f5";
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
};

Comet.prototype.animate = function (delta) {
    this.x += this.speed * delta;
    this.y -= this.speed * delta;
    if (this.y < 0) {
        this.y = window.innerHeight;
    }
    if (this.x > window.innerWidth) {
        this.x = 0;
    }
    this.rotation += 0.09; // update rotation angle
    this.ctx.save(); // save the current state of the canvas context
    this.ctx.translate(this.x + this.size / 2, this.y + this.size / 2); // move the context to the center of the comet
    this.ctx.rotate(this.rotation); // rotate the context by the rotation angle
    this.ctx.fillStyle = "#C11717";
    this.ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size); // draw the comet at the new rotated position
    this.ctx.restore(); // restore the previous state of the canvas context
};

function initializeStars() {
    var winArea = window.innerWidth * window.innerHeight;
    var smallStarsDensity = 0.0001;
    var mediumStarsDensity = 0.00005;
    var largeStarsDensity = 0.00002;
    var smallStarsCount = winArea * smallStarsDensity;
    var mediumStarsCount = winArea * mediumStarsDensity;
    var largeStarsCount = winArea * largeStarsDensity;
    var cometsDensity = 0.0003;
    var cometsCount = winArea * cometsDensity;
    stars = [];

    for (var i = 0; i < smallStarsCount; i++) {
        stars.push(new Star(canvas, 1.5, 30));
    }

    for (var i = 0; i < mediumStarsCount; i++) {
        stars.push(new Star(canvas, 3, 20));
    }

    for (var i = 0; i < largeStarsCount; i++) {
        stars.push(new Star(canvas, 5, 10));
    }

    for (var i = 0; i < cometsCount; i++) {
        stars.push(new Comet(canvas, 10, 230));
    }
}

function drawStars(delta) {
    for (var i = 0; i < stars.length; i++) {
        stars[i].animate(delta);
    }
}

var ms = 16;
var lastPaintTime = 0;

function paintLoop(timestamp) {
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    var delta =
        (window.requestAnimationFrame ? timestamp - lastPaintTime : ms) / 1000;
    if (delta > 0.05) {
        delta = 0.05;
    }
    drawStars(delta);
    (window.requestAnimationFrame && requestAnimationFrame(paintLoop)) ||
    setTimeout(paintLoop, ms);
    lastPaintTime = timestamp;
}

function ready(fn) {
    if (
        document.attachEvent ?
        document.readyState === "complete" :
        document.readyState !== "loading"
    ) {
        fn();
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}


function fadeIn(element, duration, callback) {
    element.style.opacity = 0;
    element.style.display = "block";

    var startTime = Date.now();
    var tick = function () {
        var newOpacity = (Date.now() - startTime) / duration;
        if (newOpacity > 1) {
            newOpacity = 1;
            callback && callback();
        } else {
            (window.requestAnimationFrame && requestAnimationFrame(tick)) ||
            setTimeout(tick, 16);
        }

        element.style.opacity = newOpacity;
    };
    tick();
}
