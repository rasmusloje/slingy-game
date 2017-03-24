function Score(){

  this.score = 0;

  this.show = function(){
    textSize(32);
    text(this.score, 50, 70);
    fill(64,235,112);
  }

  this.update = function(){
    textSize(32);
    text(this.score, 50, 70);
    fill(64,235,112);
  }

  this.reset = function(){
    this.score = 0;
  }

}
