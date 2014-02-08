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