// hold current player position
var currentPosition = 0,
    score = 0;


var GRID_WIDTH = 4;
var GRID_HEIGHT = 4;

$(document).on( "ready", function() {
    var $body = $('body'),
        $gridBox = $('.grid-box'),
        $infoBox = $('.info-box');

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

        if (currentPosition + 1 == targetId || currentPosition + 4 == targetId) {
            if (targetId == 15) {
                $(target).html('');
                endGame();
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

function endGame(isWon) {
	var modalbox = $("#resultModal .modal-body");
	modalbox.find(".final_score").text($(".score").text());
	if (isWon) {
		modalbox.append("You won");
	} else modalbox.append("You lose");
	$("#resultModal").modal({backdrop:"static", keyboard:false});
}

// setInterval(function() {
// 	blinking();
// }, 1);
