/*
Genuary 2023
JAN.30 "Minimalism"

By Evgeny Sushko
https://github.com/evgenysushko/genuary2023
*/

"use strict";

let w = 800;
let hexagonSize;

function setup() {
  w = min(windowWidth, windowHeight);
  createCanvas(w, w, SVG);

  strokeWeight(2);
  stroke(255);
  noFill();

  hexagonSize = w / 20;
}

function draw() {
  background(20);
  makeSpiral(width / 2, height / 2, hexagonSize, 140);
  noLoop();
}

function makeSpiral(cX, cY, r, counter) {
  let x = cX;
  let y = cY;
  let angle = TAU / 6;
  let side = 0;

  drawLine(x, y, r / 1.75);
  counter--;
  while (counter > 0) {
    for (
      let t = 0;
      t < floor((side + 4) / 6) + (side % 6 == 0) && counter;
      t++
    ) {
      x = x - r * sin(side * angle);
      y = y - r * cos(side * angle);
      drawLine(x, y, r / 1.75);
      counter--;
    }
    side++;
  }
}

function drawLine(cX, cY, r) {
  r /= 1.5;
  beginShape();
  for (let a = 0; a <= 2; a++) {
    let x = cX + r * tan(a);
    let y = cY + r * tan(a);
    // let x = cX + r;
    // let y = cY + r;
    vertex(x, y);
  }
  endShape();
}

function keyPressed() {
  if (key == "s" || key == "S") saveCanvas("output", "png");
}
