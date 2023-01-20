/*
Genuary 2023
JAN.21 "Persian Rug"

Credits:
- akizuki for pthe core Persian Pattern algorithm: https://openprocessing.org/sketch/1304832
- Gorilla Sun, for the Granulation algorithm: https://www.fxhash.xyz/article/all-about-that-grain

By Evgeny Sushko
https://github.com/evgenysushko/genuary2023
*/

"use strict";

let w = 800;
let actRandomSeed = 0;

const symmetricArray = [
  [0, 1, 2, 3, 2, 1, 0],
  [1, 2, 3, 4, 3, 2, 1],
  [2, 4, 6, 8, 6, 4, 2],
  [3, 6, 6, 8, 6, 6, 3],
  [2, 4, 6, 8, 6, 4, 2],
  [1, 2, 3, 4, 3, 2, 1],
  [0, 1, 2, 3, 2, 1, 0],
];

// const symmetricArray = [
//   [0, 1, 2, 1, 0],
//   [1, 3, 4, 3, 1],
//   [2, 4, 8, 4, 2],
//   [1, 3, 4, 3, 1],
//   [0, 1, 2, 1, 0],
// ];

let palette;
let parent;

function setup() {
  createCanvas(w, w);

  palette = shuffle(chromotome.get().colors);
  while (palette.length < 4) {
    palette = shuffle(chromotome.get().colors);
  }
  for (let i = 0; i < palette.length; i++) {
    palette[i] = color(palette[i]);
  }
  parent = new Square(0, 0, w, w, 0, 10);
}

function draw() {
  noLoop();
  randomSeed(actRandomSeed);
  palette = shuffle(palette);
  background(palette[0]);
  parent.draw(palette);
  granulate(70);
}

class Square {
  constructor(x, y, width, height, generation, seed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.generation = generation;
    this.seed = seed;
    this.children = [];
    this.divide();
  }

  divide() {
    if (this.generation == 3) {
      return;
    }

    let children = [];

    let split = symmetricArray.length;

    for (let xd = 0; xd < split; xd++) {
      for (let yd = 0; yd < split; yd++) {
        let x = this.x + (this.width * xd) / split;
        let y = this.y + (this.height * yd) / split;
        let width = this.width / split;
        let height = this.height / split;
        let seed = this.seed + symmetricArray[xd][yd];

        let child = new Square(x, y, width, height, this.generation + 1, seed);
        children.push(child);
      }
    }
    this.children = children;
  }

  draw(palette) {
    if (this.children.length == 0) {
      noStroke();
      let c = palette[this.seed % palette.length];
      fill(c);
      // rect(this.x, this.y, this.width, this.height);
      circle(this.x, this.y, this.width);
    }

    for (let i = 0; i < this.children.length; i++) {
      this.children[i].draw(palette);
    }
  }
}

function granulate(amount) {
  loadPixels();
  const d = pixelDensity();
  const pixelsCount = 4 * (width * d) * (height * d);
  for (let i = 0; i < pixelsCount; i += 4) {
    const grainAmount = random(-amount, amount);
    pixels[i] = pixels[i] + grainAmount;
    pixels[i + 1] = pixels[i + 1] + grainAmount;
    pixels[i + 2] = pixels[i + 2] + grainAmount;
    pixels[i + 3] = pixels[i + 3] + grainAmount;
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
