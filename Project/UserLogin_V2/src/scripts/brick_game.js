
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var ballRadius = 10;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var leftCount = 0;
var rightCount = 0;
var shiftPressed = 0;
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;	
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;


var bricks = [];
for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("shift", keyShiftHandler, false);

function drawBricks() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
		if(bricks[c][r].status == 1) {
  	   		var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
	   		var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            		bricks[c][r].x = brickX;
            		bricks[c][r].y = brickY;
            		ctx.beginPath();
            		ctx.rect(brickX, brickY, brickWidth, brickHeight);
            		ctx.fillStyle = 'black';
            		ctx.fill();
            		ctx.closePath();
		}
        }
    }
}

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
	rightCount++;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
	leftCount++;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

function keyShiftHandler(e) {
    if(e.keyCode == 16) {
	shiftPressed++;
    }
    else if(e.keyCode == 37) {
	shiftPressed = false;
    }
}
	
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI*2);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
}

function collisionDetection() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
          	    if(b.status == 1) {
               	if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
               	    dy = -dy;
               	    b.status = 0;
		    score++;
               	}
            }
        }
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = 'black';
    ctx.fillText("Score: "+score, 8, 20);
}

function sendscore() {
	return score;
}

function reset() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	x = canvas.width/2;
	y = canvas.height/2;
	dx = 2;
	dy = -2;
	brickRowCount = 3;
	brickColumnCount = 5;
	document.getElementById("output").value = sendscore();
	score = 0;
	bricks = [];
	for(c=0; c<brickColumnCount; c++) {
	    bricks[c] = [];
	    for(r=0; r<brickRowCount; r++) {
	        bricks[c][r] = { x: 0, y: 0, status: 1 };
	    }
	}
   if (leftCount > 0 || rightCount > 0) {
	drawPaddle();
	drawBricks();
	drawBall();
	drawScore();
	collisionDetection();
   }
   else {
	shiftPressed = false;
   }

}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBricks();
	drawBall();
	drawPaddle();
	drawScore();
	collisionDetection();
	if (score < 15) {

	if (leftCount > 0 || rightCount > 0)
	{
		if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) 
		{
       			dx = -dx;
 		}
		if(y + dy < ballRadius) 
		{
        		dy = -dy;
    		}
		else if(y + dy > canvas.height-ballRadius) 
		{
        		if(x > paddleX && x < paddleX + paddleWidth) 
			{
        		    dy = -dy;
        		}
        		else 
			{
		    		leftCount = 0;
		    		rightCount = 0;
        	    		reset();
        		}
    		}
		if(rightPressed && paddleX < canvas.width-paddleWidth) 
		{
        		paddleX += 7;
    		}
    		else if(leftPressed && paddleX > 0) 
		{
        		paddleX -= 7;
    		}
    		x += dx;
    		y += dy;
	}
	else 
	{
		shiftPressed = false;
	}
	}
	else
	{
	    leftCount = 0;
  	    rightCount = 0;
	    reset();
	}
}

setInterval(draw, 10);
