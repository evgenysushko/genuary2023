/*
Genuary 2023
JAN.20 "Art Deco"

By Evgeny Sushko
https://github.com/evgenysushko/genuary2023
*/

"use strict";

let w = 800;
let nDiamonds = 10;

let colors = [
  "#373f65",
  "#373d51",
  "#3b5064",
  "#2e6371",
  "#dfd29e",
  "#c0924d",
  "#d7b7ac",
  "#cfbda2",
];

let b = colors[6];
let c = colors[3];

function setup() {
  // pixelDensity(1);
  createCanvas(w, w);
  background(b);
}

function draw() {
  noLoop();
  let d = w / nDiamonds;
  let s = d * 0.625;
  let nRows = int(w / s) + 1;

  for (let i = 0; i < nRows; i++) {
    for (let j = 0; j < nDiamonds + 1; j++) {
      let diamond = new ArtDecoDiamond(
        j * d + (i % 2 ? d / 2 : 0),
        w + s * 0.7 - i * s,
        s
      );
      diamond.display();
    }
  }
}

class ArtDecoDiamond {
  constructor(x, y, s) {
    this.x = x;
    this.y = y;

    this.s1 = s;
    this.r1 = this.s1 * 0.8;
    this.edge1 = Math.sqrt(this.s1 ** 2 + this.r1 ** 2);

    this.edge2 = this.edge1 * 0.75;
    this.s2 = this.edge2 / 1.28;
    this.r2 = this.s2 * 0.8;

    this.edge3 = this.edge1 * 0.5;
    this.s3 = this.edge3 / 1.28;
    this.r3 = this.s3 * 0.8;

    this.edge4 = this.edge1 * 0.2;
    this.s4 = this.edge4 / 1.28;
    this.r4 = this.s4 * 0.8;

    this.strokeW = s / 30;
  }

  display() {
    push();
    translate(this.x, this.y);

    stroke(c);
    strokeWeight(this.strokeW);
    noFill();

    beginShape();
    vertex(0, 0);
    vertex(-this.r1, -this.s1);
    vertex(0, -2 * this.s1);
    vertex(this.r1, -this.s1);
    endShape(CLOSE);

    beginShape();
    vertex(0, 0);
    vertex(-this.r2, -this.s2);
    vertex(0, -2 * this.s2);
    vertex(this.r2, -this.s2);
    endShape(CLOSE);

    beginShape();
    vertex(0, 0);
    vertex(-this.r3, -this.s3);
    vertex(0, -2 * this.s3);
    vertex(this.r3, -this.s3);
    endShape(CLOSE);

    line(0, -2 * this.s2, 0, -2 * this.s4);

    fill(c);
    beginShape();
    vertex(0, 0);
    vertex(-this.r4, -this.s4);
    vertex(0, -2 * this.s4);
    vertex(this.r4, -this.s4);
    endShape(CLOSE);

    pop();
  }
}

function keyPressed() {
  if (key == "s" || key == "S") saveCanvas("output", "png");
}
