/*
Genuary 2023
JAN.02 "Made in 10 minutes"

By Evgeny Sushko
https://github.com/evgenysushko/genuary2023
*/
"use strict";

let w = 800;
let offset = w / 10;
let r = 0;
let rLimit = w - 2 * offset;
let theta = 0;

function setup() {
  pixelDensity(1);
  createCanvas(w, w);
  background(220);
  fill(51);
  noStroke();
  circle(width / 2, height / 2, rLimit);
  strokeWeight(2);
}

function draw() {
  translate(width / 2, height / 2);

  if (r > rLimit / 2) {
    stroke(51);
  } else stroke(255);

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
