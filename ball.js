function Ball(){
  // Initial position of the ball
  this.x = width/2;
  this.y = height/2;

  // Size of the ball
  this.sizeX = 32;
  this.sizeY = 32;

  // Gravity and velocity modifiers
  this.gravity = -0.001;
  this.velocity = 0.5;

  // Boolean switches for when spinning and if the game has started (if spinning is false then the ball is in the air)
  this.isSpinning = false;
  this.isStarted = false;

  // Initial angle when spinning
  this.angle = PI/2;
  // Spinning rotation speed
  this.speed = 0.15;
  // Radius on circle when spinning
  this.radius = 50;

  // Used to calculate trajectory when ball is shot
  this.time = 0;
  // Angle value from when spinning is released (used to calculate trajectory)
  this.angleSave = 0;

  // Dead or not (game over if true)
  this.dead = false;

  // Show the ball (32x32) (executed at render time)
  this.show = function(){
    fill(64,235,112);
    ellipse(this.x, this.y, this.sizeX, this.sizeY);
  }

  // Function executed when space is held
  // This is executed once when the ball starts spinning
  this.spin = function(){

    // Reset angle to initial
    this.angle = PI/2;

    // Set center point that the ball should rotate around
    this.placeholderX = this.x;
    this.placeholderY = this.y - this.radius;

    // Flip booleans
    this.isStarted = true;
    this.isSpinning = true;

  }

  // Executed everytime space is released and the ball is in air
  this.shoot = function(){

    // Get time when released
    this.time = millis();
    // Save angle when released
    this.angleSave = this.angle;

    // Save the position when released to calucate trajectory (init pos)
    this.placeholderX = this.x;
    this.placeholderY = this.y;

    // Flip boolean
    this.isSpinning = false;

  }

  // Is executed at each render time (every fps)
  this.update = function(){

    // If started and not spinning the ball should drop - math below for trajectory calculation
    if(this.isStarted == true && this.isSpinning == false){
      // Time spent in air
      this.currentTime = millis() - this.time;

      // Calculate x and y pos based on accelerated motion (Newton's second law)
      this.x = this.placeholderX + this.velocity*cos(this.angleSave+1)*this.currentTime;
      this.y = this.placeholderY + this.velocity*sin(this.angleSave+1)*this.currentTime-this.gravity*this.currentTime*this.currentTime/2;

    }
    // If started and spinning
    else if (this.isStarted == true && this.isSpinning == true){
      // Use cos and sin to calculate cirle positions
      this.x = (this.placeholderX + cos(this.angle) * this.radius);
      this.y = (this.placeholderY + sin(this.angle) * this.radius);

      // Speed of pipes subtracted to make the ball look like it's hanging at a certain spot
      this.placeholderX -= 2;

      // Increase the angle with the rotation speed
      this.angle += this.speed;
    }

    // Safeguards so that the ball can't leave the canvas (should die if registered)
    // --------------------
    if(this.y > height){
      this.dead = true;
      this.y = height;
    }

    if(this.y < 0){
      this.dead = true;
      this.y = 0;
    }

    if(this.x > width){
      this.dead = true;
      this.x = width;
    }

    if(this.x < 0){
      this.dead = true;
      this.x = 0;
    }
    // --------------------

  }

  this.reset = function(){
    this.x = width/2;
    this.y = height/2;
    this.sizeX = 32;
    this.sizeY = 32;
    this.gravity = -0.001;
    this.velocity = 0.5;
    this.isSpinning = false;
    this.isStarted = false;
    this.angle = PI/2;
    this.speed = 0.15;
    this.radius = 50;
    this.time = 0;
    this.angleSave = 0;
    this.dead = false;
  }

}
