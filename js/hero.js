'use strict'
const LASER_SPEED = 80
let gLaserIntervalId = null

var gHero = { pos: { i: 12, j: 5 }, isShoot: false, score: 0 }
// creates the hero and place it on board
function createHero(board) {
  const { pos } = gHero
  board[pos.i][pos.j] = createCell(HERO)
}

function onKeyDown(ev) {
  if (!gGame.isOn) return
  switch (ev.code) {
    case 'Space':
      if (gHero.isShoot) return
      playLaserSound()
      shoot()
      break
    case 'ArrowLeft':
      moveHero(-1)
      break
    case 'ArrowRight':
      moveHero(1)
      break
  }
}

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
    playAlienBlastSound()
    clearInterval(gLaserIntervalId)
    updateCell(pos)
    gGame.aliensCount--
    updateScoreBoard(10)
    checkVictory()
    gHero.isShoot = !gHero.isShoot
    if (
      gBoard[pos.i - 1][pos.j] == ALIEN ||
      getElCell({ i: pos.i - 1, j: pos.j }).innerHTML == ALIEN
    ) {
      console.log('BUGGGGG')
    }
    return
  }
  if (pos.i === 0) {
    clearInterval(gLaserIntervalId)
    updateCell(pos)
    gHero.isShoot = !gHero.isShoot
    return
  }
  updateCell(pos, LASER)
  pos.i--
}
function updateScoreBoard(diff) {
  gHero.score += diff
  const elScoreBoard = document.querySelector('h2 span')
  elScoreBoard.innerText = gHero.score
}
function playLaserSound() {
  const audio = new Audio('sounds/laser-gun.mp3')
  audio.play()
}
function playAlienBlastSound() {
  const audio = new Audio('sounds/blast1.mp3')
  audio.play()
}
