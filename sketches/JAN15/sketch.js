/*
Genuary 2023
JAN.15 "Sine waves"

By Evgeny Sushko
https://github.com/evgenysushko/genuary2023
*/

"use strict";

let actRandomSeed = 0;

let w = 800;

let radius = w / 2.1;
let numRings = radius / 5;
let numPoints = Math.floor(radius * 0.5);
let rez = 0.02;
let c;

function setup() {
  // pixelDensity(1);
  createCanvas(w, w);
  // stroke(255, 200);
}

function draw() {
  noLoop();
  randomSeed(actRandomSeed);
  noiseSeed(actRandomSeed);
  let scale = radius / random(2, 100);

  background(20);
  c = color(255);

  translate(width / 2, height / 2);

  let ringCount = 0;
  for (let r = 1; r < radius; r += radius / numRings) {
    ringCount++;
    let aNoise = map(noise(ringCount * rez), 0, 1, scale, scale * 50);
    for (
      let a = random(-1, 1);
      a < aNoise * TAU;
      a += random(TAU) + TAU / numPoints
    ) {
      let px = r * cos(a);
      let py = r * sin(a);
      if (random() > 0.75 - 0.25 * sin(r / 65)) {
        if (random() > 0.9) {
          c.setAlpha(random(200, 250));
          strokeWeight(3);
        } else {
          strokeWeight(1);
        }
        stroke(c);
        point(px, py);
      }
    }
  }
}

function keyPressed() {
  if (key == "s" || key == "S") saveCanvas("output", "png");
  else {
    actRandomSeed = random(100000);
    loop();
  }
}
