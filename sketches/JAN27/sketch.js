/*
Genuary 2023
JAN.27 "In the style of Hilma Af Klint"

By Evgeny Sushko
https://github.com/evgenysushko/genuary2023
*/

"use strict";

let w = 800;
let actRandomSeed = 0;

let palettes = [
  ["#f6f4f3", "#2b2927"],
  ["#fac434", "#6f91b4"],
  ["#6f91b4", "#fac434"],
  ["#ef9aa1", "#f6e6d6"],
  ["#f6e6d6", "#ef9aa1"],
  ["#f8531d", "#7089d9"],
  ["#7089d9", "#f8531d"],
  ["#fcc548", "#4c7c4e"],
  ["#4c7c4e", "#fcc548"],
];

let noiseipg;

function setup() {
  // pixelDensity(1);
  createCanvas(w, w);
  noStroke();

  noiseipg = createGraphics(200, 200);

  let noiseScale = 0.05;
  for (let w = 1; w < 200; w += 1) {
    for (let h = 1; h < 200; h += 1) {
      noiseipg.strokeWeight(random(1, 4));
      let n = noise(w * noiseScale, h * noiseScale);
      noiseipg.stroke(200, n * 7);
      noiseipg.point(w, h);
    }
  }
}

function draw() {
  noLoop();
  randomSeed(actRandomSeed);
  noiseSeed(actRandomSeed);
  let backColor = "#dfd9c6";
  background(backColor);

  let circles = [];

  let crlCenter = new Circle(
    w / 2,
    w / 2,
    w * 0.6,
    palettes[0][0],
    palettes[0][1],
    255
  );

  let palette;
  for (let i = 0; i < 10; i++) {
    if (random() < 0.9) {
      palette = palettes[0];
    } else {
      palette = random(palettes.slice(1));
    }

    circles.push(
      new Circle(
        random(w * 0.05, w * 0.95),
        random(w * 0.05, w * 0.95),
        w * random(0.3) * random() * random(),
        palette[0],
        palette[1],
        random(240, 250)
      )
    );
  }

  for (let crl of circles) {
    crl.show();
  }

  crlCenter.show();

  image(noiseipg, 0, 0, w, w);
}

class Circle {
  constructor(x, y, s, c1, c2, a) {
    this.x = x;
    this.y = y;
    this.s = s;
    this.c1 = color(c1);
    this.c1.setAlpha(a);
    this.c2 = color(c2);
    this.c2.setAlpha(a);
  }
  show() {
    fill(this.c1);
    arc(this.x, this.y, this.s, this.s, PI / 2, -PI / 2);
    fill(this.c2);
    arc(this.x, this.y, this.s, this.s, -PI / 2, PI / 2);

    fill(this.c2);
    arc(this.x, this.y, this.s * 0.67, this.s, PI / 2, -PI / 2);
    fill(this.c1);
    arc(this.x, this.y, this.s * 0.67, this.s, -PI / 2, PI / 2);
  }
}

function keyPressed() {
  if (key == "s" || key == "S") saveCanvas("output", "png");
  else {
    actRandomSeed = random(100000);
    loop();
  }
}
