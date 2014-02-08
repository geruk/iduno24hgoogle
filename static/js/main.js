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
    var $span3 = $('.span3');
    var spanwidth = $span3.width();
    $span3.height(spanwidth).width(spanwidth);
});
