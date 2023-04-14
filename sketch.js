const TOTAL = 500;
let birds = [];
let birds_brain = [];
let savedBirds = [];
let pipes = [];
let counter = 0;
let cycles = 100;
let slider;
let display = true
let generationNumber = 0
let started = false
let score = 0;
let best_score = 0;
let gen_nb = 0;

let brainJSON;

function preload() {
  try {
    brainJSON = loadJSON("brain.json")
  } catch (error) {
    console.log('brain.json not found');
  }
}

function setup() {
  createCanvas(800, 600);
  slider = createSlider(1, 100, 1);
  let birdBrain;
  if (brainJSON)
    birdBrain = NeuralNetwork.deserialize(brainJSON)

  if (birdBrain) {
    for (let i = 0; i < TOTAL; i++) {
      birds_brain[i] = new Bird(birdBrain);
    }
  }
  for (let i = 0; i < TOTAL; i++) {
    birds[i] = new Bird();
  }
}

function draw() {
  if (!started)
    noLoop()

  for (let n = 0; n < slider.value(); n++) {
    
    if (counter % 150 == 0) {
      pipes.push(new Pipe());
    }
    counter++;
    
    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update();

      for (let j = birds.length-1; j >= 0; j--) {
        if (pipes[i].hits(birds[j])) {
          savedBirds.push(birds.splice(j, 1)[0])
        }
      }

      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    }

    for (let bird of birds) {
      bird.think(pipes);
      bird.update();
    }

    if (birds.length == 0) {
      counter = 0
      score = 0
      nextGeneration()
      gen_nb++
      pipes = []
    }
  }

  // shoing stuff
  if (display) {
    background(0);
    for (let bird of birds) {
      bird.show();
    }
    for (let pipe of pipes) {
      pipe.show();
    }
    fill(255, 0, 0);
    text("Score: " + score, 10, 20);
    text("Best Score: " + best_score, 10, 35);
    text("Generation: " + gen_nb, 10, 50);
  }
}

function startSimu() {
  started = true
  loop()
  document.getElementById('start').disabled = true
  document.getElementById('startFromJson').disabled = true
  document.getElementById('stop').disabled = false
}

function startSimuFromJson() {
  if (birds_brain.length == 0) {
    alert('No brain.json found')
    return
  }
  birds = birds_brain
  started = true
  loop()
  document.getElementById('start').disabled = true
  document.getElementById('startFromJson').disabled = true
  document.getElementById('stop').disabled = false
}

function stopSimu() {
  started = false
  document.getElementById('start').disabled = false
  document.getElementById('stop').disabled = true
}

function keyPressed() {
  if (key === 'S') {
    let brain = birds[0].brain;
    saveJSON(brain, 'brain.json')
    console.log(json);
  } else if (key === ' ') {
    birds[0].up();
    // if (isOver) reset(); //you can just call reset() in Machinelearning if you die, because you cant simulate keyPress with code.
    // display = !display
  }
}