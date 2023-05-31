'use strict'
const LASER_SPEED = 80
let gLaserIntervalId = null
var gHero = { pos: { i: 12, j: 5 }, isShoot: false, score: 0 }
// creates the hero and place it on board
function createHero(board) {
  const { pos } = gHero
  board[pos.i][pos.j] = createCell(HERO)
}
// Handle game keys
function onKeyDown(ev) {
  if (!gGame.isOn) return
  switch (ev.code) {
    case 'ArrowLeft':
      moveHero(-1)
      break
    case 'ArrowRight':
      moveHero(1)
      break
    case 'Space':
      if (gHero.isShoot) return
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
  gHero.isShoot = true
  const laserPos = {
    i: gHero.pos.i - 1,
    j: gHero.pos.j,
  }

  gLaserIntervalId = setInterval(() => {
    blinkLaser(laserPos)
  }, LASER_SPEED)
}
// renders a LASER at specific cell for short time and removes it
function blinkLaser(pos) {
  if (gBoard[pos.i + 1][pos.j].gameObject === LASER) {
    updateCell({ i: pos.i + 1, j: pos.j })
  }
  if (gBoard[pos.i][pos.j].gameObject === ALIEN) {
    clearInterval(gLaserIntervalId)
    updateCell(pos)
    gGame.aliensCount--
    updateHeroScore(10)
    checkVictory()
    console.log(gGame.aliensCount)
    gHero.isShoot = !gHero.isShoot
    return
  }
  if (pos.i === 0) {
    clearInterval(gLaserIntervalId)
    updateCell(pos)
    gHero.isShoot = !gHero.isShoot
    return
  }
  updateCell(pos, LASER)

  console.log(pos.i--)
}
function updateHeroScore(diff) {
  gHero.score += diff
  const elScoreBoard = document.querySelector('h2 span')
  elScoreBoard.innerText = gHero.score
}
// position such as: {i: 2, j: 7}
// function updateCell(pos, gameObject = null) {
//   gBoard[pos.i][pos.j].gameObject = gameObject
//   var elCell = getElCell(pos)
//   elCell.innerHTML = gameObject || ''
// }
