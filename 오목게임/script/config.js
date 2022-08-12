function openPlayerConfig(event) {
  editedPlayer = +event.target.dataset.playerid
  console.dir(event.target)
  playerConfigOverlayElement.style.display = 'block'
  backdropElement.style.display = 'block'
}
function closePlayerConfig() {
  playerConfigOverlayElement.style.display = 'none'
  backdropElement.style.display = 'none'
  formElement.firstElementChild.classList.remove('error')
  errorsOutputElement.textContent = ''
  formElement.firstElementChild.lastElementChild.value = ''
}

function savePlayerConfig(event) {
  //서버에 제출하지 않고 자바스크립트로 제출하도록 하는 기능
  //submit 이 되면 서버에 제출하고 새로고침하는데 이것을 막는다.
  event.preventDefault()
  const formData = new FormData(event.target)
  const enteredPlayerID = formData.get('playername').trim()

  if (enteredPlayerID === '') {
    event.target.firstElementChild.classList.add('error')
    errorsOutputElement.textContent = '이름값을 입력한 것이 맞는지 확인하세요.'
    return //경고만 하고 다음 코드는 미실행
  }
  const updatedPlayerData = document.getElementById(
    'player-' + editedPlayer + '-data',
  )
  updatedPlayerData.children[1].textContent = enteredPlayerID

  players[editedPlayer - 1].name = enteredPlayerID
  //if (editedPlayer === 1) {
  //  player[0].name = enteredPlayerID
  //} else {
  // players[1].name = enteredPlayerID
  //}
  closePlayerConfig()
}
