/*
Genuary 2023
JAN.09 "Plants"

Exploration and adaptation of another work of Manolo Gamboa Naon:
https://github.com/manoloide/AllSketchs/blob/master/2018/Generativos/arbolito2/arbolito2.pde


By Evgeny Sushko
https://github.com/evgenysushko/genuary2023
*/

"use strict";

let w = 800;
let totalIte;
let actRandomSeed = 0;

function setup() {
  // pixelDensity(1);
  createCanvas(w, w);
}

function draw() {
  noLoop();
  randomSeed(actRandomSeed);
  noiseSeed(actRandomSeed);
  background(220);

  let cc = int(w * 2);
  for (let i = 0; i < cc; i++) {
    let val = (i * 1) / cc;
    let cx = random(width);
    let cy = lerp(-height * 0.1, height * 1.3, pow(val, 1.2));
    let s = (500 - 60 * (1 - val)) * random(0.6, 1);
    arbol(cx, cy, s);
  }

  let des = random(1000000);
  let det = random(0.004, 0.03) / ((width * 10) / 960);
  let points = [];
  noiseDetail(1);
  for (let i = 0; i < width * 10; i++) {
    let x = random(width);
    let y = height + random(-1, 1) * height;
    let dis = dist(x, y, width / 2, height / 2);
    dis = dis / (width * 1.41);
    dis = map(dis, 0, 1, 2, 1);
    let s =
      width * noise(des + x * det, des + y * det) * dis * random(0.01, 0.03);
    let add = true;
    for (let j = 0; j < points.length; j++) {
      let o = points[j];
      if (dist(x, y, o.x, o.y) < (s + o.z) * 0.6 || y > height) {
        add = false;
        break;
      }
    }
    if (add) points.push(createVector(x, y, s));
  }

  noStroke();
  for (let i = 0; i < points.length; i++) {
    let p = points[i];
    fill(220, random(80, 180));
    push();
    rotate(random(-0.5, 0.5));
    ellipse(p.x, p.y, p.z * random(0.3, 0.35), p.z * random(0.5, 0.6));
    pop();
  }
}

function arbol(x, y, s) {
  let a = PI * 1.5;
  s = s / 5;
  totalIte = int(random(8, 15));
  let det = 0.005;
  let c = noise(x * det, y * det) * colors2.length;
  let ms = noise(x * det + 400, y * det + 40);
  rama(x, y, a, s * ms, c, totalIte);
}

function rama(x, y, a, s, c, ite) {
  let ax = x;
  let ay = y;
  let str = s * 0.01;
  x += cos(a) * s;
  y += sin(a) * s;
  let v = map(ite, 0, totalIte, 0, 1);
  stroke(getColor(colors2, c, 240));
  strokeWeight(8 * str);
  line(ax, ay, x, y);
  s *= random(random(0.6, 0.8), 0.95);
  ite--;
  if (ite > 0) {
    if (random(1) < 0.8)
      rama(x, y, a - random(0.2, 0.4), s, c + random(0.2), ite);
    if (random(1) < 0.8)
      rama(x, y, a + random(0.2, 0.4), s, c + random(0.2), ite);
  }
}

let colors2 = ["#bcbd8b", "#373d20", "#717744", "#766153"];

function getColor(colors, v, alpha) {
  v = abs(v);
  v = v % colors.length;
  let c1 = colors[int(v % colors.length)];
  let c2 = colors[int((v + 1) % colors.length)];
  let c = lerpColor(color(c1), color(c2), v % 1);
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
