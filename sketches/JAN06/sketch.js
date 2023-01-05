/*
Genuary 2023
JAN.06 "Steal Like An Artist"

Exploration of Manolo Gamboa Naon's work "Mantel" that he has kindly open-sourced.
Original code in Processing: https://github.com/manoloide/AllSketchs/blob/master/2018/Generativos/mantel/mantel.pde

By Evgeny Sushko
https://github.com/evgenysushko/genuary2023
*/

"use strict";

let w = 1000;
let actRandomSeed = 0;

function setup() {
  // pixelDensity(1);
  createCanvas(w, w);
  // createCanvas(windowWidth, windowHeight);
  strokeWeight(2);
}

function draw() {
  noLoop();
  randomSeed(actRandomSeed);

  let back = rcol();
  background(back);

  let points = [];
  let des = random(1000000);
  let det = random(0.004, 0.03) / ((width * 10) / 960);
  for (let i = 0; i < width * 1; i++) {
    stroke(getColor(int(random(20, 80))));
    fill(getColor(int(random(50, 150))));
    let x = random(width);
    let y = random(width);
    beginShape();
    let dis = width / 8.6;
    for (let j = 0; j < dis; j++) {
      let ang = noise(des + x * det, des + y * det) * TWO_PI;
      x += cos(ang);
      y += sin(ang);
      vertex(x, y);
    }
    endShape(CLOSE);
  }

  noiseDetail(1);
  for (let i = 0; i < width * 10; i++) {
    let x = random(width);
    let y = random(height);
    let dis = dist(x, y, width / 2, height / 2);
    dis = dis / (width * 1.41);
    dis = map(dis, 0, 1, 2, 1);
    let s = width * random(0.1) * random(0.5, 1) * dis;
    s = width * noise(des + x * det, des + y * det) * dis * random(0.05, 0.2);
    let add = true;
    for (let j = 0; j < points.length; j++) {
      let o = points[j];
      if (dist(x, y, o.x, o.y) < (s + o.z) * 0.6) {
        add = false;
        break;
      }
    }
    if (add) points.push(createVector(x, y, s));
  }

  noStroke();
  for (let i = 0; i < points.length; i++) {
    let p = points[i];
    let c = lerpColor(color(back), color(0), random(0.05, 0.25));
    c.setAlpha(int(random(50, 180)));
    fill(c);
    let r = p.z * 0.5;
    let res = max(8, int(PI * r));
    let da = TWO_PI / res;
    beginShape();
    for (let j = 0; j < res; j++) {
      let ang = da * j;
      let sa = (ang + PI * 1.75) % TWO_PI;
      sa = abs(sa - PI);
      if (sa < HALF_PI) sa = HALF_PI;
      let rr = r * (1.2 - pow(abs(sin(sa)), 1.5) * 0.2);
      let x = p.x + cos(ang) * rr;
      let y = p.y + sin(ang) * rr;
      vertex(x, y);
    }
    endShape(CLOSE);
  }

  for (let i = 0; i < points.length; i++) {
    let p = points[i];
    fill(getColor(int(random(50, 220))));
    circle(p.x, p.y, p.z);

    let r = p.z * 0.5;
    let rtmp = random(0.4, 0.6);
    let pp = [];
    for (let j = 0; j < 400; j++) {
      let ang = random(TWO_PI);
      let dis = acos(random(PI));
      let x = cos(ang) * dis * (r * rtmp);
      let y = sin(ang) * dis * (r * rtmp);
      let ss = r * random(0.04, 0.1);

      let add = true;
      for (let k = 0; k < pp.length; k++) {
        let o = pp[k];
        if (dist(x, y, o.x, o.y) < (ss + o.z) * 0.5) {
          add = false;
          break;
        }
      }

      if (add) {
        pp.push(createVector(x, y, ss));
        fill(getColor(200));
        ellipse(p.x + x, p.y + y, ss * random(0.5, 1), ss * random(0.5, 1));
      }
    }
  }
}

// let colors = ["#0a0a0a", "#f7f3f2", "#0077e1", "#f5d216", "#fc3503"];
let colors = ["#2B349E", "#F57E15", "#ED491C", "#9B407D", "#B48DC0", "#E3E8EA"];
// let colors = [
//   "#D81D03",
//   "#101A9D",
//   "#1C7E4E",
//   "#F6A402",
//   "#EFD4BF",
//   "#E2E0EF",
//   "#050400",
// ];

function rcol() {
  return colors[int(random(colors.length))];
}

function getColor(alpha) {
  let c = color(rcol());
  c.setAlpha(alpha);
  return c;
}

function keyPressed() {
  if (key == "s" || key == "S") saveCanvas("output", "png");
  else {
    actRandomSeed = random(100000);
    loop();
  }
}
