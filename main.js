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
    if(letterNumber == 1) {
        return;
    }
    const letterBox = document.querySelector(`.row-${rowNumber}>.letter-${letterNumber-1}`); 
    letterBox.textContent = '';
    letterBox.classList.remove('filled');
    letterNumber--;
}

function checkWord(listOfLetters) {
    const currentRow = document.querySelector(`.row-${rowNumber}`);
    const word = listToWord(listOfLetters);

    if(listOfLetters.length !== 5 || !checkIfWordExist(word)) {
        currentRow.classList.add('animate-wrong');
        currentRow.addEventListener('animationend', () => {
            currentRow.classList.remove('animate-wrong');
        });
        return;
    }

    listOfLetters.forEach((letter, letterIndex) => {
        letter.classList.add('animate-correct');
        letter.addEventListener('animationstart', () => {
            setTimeout(() => {
                letter.classList.add(getLetterStatus(letter.textContent.toLowerCase(), letterIndex));
            }, 200);
        });
        letter.addEventListener('animationend', () => {
            letter.classList.remove('animate-correct');
        });
    })
    rowNumber++;
    letterNumber = 1;
    
}
