// hold current player position
var currentPosition = 0,
    score = 0;

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
	init_cell.append('<img src="img/chrome_girl.png" style="height:100%;">');
	$("#element-15").append('<img src="img/destination.png">Destination');
	blinking();

    var bodyHeight = $body.height();
    $gridBox.height(bodyHeight).width(bodyHeight);
    var $span3 = $('.span3');
    console.log($span3.parent().parent().width());
    var spanWidth = $span3.parent().parent().width()*0.25;
    $span3.height(spanWidth).width(spanWidth);
    x = $('.well').width();
    console.log(x);
    $('.well').height(x);

    $('.well').hover(function() {
    	var target = event.currentTarget;
        var targetId = parseInt($(target).attr('id').substring(8));

        if (currentPosition + 1 == targetId || currentPosition + 4 == targetId) {
			$(this).css('cursor','pointer');
		}
	}, function() {
		$(this).css('cursor','auto');
	});


    $('.well').on('click', function(event){
        var target = event.currentTarget;
        var targetId = parseInt($(target).attr('id').substring(8));

        if (currentPosition + 1 == targetId || currentPosition + 4 == targetId) {
            if (targetId == 15) {
                $(target).html('');
            }

            if (currentPosition%4+1 < GRID_WIDTH) {
            	$('#element-' + (currentPosition+1)).html("");
            }
            if (currentPosition+4 < GRID_HEIGHT*GRID_WIDTH) {
            	$('#element-' + (currentPosition+4)).html("");
            }

            $('#element-' + currentPosition).find('img').fadeOut('fast', function() {
                $('#element-' + currentPosition).append('<img src="img/foot.png" style="height:40px; width: 40px; padding: 50px;">');
                $(this).appendTo($(target)).fadeIn('fast');
                currentPosition = parseInt($(target).attr('id').substring(8));
                blinking();
            });
        }
    });

    $('.bubbleInfo').each(function () {
	    // options
	    var distance = 10;
	    var time = 250;
	    var hideDelay = 500;

	    var hideDelayTimer = null;

	    // tracker
	    var beingShown = false;
	    var shown = false;
	    
	    var trigger = $('.trigger', this);
	    var popup = $('.popup', this).css('opacity', 0);

	    // set the mouseover and mouseout on both element
	    $([trigger.get(0), popup.get(0)]).mouseover(function () {
	      // stops the hide event if we move from the trigger to the popup element
	      if (hideDelayTimer) clearTimeout(hideDelayTimer);

	      // don't trigger the animation again if we're being shown, or already visible
	      if (beingShown || shown) {
	        return;
	      } else {
	        beingShown = true;

	        // reset position of popup box
	        popup.css({
	          top: -10,
	          left: -33,
	          width: 400,
	          display: 'block' // brings the popup back in to view
	        })

	        // (we're using chaining on the popup) now animate it's opacity and position
	        .animate({
	          top: '-=' + distance + 'px',
	          opacity: 1
	        }, time, 'swing', function() {
	          // once the animation is complete, set the tracker variables
	          beingShown = false;
	          shown = true;
	        });
	      }
	    }).mouseout(function () {
	      // reset the timer if we get fired again - avoids double animations
	      if (hideDelayTimer) clearTimeout(hideDelayTimer);
	      
	      // store the timer so that it can be cleared in the mouseover if required
	      hideDelayTimer = setTimeout(function () {
	        hideDelayTimer = null;
	        popup.animate({
	          top: '-=' + distance + 'px',
	          opacity: 0
	        }, time, 'swing', function () {
	          // once the animate is complete, set the tracker variables
	          shown = false;
	          // hide the popup entirely after the effect (opacity alone doesn't do the job)
	          popup.css('display', 'none');
	        });
	      }, hideDelay);
	    });
	  });
});

/*
 * Update Score Functions
 */
function updateScore(newScore) {
    // update global variable
    score = newScore;

    // update html
    var $score = $('.score');
    $score.text(newScore);
}

function blinking() {
	if (currentPosition%4+1 < GRID_WIDTH) {
		$('#element-' + (currentPosition+1)).fadeIn(1000).fadeOut(1000).fadeIn(1000);
		var bubble = $('<div class="bubbleInfo"></div>');
		bubble.append('<img src="img/go_right.png" class="trigger" />');
		bubble.append('<div class="popup">'+
                                    '<div class="alert alert-success">'+
                                        '<a href="#twitter.com" alt="Twitter">twitter.com</a>'+
                                    '</div></div>');
		$('#element-' + (currentPosition+1)).append(bubble);
	}
	if (currentPosition+4 < GRID_HEIGHT*GRID_WIDTH) {
		$('#element-' + (currentPosition+4)).fadeIn(1000).fadeOut(1000).fadeIn(1000);
		var bubble = $('<div class="bubbleInfo"></div>');
		bubble.append('<img src="img/go_bot.png" class="trigger" />');
		bubble.append('<div class="popup">'+
                                    '<div class="alert alert-success">'+
                                        '<a href="#twitter.com" alt="Twitter">twitter.com</a>'+
                                    '</div></div>');
		$('#element-' + (currentPosition+4)).append(bubble);
	}
}

// setInterval(function() {
// 	blinking();
// }, 1);
