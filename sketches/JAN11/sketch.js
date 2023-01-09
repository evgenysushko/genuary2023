/*
Genuary 2023
JAN.10 "Suprematism"

By Evgeny Sushko
https://github.com/evgenysushko/genuary2023
*/

"use strict";

let w = 800;
let s = w / 3;
let actRandomSeed = 0;

function setup() {
  // pixelDensity(1);
  createCanvas(w, w);
  noStroke();
}

function draw() {
  noLoop();
  randomSeed(actRandomSeed);
  background(250);
  // background("#973a39");

  push();
  fill(50);
  translate(width / 2 - s * 0.6, height / 2);
  rotate(random(0.1));
  beginShape();
  vertex((-s / 2) * random(1, 1.02), -s * 2 * random(0.98, 1.0));
  vertex((s / 2) * random(0.98, 1.02), -s * 2 * random(0.98, 1.0));
  vertex((s / 2) * random(0.98, 1.0), s * 1.3 * random(1.0, 1.02));
  vertex((-s / 2) * random(0.98, 1.02), s * 1.3 * random(0.98, 1.02));
  endShape(CLOSE);
  pop();

  push();
  fill("#9e0100");
  // fill("#d1a710");
  translate(width / 2 + s * 0.4, height / 2);
  rotate(random(-0.5, 0.1));
  beginShape();
  // vertex((-s / 2) * random(1, 1.02), -s * random(0.98, 1.0));
  // vertex((s / 2) * random(0.98, 1.02), -s * random(0.98, 1.0));
  // vertex((s / 2) * random(0.98, 1.0), s * random(1.0, 1.02));
  // vertex((-s / 2) * random(0.98, 1.02), s * random(0.98, 1.02));
  vertex((-s / 2) * random(1, 1.02), -(s / 2) * random(0.98, 1.0));
  vertex((s / 2) * random(0.98, 1.02), -(s / 2) * random(0.98, 1.0));
  vertex((s / 2) * random(0.98, 1.0), (s / 2) * random(1.0, 1.02));
  vertex((-s / 2) * random(0.98, 1.02), (s / 2) * random(0.98, 1.02));
  endShape(CLOSE);
  pop();
}

function keyPressed() {
  if (key == "s" || key == "S") saveCanvas("output", "png");
  else {
    actRandomSeed = random(100000);
    loop();
  }
}
