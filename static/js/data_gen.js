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

function shuffleAnswer(questions){
	// shuffle answers
	for (var i = 0; i < questions.length; i ++){
		var question = questions[i];
		// swap two answer options of every type
		for (var j = 1; j < question.length; j ++){
			if (question[j] != null){
				var tmp = question[j][0];
				question[j][0] = question[j][1]
				question[j][1] = tmp;
			}	
		}
	}
	return questions;
}

// by default, each question has 2 answers of each type, the first answer is the correct one.
// for the prototype, we assume that the user can go back only once.
var questionsBank  = [["Click the following links", ["Twitter.com", "Twitler.com"],null],
				 ["Click the following links", ["facebook.com", "facelook.com"],null],
				 ["Click the following links", ["google.com", "googlec.om"],null],
				 ["Click the following links", ["youtube.com", "youtbue.com"],null],
				 ["Click the following links", ["example.com", "exampleeee.com"],null],
				 ["Click the following links", ["neweggs.com", "newegg.com"],null],
				 ["Which button is the right download button", null, ["button.png", "wrong_button2.png"]],
				 ["Which button is the right download button", null, ["downloadButton1.img", "fake_downloadButton1.img"]],
				 ["question1", ['right', 'wrong'],null],
				 ["question2", ['right', 'wrong'], null]];
var questionsBank = shuffle(questionsBank); // shuffle all questions
var goRightQuestionsBank = questionsBank.slice(0, questionsBank.length/2);// go right if player gives correct answer
var goDownQuestionsBank = questionsBank.slice(questionsBank.length/2, questionsBank.length);
goDownQuestionsBank = shuffleAnswer(goDownQuestionsBank);// make the correct answer to be the 2nd.

var goRightQuestions = makeQuestions(goRightQuestionsBank);
var goDownQuestions = makeQuestions(goDownQuestionsBank);
var MAX_RIGHT = 3;
var MAX_DOWN = 3;
var goRightIndex = 0;
var goDownIndex = 0;
var goRight = 0;
var goDown = 0;
function nextQuestion(){
	var chooseQuestion = Math.floor(Math.random()*2);
	var question = null;
	if (chooseQuestion == 0){
		if (goRight < MAX_RIGHT && goRightIndex < goRightQuestions.length){
			question = goRightQuestions[goRightIndex];
			goRightIndex += 1;
			goRight += 1;
		}else if (goDown < MAX_DOWN && goDownIndex < goDownQuestions.length){
			question = goDownQuestions[goDownIndex];
			goDownIndex += 1;
			goDown += 1;
		}else{
			console.log("Cannot get more questions")
		}
	}else{
		if (goDown < MAX_DOWN && goDownIndex < goDownQuestions.length){
			question = goDownQuestions[goDownIndex];
			goDownIndex += 1;
			goDown += 1;
		}else if (goRight < MAX_RIGHT && goRightIndex < goRightQuestions.length){
			question = goRightQuestions[goRightIndex];
			goRightIndex += 1;
			goRight += 1;
		}else{
			console.log("Cannot get more questions");
		}
	}
	return question;
}

function decreaseGoDown(){
	goDown -= 1;
}

function decreaseGoRight(){
	goRight -= 1;
}

