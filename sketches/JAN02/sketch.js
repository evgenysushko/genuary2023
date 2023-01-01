"use strict";

let w = 800;
let offset = w / 10;
let r = 0;
let rLimit = w - 2 * offset;
let theta = 0;

function setup() {
  createCanvas(w, w);
  background(51);
  fill(51);
  // circle(width / 2, height / 2, rLimit);
}

function draw() {
  translate(width / 2, height / 2);

  if (r > rLimit / 2) {
    stroke(51);
  } else stroke(255);

  strokeWeight(2);

  beginShape();
  for (let i = 0; i < 10; i++) {
    let x = r * cos(theta);
    let y = r * sin(theta);

    point(x, y);

    theta += 0.5;
    r += 0.1;
  }
  endShape();

  if (r >= rLimit / 2) noLoop();
}

function keyPressed() {
  if (key == "s" || key == "S") saveCanvas("output", "png");
}
