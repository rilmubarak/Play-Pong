let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
let ball = {
    x : canvas.width/2,
    y : canvas.height/2,
    radius : 10,
    velocityX : 5,   
    velocityY : 5, 
    speed : 9,
    color : 'RED'
}
let player1 = {
    x : 0, 
    y : (canvas.height - 100)/2,
    width : 10,
    height : 100,
    score : 0,
    color : 'blue'
}
let player2 = {
    x : (canvas.width - 10), 
    y : (canvas.height - 100)/2, 
    width : 10,
    height : 100,
    score : 0,
    color : 'green'
}
let net = {
    x : (canvas.width - 2)/2,
    y : 0,
    height : 10,
    width : 2,
    color : 'WHITE'
}
function drawRect(x, y, w, h, color){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}
function drawArc(x, y, r, color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();
}
canvas.addEventListener("mousemove", getMousePos);

function getMousePos(evt){
    let rect = canvas.getBoundingClientRect();
    player1.y = evt.clientY - rect.top - player1.height/2;
}
function drawNet(){
    for(let i = 0; i <= canvas.height; i+=15){
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
    }
}
function drawText(text,x,y){
    ctx.fillStyle = "#FFF";
    ctx.font = "43px calibri";
    ctx.fillText(text, x, y);
}
function resetBall(){
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.velocityX = -ball.velocityX;
    ball.speed = 7;
}
function collision(b,p){
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;
    
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;
    
    return p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top;
}
function update(){
    if( ball.x - ball.radius < 0 ){
        player2.score++;
        player2Score.play();
        resetBall();
    }else if( ball.x + ball.radius > canvas.width){
        player1.score++;
        player1Score.play();
        resetBall();
    }
    if(player1.score == 5 || player2.score == 5){
        if(player1.score == 5){
            document.getElementById('win-notif').innerHTML = 'PLAYER 1 <br> WIN!!!';
        }
        else{
            document.getElementById('win-notif').innerHTML = 'PLAYER 2 <br> WIN!!!';
        }
        document.getElementById('win-notif').style = 'padding: 30px';
        creatingInfoMess()
    }
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    player2.y += ((ball.y - (player2.y + player2.height/2)))*0.1;
    if(ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height){
        ball.velocityY = -ball.velocityY;
        wall.play();
    }
    let player = (ball.x + ball.radius < canvas.width/2) ? player1 : player2;
    if(collision(ball,player)){
        hit.play();
        let collidePoint = (ball.y - (player.y + player.height/2));
        collidePoint = collidePoint / (player.height/2);
        let angleRad = (Math.PI/4) * collidePoint;
        let direction = (ball.x + ball.radius < canvas.width/2) ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);
        ball.speed += 0.5;
    }
    
}
function render(){
    drawRect(0, 0, canvas.width, canvas.height, "#000");
    drawText(player1.score,canvas.width/4,canvas.height/5);
    drawText(player2.score,3*canvas.width/4,canvas.height/5);
    drawNet();
    drawRect(player1.x, player1.y, player1.width, player1.height, player1.color);
    drawRect(player2.x, player2.y, player2.width, player2.height, player2.color);
    drawArc(ball.x, ball.y, ball.radius, ball.color);
}
function game(){
    update();
    render();
}
let framePerSecond = 50;
let loop = setInterval(game,1000/framePerSecond);
let hit = new Audio()
let wall = new Audio()
let player1Score = new Audio()
let player2Score = new Audio()

hit.src = 'sounds/hit.mp3'
wall.src = 'sounds/wall.mp3'
player1Score.src = 'sounds/player1Score.mp3'
player2Score.src = 'sounds/player2Score.mp3'