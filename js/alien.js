'use strict'
const ALIEN_SPEED = 500
var gIntervalAliens
// The following two variables represent the part of the matrix (some rows)
// that we should shift (left, right, and bottom)
// We need to update those when:
// (1) shifting down and (2) last alien was cleared from row
var gAliensTopRowIdx,
  gAliensBottomRowIdx,
  gAliensLeftCollIdx,
  gAliensRightCollIdx
var gIsAlienFreeze
function createAliens(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (
        i >= gAliensTopRowIdx &&
        i <= gAliensBottomRowIdx &&
        j >= gAliensLeftCollIdx &&
        j <= gAliensRightCollIdx
      ) {
        board[i][j] = createCell(ALIEN)
        gGame.aliensCount++
      }
    }
  }
}
function handleAlienHit(pos) {}
// Use the global variables(gAliensTopRowIdx, gAliensBottomRowIdx) to move ONLY
//the aliens and not the entire board
function shiftAliensRight(board) {
  for (let i = 0; i < board.length; i++) {
    if (board[i][board.length - 1].gameObject === ALIEN) {
      gGame.isMoveRight = !gGame.isMoveRight
      gGame.isMoveDown = true
      gGame.isMoveLeft = true
      shiftAliensDown(board)
      return
    }

    for (let j = gAliensRightCollIdx; j >= gAliensLeftCollIdx; j--) {
      if (board[i][j].gameObject === ALIEN) {
        const prevPos = {
          i,
          j,
        }
        updateCell(prevPos)
        updateCell({ i, j: j + 1 }, ALIEN)
      }
    }
  }
  if (gAliensRightCollIdx === board.length - 1) {
    return
  }
  gAliensRightCollIdx++
  gAliensLeftCollIdx++
}
function shiftAliensLeft(board) {
  for (let i = 0; i < board.length; i++) {
    if (board[i][0].gameObject === ALIEN) {
      gGame.isMoveDown = true
      gGame.isMoveLeft = false
      shiftAliensDown(board)
      return
    }
    for (let j = gAliensLeftCollIdx; j <= gAliensRightCollIdx; j++) {
      if (board[i][j].gameObject === ALIEN) {
        const prevPos = {
          i,
          j,
        }
        updateCell(prevPos)
        updateCell({ i, j: j - 1 }, ALIEN)
      }
    }
  }
  if (gAliensLeftCollIdx === 0) {
    return
  }
  gAliensRightCollIdx--
  gAliensLeftCollIdx--
}

function shiftAliensDown(board) {
  if (gIsAlienFreeze) return
  if (!gGame.isMoveDown) return
  for (let i = gAliensBottomRowIdx; i >= gAliensTopRowIdx; i--) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j].gameObject === ALIEN) {
        if (
          board[i + 1][j].gameObject === HERO ||
          board[i + 2][j].type === EARTH
        ) {
          gameOver()
        }
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
  gGame.isMoveDown = false
  if (!gGame.isMoveLeft) gGame.isMoveRight = true
}
// runs the interval for moving aliens side to side and down
// it re-renders the board every time
// when the aliens are reaching the hero row - interval stops
function moveAliens() {
  gIntervalAliens = setInterval(() => {
    if (gIsAlienFreeze) return
    if (gGame.isMoveRight) {
      shiftAliensRight(gBoard)
    } else {
      shiftAliensLeft(gBoard)
    }
  }, 500)
}
function freezeAliens(elBtn) {
  gIsAlienFreeze = !gIsAlienFreeze
  if (gIsAlienFreeze) {
    elBtn.innerText = 'unFreeze'
  } else elBtn.innerText = 'freeze'
}
