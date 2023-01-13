/*
Genuary 2023
JAN.13 "Something you’ve always wanted to learn"

A mosaic pattern from my pillowcase

By Evgeny Sushko
https://github.com/evgenysushko/genuary2023
*/

"use strict";

let w = 800;
let actRandomSeed = 0;

function setup() {
  // pixelDensity(1);
  createCanvas(w, w);
  noStroke();
  strokeJoin(ROUND);
}

function draw() {
  noLoop();
  randomSeed(actRandomSeed);
  background("#f0eeed");

  let cirNum = w * 3;
  let circles = generateCircles(cirNum);

  for (let cir of circles) {
    fill(lerpColors(rcol(), 0, noise(cir.x * 0.005, cir.y * 0.005) * 0.2));
    cir.makeShape();
  }
}

class Circle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  makeShape() {
    let res = 7;
    let da = TAU / res;
    let id = random(TAU);
    beginShape();
    for (let i = 0; i < res; i++) {
      if (random() < random(0.7, 0.8)) {
        let a = da * i + id;
        let r = this.r * random(0.5, 1);
        let px = this.x + cos(a) * r;
        let py = this.y + sin(a) * r;
        if (random() < 0.2) {
          curveVertex(px, py);
        } else vertex(px, py);
      }
    }
    endShape(CLOSE);
  }
}

function generateCircles(cirNum) {
  let circles = [];

  function generateCoord() {
    let px = random(-w / 20, w);
    let py = random(-w / 20, w);
    let r = random(w / 90, w / 37);
    return [px, py, r];
  }

  let [px, py, r] = generateCoord();

  let cirNew = new Circle(px, py, r);
  circles.push[cirNew];

  for (let i = 0; i < cirNum; i++) {
    [px, py, r] = generateCoord();
    let cirNew = new Circle(px, py, r);
    let dMin = w;
    let rMax = 0;
    for (let cir of circles) {
      dMin = min(dist(cir.x, cir.y, cirNew.x, cirNew.y), dMin);
      rMax = max(cir.r, rMax);
    }
    if (dMin > (cirNew.r + rMax) * 1.1) {
      circles.push(cirNew);
    }
  }
  return circles;
}

let colors = [
  "#ebd65d",
  "#fe6142",
  "#039c6b",
  "#97c3db",
  "#d1d0cd",
  "#d1d0cd",
  "#314382",
];
// let colors = ["#294984", "#6ca0a7", "#ffc789", "#df5f50", "#5a3034", "#fff1dd"];
// let colors = [
//   "#D81D03",
//   "#101A9D",
//   "#1C7E4E",
//   "#F6A402",
//   "#EFD4BF",
//   "#E2E0EF",
//   "#050400",
// ];
// let colors = [
//   "#fef9c6",
//   "#ffcc4d",
//   "#f5b800",
//   "#56a1c4",
//   "#4464a1",
//   "#ee726b",
//   "#df5f50",
//   "#5a3034",
// ];

function rcol() {
  return colors[int(random(colors.length))];
}

function lerpColors(c2, c1, amt = 0.5) {
  return lerpColor(color(c2), color(c1), amt);
}

function keyPressed() {
  if (key == "s" || key == "S") saveCanvas("output", "png");
  else {
    actRandomSeed = random(100000);
    loop();
  }
}
