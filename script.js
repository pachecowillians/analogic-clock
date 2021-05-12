var canvas = document.querySelector("#clockArea");
var context = canvas.getContext('2d');

var intervalId = window.setInterval(function () {
    updateScreen();
}, 1000);

function drawCircle(context, x, y, r, color) {
    context.strokeStyle = color;
    context.lineWidth = 14;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2, true);
    context.stroke();
    context.closePath();
}

function drawLine(context, xi, yi, xf, yf, color, width) {
    context.strokeStyle = color;
    context.lineWidth = width;
    context.lineCap = 'round';
    context.beginPath();
    context.moveTo(xi, yi);
    context.lineTo(xf, yf);
    context.stroke();
    context.closePath();
}

function drawLineRadially(context, ri, rf, value, divisions, initialValue, color, width) {
    xf = (rf - ri) * Math.sin(2 * Math.PI * value / divisions) + initialValue
    yf = -(rf - ri) * Math.cos(2 * Math.PI * value / divisions) + initialValue
    drawLine(context, initialValue, initialValue, xf, yf, color, width);
}


function updateScreen() {
    var today = new Date();
    var hours = today.getHours();
    var minutes = today.getMinutes();
    var seconds = today.getSeconds();
    drawClock(context, { hours, minutes, seconds });
    updateCounter({ hours, minutes, seconds });
}

function updateCounter({ hours, minutes, seconds }) {
    var digitalClock = document.querySelector("h1");
    digitalClock.innerHTML = ("00" + hours).slice(-2) + ':' + ("00" + minutes).slice(-2) + ':' + ("00" + seconds).slice(-2);
}

function drawClock(context, { hours, minutes, seconds }) {

    context.clearRect(0, 0, canvas.width, canvas.height);
    // Circle
    drawCircle(context, 250, 250, 200, '#000');

    //Clock details
    drawLine(context, 250, 50, 250, 75, "#000", 8);
    drawLine(context, 250, 425, 250, 450, "#000", 8);
    drawLine(context, 425, 250, 450, 250, "#000", 8);
    drawLine(context, 425, 250, 450, 250, "#000", 8);
    drawLine(context, 50, 250, 75, 250, "#000", 8);

    //Pointers

    drawLineRadially(context, 0, 100, hours, 12, 250, "#000", 8);
    drawLineRadially(context, 0, 140, minutes, 60, 250, "#000", 8);
    drawLineRadially(context, 0, 175, seconds, 60, 250, "#F00", 5);
}

