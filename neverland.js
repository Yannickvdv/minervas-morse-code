const words = ["Random", "words", "are", "placed", "here"];

// The morse representing each character
const morse = {
  a: ".-",
  b: "-...",
  c: "-.-.",
  d: "-..",
  e: ".",
  f: "..-.",
  g: "--.",
  h: "....",
  i: "..",
  j: ".---",
  k: "-.-",
  l: ".-..",
  m: "--",
  n: "-.",
  o: "---",
  p: ".--.",
  q: "--.-",
  r: ".-.",
  s: "...",
  t: "-",
  u: "..-",
  v: "...-",
  w: ".--",
  x: "-..-",
  y: "-.--",
  z: "--..",
  " ": "   ",
  "0": "-----",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----."
};

const xCoord = 300;
const yCoord = 300;
let arcs = [];
let dots = [];

function setup() {
  createCanvas(xCoord * 2, yCoord * 2);
  background(255);
  angleMode(DEGREES);
  ellipseMode(RADIUS);
}

/**
 * Convert a string to an array of morse characters.
 */
function stringToMorse(string) {
  string = string.toLowerCase();
  let output = [];
  [...string].forEach(character => {
    output.push(morse[character]);
  });
  return output;
}

/**
 * Convert an array of morse strings into arcs and dots.
 */
function morseToCircle(morseStringArray, circleRadius) {
  let totalLength = 0.5;
  let currentLength = 0.5;

  // For each character in each of the morse strings append 1.5 to totalLength.
  // If the character is a '-' append an extra 3 to reserve it's bigger length.
  morseStringArray.forEach(morseString => {
    totalLength += morseString.length * 1.5;
    totalLength += (morseString.match(/-/g) || []).length * 3;
  });
  totalLength += morseStringArray.length * 1.5;

  // Loop through all characters again and create a arc or dot on the currentLocation
  // with it's size based on totalLength.
  morseStringArray.forEach(morseString => {
    [...morseString].forEach(character => {
      currentLength += 1.5;
      if (character == "-") {
        arcs.push([
          circleRadius,
          -180 + (360 * currentLength) / totalLength,
          -180 + (360 * (currentLength + 3)) / totalLength
        ]);
        currentLength += 3;
      } else if (character == ".") {
        dots.push([currentLength / totalLength, circleRadius]);
      }
    });
    currentLength += 1.5;
  });
}

/**
 * Draw each word, passing the radius at which it will be drawn as a parameter.
 */
for (let i = 0; i < words.length; i++) {
  let circleRadius = 250 - i * 20;
  let word = words[i];

  morseToCircle(stringToMorse(word), circleRadius);
}

function draw() {
  strokeWeight(10);
  noFill();
  for (let i = 0; i < arcs.length; i++) {
    arc(xCoord, yCoord, arcs[i][0], arcs[i][0], arcs[i][1], arcs[i][2]);
  }
  noStroke();
  fill(0);
  for (let i = 0; i < dots.length; i++) {
    ellipse(
      xCoord + dots[i][1] * cos(-180 + 360 * dots[i][0]),
      yCoord + dots[i][1] * sin(-180 + 360 * dots[i][0]),
      5
    );
  }
}
