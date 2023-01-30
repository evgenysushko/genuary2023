/*
Genuary 2023
JAN.31 "Deliberately break one of your previous images, take one of your previous works and ruin it."

A sketch that was "broken": https://github.com/evgenysushko/genuary2023/blob/main/sketches/JAN29/sketch.js

By Evgeny Sushko
https://github.com/evgenysushko/genuary2023
*/

"use strict";

let w = 800;
let margin = w / 30;

let colors = ["#294984", "#6ca0a7", "#ffc789", "#df5f50", "#5a3034", "#fff1dd"];
// let colors = [
//   "#fffbe6",
//   "#050505",
//   "#abcd5e",
//   "#29ac9f",
//   "#14976b",
//   "#b3dce0",
//   "#62b6de",
//   "#2b67af",
//   "#f589a3",
//   "#ef562f",
//   "#fc8405",
//   "#f9d531",
// ];
// let colors = ["#0a0a0a", "#f7f3f2", "#0077e1", "#f5d216", "#fc3503"];
// let colors = ["#2c2060", "#4bd3e5", "#fffbe6", "#ffd919", "#ff4f19"];
// let colors = ["#dc060e", "#ffd400", "#0064b0", "#001a5b", "#ffffff"];
// let colors = [
//   "#f2eb8a",
//   "#fed000",
//   "#fc8405",
//   "#ed361a",
//   "#e2f0f3",
//   "#b3dce0",
//   "#4464a1",
//   "#203051",
//   "#ffc5c7",
//   "#f398c3",
//   "#cf3895",
//   "#6d358a",
//   "#06b4b0",
//   "#4b8a5f",
// ];

let actRandomSeed = 0;
let PALETTE;

function setup() {
  // pixelDensity(1);
  createCanvas(w, w);
}

function draw() {
  noLoop();
  randomSeed(actRandomSeed);

  background(random(colors));
  // background(240);
  fill(255);
  noStroke();
  rect(0, 0, w, margin);
  rect(0, w - margin, w, margin);
  rect(0, 0, margin, w);
  rect(w - margin, 0, margin, w);
  rect(0, 0, 0, 0);

  recursivePattern(width / 2, height / 2, 3 * width, 4);
}

function recursivePattern(x, y, mySize, level) {
  level -= 1;
  PALETTE = shuffle(colors, true);
  PALETTE = PALETTE.slice(0, 3);
  patternColors(shuffle(PALETTE));
  pattern(randPattern(123));
  // circlePattern(x, y, mySize, mySize);
  arcPattern(x, y, mySize, mySize);

  if (level >= 0) {
    for (let i = 0; i < 5; i++) {
      let xx = random(0, width);
      let yy = random(0, height);
      recursivePattern(xx, yy, mySize / 2, level);
    }
  }
}

function randPattern(t) {
  const ptArr = [
    PTN.stripe(t / int(random(6, 12))),
    PTN.stripeCircle(t / int(random(6, 12))),
    PTN.stripePolygon(int(random(3, 7)), int(random(6, 12))),
    PTN.stripeRadial(TAU / int(random(6, 30))),
    PTN.wave(t / int(random(1, 3)), t / int(random(10, 20)), t / 5, t / 10),
    PTN.dot(t / 10, (t / 10) * random(0.2, 1)),
    PTN.checked(t / int(random(5, 20)), t / int(random(5, 20))),
    PTN.cross(t / int(random(10, 20)), t / int(random(20, 40))),
  ];
  return random(ptArr);
}

function keyPressed() {
  if (key == "s" || key == "S") saveCanvas("output", "png");
  else {
    actRandomSeed = random(100000);
    loop();
  }
}
