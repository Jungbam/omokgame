let editedPlayer = 0 // 사용자Id 저장변수
let activePlayer = 0

const players = [
  {
    name: '',
    symbol: 'X',
  },
  {
    name: '',
    symbol: 'O',
  },
]

const omokGameBoard = document.getElementById('game-board')
const gameSize = 12
for (var i = 0; i <= gameSize; i++) {
  for (var j = 0; j <= gameSize; j++) {
    var newList = document.createElement('li')
    newList.setAttribute('data-col', j + 1)
    newList.setAttribute('data-row', i + 1)
    omokGameBoard.appendChild(newList)
  }
}
document.documentElement.style.setProperty('--game-board-size', gameSize)

const playerConfigOverlayElement = document.getElementById('config-overlay')
const backdropElement = document.getElementById('backdrop')
const formElement = document.querySelector('form')
const errorsOutputElement = document.getElementById('config-error')
const gameBoardElement = document.getElementById('game-board')

// 플레이어 버튼 상수 추가
const editPlayer1BtnElement = document.getElementById('edit-player-1-btn')
const editPlayer2BtnElement = document.getElementById('edit-player-2-btn')
const cancelConigBtnElement = document.getElementById('cancel-config-btn')
const gameAreaElement = document.getElementById('active-game')
// const gameFieldElements = document.querySelectorAll('#game-board li')

const activePlayerName = document.getElementById('active-player-name')

//edit 화면을 불러오는 함수 : config.js에 정의
editPlayer1BtnElement.addEventListener('click', openPlayerConfig)
editPlayer2BtnElement.addEventListener('click', openPlayerConfig)

//오버레이 초기화 함수 : config.js에 정의
cancelConigBtnElement.addEventListener('click', closePlayerConfig)
backdropElement.addEventListener('click', closePlayerConfig)

formElement.addEventListener('submit', savePlayerConfig)

//게임 시작
const startGameBtn = document.getElementById('startNewGame')

startGameBtn.addEventListener('click', startNewGame)
// for (const gameFieldElement of gameFieldElements) {
//   gameFieldElement.addEventListener('click', selectGameField)
// }
gameBoardElement.addEventListener('click', selectGameField)
