/*
Genuary 2023
JAN.24 "Textile"

By Evgeny Sushko
https://github.com/evgenysushko/genuary2023
*/

"use strict";

let w = 800;
// let actRandomSeed = 0;
let numStripes = 5;
let strokeW = w / (240 * 1);
let tileCountX = 18 * 1;
let tileCountY = 18 * 2;

function setup() {
  // pixelDensity(1);
  createCanvas(w, w);
  // createCanvas(windowWidth, windowHeight);
  background("#050406"); // Black Satin
  // stroke("#C2C2BF"); // Pearl
  noStroke();
  strokeWeight(strokeW); // draw lines 10 pixels thick
}

function draw() {
  noLoop();
  // randomSeed(actRandomSeed);
  // the width and height of each cell of the grid
  let w = width / tileCountX;
  let h = height / tileCountY;
  // the distance between stripes
  let w2 = w / numStripes;
  let h2 = h / numStripes;

  background(100);
  for (let row = 0; row < tileCountY; row++) {
    let offset = 0;
    for (let col = 0; col < tileCountX; col++) {
      if ((row + col) % 2 == 0) {
        fill("#963267");
        rect(w * col + offset + 5, h * row, w, h);
        offset = 0;
      } else {
        offset = 10;
        fill("#963267");
        rect(w * col, h * row, w + offset, h);
        fill(0);
        rect(w * col + offset, h * row, 5, h);
      }
      // for (let i = 0; i < numStripes; i++) {
      //   // this will be true for every other cell in the grid
      //   if ((row + col) % 2 == 0) {
      //     // horizontal lines
      //     line(
      //       w * col + w2 / 2,
      //       h * row + i * h2 + h2 / 2,
      //       w * (col + 1) - w2 / 2,
      //       h * row + i * h2 + h2 / 2
      //     );
      //   } else {
      //     // vertical lines
      //     line(
      //       w * col + i * w2 + w2 / 2,
      //       h * row + h2 / 2,
      //       w * col + i * w2 + w2 / 2,
      //       h * (row + 1) - h2 / 2
      //     );
      //   }
      // }
    }
  }
}

function keyPressed() {
  if (key == "s" || key == "S") saveCanvas("output", "png");
  // else {
  //   actRandomSeed = random(100000);
  //   loop();
  // }
}
