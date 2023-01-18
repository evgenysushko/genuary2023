/*
Genuary 2023
JAN.18 "Definitely not a grid"

Credit to Levente Sandor for the watercolor brushes algorithm - https://openprocessing.org/sketch/110105

By Evgeny Sushko
https://github.com/evgenysushko/genuary2023
*/

"use strict";

let w = 800;
let brushes = [];

function setup() {
  // pixelDensity(1);
  createCanvas(w, w);
  colorMode(HSB, 360, 100, 100, 100);
  background(255);
  for (let i = 0; i < 200; i++) {
    brushes.push(new Brush());
  }
}

function draw() {
  for (let brush of brushes) {
    brush.paint();
  }
}

class Brush {
  constructor() {
    this.angle = random(TWO_PI);
    this.x = random(width);
    this.y = random(height);
    this.clr = color(random(0, 40), random(50, 80), random(70, 100), 5);
    this.components = [];
    for (let i = 0; i < 15; i++) {
      this.components[i] = int(random(5, 20));
    }
  }

  paint() {
    let a = 3;
    let r = 4;
    let x1 = this.x;
    let y1 = this.y;
    let u = random(5, 3);

    fill(this.clr);
    noStroke();

    beginShape();
    while (a < TWO_PI) {
      vertex(x1, y1);
      let v = random(1, 1);
      x1 = this.x + r * cos(this.angle + a) * u * v;
      y1 = this.y + r * sin(this.angle + a) * u * v;
      a += PI / 150;
      for (let i = 1; i < 2; i++) {
        r += sin(a * this.components[i]);
      }
    }
    endShape(CLOSE);

    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
      this.angle += HALF_PI;
    }

    this.x += 2 * cos(this.angle);
    this.y += 2 * sin(this.angle);
    this.angle += random(-0.2, 0.2);
  }
}

function keyPressed() {
  if (key == "s" || key == "S") saveCanvas("output", "png");
}
