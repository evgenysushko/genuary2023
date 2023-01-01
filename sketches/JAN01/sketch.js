/*
Genuary 2023
JAN.01 "Perfect loop / Infinite loop / endless GIFs"

By Evgeny Sushko
https://github.com/evgenysushko
*/
"use strict";

let FPS = 60;

let totalFrames = 30;
// const totalFrames = 120;

// let w = 620;
const w = 800;

// let offset = 10;
const offset = w / 10;

let spacing = 10;
let capture = false;

function setup() {
  createCanvas(w, w);
  frameRate(FPS);
}

function draw() {
  stroke(120, 20, 20, 120);
  // stroke(80);
  noFill();

  background(220);

  let t = frameCount / totalFrames;

  for (let px = offset; px <= w - offset; px += spacing) {
    for (let py = offset; py <= w - offset; py += spacing) {
      strokeWeight(4 + 4 * periodicFunction(offsetFunction(px, py) + t));

      if ((px / spacing) % 2) {
        if ((py / spacing) % 2) {
          circle(px, py, 5);
        } else {
          point(px, py);
        }
      } else {
        if ((py / spacing) % 2) {
          point(px, py);
        } else {
          circle(px, py, 5);
        }
      }
    }
  }
}

function periodicFunction(t) {
  return sin(TAU * t);
}

function offsetFunction(x, y) {
  return (x / 20) ** 2 + (y / 50) ** 2;
  // return (x / 45) * (y / 45);
}

function keyPressed() {
  if (key == "s") {
    saveGif("output", totalFrames, { delay: 0, units: "frames" });
    capture = true;
  }
}
