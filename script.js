const winningPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
]

let player1 = 0;
let player2 = 0;
let tieScore = 0;

const x_class = 'x';
const circle_class = 'circle';
const cellElem = document.querySelectorAll('[data-cell]');
const restartButton = document.querySelector('.reset-btn');
const okayButton = document.querySelector('.okay-btn');
const board = document.getElementById('board');
const winningMessageElem = document.querySelector('.modal');
const winningMessageTextElem = document.querySelector('.winning-message');
const player1Score = document.querySelector('.player1-score');
const player2Score = document.querySelector('.player2-score');
const player1ActiveScore = document.querySelector('.player1-active-score');
const player2ActiveScore = document.querySelector('.player2-active-score');
const tieActiveScore = document.querySelector('.tie-active-score');
const tieScoreElem = document.querySelector('.tie-score');
let circleTurn

startGame();

restartButton.addEventListener('click', () => {
    player1 = 0;
    player2 = 0;
    tieScore = 0;
    startGame();
});

okayButton.addEventListener('click', startGame);

function startGame() {
    player1ActiveScore.innerText = player1;
    player2ActiveScore.innerText = player2;
    tieActiveScore.innerText = tieScore;

    circleTurn = false;
    cellElem.forEach(cell => {
        cell.classList.remove(x_class);
        cell.classList.remove(circle_class);
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true})
    });
    setHoverBoard();
    winningMessageElem.classList.remove('show');
}

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? circle_class : x_class;
    placeMark(cell, currentClass);

    if (checkWin(currentClass)) {
        endGame(false);
    } else if(isTie()) {
        endGame(true);
    } else {
        switchTurns();
        setHoverBoard();
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function switchTurns() {
    circleTurn = !circleTurn;
}

function setHoverBoard() {
    board.classList.remove(x_class);
    board.classList.remove(circle_class);
    if (circleTurn) {
        board.classList.add(circle_class);
    } else {
        board.classList.add(x_class);
    }
}

function checkWin(currentClass) {
    return winningPatterns.some(patterns => {
        return patterns.every(index => {
            return cellElem[index].classList.contains(currentClass);
        })
    })
}

function isTie() {
    return [...cellElem].every(cell => {
        return cell.classList.contains(x_class) || cell.classList.contains(circle_class)
    })
}

function endGame(tie) {
    if (tie) {
        tieScore++;
        winningMessageTextElem.innerText = 'Tie!';
        player1Score.innerText = `Player 1 (◯): ${player1}`
        player2Score.innerText = `Player 2 (✕): ${player2}`
        tieScoreElem.innerText = `Tie: ${tieScore}`;
    } else {
        winningMessageTextElem.innerText = `${circleTurn ? "◯":"✕"} Wins!`
        circleTurn ? player1++ : player2++;
        player1Score.innerText = `Player 1 (◯): ${player1}`
        player2Score.innerText = `Player 2 (✕): ${player2}`
        tieScoreElem.innerText = `Tie: ${tieScore}`;
    }
    winningMessageElem.classList.add('show');
}

