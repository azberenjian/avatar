let armLocation = 0;
let armloc;
let armCatch;
let catColor = 235;
let total = 0;
let isArmDown = false;
let eyesColor = 0;

let rat;
let speed = 2;
let x = -200;

function preload() {
  //song
  soundFormats("mp3");
  meowfx = loadSound(
    "https://cdn.glitch.com/7ffdbf88-a307-4e9f-889b-02e20588ee3d%2FMeow%20-%20Sound%20Effect.mp3?v=1631230726022"
  );
  song = loadSound(
    "https://cdn.glitch.com/7ffdbf88-a307-4e9f-889b-02e20588ee3d%2F30-Seconds-2020-03-22_-_8_Bit_Surf_-_FesliyanStudios.com_-_David_Renda.mp3?v=1632206107173"
  );
}

function setup() {
  createCanvas(400, 400);
  background(50, 68, 92);
  angleMode(DEGREES);
  rat = loadImage(
    "https://cdn.glitch.com/7ffdbf88-a307-4e9f-889b-02e20588ee3d%2Fratgif.gif?v=1632207242532" //rat sprite by me
  );
  song.loop();

  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  //catch the mouse avatar minigame
  //click your mouse to catch the rat!
  //press up arrow for a cat meow!
  let ran1 = mouseX;
  let ran2 = mouseX - 100;
  let ran3 = mouseY;
  background(ran1, ran2, ran3);

  drawHand(mouseX); //moves arm location

  if (mouseIsPressed) {
    isArmDown = true;

    handCatch(mouseX);

    if (mouseX > x - 80 && mouseX < x + 80 && isArmDown == true) {
      total++;
      console.log(total);
      x = -200;
      speed++;
    }
  }

  drawCat();
  drawTable();
  mouth();
  ratRandom();

  if (mouseX < 240 && mouseX > 100) {
    catColor = 170;
  } else if (mouseX < 100) {
    catColor = 120;
  } else {
    catColor = 235;
  }
  textFont("Consolas");
  text("RATS CAUGHT: " + total, 30, 20);
  if (total >= 10 && total <= 15){
  text("NICE JOB!", 30, 60);
  }
   if (total >= 30  && total <= 40){
  text("You're a rat catching professional!", 30, 60);
     eyesColor = 255;
  }
 if (total >= 70){
  text("HOW ARE YOU STILL GOING?!", 30, 60);
  }
  keyPressed();
}

function ratRandom() {
  image(rat, x, 290);
  if (x > -300) {
    x = x + speed;
  }

  if (x > 550) {
    x = -200;
    speed++;
  }
  if (speed == 14) {
    speed = 2;
  }
}

function drawHand(armloc) {
  //hand
  push();
  //arm height at starting position
  armLocation = armloc;
  fill(catColor, 185, 120);
  ellipse(armloc, height * 0.7, 50, 200);
  fill(255, 214, 238);
  //circle(width * .65, height * .53, 20);
  circle(armloc, height * 0.53, 20);
  //circle(width * .633, height * .49, 7);
  circle(armloc - 8, height * 0.49, 7);
  //circle(width * .67, height * .49, 7);
  circle(armloc + 8, height * 0.49, 7);
  //circle(width * .6515, height * .48, 7);
  circle(armloc, height * 0.48, 7);
  pop();
}

function drawCat() {
  //cat
  //ears
  fill(240, 223, 187);
  triangle(
    width * 0.71,
    height * 0.7,
    width * 0.76,
    height * 0.5,
    width * 0.82,
    height * 0.63
  );
  triangle(
    width * 0.85,
    height * 0.63,
    width * 0.92,
    height * 0.5,
    width * 0.94,
    height * 0.7
  );
  //head
  fill(catColor, 185, 120);
  circle(width * 0.82, height * 0.75, 100);
  fill(255, 224, 224);
  ellipse(width * 0.82, height * 0.74, 8);
  
  //eyes
  fill(0);
  rect(width * 0.818, height * 0.75, 1, 7);
  circle(width * 0.78, height * 0.67, 5);
  circle(width * 0.855, height * 0.67, 5);
  fill(255);
  arc(width * 0.88, height * 0.7, 30, 30, 0, 180);
  arc(width * 0.76, height * 0.7, 30, 30, 0, 180);

  let eyeRight = width * 0.88;
  let eyeLeft = width * 0.76;
  fill(eyesColor, 0, 0);
  eyeLeft = map(mouseX, 0, width, 300, 310, true);
  eyeRight = map(mouseX, 0, width, 344, 360, true);
  //map(value, start1, stop1, start2, stop2, [withinBounds])
  arc(eyeRight, height * 0.7, 10, 10, 0, 180);
  arc(eyeLeft, height * 0.7, 10, 10, 0, 180);
}

function mouth() {
  fill(255);
  ellipse(width * 0.82, height * 0.77, 30, mic.getLevel() * 100);
}

function drawTable() {
  //table
  fill(84, 69, 72);
  rect(width * 0.0, height * 0.8, 400, 400);
}

function handCatch(armloc) {
  //hand
  background(227, 0, 0);
  push();
  let armCatch = height * 0.8;
  //arm height at starting position
  armLocation = armloc;
  fill(catColor, 185, 120);
  ellipse(armloc, armCatch, 50, 60);
  pop();
}

function keyPressed() {
  if (keyIsDown(UP_ARROW)) {
    meowfx.play();
  }
}
