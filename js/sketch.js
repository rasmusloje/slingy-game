var ball;
var pipes = [];
// Custom counter used instead of frameCount to make sure that the first pipe doesn't come faster than the rest
var customFrameCounter = 1;

var score;

// Executed each render time
function draw() {
  background(28, 38, 42);
  ball.show();

  if (ball.isStarted && ball.dead == false) {
    ball.update();

    if (customFrameCounter % 150 == 0) {
      pipes.push(new Pipe());
    }

    for (var i = pipes.length - 1; i >= 0; i--) {
      pipes[i].show();
      pipes[i].update();

      if (pipes[i].hits(ball)) {
        ball.dead = true;
      }

      if (pipes[i].passed(ball) && pipes[i].hasPassed == false) {
        pipes[i].hasPassed = true;
        score.score++;
      }

      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    }

    customFrameCounter++;
  } else if (ball.dead) {
    for (var i = pipes.length - 1; i >= 0; i--) {
      pipes[i].speed = 0;

      pipes[i].show();
      pipes[i].update();
    }

    ball.show();

    displayDeathScreen();
  } else {
    textSize(32);
    text(
      "Hold space to start spinning the ball",
      width / 2 - 260,
      height / 2 + 100
    );
    text("Release to shoot", width / 2 - 120, height / 2 + 150);
  }

  score.update();
  score.show();
}

function displayDeathScreen() {
  rect(width / 2 - 300 / 2, height / 2 - 155 / 2, 300, 155, 20);
  fill(0, 0, 0);
  textSize(32);
  text(
    score.score,
    width / 2 - 4 * max(ceil(log(abs(score.score))), 1),
    height / 2 + 8
  );
  text("You scored", width / 2 - 78, height / 2 - 30);
  textSize(20);
  text("Press space to try again", width / 2 - 107, height / 2 + 60);
}

function keyPressed() {
  if (key == " " && ball.dead == false) {
    ball.spin();
  }
  if (key == " " && ball.dead == true) {
    ball.reset();
    score.reset();
    pipes = [];
    customFrameCounter = 1;
    setup();
  }
}

function keyReleased() {
  if (key == " " && ball.dead == false) {
    ball.shoot();
  }
}
