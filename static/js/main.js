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

	var GRID_WIDTH = 4;
	var GRID_HEIGHT = 4;

	var matrix = $(".grid-box");
	for (i = 0; i < GRID_WIDTH; i++) {
		row = $('<div class="row-fluid"></div>');
		for (j = 0; j < GRID_HEIGHT; j++) {
			s = "element-"+(i*GRID_WIDTH+j);
			cell = $('<div class="span3"></div>');
			cell.append($("<div class='well' id='"+s+"'></div>"));
			row.append(cell);
		}
		matrix.append(row);
	}
	var init_cell = $("#element-0");
	init_cell.append('<img src="img/firefox.png" class="img-circle">');
	$("#element-15").append('<img src="http://www.clker.com/cliparts/b/7/6/5/1308001441853739087google%20maps%20pin.svg">Destination');

    var bodyHeight = $body.height();
    $gridBox.height(bodyHeight).width(bodyHeight);
    var $span3 = $('.span3');
    console.log($span3.parent().parent().width());
    var spanwidth = $span3.parent().parent().width()*0.25;
    $span3.height(spanwidth).width(spanwidth);
    x = $('.well').width();
    console.log(x);
    $('.well').height(x);
});
