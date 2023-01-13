/*
Genuary 2023
JAN.12 "Tesselation"

By Evgeny Sushko
https://github.com/evgenysushko/genuary2023
*/

"use strict";

let w = 800;
let actRandomSeed = 0;

function setup() {
  // pixelDensity(1);
  createCanvas(w, w);
}

function draw() {
  noLoop();
  randomSeed(actRandomSeed);

  let div = int(random(2, 50));
  let s = width / div;

  let det = random(0.01, 0.05);

  noStroke();
  for (let j = 0; j < div; j++) {
    for (let i = 0; i < div; i++) {
      let px = i * s;
      let py = j * s;
      let c1 = rcol();
      let c2 = rcol();
      while (c1 == c2) c2 = rcol();

      fill(c1);
      rect(px, py, s + 0.5, s + 0.5);

      let c3 = lerpColors(c2, c1);
      fill(c3);

      if (noise(px * det, py * det) < 0.5) {
        beginShape();
        vertex(px - 0.5, py - 0.5);
        vertex(px + s + 0.5, py - 0.5);
        vertex(px - 0.5, py + s + 0.5);
        endShape(CLOSE);
      } else {
        beginShape();
        vertex(px - 0.5, py - 0.5);
        vertex(px + s + 0.5, py - 0.5);
        vertex(px + s + 0.5, py + s + 0.5);
        endShape(CLOSE);
      }
    }
  }
}

let colors = ["#e64646", "#3f6e7b", "#417f62", "#e5b148", "#58362c"];

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
