let container = document.querySelector("body");

let firstHalf = document.getElementById("firstHalf");

let secondHalf = document.getElementById("firstHalf");

let dice = document.getElementsByClassName("dice")[0];

dice.addEventListener("click", function (event) {
  event.stopPropagation();
  console.log("test");
  //   if ((getElementById = P1dice1)) {
  //     console.log("YAY");
  //     console.log(getElementById);
  //   }
});

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

// Test to see everything run

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
