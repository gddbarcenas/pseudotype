const quotes = [
	"We cannot solve problems with the kind of thinking we employed when we came up with them.",
	"Learn as if you will live forever, live like you will die tomorrow.",
	"Stay away from those people who try to disparage your ambitions. Small minds will always do that, but great minds will give you a feeling that you can become great too.",
	"When you give joy to other people, you get more joy in return. You should give a good thought to happiness that you can give out.",
	"When you change your thoughts, remember to also change your world.",
	"It is only when we take chances, when our lives improve. The initial and the most difficult risk that we need to take is to become honest.",
	"Nature has given us all the pieces required to achieve exceptional wellness and health, but has left it to us to put these pieces together.",
	"Nature has given us all the pieces required to achieve exceptional wellness and health, but has left it to us to put these pieces together.",
	"It is better to fail in originality than to succeed in imitation.",
	"The road to success and the road to failure are almost exactly the same.",
	"Experience is a hard teacher because she gives the test first, the lesson afterwards.",
	"Concentrate all your thoughts upon the work in hand. The sun's rays do not burn until brought to a focus.",
	"Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle. As with all matters of the heart, you'll know when you find it.",
	"You've got to get up every morning with determination if you're going to go to bed with satisfaction"
];

const test = document.querySelector(".word-test");
const time = document.querySelector(".curr-time");
const wpm = document.querySelector(".wpm");
const cpm = document.querySelector(".cpm");

let i = 0;
let j = 0;
let word_ind = 0;
let text_ind = 0;
let quoteNum = 0;
let currInput = 0;
let currQuote = 0;
let time_limit = 60;
let timeLeft = 60;
let timer = null;
let characterTyped = 0;
let timeElapsed = 0;


// Check if the quote is completed and then updates to the next quote
const processCurrentText = () => {
	if(quotes[currQuote].length == currInput){
		updateTest();
		currInput = 0;
		word_ind = 0;
		j = 0;
		currQuote++;
	}
}


window.addEventListener('keydown', (e) => {

	let letter = document.querySelectorAll(".active > p");

	if(e.key === ' ' && j == letter.length){
		document.querySelector(".active").className = "word"

		sent = document.querySelectorAll(".word-test > div");
		word_ind++;
		sent[word_ind].className += " active"
		i = 0;
		j = 0;
		currInput++;
		characterTyped++;
	}
	else if(j < letter.length && e.key === letter[j].innerText) {
		letter[j].className += "correct";
		i++;
		j++;
		currInput++;
		characterTyped++;
	}


	if(e.key === 'W'){
		timer =  setInterval(updateTimer, 1000);
	}

	processCurrentText();
})

const updateTest = () => {
	test.textContent = null;
	let currText = quotes[quoteNum];

	let count = 0;
	let text_arr = currText.split(' ');

	for(let i = 0; i < text_arr.length; i++){
		let wordTag = document.createElement("div");
		if(i === 0) {
			wordTag.className += "word active";
		} 
		else {
			wordTag.className += "word";
		} 
		document.querySelector(".word-test").appendChild(wordTag);


		for(let l = 0; l < text_arr[i].length; l++){
			let tag = document.createElement("p");
			let text = document.createTextNode(text_arr[i][l]);
			tag.appendChild(text);
			let w = document.querySelectorAll(".word");
			w[count].appendChild(tag);
		}
		count++;
	}
	
	if(quoteNum < quotes.length - 1){
		quoteNum++;
	} else {
		quoteNum = 0;
	}
}

const updateTimer = () => {
	if(timeLeft > 0) {
		timeLeft--;
		timeElapsed++;
		time.textContent = timeLeft;
	} else {
		finishedTest();
	}
}

const finishedTest = () => {
	clearInterval(timer);
	
	displayResults();
}


// Calculates the wpm and cpm and displays the result in a modal box
const displayResults = () => {

	let wordMin = Math.round((((characterTyped / 5) / timeElapsed) * 60));
	let charaMin = Math.round(((characterTyped / timeElapsed) * 60));

	let wpmtag = document.createElement("p");
	let wpmtext = document.createTextNode(wordMin.toString());
	wpmtag.appendChild(wpmtext);
	wpm.appendChild(wpmtag);

	let cpmtag = document.createElement("p");
	let cpmtext = document.createTextNode(charaMin.toString());
	cpmtag.appendChild(cpmtext);
	cpm.appendChild(cpmtag);

	let result = document.querySelector(".results");
	result.style.display = 'block';
}

let modal = document.querySelector(".results");

window.onclick = function(event) {
	if(event.targe == modal) {
		modal.style.display = 'none';
	}
	modal.style.display = 'none';
}

window.onload = function(event) {
	modal.style.display = 'none';
}

const init = () => {
	updateTest();
	clearInterval(timer);
}

init();