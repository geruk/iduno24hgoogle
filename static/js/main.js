/**
If image == null, then show text only
*/
function question(text, imagename) {
	this.text = text;
	this.imagename = imagename;
}

var questions = [];
questions.push(new question("Twitter.com", null));
questions.push(new question("Twitler.com", null));

var GRID_WIDTH = 4;
var GRID_HEIGHT = 4;

// var matrix = $("#matrix");
// for (var i = 0; i < GRID_WIDTH; i++) {
// 	matrix.append($("<div class='container'>"));
// 	matrix.append($("</div>"));
// }

/*
var CANVAS_WIDTH = 480;
var CANVAS_HEIGHT = 320;
var FPS = 30;

var canvasElement = $("<canvas width='" + CANVAS_WIDTH + "' height='" + CANVAS_HEIGHT + "'></canvas>");
var canvas = canvasElement.get(0).getContext("2d");
canvasElement.appendTo('body');

setInterval(function() {
	update();
	draw();
}, 1000/FPS);

var textX = 50;
var textY = 50;

function update() {
	textX += 1;
	textY += 1;
}

function draw() {
	canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	canvas.fillStyle = "#000";
	canvas.fillText("Sup Bro!", textX, textY);
}
*/

$(document).on( "ready", function() {
    var $body = $('body'),
        $gridBox = $('.grid-box'),
        $infoBox = $('.info-box');

    var bodyHeight = $body.height();

    $gridBox.height(bodyHeight).width(bodyHeight);
});
