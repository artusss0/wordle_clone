let words = [];
let wordToQuess = "";

window.addEventListener('load', loadWords);

async function loadWords() {
    const response = await fetch('words_5_polish.txt');
    const data = await response.text();
    words = data.split('\n');
    wordToQuess = words[Math.floor(Math.random() * words.length)];
    console.log(wordToQuess)
}

function listToWord(listOfLetters) {
    word = "";
    listOfLetters.forEach(element => {
        word += element.textContent;
    });
    return word.toLowerCase();
}

function checkIfWordExist(word) {
    if(!words.includes(word)) {
        return false;
    }
    return true;
}

function isWordCorrect(word) {
    if(word !== wordToQuess) {
        return false;
    }
    return true;
}

function getLetterStatus(letter, letterIndex) {
    const wordArray = wordToQuess.split('');
    const checkedIndices = [];

    if (!wordArray.includes(letter)) {
        return "letter-absent";
    }

    if (wordArray[letterIndex] === letter) {
        checkedIndices.push(letterIndex);
        return "letter-correct";
    }

    let occurrenceCount = 0;
    for (let i = 0; i < wordArray.length; i++) {
        if (wordArray[i] === letter && !checkedIndices.includes(i)) {
            occurrenceCount++;
            checkedIndices.push(i);
        }
    }

    if (occurrenceCount > 0 && wordArray[letterIndex] !== letter) {
        return "letter-misplaced";
    }

    return "letter-absent";
}
