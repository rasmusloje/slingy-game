function Ball() {
  this.x = width / 2;
  this.y = height / 2;

  this.sizeX = 32;
  this.sizeY = 32;

  // Gravity and velocity modifiers
  this.gravity = -0.001;
  this.velocity = 0.5;

  this.isSpinning = false;
  this.isStarted = false;

  // Initial angle when spinning
  this.angle = PI / 2;
  this.spinningRotationSpeed = 0.15;
  this.spinningRadius = 50;

  // Used to calculate trajectory when ball is shot
  this.time = 0;
  // Angle value from when spinning is released (used to calculate trajectory)
  this.angleOnRelease = 0;

  this.dead = false;

  this.show = function () {
    fill(64, 235, 112);
    ellipse(this.x, this.y, this.sizeX, this.sizeY);
  };

  // Executed once when the ball starts spinning
  this.spin = function () {
    // Reset angle to initial
    this.angle = PI / 2;

    // Set center point that the ball should rotate around
    this.placeholderX = this.x;
    this.placeholderY = this.y - this.spinningRadius;

    this.isStarted = true;
    this.isSpinning = true;
  };

  // Executed everytime space is released and the ball is in air
  this.shoot = function () {
    // Get time when released
    this.time = millis();
    // Save angle when released
    this.angleOnRelease = this.angle;

    // Save the position when released to calucate trajectory (init pos)
    this.placeholderX = this.x;
    this.placeholderY = this.y;

    // Flip boolean
    this.isSpinning = false;
  };

  // Executed at each render time (every fps)
  this.update = function () {
    if (this.isStarted == true && this.isSpinning == false) {
      this.timeSpentInAir = millis() - this.time;

      // Calculate x and y pos based on accelerated motion (Newton's second law)
      this.x =
        this.placeholderX +
        this.velocity * cos(this.angleOnRelease + 1) * this.timeSpentInAir;
      this.y =
        this.placeholderY +
        this.velocity * sin(this.angleOnRelease + 1) * this.timeSpentInAir -
        (this.gravity * this.timeSpentInAir * this.timeSpentInAir) / 2;
    } else if (this.isStarted == true && this.isSpinning == true) {
      // Use cos and sin to calculate cirle positions
      this.x = this.placeholderX + cos(this.angle) * this.spinningRadius;
      this.y = this.placeholderY + sin(this.angle) * this.spinningRadius;

      // Speed of pipes subtracted to make the ball look like it's hanging at a certain spot
      this.placeholderX -= 2;

      // Increase the angle with the rotation speed
      this.angle += this.spinningRotationSpeed;
    }

    // Safeguards against the ball leaving the canvas
    if (this.y > height) {
      this.dead = true;
      this.y = height;
    }

    if (this.y < 0) {
      this.dead = true;
      this.y = 0;
    }

    if (this.x > width) {
      this.dead = true;
      this.x = width;
    }

    if (this.x < 0) {
      this.dead = true;
      this.x = 0;
    }
  };

  this.reset = function () {
    this.x = width / 2;
    this.y = height / 2;
    this.sizeX = 32;
    this.sizeY = 32;
    this.gravity = -0.001;
    this.velocity = 0.5;
    this.isSpinning = false;
    this.isStarted = false;
    this.angle = PI / 2;
    this.spinningRotationSpeed = 0.15;
    this.spinningRadius = 50;
    this.time = 0;
    this.angleOnRelease = 0;
    this.dead = false;
  };
}
