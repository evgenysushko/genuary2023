/*
Genuary 2023
JAN.07 "Sample a color palette from your favorite movie/album cover"

image credit: Avatar movie

By Evgeny Sushko
https://github.com/evgenysushko/genuary2023
*/

"use strict";

let w = 800;
let offset = 50;
let spacing = 30;
let s = 20;
let img;

let actRandomSeed = 0;

let listOfColors = [
  "#9f3520",
  "#fcc12c",
  "#759658",
  "#465743",
  "#222a1f",
  "#2f716d",
  "#b5daf1",
  "#3ebbf1",
  "#034066",
];

function preload() {
  img = loadImage("data/avatar-2.jpeg");
}

function setup() {
  // pixelDensity(1);
  createCanvas(w, w);
}

function draw() {
  noLoop();
  randomSeed(actRandomSeed);
  background(220);

  for (let px = offset; px <= w - offset; px += spacing) {
    for (let py = offset; py <= w - offset; py += spacing) {
      let toogle = int(random(0, 2));

      if (toogle) {
        strokeWeight(4);
        point(px, py);
      } else {
        strokeWeight(1);
        let c = listOfColors[int(random(listOfColors.length))];
        fill(c);
        circle(px, py, s);
      }
    }
  }

  // strokeWeight(1);
  // let px = offset;
  // let py = w - offset * 3;
  // let pw = floor((w - 2 * offset) / (listOfColors.length + 1)) - 1;
  // let ph = offset * 2;
  // for (let i = 0; i < listOfColors.length; i++) {
  //   fill(listOfColors[i]);
  //   rect(px + pw * (i + 1) + 3, py, pw, ph);
  // }

  // strokeWeight(4);
  // noFill();
  // rect(px - 1, py - 1, pw + 1, ph + 1);
  // image(img, px - 1, py - 1, pw + 1, ph + 1);
}

function keyPressed() {
  if (key == "s" || key == "S") saveCanvas("output", "png");
  else {
    actRandomSeed = random(100000);
    loop();
  }
}
