//waiting for DOM to finish loading before running the game

document.addEventListener('DOMContentLoaded', () => {

    let player = 'X';
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
    gameStatus[clickedIndex] = player;
    clickedBox.innerText = player;
}

function otherPlayer() {
    player = player === 'X' ? 'O' : 'X';
    statusShow.innerText = `${player} turn!`;
}

function result() {
    let win = false;
    for (let i = 0; i < termsToWin.length; i++) {
        const [r, u, n] = termsToWin [i];
        let kk = gameStatus[r];
        let mm = gameStatus[u];
        let z = gameStatus[n];
        if (kk === ''|| mm === ''|| z === '') {
            continue;
        }
        if (kk === mm && mm === z) {
            win = true; break;
        }
    }

    if (win) {
        statusShow.innerText = `${player} won!`;
        gameInUse = false;
        if (player === 'X') {
            incrementX();
        } else {
            incrementO();
        }
        return;
    }

    let equal = !gameStatus.includes('');
    if (equal) {
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
    player = 'X';
    gameInUse = true;
    gameStatus = ['','','','','','','','',''];
    statusShow.innerText = `${player} turn!`;
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