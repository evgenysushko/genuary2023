/*
Genuary 2023
JAN.03 "Intersections"

By Evgeny Sushko
https://github.com/evgenysushko/genuary2023

Thanks to:
- Manolo Gamboa Naon, for basic idea with intersecting transparent circles: https://www.behance.net/gallery/66472289/CUDA
- Gorilla Sun, for granulation algorithm: https://www.fxhash.xyz/article/all-about-that-grain
- Roni Kaufman, for Mondrian color pallette: https://ronikaufman.github.io/color_pals/
*/

"use strict";

let w = 1000;
let actRandomSeed = 0;

function setup() {
  // pixelDensity(1);
  createCanvas(w, w);
  // createCanvas(windowWidth, windowHeight);
}

function draw() {
  noLoop();
  randomSeed(actRandomSeed);
  background(250);
  noStroke();

  for (let i = 0; i < 1000; i++) {
    // for (let i = 0; i < 200; i++) {
    let particle = new Circle(random(width), random(height));
    particle.display();
  }

  // granulate(70);
  granulateChannels(70);
}

class Circle {
  constructor(px, py) {
    this.posX = px;
    this.posY = py;
    this.size1 = width * random() * random(0, 0.6);
    this.size2 = this.size1 * random(0.1, 0.5);
    this.color1 = color(rcol());
    this.color2 = color(rcol());
    this.alpha1 = random(80) * random();
    this.alpha2 = random(120) * random();
  }

  display() {
    this.color1.setAlpha(this.alpha1);
    this.color2.setAlpha(this.alpha2);

    fill(this.color1);
    circle(this.posX, this.posY, this.size1);

    fill(this.color2);
    circle(this.posX, this.posY, this.size2);
  }
}

let colors = ["#0a0a0a", "#f7f3f2", "#0077e1", "#f5d216", "#fc3503"];
// let colors = [50];
// let colors = ["#e63946", "#f1faee", "#a8dadc", "#457b9d", "#1d3557"];
// let colors = ["#044e9e", "#6190d3", "#fcf7ed", "#fcd494", "#f4b804"];

function rcol() {
  return colors[int(random(colors.length))];
}

function granulateChannels(amount) {
  loadPixels();
  const d = pixelDensity();
  const pixelsCount = 4 * (width * d) * (height * d);
  for (let i = 0; i < pixelsCount; i += 4) {
    pixels[i] = pixels[i] + random(-amount, amount);
    pixels[i + 1] = pixels[i + 1] + random(-amount, amount);
    pixels[i + 2] = pixels[i + 2] + random(-amount, amount);
    pixels[i + 3] = pixels[i + 3] + random(-amount, amount);
  }
  updatePixels();
}

function keyPressed() {
  if (key == "s" || key == "S") saveCanvas("output", "png");
  else {
    actRandomSeed = random(100000);
    loop();
  }
}
