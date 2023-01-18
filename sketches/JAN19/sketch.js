/*
Genuary 2023
JAN.19 "Black and white"

By Evgeny Sushko
https://github.com/evgenysushko/genuary2023
*/

"use strict";

let w = 800;
let actRandomSeed = 0;

let offset = w / 10;
let spacing = 10;
let s = spacing / 2;

function setup() {
  // pixelDensity(1);
  createCanvas(w, w);
  strokeWeight(4);
  // noFill();
  fill(0);
}

function draw() {
  noLoop();
  randomSeed(actRandomSeed);
  background(250);

  for (let px = offset; px <= w - offset; px += spacing) {
    for (let py = offset; py <= w - offset; py += spacing) {
      let toogle = int(random(0, 2));

      if (toogle) {
        point(px, py);
      } else {
        circle(px, py, s);
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
