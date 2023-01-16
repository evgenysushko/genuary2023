/*
Genuary 2023
JAN.17 "A grid inside a grid inside a grid"

Credit to Ahmad Moussa for the hexagonal grid algorithm - https://gorillasun.de/blog/a-guide-to-hexagonal-grids-in-p5js

By Evgeny Sushko
https://github.com/evgenysushko/genuary2023
*/

"use strict";

let w = 800;
let hexagonSizeDenom = 4;
let maxRecursionDepth = 3;
let isPointyTop = true;
let transparency = 70;
let hexagonSize;
let actRandomSeed = 0;

// let colors = ["#ffd919", "#262104", 50];
let colors = ["#e9c46a", 20, 40];
// let colors = ["silver", 0, 40];
// let colors = ["#f2c71c", "#ab441b", 120];
// let colors = ["#228fca", "#021d34", 20];

function setup() {
  // pixelDensity(1);
  // w = min(windowWidth, windowHeight);
  createCanvas(w, w);

  strokeWeight(1);
  strokeJoin(ROUND);
  stroke(colors[2]);
  noFill();
  hexagonSize = w / hexagonSizeDenom;
}

function draw() {
  noLoop();
  randomSeed(actRandomSeed);
  background(colors[1]);

  recursiveHexagon(width / 2, height / 2, hexagonSize, maxRecursionDepth);
}

function recursiveHexagon(cX, cY, r, depth) {
  if (depth == 0) {
    if (random() < 0.8) {
      drawHexagon(cX, cY, r, isPointyTop);
    }
  } else {
    push();
    let c = color(colors[0]);
    // c.setAlpha(transparency - depth * random(20, 20));
    c.setAlpha(transparency - depth * random(0.1, 60));
    // c.setAlpha(transparency - depth * random(0.1, 20));
    fill(c);
    noStroke();
    drawHexagon(cX, cY, r, isPointyTop);
    pop();

    for (let a = 0; a < TAU - TAU / 6; a += TAU / 6) {
      let x = cX + r * cos(a);
      let y = cY + r * sin(a);

      recursiveHexagon(cX, cY, r / 2, depth - 1);
      recursiveHexagon(x, y, r / 2, depth - 1);
    }
  }
}

function drawHexagon(cX, cY, r, pointyTop = false, numSides = 6) {
  beginShape();
  for (
    let a = (pointyTop * TAU) / 12;
    a < TAU + (pointyTop * TAU) / 12;
    a += TAU / numSides
  ) {
    let x = cX + r * cos(a);
    let y = cY + r * sin(a);
    vertex(x, y);
  }
  endShape(CLOSE);
}

function keyPressed() {
  if (key == "s" || key == "S") saveCanvas("output", "png");
  else {
    actRandomSeed = random(100000);
    loop();
  }
}
