/*
Genuary 2023
JAN.28 "Generative poetry"

Credits:
- Poetry: ChatGPT
- Visual effects: QOEN, https://openprocessing.org/sketch/1138534

By Evgeny Sushko
https://github.com/evgenysushko/genuary2023
*/

// "use strict";

let w = 800;

let str = [
  "In the green forests,",
  "crystal clear fountains sound,",
  "under the shade of trees,",
  "there is peace of mind and soul.",
];

let moveSpeed = 0.8;
let moveScale = 700;
let pixList = [];
let pos, colors;

function setup() {
  createCanvas(w, w);
  background(0);
  textSize(25);
  noStroke();
  fill(255);
  textAlign(CENTER, CENTER);
  text(str[0], w / 4, 50);
  text(str[1], w / 4, 80);
  text(str[2], w / 4, 110);
  text(str[3], w / 4, 140);
  loadPixels();

  for (let y = 0; y <= height - 1; y++) {
    for (let x = 0; x <= width - 1; x++) {
      let pb = pixels[y * width * 4 + x * 4];
      if (red(pb) === 255) {
        pixList[y * width + x] = 1;
      } else {
        pixList[y * width + x] = 0;
      }
    }
  }
  background("#162a25");

  colors = [
    "#77c39c",
    "#2f5e36",
    "#55aba5",
    "#2d7063",
    "#3f6829",
    "#44a872",
    "#215964",
    "#cdedae",
  ];

  pos = [];
  for (let y = 0; y <= height - 1; y++) {
    for (let x = 0; x <= width - 1; x++) {
      if (pixList[y * width + x] === 1 && random() < 0.5) {
        pos.push({
          x: x,
          y: y,
          c: colors[floor(random(colors.length))],
        });
      }
    }
  }
}

function draw() {
  noLoop();
  for (let i = 0; i < pos.length; i++) {
    with (pos[i]) {
      let angle = noise(x / moveScale, y / moveScale) * TWO_PI;
      x += cos(angle) * moveSpeed;
      y += sin(angle) * moveSpeed;
      fill(c);
      circle(x, y, 3);
      if (x > width || x < 0 || y > height || y < 0 || random() < 0.03) {
        x = random(width);
        y = random(height);
      }
    }
  }
}

function keyPressed() {
  if (key == "s" || key == "S") saveCanvas("output", "png");
  else {
    loop();
  }
}
