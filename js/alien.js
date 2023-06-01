'use strict'
const ALIEN_SPEED = 500
var gIntervalAliens
// The following two variables represent the part of the matrix (some rows)
// that we should shift (left, right, and bottom)
// We need to update those when:
// (1) shifting down and (2) last alien was cleared from row
var gAliensTopRowIdx
var gAliensBottomRowIdx
var gIsAlienFreeze
function createAliens(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (i > 1 && i < 5 && j > 2 && j < 11) {
        board[i][j] = createCell(ALIEN)
        gGame.aliensCount++
      }
    }
  }
}
function handleAlienHit(pos) {}
// Use the global variables(gAliensTopRowIdx, gAliensBottomRowIdx) to move ONLY
//the aliens and not the entire board
function shiftAliensRight(board) {}
function shiftAliensLeft(board) {}

function shiftAliensDown(board) {
  if (gIsAlienFreeze) return
  else if (gGame.aliensCount === 0) {
    checkVictory()
    return
  }

  for (let i = gAliensBottomRowIdx; i >= gAliensTopRowIdx; i--) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j].gameObject === ALIEN) {
        const prevPos = {
          i,
          j,
        }
        updateCell(prevPos)
        updateCell({ i: i + 1, j }, ALIEN)
      }
    }
  }
  gAliensBottomRowIdx++
  gAliensTopRowIdx++
  if (gAliensBottomRowIdx === 12) {
    gameOver()
    return
  }
}
// runs the interval for moving aliens side to side and down
// it re-renders the board every time
// when the aliens are reaching the hero row - interval stops
function moveAliens() {}
function frizeAliens(elBtn) {
  gIsAlienFreeze = !gIsAlienFreeze
  if (gIsAlienFreeze) {
    elBtn.innerText = 'unFreeze'
  } else elBtn.innerText = 'freeze'
}
