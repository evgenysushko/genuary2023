/*
Genuary 2023
JAN.10 "Generative music"

Music generation with a simple L-system algorithm.
Each color corresponds to a note from a C major scale.

By Evgeny Sushko
https://github.com/evgenysushko/genuary2023
*/

"use strict";

let w = 800;
let d = (3 * w) / 4;

let rules = {
  A: ["C", "F", "E"],
  C: ["A", "G", "E"],
  E: ["C", "G"],
  F: ["A", "C"],
  G: ["E", "F", "C"],
};

let seqIndex = 0;
let noteIndex = -1;
let initSeq = ["C"];
let newTokens = [];
let sequences = [initSeq, []];
let fontSize = 20;
let maxNumSequences = 8;
let maxSequenceLength = 30;
let sloop;
let synth;

function setup() {
  createCanvas(w, w);
  background(240);
  translate(w / 2, w / 2);
  ellipseMode(CENTER);
  noStroke();

  fill(70);
  circle(0, 0, d);

  synth = new p5.PolySynth();
  sloop = new p5.SoundLoop(soundLoop, 0.7);

  if (sloop.isPlaying) {
    sloop.pause();
  } else {
    sloop.maxIterations = Infinity;
    sloop.start();
  }
}

function soundLoop(cycleStartTime) {
  noteIndex++;
  if (noteIndex >= min(sequences[seqIndex].length, maxSequenceLength)) {
    nextSequence();
  }
  let token = sequences[seqIndex][noteIndex];

  generate();

  let pitch = token + "4";
  let velocity = 0.8;
  let beatSeconds = 0.5;
  let duration = random([
    beatSeconds,
    beatSeconds / 2,
    beatSeconds / 2,
    // beatSeconds / 4,
  ]);
  this.interval = duration;
  synth.play(pitch, velocity, cycleStartTime, duration);

  newTokens = rules[token];
  sequences[seqIndex + 1] = sequences[seqIndex + 1].concat(newTokens);
  if (sequences[seqIndex + 1].length >= maxSequenceLength) {
    sequences[seqIndex + 1] = sequences[seqIndex + 1].slice(
      0,
      maxSequenceLength
    );
    nextSequence();
  }
}

function generate() {
  fill(70, 100);
  circle(0, 0, d);

  let a = random(TAU);
  let r = (d / 2 - w / 16) * sqrt(random());
  let xloc = r * cos(a);
  let yloc = r * sin(a);

  let s = (w / 16) * random(0.5, 1) * (r < d / 4 ? 1.5 : 1);

  let noteArray = ["A", "C", "E", "F", "G"];
  let noteCurrent = sequences[seqIndex][noteIndex];
  let colorIndex = noteArray.indexOf(noteCurrent);

  let c = color(colors[colorIndex]);
  c.setAlpha(200);

  fill(c);
  circle(xloc, yloc, s);
}

function nextSequence() {
  noteIndex = 0;
  seqIndex++;
  sequences.push([]);
  if (sequences.length > maxNumSequences) {
    seqIndex--;
    sequences.shift();
  }
}

let colors = ["#0a0a0a", "#f7f3f2", "#0077e1", "#f5d216", "#fc3503"];
