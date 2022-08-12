const gameData = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
]
const gameOverSpan = document.getElementById('game-over')
function resetGameStart() {
  activePlayer = 0
  currentCount = 0
  const resetLi = document.querySelectorAll('#game-board li')
  let boardIndex = 0
  gameOverSpan.style.display = 'none'
  for (let i = 0; i <= 8; i++) {
    for (let j = 0; j <= 8; j++) {
      gameData[i][j] = 0
      resetLi[boardIndex].textContent = ''
      resetLi[boardIndex].classList.remove('disabled')
      boardIndex++
    }
  }
}

function startNewGame() {
  if (players[0].name === '' || players[1].name === '') {
    alert('플레이어를 설정하세요.')
    return
  }
  gameAreaElement.style.display = 'block'
  resetGameStart()
  activePlayerName.textContent = players[activePlayer].name
}

let currentCount = 0
function checkForGameOver() {
  for (let i = 0; i <= 4; i++) {
    for (let j = 0; j <= 8; j++) {
      if (
        gameData[i][j] > 0 &&
        ((gameData[i][j] == gameData[i][j + 1] &&
          gameData[i][j + 1] == gameData[i][j + 2] &&
          gameData[i][j + 2] == gameData[i][j + 3] &&
          gameData[i][j + 3] == gameData[i][j + 4]) ||
          (gameData[i][j] == gameData[i + 1][j + 1] &&
            gameData[i + 1][j + 1] == gameData[i + 2][j + 2] &&
            gameData[i + 2][j + 2] == gameData[i + 3][j + 3] &&
            gameData[i + 3][j + 3] == gameData[i + 4][j + 4]) ||
          (gameData[i][j] == gameData[i + 1][j] &&
            gameData[i + 1][j] == gameData[i + 2][j] &&
            gameData[i + 2][j] == gameData[i + 3][j] &&
            gameData[i + 3][j] == gameData[i + 4][j]) ||
          (gameData[i][j] == gameData[i + 1][j - 1] &&
            gameData[i + 1][j - 1] == gameData[i + 2][j - 2] &&
            gameData[i + 2][j - 2] == gameData[i + 3][j - 3] &&
            gameData[i + 3][j - 3] == gameData[i + 4][j - 4]))
      ) {
        // alert('승자 : ' + players[activePlayer].name)
        gameOverSpan.style.display = 'block'
        gameOverSpan.textContent =
          players[activePlayer].name +
          '님이 이기셨습니다. 새로운 게임을 시작하세요.'
      }
    }
  }
}
function countValue() {
  if (currentCount == 81) {
    // alert('둘 다 아쉽네요. 무승부!!')
    gameOverSpan.style.display = 'block'
    gameOverSpan.textContent = '무승부입니다. 새로운 게임을 시작하세요.'
  }
}

function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1
  } else {
    activePlayer = 0
  }
  console.log(activePlayer)
  activePlayerName.textContent = players[activePlayer].name
}

function selectGameField(e) {
  if (e.target.tagName !== 'LI') {
    return
  }
  const selectedField = e.target
  const selectedColumn = +selectedField.dataset.col - 1
  const selectedRow = +selectedField.dataset.row - 1
  if (selectedField.textContent != '') {
    alert('다른 칸을 선택하세요.')

    return
  }
  //   if (gameData[selectedRow][selectedColumn] > 0) {
  //     alert('다른 칸을 선택하세요.')
  //     return
  //   }
  selectedField.textContent = players[activePlayer].symbol
  selectedField.classList.add('disabled')

  gameData[selectedRow][selectedColumn] = activePlayer + 1
  checkForGameOver()
  switchPlayer()
  currentCount++
  countValue()
}
