function Pipe(){
  // Members
  this.gap = 250;
  this.top = random(0, height-this.gap);
  this.bottom = height-this.top-this.gap;
  this.x = width;
  this.w = 20;
  this.speed = 2;

  this.hasPassed = false;

  // Hit registration based on the ball
  this.hits = function(ball){
    if(ball.y - ball.sizeY/2  < this.top || ball.y + ball.sizeY/2 > height - this.bottom){
      if(ball.x > this.x && ball.x < this.x + this.w){
        ball.death = true;
        return true;
      }
    }
  }

  // Decides if a pipe has been succesfully passed
  this.passed = function(ball){
    if(ball.y > this.top && ball.y < height - this.bottom){
      if(ball.x > this.x && ball.x < this.x + this.w){
        this.hasPassed;
        return true;
      }
    }
  }

  // Executed every frame to show a pipe
  this.show = function(){
    fill(255);
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height-this.bottom, this.w, this.bottom);
  }

  // Executed every frame to update position of pipe based on speed
  this.update = function(){
    this.x -= this.speed;
  }

  // Checks if pipe is off the screen (has passed)
  this.offscreen = function(){
    if(this.x < -this.w){
      return true;
    }
    return false;
  }

  this.reset = function(){
	this.top = random(0, height-this.gap);
	this.bottom = height-this.top-this.gap;
    this.x = width;
    this.w = 20;
    this.speed = 2;
    this.hasPassed = false;
  }

}
