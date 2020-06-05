//select canvas element
const canvas = document.getElementById('canvas')

//getContext of canvas (draw, etc)
const ctx = canvas.getContext('2d')

// add sound
let hit = new Audio()
let wall = new Audio()
let p1Score = new Audio()
let p2Score = new Audio()

hit.src = 'sounds/hit.mp3'
wall.src = 'sounds/wall.mp3'
p1Score.src = 'sounds/p1Score.mp3'
p2Score.src = 'sounds/p2Score.mp3'

//ball object

const ball = {
    x : canvas.width/2,
    y : canvas.height/2,
    radius : 10,
    velocityX : 5,
    velocityY : 5,
    speed : 7,
    color : 'WHITE'
}


