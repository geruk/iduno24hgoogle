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
				 ["Click the following links", ["examplee.com", "example.com"],null],
				 ["Click the following links", ["neweggs.com", "newegg.com"],null]];
var linkBank = shuffle(linkBank);
var questions = makeQuestions(linkBank);