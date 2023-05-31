'use strict'
const BOARD_SIZE = 14
const ALIENS_ROW_LENGTH = 8
const ALIENS_ROW_COUNT = 3
const HERO = '♆'
const ALIEN = '👽'
const LASER = '⤊'
const SKY = ''
const EARTH = '.'

// Matrix of cell objects. e.g.: {type: SKY, gameObject: ALIEN}
var gBoard
var gGame = {
  isOn: false,
  aliensCount: 0,
  isVictory: null,
}
// Called when game loads
function init() {
  closeModal()

  gGame.isOn = true
  gHero.score = 0
  gBoard = createBoard()
  console.log(gBoard)
  createHero(gBoard)
  createAliens(gBoard)
  renderBoard(gBoard)

  updateHeroScore(0)
  console.log(gGame.aliensCount)
}
// Create and returns the board with aliens on top, ground at bottom
// use the functions: createCell, createHero, createAliens
function createBoard() {
  const board = []
  for (let i = 0; i < BOARD_SIZE; i++) {
    board.push([])
    for (let j = 0; j < BOARD_SIZE; j++) {
      board[i][j] = createCell()

      if (i === 13) board[i][j] = createCell(null, EARTH)
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
      const inCell = cell.gameObject ? cell.gameObject : cell.type

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
  openModal(msg)
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
