/*
Genuary 2023
JAN.22 "Shadows"

Built using the code from  황희선's work - https://openprocessing.org/sketch/1172545

By Evgeny Sushko
https://github.com/evgenysushko/genuary2023
*/

"use strict";

let w = 800;
let num = 80;
let boxes = [];

let hue = 2;
let sat = 78;

function setup() {
  createCanvas(w, w);
  noFill();
  colorMode(HSB, 360, 100, 100, 100);
  background(0);

  for (let i = 0; i < num; i++) {
    boxes[i] = new Box(-10 + 5 * i, 20 - 5 * i, 20 + i * (100 / num));
  }
}

function draw() {
  noLoop();
  for (let fr = 0; fr < 160; fr++) {
    for (let i = 0; i < num; i++) {
      boxes[i].display();
      boxes[i].update();
    }
  }
}

class Box {
  constructor(x, y, b) {
    this.x = x;
    this.y = y;
    this.bright = b;
  }

  display() {
    stroke(hue, sat, this.bright);
    strokeWeight(0.2);
    beginShape();
    vertex(this.x, this.y);
    vertex(this.x + w * 1.1, this.y + w * 0.2);
    vertex(this.x + w * 1.1, this.y + w * 0.2 + w * 0.9);
    vertex(this.x, this.y + w * 0.9);
    endShape(CLOSE);
  }

  update() {
    this.bright++;
    if (this.bright >= 100) {
      this.bright = 0;
    }
  }
}

function keyPressed() {
  if (key == "s" || key == "S") saveCanvas("output", "png");
}
