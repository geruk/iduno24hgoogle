// hold current player position
var currentPosition = 0;

/**
If image == null, then show text only
*/
function question(text, imagename) {
	this.text = text;
	this.imagename = imagename;
}

function makeQuestion(linkBank){
	var questions = [];
	for(var i = 0; i < linkBank.length; i ++){
		questions.push(new question(linkBank[i], null));
	}
	return questions;
}

function makeRandomQuestions(linkBank){
	var questions = [];
	for (var i = 0 ; i < linkBank.length; i ++){
		var newIn = Math.floor(Math.random()*(linkBank.length - i) + i);
		var tmp = linkBank[i];
		linkBank[i] = linkBank[newIn];
		linkBank[newIn] = tmp;
	}
	var questions = [];
	for (var i = 0; i < linkBank.length; i ++){
		questions.push(new question(linkBank[i]));
	}
	return questions;
}

var linkBank  = ["Twitter.com", "Twitler.com", "facebook.com", "facelook.com", "google.com", "gocgler.com"];
var questions = makeRandomQuestions(linkBank);

var GRID_WIDTH = 4;
var GRID_HEIGHT = 4;

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
	$("#element-15").append('<img src="img/destination.png">Destination');

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

function moveRight() {
    $('#element-' + currentPosition + ' img').fadeIn();
    currentPosition += 1;
    $('#element-' + currentPosition + ' img').fadeOut();
}

function moveBottom() {
    $('#element-' + currentPosition + ' img').fadeIn();
    currentPosition += 4;
    $('#element-' + currentPosition + ' img').fadeOut();
}

moveRight();
console.log(currentPosition);