function displayInfo(message) {
    const infoBox = document.querySelector('.info');
    const computedStyle = window.getComputedStyle(infoBox);

    if (computedStyle.display !== 'flex') {
        infoBox.style.display = 'flex';
        infoBox.querySelector('.info_title').textContent = message;

        setTimeout(() => {
            infoBox.style.display = 'none';
        }, 2000);
    }
}

function displayGameLost() {
    const gameInfo = document.querySelector('.game-info');
    gameInfo.className = 'game-info';
    gameInfo.innerHTML = `
        <h2>Niestety nie udało się wygrać 😢</h2>
        <button onclick="restartGame()">Zagraj jeszcze raz</button>
    `;
    gameInfo.style.display = 'block';
}

function displayGameWon() {
    const gameInfo = document.querySelector('.game-info');
    gameInfo.className = 'game-info';
    gameInfo.innerHTML = `
        <h2>Super ci poszło! 🎉</h2>
        <button onclick="restartGame()">Zagraj jeszcze raz</button>
    `;
    gameInfo.style.display = 'block';
}

function hideGameInfo() {
    const gameInfo = document.querySelector('.game-info');
    gameInfo.style.display = 'none';
}

function restartGame() {
    const gameInfo = document.querySelector('.game-info');
    gameInfo.style.display = 'none';
    window.location.reload();
}
