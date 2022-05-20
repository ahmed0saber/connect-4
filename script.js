var playerOne = true, gameBoard = [], gameOver = false, 
board = document.getElementsByClassName("grid-container")[0], 
items = document.getElementsByClassName("grid-item")

for(let i=0; i<42; i++){
    board.innerHTML += `<div onclick="playHere(this)" class="grid-item"></div>`
    gameBoard[i] = 0
}

const playHere = (el) => {
    if(gameOver){
        Swal.fire(
            "Game over!",
            "Press the restart button to play again.",
            'info'
        )
        return
    }
    let itemIndex = [].indexOf.call(items, el)
    if(el.className.split(' ').includes('taken')){
        Swal.fire(
            "You can't play here!",
            "This place is already taken.",
            'error'
        )
    }else if(itemIndex < 35 && !items[itemIndex + 7].className.split(' ').includes('taken')){
        Swal.fire(
            "You can't play here!",
            "This place is unreachable.",
            'error'
        )
    }else{
        let playerClass = playerOne ? "player-one" : "player-two"
        el.classList.add(...[
            "taken",
            playerClass
        ])
        gameBoard[itemIndex] = playerOne ? 1 : 2
        playerOne = !playerOne
    }
    checkWin()
}

const checkWin = () => {
    checkRows()
    checkColumns()
    checkDiagonals()
}

const checkRows = () => {
    for(let i=0; i<6; i++){
        for(let j=0; j<4; j++){
            if(gameBoard[i*7 + j] == 1 && gameBoard[i*7 + j+1] == 1 && gameBoard[i*7 + j+2] == 1 && gameBoard[i*7 + j+3] == 1){
                playerWin("one")
                addWinningClass(i*7 + j, i*7 + j+1, i*7 + j+2, i*7 + j+3)
                gameOver = true
            }else if(gameBoard[i*7 + j] == 2 && gameBoard[i*7 + j+1] == 2 && gameBoard[i*7 + j+2] == 2 && gameBoard[i*7 + j+3] == 2){
                playerWin("two")
                addWinningClass(i*7 + j, i*7 + j+1, i*7 + j+2, i*7 + j+3)
                gameOver = true
            }
        }
    }
}

const checkColumns = () => {
    if(gameOver){
        return
    }
    for(let i=0; i<7; i++){
        for(let j=0; j<3; j++){
            if(gameBoard[j*7 + i] == 1 && gameBoard[(j+1)*7 + i] == 1 && gameBoard[(j+2)*7 + i] == 1 && gameBoard[(j+3)*7 + i] == 1){
                playerWin("one")
                addWinningClass(j*7 + i, (j+1)*7 + i, (j+2)*7 + i, (j+3)*7 + i)
                gameOver = true
                return
            }else if(gameBoard[j*7 + i] == 2 && gameBoard[(j+1)*7 + i] == 2 && gameBoard[(j+2)*7 + i] == 2 && gameBoard[(j+3)*7 + i] == 2){
                playerWin("two")
                addWinningClass(j*7 + i, (j+1)*7 + i, (j+2)*7 + i, (j+3)*7 + i)
                gameOver = true
                return
            }
        }
    }
}

const checkDiagonals = () => {
    if(gameOver){
        return
    }
    for(let i=35; i>=0; i-=7){
        if(i+24<=41){
            loopLeftTopToRightBottom(i)
            if(gameOver){
                return
            }
        }
    }
    for(let i=1; i<=6; i++){
        if(i+3<=6){
            loopLeftTopToRightBottom(i)
            if(gameOver){
                return
            }
        }
    }
    for(let i=41; i>=6; i-=7){
        if(i+18<=41){
            loopRightTopToLeftBottom(i)
            if(gameOver){
                return
            }
        }
    }
    for(let i=0; i<=5; i++){
        if(i-3>=0){
            loopRightTopToLeftBottom(i)
        }
    }
}

const loopLeftTopToRightBottom = (i) => {
    for(let j=i; j+24<=41; j+=8){
        if(gameBoard[j] == 1 && gameBoard[j+8] == 1 && gameBoard[j+16] == 1 && gameBoard[j+24] == 1){
            playerWin("one")
            addWinningClass(j, j+8, j+16, j+24)
            gameOver = true
            return
        }else if(gameBoard[j] == 2 && gameBoard[j+8] == 2 && gameBoard[j+16] == 2 && gameBoard[j+24] == 2){
            playerWin("two")
            addWinningClass(j, j+8, j+16, j+24)
            gameOver = true
            return
        }
    }
}

const loopRightTopToLeftBottom = (i) => {
    for(let j=i; j+18<=41; j+=6){
        if(gameBoard[j] == 1 && gameBoard[j+6] == 1 && gameBoard[j+12] == 1 && gameBoard[j+18] == 1){
            playerWin("one")
            addWinningClass(j, j+6, j+12, j+18)
            gameOver = true
            return
        }else if(gameBoard[j] == 2 && gameBoard[j+6] == 2 && gameBoard[j+12] == 2 && gameBoard[j+18] == 2){
            playerWin("two")
            addWinningClass(j, j+6, j+12, j+18)
            gameOver = true
            return
        }
    }
}

const playerWin = (player) => {
    Swal.fire(
        "Congratulations!",
        `Player ${player} is a winner.`,
        'success'
    )
}

const addWinningClass = (el1, el2, el3, el4) => {
    items[el1].classList.add("winning")
    items[el2].classList.add("winning")
    items[el3].classList.add("winning")
    items[el4].classList.add("winning")
}

const restartGame = () => {
    playerOne = true
    gameOver = false
    for(let i=0; i<42; i++){
        gameBoard[i] = 0
        items[i].classList.remove(...[
            "taken",
            "player-one",
            "player-two",
            "winning"
        ])
    }
}