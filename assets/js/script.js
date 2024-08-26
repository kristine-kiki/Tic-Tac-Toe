//waiting for DOM to finish loading before running the game

document.addEventListener('DOMContentLoaded', () {

    let player = 'You';
    let gameInUse = true;
    let gameStatus = ['','','','','','','','',''];
    
    const boxes = document.querySelectorAll('box');
    const reset = document.getElementById('reset');
    const statusShow = document.getElementById('status');
    
    const termsToWin = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [1, 4, 7], [2, 5, 8], [2, 4, 6], [0, 4, 8]
    ];

function boxUse(clickedBox, clickedIndex) {
    gameStatus[clickedIndex] = player;
    clickedBox.innerText = player;
}

function otherPlayer() {
    player = player === 'X' ? 'O' : 'X';
    statusShow.innerText = `${player}r turn!`;
}

function result() {
    let win = false;
    for (let i = 0; i < termsToWin.length; i++) {
        const termsToWin = termsToWin [i];
        let x = gameStatus[termsToWin[0]];
        let y = gameStatus[termsToWin[1]];
        let z = gameStatus[termsToWin[2]];
        if (x==='')
    }
}

function boxMark() {

}

function restart() {

}

});