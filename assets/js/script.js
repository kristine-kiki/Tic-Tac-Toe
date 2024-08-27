//waiting for DOM to finish loading before running the game

document.addEventListener('DOMContentLoaded', () => {

    let playerMark = 'X';
    let gameInUse = true;
    let gameStatus = ['','','','','','','','',''];
    
    const boxes = document.querySelectorAll('.box');
    const resetButton = document.getElementById('resetButton');
    const statusShow = document.getElementById('status');
    
    const termsToWin = [
        //rows
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        //collumns
        [1, 4, 7], [2, 5, 8], [0, 3, 6],
        //diognal
        [2, 4, 6], [0, 4, 8]
    ];

function boxUse(clickedBox, clickedIndex) {
    gameStatus[clickedIndex] = playerMark;
    clickedBox.innerText = playerMark;
}

function otherPlayer() {
    playerMark = playerMark === 'X' ? 'O' : 'X';
    statusShow.innerText = `${playerMark} turn!`;
}

/**
 * loop through terms to win the game
 */
function result() {
    let winGame = false;
    for (let i = 0; i < termsToWin.length; i++) {
        const [r, u, n] = termsToWin [i];
        let player1 = gameStatus[r];
        let player2 = gameStatus[u];
        let z = gameStatus[n];
        if (player1 === ''|| player2 === ''|| z === '') {
            continue;
        }
        if (player1 === player2 && player2 === z) {
            winGame = true; break;
        }
    }

    if (winGame) {
        statusShow.innerText = `${playerMark
    
        } won!`;
        gameInUse = false;
        if (playerMark === 'X') {
            incrementX();
        } else {
            incrementO();
        }
        return;
    }

    let equalGame = !gameStatus.includes('');
    if (equalGame) {
        statusShow.innerText = `You both won!`;
        gameInUse = false;
        return;
    }

    otherPlayer();
}
    function boxMark(event) {
        const clickedBox = event.target;
        const clickedIndex = parseInt(clickedBox.getAttribute('index'));
        if (gameStatus[clickedIndex] !== ''|| !gameInUse) {
            return;
        }

        boxUse(clickedBox, clickedIndex);
        result();
}

function restart() {
    playerMark = 'X';
    gameInUse = true;
    gameStatus = ['','','','','','','','',''];
    statusShow.innerText = `${playerMark} turn!`;
    boxes.forEach(box => box.innerText = '');
}

boxes.forEach(box => box.addEventListener('click', boxMark));
resetButton.addEventListener('click', restart);

//score functions copied from Love Math project
function incrementX() {

    let oldScore = parseInt(document.getElementById('X').innerText);
    document.getElementById('X').innerText = ++oldScore;
}
    function incrementO() {
        let oldScore = parseInt(document.getElementById('O').innerText);
        document.getElementById('O').innerText = ++oldScore;
    }
});