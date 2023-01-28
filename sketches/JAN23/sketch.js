/*
Genuary 2023
JAN.23 "More Moiré"

Credit to Teiiii's work - https://openprocessing.org/sketch/1543917

By Evgeny Sushko
https://github.com/evgenysushko/genuary2023
*/

"use strict";

let w = 800;
let actRandomSeed = 0;

function setup() {
  createCanvas(w, w);
  noFill();
}

function draw() {
  noLoop();
  randomSeed(actRandomSeed);
  background(20);
  // background(colors[0]);

  for (let i = 0; i < 20; i++) {
    let particle = new Circle(
      random(width),
      random(height),
      random(5, 35) * random() * 3,
      // color(random(50, 250))
      color(colors[4])
    );
    particle.display();
  }
}

class Circle {
  constructor(px, py, num, c) {
    this.posX = px;
    this.posY = py;
    this.numCircles = num;
    this.c = c;
    this.c.setAlpha(random(50, 250));
  }

  display() {
    stroke(this.c);
    // strokeWeight(2);
    for (let i = 0; i < this.numCircles; i++) {
      circle(this.posX, this.posY, 20 * (i + 1));
    }
  }
}

// let colors = ["#e63946", "#f1faee", "#a8dadc", "#457b9d", "#1d3557"];
let colors = ["#044e9e", "#6190d3", "#fcf7ed", "#fcd494", "#f4b804"];

function keyPressed() {
  if (key == "s" || key == "S") saveCanvas("output", "png");
  else {
    actRandomSeed = random(100000);
    loop();
  }
}
