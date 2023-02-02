/*
Genuary 2023
JAN.24 "Textile"

Inspired by https://www.fxhash.xyz/article/generating-realistic-textiles

By Evgeny Sushko
https://github.com/evgenysushko/genuary2023
*/

"use strict";

let w = 800;
let scale = 7;
let colors = ["#963267", "#1e2306", "#d2b86b", "#3a2329", "#7c92bd", "#926988"];
let tileCountX = 18 * scale;
let tileCountY = 18 * scale * 2;
let tileWidth = w / tileCountX;
let tileHeight = w / tileCountY;
let actRandomSeed = 0;
let tiles = [];

function setup() {
  // pixelDensity(1);
  createCanvas(w, w);
  noStroke();
}

function draw() {
  noLoop();
  randomSeed(actRandomSeed);
  let c = random(colors);
  let offsetY = 0;
  for (let row = 0; row < tileCountY; row++) {
    let offsetX = 0;
    for (let col = 0; col < tileCountX * 2; col++) {
      let isLong = col % 2 == 0 ? true : false;
      let tileW = isLong ? tileWidth * 1.5 : tileWidth * 0.5;
      tiles.push(
        new Tile(
          offsetX - offsetY,
          tileHeight * row,
          isLong,
          tileW,
          tileHeight,
          c
        )
      );
      offsetX += tileW;
    }
    offsetY += tileWidth / 2;
  }

  for (let tile of tiles) {
    tile.show();
  }
}

class Tile {
  constructor(x, y, il, w, h, c) {
    this.x = x;
    this.y = y;
    this.isLong = il;
    this.w = w + 0.5;
    this.h = h + 0.5;
    this.c = c;
  }

  show() {
    let w = 0;
    let h, w1;
    // main rectangle
    fill(this.c);
    rect(this.x, this.y, this.w, this.h);
    if (this.isLong) {
      // long tile
      // vertical shadows - left
      if (random() < 0.95) {
        w = this.w * random(0.1, 0.4);

        w1 = random(w);
        fill(0, random(100, 150));
        rect(this.x, this.y, w1, this.h);

        fill(0, random(60, 90));
        rect(this.x + w1, this.y, w - w1, this.h);
      }
      // vertical shadows - right
      if (random() < 0.95) {
        w = this.w * random(0.1, 0.4);

        w1 = random(w);
        fill(0, random(100, 150));
        rect(this.x + this.w - w1, this.y, w1, this.h);

        fill(0, random(60, 90));
        rect(this.x + this.w - w + w1, this.y, w - w1, this.h);
      }
      // triangle shadows
      if (random() < 0.8) {
        fill(0, random(50, 100));
        triangle(
          this.x,
          this.y,
          this.x + this.w * random(0.05, 0.15),
          this.y,
          this.x,
          this.y + this.h * random(0.1, 0.3)
        );
      }
      if (random() < 0.8) {
        fill(0, random(50, 100));
        triangle(
          this.x,
          this.y + this.h,
          this.x + this.w * random(0.2, 0.4),
          this.y + this.h,
          this.x,
          this.y + this.h - this.h * random(0.3, 0.7)
        );
      }
      if (random() < 0.8) {
        fill(0, random(50, 100));
        triangle(
          this.x + this.w,
          this.y + this.h,
          this.x + this.w,
          this.y + this.h * random(0.5, 0.8),
          this.x + this.w - this.w * random(0.1, 0.3),
          this.y + this.h
        );
      }
      // white ellipse shadows
      for (let i = 0; i < 2; i++) {
        if (random() < 0.9) {
          fill(255, random(40, 70));
          ellipse(
            this.x + this.w * random(0.3, 0.7),
            this.y + this.h * random(0.4, 0.6),
            this.w * random(0.2, 0.7),
            this.h * random(0.2, 0.7)
          );
        }
      }
    } else {
      // short tile
      // horizontal shadow - top
      if (random() < 0.9) {
        fill(0, random(50, 120));
        h = this.h * random(0.2, 0.3);
        rect(this.x, this.y, this.w, h);
        if (random() < 0.9) {
          // horizontal shadow - bottom
          fill(0, random(50, 120));
          h = this.h * random(0.2, 0.3);
          rect(this.x, this.y + this.h - h, this.w, h);
        }
      } else {
        // horizontal shadow - bottom
        fill(0, random(50, 120));
        h = this.h * random(0.2, 0.3);
        rect(this.x, this.y + this.h - h, this.w, h);
      }
      // triangle shadows
      if (random() < 0.97) {
        fill(0, random(50, 120));
        triangle(
          this.x,
          this.y + this.h * 0.5,
          this.x + this.w * random(0.2, 0.5),
          this.y,
          this.x - this.w * random(0.5, 1),
          this.y
        );
      }
      if (random() < 0.9) {
        fill(0, random(50, 120));
        triangle(
          this.x + this.w,
          this.y + this.h,
          this.x + this.w,
          this.y + this.h * random(0.3, 0.8),
          this.x + this.w - this.w * random(0.2, 0.6),
          this.y + this.h
        );
      }
      // white ellipse shadows
      for (let i = 0; i < 2; i++) {
        if (random() < 0.9) {
          fill(255, random(40, 80));
          ellipse(
            this.x + this.w * random(0.4, 0.6),
            this.y + this.h * random(0.4, 0.6),
            this.w * random(0.2, 0.7),
            this.h * random(0.2, 0.7)
          );
        }
      }
    }
  }
}

function keyPressed() {
  if (key == "s" || key == "S") saveCanvas("output", "png");
  else {
    actRandomSeed = random(100000);
    loop();
  }
}
