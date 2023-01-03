/*
Genuary 2023
JAN.03 "Glitch Art"

By Evgeny Sushko
https://github.com/evgenysushko/genuary2023
*/

"use strict";

let w = 800;
let img;
let colors = [];

function preload() {
  img = loadImage("sketches/JAN03/data/klimt.jpeg");
}

function setup() {
  // pixelDensity(1);
  createCanvas(w, w);
  noStroke();
  // ellipseMode(CORNER);
}

function draw() {
  noLoop();
  background(255);

  let tileCount = 400;
  let rectSize = floor(width / tileCount);

  img.loadPixels();
  colors = [];

  for (let gridY = 0; gridY < tileCount; gridY++) {
    for (let gridX = 0; gridX < tileCount; gridX++) {
      let px = int(gridX * rectSize);
      let py = int(gridY * rectSize);
      let i = (py * img.width + px) * 4;
      let c = color(
        img.pixels[i],
        img.pixels[i + 1],
        img.pixels[i + 2],
        img.pixels[i + 3]
      );
      colors.push(c);
    }
  }

  let i = 0;
  for (let gridY = 0; gridY < tileCount; gridY++) {
    for (let gridX = 0; gridX < tileCount; gridX++) {
      fill(colors[i]);
      push();
      rotate(random(0.05));
      // circle(gridX * rectSize, gridY * rectSize, rectSize);
      square(gridX * rectSize, gridY * rectSize, rectSize);
      pop();
      i++;
    }
  }
}

function keyPressed() {
  if (key == "s" || key == "S") saveCanvas("output", "png");
}
