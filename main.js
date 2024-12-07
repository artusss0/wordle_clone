let rowNumber = 1;
let letterNumber = 1;

window.addEventListener('load', () => {
    document.querySelectorAll('.key').forEach(key => {
        key.addEventListener('click', function() {
            if (key.classList.contains('delete-key')) {
                removeLetter();
            } else if (key.classList.contains('enter-key')) {
                let listOfWords = document.querySelector(`.row-${rowNumber}`).querySelectorAll('.letter')
                checkWord(listOfWords);
            } else if (!key.classList.contains('special-key')) {
                addLetter(key.textContent);
            }
        });
    });
});

function addLetter(letter) {
    if(document.querySelector('.game-info').style.display == 'block') {
        return;
    }
    const currentLetterBox = document.querySelector(`.row-${rowNumber}>.letter-${letterNumber}`);
    currentLetterBox.textContent = letter;

    currentLetterBox.classList.add('filled');

    currentLetterBox.classList.add('animate-insert');
    currentLetterBox.addEventListener('animationend', () => {
        currentLetterBox.classList.remove('animate-insert');
    });

    letterNumber++;
}

function removeLetter() {
    if(document.querySelector('.game-info').style.display == 'block') {
        return;
    }
    if(letterNumber == 1) {
        return;
    }
    const letterBox = document.querySelector(`.row-${rowNumber}>.letter-${letterNumber-1}`); 
    letterBox.textContent = '';
    letterBox.classList.remove('filled');
    letterNumber--;
}

function checkWord(listOfLetters) {
    if(document.querySelector('.game-info').style.display == 'block') {
        return;
    }
    const currentRow = document.querySelector(`.row-${rowNumber}`);
    const word = listToWord(listOfLetters);

    if(word.length < 5) {
        currentRow.classList.add('animate-wrong');
        currentRow.addEventListener('animationend', () => {
            currentRow.classList.remove('animate-wrong');
        });
        displayInfo("Słowo musi mieć 5 liter!")
        return;
    }
    if(!checkIfWordExist(word)) {
        currentRow.classList.add('animate-wrong');
        currentRow.addEventListener('animationend', () => {
            currentRow.classList.remove('animate-wrong');
        });
        displayInfo("Nie ma takiego słowa!")
        return;
    }

    listOfLetters.forEach((letter, letterIndex) => {
        let keyboardLetter = document.getElementById(`${letter.textContent}`);
        letter.classList.add('animate-correct');
        letter.addEventListener('animationstart', () => {
            setTimeout(() => {
                let letterStatus = getLetterStatus(letter.textContent.toLowerCase(), letterIndex);
                letter.classList.add(letterStatus);
                keyboardLetter.classList.add(letterStatus)
            }, 200);
        });
        letter.addEventListener('animationend', () => {
            letter.classList.remove('animate-correct');
        });
    })

    if(rowNumber+1 == 7) {
        displayGameLost()
    } else {
        rowNumber++;
    }
    
    letterNumber = 1;
    if(isWordCorrect(word)) {
        displayGameWon()
    }
}
