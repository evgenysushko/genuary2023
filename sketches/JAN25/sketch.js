/*
Genuary 2023
JAN.XX ""

By Evgeny Sushko
https://github.com/evgenysushko/genuary2023
*/

"use strict";

let w = 800;
let colors = [
  ["#FCAE1E", 0],
  ["#090709", "#fed004"],
  ["#090709", "#de1201"],
  ["#f50b0d", 255],
  [255, "#f50b0d"],
];
let actRandomSeed = 0;
let xoff = 0;
let yoff = 0;

function setup() {
  // pixelDensity(1);
  createCanvas(w, w);
  noStroke();
}

function draw() {
  noLoop();
  let colorScheme = random(colors);
  background(colorScheme[0]);
  for (let col = -10; col <= 40; col++) {
    let y = 0;
    while (y <= 1.05 * height) {
      let a = map(col, 0, 40, 0, 6.8);
      let s = map((height / 35) * abs(cos(a)), 0, 30, 4, 28);
      let x = (col * width) / 30;
      fill(colorScheme[1]);
      // circle(x + (height * sin((2 * y) / height)) / random(9.5, 11), y, s);
      circle(
        x +
          (height * sin((2 * y) / height)) /
            map(noise(xoff, yoff), 0, 1, 9, 11),
        y,
        s
      );
      y += 1.35 * s;
      yoff += 0.05;
    }
    xoff += 0.05;
  }
}

function keyPressed() {
  if (key == "s" || key == "S") saveCanvas("output", "png");
  else {
    actRandomSeed = random(100000);
    loop();
  }
}
