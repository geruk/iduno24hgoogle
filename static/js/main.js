// hold current player position
var currentPosition = 0,
    score = 0;


var GRID_WIDTH = 4;
var GRID_HEIGHT = 4;
var modal_backup = $('#puzzleModal').clone();

var puzzles = [
	{
		file: "p1.html",
		name: "Mispelled Links",
		time: 15,
		score: 10
	},
	{
		file: "p2.html",
		name: "Retrieve the treasure",
		time: 20,
		score: 10
	},
	{
		file: "p3.html",
		name: "Some treasures are poisonous",
		time: 20,
		score: 10
	},
	{
		file: "p4.html",
		name: "Gears upgrade?",
		time: 10,
		score: 10
	},
	{
		file: "p5.html",
		name: "Double edged",
		time: 10,
		score: 10
	},
	{
		file: "p6.html",
		name: "Hovering Links",
		time: 15,
		score: 10
	}
];

function shuffle (arr){
	for(var i = 0 ; i < arr.length; i++){
		var newIndex = Math.floor(Math.random()*(arr.length - i) + i);
		var tmp = arr[i];
		arr[i] = arr[newIndex];
		arr[newIndex] = tmp;
	}
	return arr;
}
puzzles = shuffle(puzzles);

var numPuzzles = 0;

console.log(puzzles);

$(document).on( "ready", function() {

    var $body = $('body'),
        $gridBox = $('.grid-box'),
        $infoBox = $('.info-box');

	var matrix = $(".grid-box");
	for (i = 0; i < GRID_WIDTH; i++) {
		row = $('<div class=" Minh nghi la row-fluid"></div>');
		for (j = 0; j < GRID_HEIGHT; j++) {
			s = "element-"+(i*GRID_WIDTH+j);
			cell = $('<div class="span3"></div>');
			cell.append($("<div class='well' id='"+s+"'></div>"));
			row.append(cell);
		}
		matrix.append(row);
	}
	var init_cell = $("#element-0");
	init_cell.append('<img src="http://nycirclek.org/wp-content/uploads/the-legend-of-zelda-8-bit-link.gif" style="height:100%;">');
	$("#element-15").append('<img src="img/destination.png">Destination');
	blinking();

    var bodyHeight = $body.height();
    $gridBox.height(bodyHeight).width(bodyHeight);
    var $span3 = $('.span3');
    var spanWidth = $span3.parent().parent().width()*0.25;
    $span3.height(spanWidth).width(spanWidth);
    $('.well').height($('.well').width());

    $('.well').hover(function() {
		var target = event.currentTarget;
		var targetId = parseInt($(target).attr('id').substring(8));

        if (currentPosition + 1 == targetId || currentPosition + 4 == targetId) {

			var distance = 10;
			var time = 250;

			// tracker
			var beingShown = false;
			var shown = false;

			var trigger = $('.trigger', this);
			var popup = $('.popup', this).css('opacity', 0);
			$(this).css('cursor','pointer');

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
		}

	}, function() {
    	var target = event.currentTarget;
        var targetId = parseInt($(target).attr('id').substring(8));
        if (currentPosition + 1 == targetId || currentPosition + 4 == targetId) {
			var popup = $('.popup', this).css('opacity', 0);
			$(this).css('cursor','auto');

			var distance = 10;
			var time = 250;
			var hideDelay = 500;

			// store the timer so that it can be cleared in the mouseover if required
			hideDelayTimer = setTimeout(function () {
				hideDelayTimer = null;
				popup.animate({
				top: '-=' + distance + 'px',
				opacity: 0
				}, time, 'swing', function () {
				// hide the popup entirely after the effect (opacity alone doesn't do the job)
				popup.css('display', 'none');
				});
			}, hideDelay);
		}
	});

    $('.well').on('click', function(event){

        var target = event.currentTarget;
        var targetId = parseInt($(target).attr('id').substring(8));
        $('#element-'+currentPosition).data("target", target).data("time", new Date().getTime());

        if (currentPosition + 1 == targetId || currentPosition + 4 == targetId) {

        	if (currentPosition + 4 == targetId) {
        		var temp = puzzles[numPuzzles];
        		puzzles[numPuzzles] = puzzles[numPuzzles+1];
        		puzzles[numPuzzles+1] = temp;
        	}

        	if(targetId != 15){
                
            } else {
    			$(target).html('');
        	}
        	$("#puzzleModal").modal({backdrop:"static", keyboard:false, remote:puzzles[numPuzzles].file});
        }
    });
});

function complete_puzzle() {
	numPuzzles++;
	$('#puzzleModal').modal('hide').remove();
	$('body').prepend(modal_backup.clone());
	var target = $('#element-'+currentPosition).data("target");
	t = new Date().getTime() - $('#element-'+currentPosition).data("time");
	debugger;
	updateScore(Math.floor(score+(puzzles[numPuzzles-1].time-t/1000)*puzzles[numPuzzles-1].score));

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
        if (currentPosition == 15) {
        	endGame(true);
        } else blinking();
    });

    var arch = $('<div class="arch"></div>');
    console.log(currentPosition);
	arch.append('<img src="img/check.png" width="25"> '+puzzles[numPuzzles-1].name);
	$(".options-box .panel-body").prepend(arch);
}

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
                                        puzzles[numPuzzles].name+
                                    '</div></div>');
		$('#element-' + (currentPosition+1)).append(bubble);
	}
	if (currentPosition+4 < GRID_HEIGHT*GRID_WIDTH) {
		$('#element-' + (currentPosition+4)).fadeIn(1000).fadeOut(1000).fadeIn(1000);
		var bubble = $('<div class="bubbleInfo"></div>');
		bubble.append('<img src="img/go_bot.png" class="trigger" />');
		bubble.append('<div class="popup">'+
                                    '<div class="alert alert-success">'+
                                        puzzles[numPuzzles+1].name+
                                    '</div></div>');
		$('#element-' + (currentPosition+4)).append(bubble);
	}
}

function endGame(isWon) {
	var modalbox = $("#resultModal .modal-body");
	modalbox.find(".final_score").text($(".score").text());
	if (isWon) {
		modalbox.append("You won");
	} else modalbox.append("You lose");
	$("#resultModal").modal({backdrop:"static", keyboard:false});
}
