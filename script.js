// Create 2 arrays array that can each hold 5 object dice

let playerOneDice = [
  { number: roll(), reRoll: false },
  { number: roll(), reRoll: false },
  { number: roll(), reRoll: false },
  { number: roll(), reRoll: false },
  { number: roll(), reRoll: false },
  { number: roll(), reRoll: false },
];

let playerTwoDice = [
  { number: roll(), reRoll: false },
  { number: roll(), reRoll: false },
  { number: roll(), reRoll: false },
  { number: roll(), reRoll: false },
  { number: roll(), reRoll: false },
  { number: roll(), reRoll: false },
];

function roll() {
  return Math.floor(Math.random() * 6);
}

console.log(playerOneDice);
console.log(playerTwoDice);
