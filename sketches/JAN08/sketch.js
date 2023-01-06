/*
Genuary 2023
JAN.08 "Signed Distance Functions"

Many thanks to Piter Pasma for his excellent demonstration
of using SDFs in p5.js - https://youtu.be/KRB57wyo8_4

By Evgeny Sushko
https://github.com/evgenysushko/genuary2023
*/

"use strict";

let w;

let L = (x, y) => (x * x + y * y) ** 0.5;

function setup() {
  // pixelDensity(1);
  w = min(windowWidth, windowHeight);
  createCanvas(w, w);
  background("#432");
}

function draw() {
  for (let k = 0; k < 1000; k++) {
    let p = [random(-1, 1), random(-1, 1)];
    let d = sdf(p);
    let col = 0;
    if (d < -0.01) col = "#D81D03";
    if (d > 0.01) col = "#1C7E4E";
    drawCircle(p, 2, col);
  }
}

function drawCircle([x, y], r, c) {
  noStroke();
  fill(c);
  circle(((x + 1) * width) / 2, ((y + 1) * height) / 2, r / 2);
}

function sdfCircle([x, y], [cx, cy], r) {
  x -= cx;
  y -= cy;
  return L(x, y) - r;
}

function sdf([x, y]) {
  let lin = abs(y) - 0.2;
  lin = abs(lin) - 0.1;

  let lin2 = abs(x) - 0.2;
  lin2 = abs(lin2) - 0.1;

  let ball = sdfCircle([x, y], [0, 0], 0.33);
  ball = abs(ball) - 0.4;
  ball = abs(ball) - 0.1;
  ball = abs(ball) - 0.05;
  ball = abs(ball) - 0.03;

  return min(lin, lin2, ball) + ball;
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    noLoop();
  }
}
