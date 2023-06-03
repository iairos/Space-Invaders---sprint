'use strict'
/**
 * created by iair schorr,
 *- proj is stil not finishd,
 *-- it took me some time to work about the aliens shifting.
 *--- will continue working at weekend!

 */

const BOARD_SIZE = 14
const ALIENS_ROW_LENGTH = 8
const ALIENS_ROW_COUNT = 3
const HERO = '🚀'
const HERO_IMG = `<img src="img/rocket.png" />`
const ALIEN = '👽'
const LASER = '⤊'
const SKY = ' '
const EARTH = '.'

// Matrix of cell objects. e.g.: {type: SKY, gameObject: ALIEN}
var gBoard
var gGame = {
  isOn: null,
  aliensCount: 0,
  isVictory: null,
  isMoveRight: null,
  isMoveDown: null,
  isMoveLeft: null,
}
// Called when game loads
function init() {
  closeModal()
  resetValues()
  updateScoreBoard(0)
}
// Create and returns the board with aliens on top, ground at bottom
// use the functions: createCell, createHero, createAliens
function createBoard() {
  const board = []
  for (let i = 0; i < BOARD_SIZE; i++) {
    board.push([])
    for (let j = 0; j < BOARD_SIZE; j++) {
      board[i][j] = createCell()

      if (i === BOARD_SIZE - 1) board[i][j] = createCell(null, EARTH)
    }
  }

  return board
}
// Render the board as a <table> to the page
function renderBoard(board) {
  var strHTML = ''
  for (var i = 0; i < board.length; i++) {
    strHTML += '<tr>'
    for (var j = 0; j < board[0].length; j++) {
      const cell = board[i][j]

      let inCell = cell.gameObject ? cell.gameObject : cell.type
      if (inCell === '🚀') inCell = HERO_IMG

      const className = cell.type === SKY ? 'cell' : 'cell earth'

      strHTML += `<td data-i="${i}" data-j="${j}"  class="${className}">${inCell}</td>`
    }
    strHTML += '</tr>'
  }
  const elContainer = document.querySelector('.board')
  elContainer.innerHTML = strHTML
}
function checkVictory() {
  if (gGame.aliensCount === 0) {
    console.log('victory')
    gGame.isVictory = true
    gameOver()
    return
  }
}
function gameOver() {
  gGame.isOn = !gGame.isOn
  var msg = gGame.isVictory ? 'You Won!!!' : 'Game Over'
  if (gGame.isVictory) {
    playVictorySound()
  } else playGameOverSound()
  openModal(msg)
  clearInterval(gIntervalAliens)
}
function openModal(msg) {
  const elModal = document.querySelector('.modal')
  const elMsg = elModal.querySelector('.msg')
  elMsg.innerText = msg
  elModal.style.display = 'block'
}
function closeModal() {
  const elModal = document.querySelector('.modal')
  elModal.style.display = 'none'
}
function resetValues() {
  gAliensTopRowIdx = 1
  gAliensBottomRowIdx = gAliensTopRowIdx + 2
  gAliensRightCollIdx = 10
  gAliensLeftCollIdx = 3
  gHero.score = 0
  gGame.isVictory = false
  gIsAlienFreeze = null
  gGame.isOn = true
  gGame.isMoveRight = true
  gGame.isMoveDown = false
  gGame.isMoveLeft = false
}
function playVictorySound() {
  const audio = new Audio('sounds/victory.mp3')
  audio.play()
}
function playGameOverSound() {
  const audio = new Audio('sounds/game-over.mp3')
  audio.play()
}
function onStart(elBtn) {
  elBtn.innerText = 'Restart'
  init()
  gBoard = createBoard()
  createHero(gBoard)
  createAliens(gBoard)
  renderBoard(gBoard)
  moveAliens()
}
