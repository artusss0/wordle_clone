let rowNumber = 1;
let letterNumber = 1;

window.addEventListener('load', () => {
    document.querySelectorAll('.key').forEach(key => {
        key.addEventListener('click', function() {
            if (key.classList.contains('delete-key')) {
                removeLetter();
            } else if (key.classList.contains('enter-key')) {
                let finalWord = '';
                document.querySelector(`.row-${rowNumber}`).querySelectorAll('.letter').forEach(letter => {
                    finalWord += letter.textContent;
                })
                sendWord(finalWord);
            } else if (!key.classList.contains('special-key')) {
                addLetter(key.textContent);
            }
        });
    });
});

function addLetter(letter) {
    const currentLetterBox = document.querySelector(`.letter-${letterNumber}`); 
    currentLetterBox.innerHTML = letter;

    currentLetterBox.classList.add('filled');

    currentLetterBox.classList.add('animate');
    currentLetterBox.addEventListener('animationend', () => {
        currentLetterBox.classList.remove('animate');
    });

    letterNumber++;
}

function removeLetter() {
    const letterBox = document.querySelector(`.letter-${letterNumber-1}`); 
    letterBox.innerHTML = '';
    letterBox.classList.remove('filled');
    letterNumber--;
}

function sendWord(word) {
    if(word.length !== 5) {
        return;
    }
    console.log(word);
}
