/*
Genuary 2023
JAN.14 "Aesemic"

By Evgeny Sushko
https://github.com/evgenysushko/genuary2023
*/

"use strict";

let w = 800;
let offset = w / 10;
let spacing = w / 80;
let actRandomSeed = 0;
let lineStart;

function setup() {
  createCanvas(w, w);
  noFill();
}

function draw() {
  noLoop();
  background(220);
  randomSeed(actRandomSeed);

  let scaler = 1.3;
  rotate(-PI / random(120, 180));
  scale(scaler);

  for (
    let py = offset * 0.8;
    py < w - offset * 2.8;
    py += spacing * 3 * random(0.8, 1)
  ) {
    lineStart = true;
    for (
      let px = offset * 0.7;
      px < w - offset * 3.25;
      px += spacing * random(0.85, 1)
    ) {
      let numCurves = int(random(0, 1));
      for (let i = 0; i <= numCurves; i++) {
        drawCurve(px, py);
      }
      if (lineStart) lineStart = !lineStart;
    }
  }
}

function drawCurve(xoff, yoff) {
  lineStart ? strokeWeight(random(0.6, 0.8)) : strokeWeight(random(0.3, 0.8));

  let x1 = lineStart ? xoff * random(0.9, 1.1) : xoff;
  let y1 = yoff;

  let cpx1 =
    x1 + random(-spacing, spacing / 3) * (lineStart ? random(1, 1.5) : 1);
  let cpy1 =
    y1 +
    random(
      -spacing * 2 * (1 + 2 * lineStart),
      spacing * 3 * (1 + 1 * lineStart)
    ) *
      (lineStart ? random(0.8, 1) : random(1.2));

  let cpx2 = cpx1 + random(-spacing, spacing / 2) * (lineStart ? 1.5 : 1);
  let cpy2 =
    yoff + random(-spacing * 2 * (1 + lineStart), spacing) * random(1.2);

  let x2 = xoff + spacing * random(0.7, 1);
  let y2 = yoff;

  bezier(x1, y1, cpx1, cpy1, cpx2, cpy2, x2, y2);
}

function keyPressed() {
  if (key == "s" || key == "S") saveCanvas("output", "png");
  else {
    actRandomSeed = random(100000);
    loop();
  }
}
