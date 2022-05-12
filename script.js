// Just making variables for future use

let container = document.querySelector("body");

let firstHalf = document.getElementById("firstHalf");

let secondHalf = document.getElementById("firstHalf");

// Add Event listener to dice. Also Selects ID

let dice = document.getElementsByClassName("dice");

for (let i = 0; i < dice.length; i++) {
  dice[i].addEventListener("click", function (event) {
    console.log(this.id);
  });
}

// Create 2 arrays array that can each hold 5 object dice

let playerOneDice = [
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
];

// Creates random number 0-5

function roll() {
  return Math.floor(Math.random() * 6);
  console.log("Rolled");
}

// Test to see numbers apear on dice

function displayPlayerOne() {
  for (let i = 0; i < playerOneDice.length; i++) {
    let diceContainer = document.getElementById(`P1dice${i}`);
    diceContainer.innerHTML = playerOneDice[i].number;
  }
}

function displayPlayerTwo() {
  for (let i = 0; i < playerTwoDice.length; i++) {
    let diceRoll = playerTwoDice[i].number;
    let diceContainer = document.getElementById(`P2dice${i}`);
    diceContainer.innerHTML = playerTwoDice[i].number;
  }
}

displayPlayerOne();
displayPlayerTwo();
// console.log(playerOneDice);
// console.log(playerTwoDice);
