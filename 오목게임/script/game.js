const gameBoardSize = parseInt(prompt('몇칸으로 실행할까요?'))
const checkBoardSize = gameBoardSize + 4

//gameData 판을 지정한 숫자로 간단하게 만드는 함수
const gameData = new Array(checkBoardSize)
  .fill(0)
  .map(() => new Array(checkBoardSize))

const gameOverSpan = document.getElementById('game-over')
function resetGameStart() {
  activePlayer = 0
  currentCount = 0
  const resetLi = document.querySelectorAll('#game-board li')
  let boardIndex = 0
  gameOverSpan.style.display = 'none'
  for (let i = 0; i < gameBoardSize; i++) {
    for (let j = 0; j < gameBoardSize; j++) {
      gameData[i + 2][j + 2] = 0
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
  for (let i = 2; i < checkBoardSize - 2; i++) {
    for (let j = 2; j < checkBoardSize - 2; j++) {
      const inputPlayer = gameData[i][j]
      if (
        inputPlayer > 0 &&
        ((inputPlayer == gameData[i][j - 2] &&
          inputPlayer == gameData[i][j - 1] &&
          inputPlayer == gameData[i][j + 1] &&
          inputPlayer == gameData[i][j + 2]) ||
          (inputPlayer == gameData[i - 2][j - 2] &&
            inputPlayer == gameData[i - 1][j - 1] &&
            inputPlayer == gameData[i + 1][j + 1] &&
            inputPlayer == gameData[i + 2][j + 2]) ||
          (inputPlayer == gameData[i - 2][j] &&
            inputPlayer == gameData[i - 1][j] &&
            inputPlayer == gameData[i + 1][j] &&
            inputPlayer == gameData[i + 2][j]) ||
          (inputPlayer == gameData[i - 2][j + 2] &&
            inputPlayer == gameData[i - 1][j + 1] &&
            inputPlayer == gameData[i + 1][j - 1] &&
            inputPlayer == gameData[i + 2][j - 2]))
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
  activePlayerName.textContent = players[activePlayer].name
}

function selectGameField(e) {
  if (e.target.tagName !== 'LI') {
    return
  }
  const selectedField = e.target
  const selectedColumn = +selectedField.dataset.col + 1
  const selectedRow = +selectedField.dataset.row + 1
  if (selectedField.textContent != '') {
    alert('다른 칸을 선택하세요.')

    return
  }
  selectedField.textContent = players[activePlayer].symbol
  selectedField.classList.add('disabled')

  gameData[selectedRow][selectedColumn] = activePlayer + 1
  checkForGameOver()

  switchPlayer()
  currentCount++
  countValue()
}
