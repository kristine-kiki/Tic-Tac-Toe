//waiting for DOM to finish loading before running the game

document.addEventListener('DOMContentLoaded', () => {

    let playerMark = 'X';
    //shows if game is still active
    let gameInUse = true;
    //array showing the game layout/grid
    let gameStatus = ['','','','','','','','',''];
    
    const boxes = document.querySelectorAll('.box');
    const resetButton = document.getElementById('resetButton');
    const statusShow = document.getElementById('status');
    
    //combinations to win
    const termsToWin = [
        //rows
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        //collumns
        [1, 4, 7], [2, 5, 8], [0, 3, 6],
        //diognal
        [2, 4, 6], [0, 4, 8]
    ];

//marking circle/box
function boxUse(clickedBox, clickedDataIndex) {
    gameStatus[clickedDataIndex] = playerMark;
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

        // continue if there is empty circle/box left
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

//switch to other player
    otherPlayer();
}

//box click event
    function boxMark(event) {
        const clickedBox = event.target;
        const clickedDataIndex = parseInt(clickedBox.getAttribute('data-index'));
        //do nothing if the clicked circle/box is ticked or game is finished
        if (gameStatus[clickedIndex] !== ''|| !gameInUse) {
            return;
        }
        //tick circle/box and check result
        boxUse(clickedBox, clickedIndex);
        result();
}

//reset game
function restart() {
    playerMark = 'X';
    gameInUse = true;
    //clear the game 
    gameStatus = ['','','','','','','','',''];
    statusShow.innerText = `${playerMark} turn!`;
    //clear all X and O in circles/boxes
    boxes.forEach(box => box.innerText = '');
}
//add click event to each circle/box
boxes.forEach(box => box.addEventListener('click', boxMark));
//add click event to reset button
resetButton.addEventListener('click', restart);

//score functions copied from Love Math project
function incrementX() {
    //get score for X
    let oldScore = parseInt(document.getElementById('X').innerText);
    //increment and update the score
    document.getElementById('X').innerText = ++oldScore;
}
    function incrementO() {
        let oldScore = parseInt(document.getElementById('O').innerText);
        document.getElementById('O').innerText = ++oldScore;
    }
});