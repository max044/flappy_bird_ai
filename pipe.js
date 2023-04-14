function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

class Pipe {
  constructor() {
    this.spacing = 200;
    this.top = randomIntFromInterval(0, height - this.spacing)
    this.bottom = height - (this.top + this.spacing);

    this.x = width;
    this.w = 80;
    this.speed = 3;

    this.passed = false;
    this.highlight = false;
  }

  hits(bird) {
    if (bird.y <= bird.size / 2) {
      return true
    }

    if (bird.y >= height - bird.size / 2) {
      return true
    }

    if (bird.x + bird.size / 2 >= this.x && bird.x - bird.size / 2 <= this.x + this.w) {
      // if (bird.y - bird.size / 2 <= this.top || bird.y + bird.size / 2 >= this.top + this.spacing) {
        if (bird.y <= this.top || bird.y >= this.top + this.spacing) {
        this.highlight = true   
        return true;
      }
    }
    return false;
  }

  //this function is used to calculate scores and checks if we've went through the pipes
  pass(bird) {
    if (bird.x > this.x && !this.passed) {
      this.passed = true;
      return true;
    }
    return false;
  }

  drawHalf() {
    // let howManyNedeed = 0;
    // // let peakRatio = pipePeakSprite.height / pipePeakSprite.width;
    // // let bodyRatio = pipeBodySprite.height / pipeBodySprite.width;
    // //this way we calculate, how many tubes we can fit without stretching
    // howManyNedeed = Math.round(height / (this.w));
    // //this <= and start from 1 is just my HACK xD But it's working
    // for (let i = 0; i < howManyNedeed; ++i) {
    //   let offset = this.w * (i);
    //   // image(pipeBodySprite, -this.w / 2, offset, this.w, this.w);
    //   fill(255, 255, 255)
    //   rect(-this.w / 2, offset, this.w, this.w)
    // }
    // // image(pipePeakSprite, -this.w / 2, 0, this.w, this.w);
    fill(255, 255, 255)
    rect(this.x, 0, this.w, this.top)
    rect(this.x, this.top + this.spacing, this.w, this.bottom)


  }

  show() {
    // push();
    // translate(this.x + this.w / 2, this.bottom);
    this.drawHalf();
    // translate(0, -this.spacing);
    // rotate(PI);
    // this.drawHalf();
    // pop();
  }

  update() {
    this.x -= this.speed;
  }

  offscreen() {
    return (this.x < -this.w);
  }
}