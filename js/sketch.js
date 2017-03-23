// Ball instance
var ball;
// Array with pipes
var pipes = [];
// Custom counter used instead of frameCount to make sure that the first pipe doesn't come faster than the rest
var customFrameCounter = 1;

var score;

// Initial setup function for the game
function setup() {
  createCanvas(1280, 720);
  ball = new Ball();
  score = new Score();
  pipes.push(new Pipe());
}

// Is executed at each render time (every fps)
function draw() {
  background(28,38,42);
  ball.show();

  // Make a fix so that pipes are pushed when ball.isStarted
  if(ball.isStarted && ball.dead == false){
    ball.update();

    if(customFrameCounter % 150 == 0){
      pipes.push(new Pipe());
    }

    // Iterate all pipes backwards
    for(var i = pipes.length-1; i >= 0; i--){
      // Show and update
      pipes[i].show();
      pipes[i].update();

      // Hit registration
      if(pipes[i].hits(ball)){
        ball.dead = true;
      }

      if(pipes[i].passed(ball) && pipes[i].hasPassed == false){
        pipes[i].hasPassed = true;
        score.score++;
      }

      // Remove pipe from array if off screen
      if(pipes[i].offscreen()){
        pipes.splice(i,1);
      }
    }

    customFrameCounter++;
  }
  else if(ball.dead){
    // Display the pipes and stop the speed
    for(var i = pipes.length-1; i >= 0; i--){
      pipes[i].speed = 0;

      pipes[i].show();
      pipes[i].update();
    }
    // Only show the ball
    ball.show();

    // Show deathscreen
    displayDeathScreen();

  }
  else{
    textSize(32);
    text("Hold space to start!", width/2 - 137, height/2+100);
  }

  // Update score at end to render on top of everything else
  score.update();
  score.show();

}

function displayDeathScreen(){
  rect(width/2-300/2, height/2-155/2, 300, 155, 20);
  fill(0,0,0);
  textSize(32);
  text(score.score, width/2-4*(max(ceil(log(abs(score.score))),1)), height/2+8);
  text("You scored", width/2-78, height/2-30);
  textSize(20);
  text("Press space to try again", width/2-107, height/2+60);

}

// Key listener functions
function keyPressed(){
  if(key == ' ' && ball.dead == false){
    ball.spin();
  }
  if(key == ' ' && ball.dead == true){
    ball.reset();
    score.reset();
    pipes = [];
    customFrameCounter = 1;
    setup();
  }
}

function keyReleased(){
  if(key == ' ' && ball.dead == false){
    ball.shoot();
  }

}
