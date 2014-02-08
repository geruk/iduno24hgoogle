/**
If image == null, then show text only
*/
function question(questionStr, answerText, answerImageLink) {
	this.questionStr = questionStr;
	this.answerText = answerText;// ["adsf","adsf"]
	this.answerImageLink = answerImageLink; // ["link1", "link2"]
}

function makeQuestions(linkBank){
	var questions = [];
	for(var i = 0; i < linkBank.length; i ++){
		questions.push(new question(linkBank[i][0], linkBank[i][1], linkBank[i][2]));
	}
	return questions;
}

function shuffle(arr){
	if (arr != null){
		for (var i = 0 ; i < arr.length; i ++){
			var newIn = Math.floor(Math.random()*(arr.length - i) + i);
			var tmp = arr[i];
			arr[i] = arr[newIn];
			arr[newIn] = tmp;
		}
	}
	return arr;
}

var linkBank  = [["Click the following links", ["Twitter.com", "Twitler.com"],null],
				 ["Click the following links", ["facebook.com", "facelook.com"],null],
				 ["Click the following links", ["google.com", "googlec.om"],null],
				 ["Click the following links", ["youtube.com", "youtbue.com"],null],
				 ["Click the following links", ["examplee.com", "example.com"],null]];
var linkBank = shuffle(linkBank);
var questions = makeQuestions(linkBank);


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
