/*
Genuary 2023
JAN.16 "Reflection of a reflection"

By Evgeny Sushko
https://github.com/evgenysushko/genuary2023
*/

"use strict";

let w = 800;
let L = (x, y) => (x * x + y * y) ** 0.5;

// let colors = ["#f2c71c", "#ab441b", "#5a0000"];
// let colors = ["#ffd919", "#262104", "#fffbe6"];
// let colors = ["#021d34", "#228fca", "#dcedf0"];
// let colors = ["#ffcc4d", "#226699", "#dd2e44"];
let colors = ["#e9c46a", "#2a9d8f", "#264653"];

function setup() {
  createCanvas(w, w);
  background("#432");
}

function draw() {
  for (let k = 0; k < 2000; k++) {
    let p = [random(-1, 1), random(-1, 1)];
    let d = sdf(p);
    let col = colors[0];
    if (d < -0.01) col = colors[1];
    if (d > 0.01) col = colors[2];
    drawShape(p, 2, col);
  }
}

function drawShape([x, y], r, c) {
  noStroke();
  fill(c);
  circle(((x + 1) * width) / 4, ((y + 1) * height) / 4, r / 2);
  circle(
    ((x + 1) * width) / 4,
    map(-y + 1, -1, 1, height / 4, (3 * height) / 4),
    r / 2
  );
  circle(
    map(-x + 1, -1, 1, width / 4, (3 * width) / 4),
    ((y + 1) * height) / 4,
    r / 2
  );
  circle(
    map(-x + 1, -1, 1, width / 4, (3 * width) / 4),
    map(-y + 1, -1, 1, height / 4, (3 * height) / 4),
    r / 2
  );
}

function sdfCircle([x, y], [cx, cy], r) {
  x -= cx;
  y -= cy;
  return L(x, y) - r;
}

function sdf([x, y]) {
  let ball = sdfCircle([x, y], [0, 0], 0.33);
  ball = abs(ball) - 0.4;
  ball = abs(ball) - 0.1;
  ball = abs(ball) - 0.05;
  ball = abs(ball) - 0.03;
  return min((cos(x) * ball) / sin(x), 0.2 * ball, ball / 2);
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    noLoop();
  }
}
