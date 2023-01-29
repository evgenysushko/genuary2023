/*
Genuary 2023
JAN.26 "My kid could have made that"

Credit for pencil drawing algorithm:
Marcelo de Oliveira Rosa Prates, https://openprocessing.org/sketch/924647

By Evgeny Sushko
https://github.com/evgenysushko/genuary2023
*/

"use strict";

// let colors = ["#f7f3f2", "#0a0a0a", "#0077e1", "#f5d216", "#fc3503"];
// let colors = [255, "#ed225d", "#3caf65", "#0d40bf", "#f5b800"];
// let colors = [255, "#226699", "#dd2e44", "#ffcc4d"];
let colors = ["#f7f3f2", "#563d7c", "#0096d8", "#f4e361", "#f24679"];

let w = 800;
let noiseStep = 0.02;
let circles;
let actRandomSeed = 0;

function setup() {
  // pixelDensity(1);
  createCanvas(w, w);
}

function draw() {
  noLoop();
  randomSeed(actRandomSeed);
  noiseSeed(actRandomSeed);
  background(colors[0]);

  circles = [];

  for (let i = 0; i < random(6, 15); i++) {
    initCircle();
  }

  circles.forEach((c) => {
    c.drawPencil();
  });
}

function initCircle() {
  let occupied = false;
  let r = random(40, 150);
  let x = random(r * 1.5, width - r * 1.5);
  let y = random(r * 1.5, height - r * 1.5);
  let col = colors.slice(1)[int(random(colors.length - 1))];
  let c = new Circle(x, y, r, col);

  circles.forEach((c) => {
    if (dist(x, y, c.x, c.y) < max(r * 2, c.r * 2)) {
      occupied = true;
    }
  });

  if (occupied) {
    initCircle();
  } else circles.push(c);
}

class Circle {
  constructor(x, y, r, col) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.col = color(col);
  }

  drawPencil() {
    push();
    translate(this.x, this.y);
    rotate(random(-PI / 12, PI / 12));

    let x = this.r * cos((-3 * PI) / 4);
    let y = this.r * sin((-3 * PI) / 4);
    let t = random(-PI / 5, -PI / 7);

    let noff = random(10000);

    for (let i = 0; i < random(80, 110); i++) {
      this.col.setAlpha(map(noise(noff), 0, 1, 50, 255));
      stroke(this.col);

      let a = tan(t);
      if (i % 2 == 0) t += random(0.98, 1.0) * PI;
      else t -= random(0.98, 1.0) * PI;

      let A = 1 + a ** 2;
      let B = 2 * x + 2 * y * a;
      let C = x ** 2 + y ** 2 - this.r ** 2;

      let dx0 = (-B - sqrt(B ** 2 - 4 * A * C)) / (2 * A);
      let dx1 = (-B + sqrt(B ** 2 - 4 * A * C)) / (2 * A);

      let dx = abs(dx0) > abs(dx1) ? dx0 : dx1;

      let ddx = 0.025 * dx * random(-1, 1);

      let x1 = x + (dx + ddx);
      let y1 = y + a * (dx + ddx);

      strokeWeight(random(2, 4));
      line(x, y, x1, y1);

      x = x1;
      y = y1;

      noff += noiseStep;
    }

    pop();
  }
}

function keyPressed() {
  if (key == "s" || key == "S") saveCanvas("output", "png");
  else {
    actRandomSeed = random(100000);
    loop();
  }
}
