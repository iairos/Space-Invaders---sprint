'use strict'
const LASER_SPEED = 80
var gHero = { pos: { i: 12, j: 5 }, isShoot: false }
// creates the hero and place it on board
function createHero(board) {
  const { pos } = gHero
  board[pos.i][pos.j] = createCell(HERO)
}
// Handle game keys
function onKeyDown(ev) {
  switch (ev.code) {
    case 'ArrowLeft':
      moveHero(-1)
      break
    case 'ArrowRight':
      moveHero(1)
      break
    case 'Space':
      shoot()
      break
  }
}
// Move the hero right (1) or left (-1)
function moveHero(dir) {
  const i = gHero.pos.i
  const j = gHero.pos.j
  const pos = {
    i: i,
    j: j + dir,
  }
  if (pos.j < 0 || pos.j > 13) return
  updateCell(gHero.pos)
  gHero.pos = pos
  updateCell(pos, HERO)
}
// Sets an interval for shutting (blinking) the laser up towards aliens
function shoot() {
  setInterval(() => {
    blinkLaser(gHero.pos)
  }, 1000)
}
// renders a LASER at specific cell for short time and removes it
function blinkLaser(pos) {
  if (pos.i < 0) return
  console.log(pos.i--)
}

// position such as: {i: 2, j: 7}
// function updateCell(pos, gameObject = null) {
//   gBoard[pos.i][pos.j].gameObject = gameObject
//   var elCell = getElCell(pos)
//   elCell.innerHTML = gameObject || ''
// }
