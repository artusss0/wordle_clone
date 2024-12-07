let words = [];
window.addEventListener('load', loadWords);

async function loadWords() {
    const response = await fetch('words_5_polish.txt');
    const data = await response.text();
    words = data.split('\n');

    hiddenWord = words[Math.floor(Math.random() * words.length)];
    sessionStorage.setItem("wordToQuess", hiddenWord);
}

function checkIfWordExist(word) {
    if(!words.includes(word)) {
        return false;
    }
    return true;
}

function isWordCorrect(word) {
    const wordToQuess = sessionStorage.getItem("wordToQuess");
    if(!word == wordToQuess) {
        return false;
    }
    return true;
}