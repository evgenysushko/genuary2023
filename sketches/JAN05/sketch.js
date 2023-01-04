/*
Genuary 2023
JAN.05 "Debug view"

By Evgeny Sushko
https://github.com/evgenysushko/genuary2023

Thanks to Manolo Gamboa Naon for the rectangles packing algorithm
*/

"use strict";

let w = 1000;
let actRandomSeed = 0;

let inconsolata;

function preload() {
  inconsolata = loadFont("sketches/JAN05/assets/inconsolata.otf");
}

function setup() {
  // pixelDensity(1);
  createCanvas(w, w, WEBGL);
  textFont(inconsolata);
  noStroke();
}

function draw() {
  noLoop();
  randomSeed(actRandomSeed);
  background(127);

  translate(-width / 5, -height / 5, -width / 5);
  rotateX(PI * random(0, 0.25));
  rotateZ(PI * random(-0.4, 0.1));

  let rects = [];
  rects.push(new Rect(0, 0, width * 3, height * 3, 0));

  let sub = int(random(4, 5000));

  for (let i = 0; i < sub; i++) {
    let ind = int(random(rects.length * random(0.5, 1)));
    let r = rects[ind];

    if (r.w < 10 || r.h < 10) continue;
    let w1 = r.w * random(0.4, 0.6);
    let w2 = r.w - w1;
    let h1 = r.h * random(0.4, 0.6);
    let h2 = r.h - h1;

    rects.push(
      new Rect(
        r.x - r.w * 0.5 + w1 * 0.5,
        r.y - r.h * 0.5 + h1 * 0.5,
        w1,
        h1,
        r.step + 1
      )
    );
    rects.push(
      new Rect(
        r.x + r.w * 0.5 - w2 * 0.5,
        r.y - r.h * 0.5 + h1 * 0.5,
        w2,
        h1,
        r.step + 1
      )
    );
    rects.push(
      new Rect(
        r.x + r.w * 0.5 - w2 * 0.5,
        r.y + r.h * 0.5 - h2 * 0.5,
        w2,
        h2,
        r.step + 1
      )
    );
    rects.push(
      new Rect(
        r.x - r.w * 0.5 + w1 * 0.5,
        r.y + r.h * 0.5 - h2 * 0.5,
        w1,
        h2,
        r.step + 1
      )
    );
    rects.splice(ind, 1);
  }

  for (let i = 0; i < rects.length; i++) {
    let r = rects[i];
    let w = r.w - 2;
    let h = r.h - 2;
    rectMode(CENTER);

    push();

    let rCol = rcol();
    let rColFinal = lerpColor(color(rCol), color(0), random());
    fill(rColFinal);
    translate(r.x, r.y, 0);
    rect(0, 0, w, h);

    fill(255, 120);
    translate(0, 0, 1);
    textAlign(CENTER, CENTER);
    textSize(r.w / 3);
    text(r.step + 1, 0, 0);

    pop();
  }
}

class Rect {
  constructor(x, y, w, h, step) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.step = step;
  }
}

let colors1 = ["#0a0a0a", "#f7f3f2", "#0077e1", "#f5d216", "#fc3503"];
let colors2 = ["#000000", "#83a6bc", "#faece1", "#bab1a8"];
let colors3 = [
  "#294984",
  "#6ca0a7",
  "#ffc789",
  "#df5f50",
  "#5a3034",
  "#fff1dd",
];
let colors4 = [
  "#fef9c6",
  "#ffcc4d",
  "#f5b800",
  "#56a1c4",
  "#4464a1",
  "#ee726b",
  "#df5f50",
  "#5a3034",
];

let colors = colors4;
function rcol() {
  return colors[int(random(colors.length))];
}

function keyPressed() {
  if (key == "s" || key == "S") saveCanvas("output", "png");
  else {
    actRandomSeed = random(100000);
    loop();
  }
}
