// Just making variables for future use

let container = document.querySelector("body");

let firstHalf = document.getElementById("firstHalf");

let secondHalf = document.getElementById("firstHalf");

// Add Event listener to dice. Also Selects ID

let dice = document.getElementsByClassName("dice");

for (let i = 0; i < dice.length; i++) {
  dice[i].addEventListener("click", function (event) {
    let diceID = this.id;
    console.log(diceID);
    if (diceID === "P1dice1") {
      playerOneDice[0].reRoll = !playerOneDice[0].reRoll;
      console.log(playerOneDice[0]);
    } else if (diceID === "P1dice2") {
      playerOneDice[1].reRoll = !playerOneDice[1].reRoll;
      console.log(playerOneDice[1]);
    } else if (diceID === "P1dice3") {
      playerOneDice[2].reRoll = !playerOneDice[2].reRoll;
      console.log(playerOneDice[2]);
    } else if (diceID === "P1dice4") {
      playerOneDice[3].reRoll = !playerOneDice[3].reRoll;
      console.log(playerOneDice[3]);
    } else if (diceID === "P1dice5") {
      playerOneDice[4].reRoll = !playerOneDice[4].reRoll;
      console.log(playerOneDice[4]);
    }
  });
}

// Create 2 arrays array that can each hold 5 object dice

let playerOneDice = [
  { number: roll(), reRoll: true },
  { number: roll(), reRoll: true },
  { number: roll(), reRoll: true },
  { number: roll(), reRoll: true },
  { number: roll(), reRoll: true },
];

let playerTwoDice = [
  { number: roll(), reRoll: false },
  { number: roll(), reRoll: false },
  { number: roll(), reRoll: false },
  { number: roll(), reRoll: false },
  { number: roll(), reRoll: false },
];

// Creates random number 1-6

function roll() {
  return Math.floor(Math.random() * 6 + 1);
  console.log("Rolled");
}

// Test to see numbers apear on dice

function displayPlayerOne() {
  for (let i = 0; i < playerOneDice.length; i++) {
    let diceContainer = document.getElementById(`P1dice${i + 1}`);
    diceContainer.innerHTML = playerOneDice[i].number;
  }
}

function displayPlayerTwo() {
  for (let i = 0; i < playerTwoDice.length; i++) {
    let diceRoll = playerTwoDice[i].number;
    let diceContainer = document.getElementById(`P2dice${i + 1}`);
    diceContainer.innerHTML = playerTwoDice[i].number;
  }
}

displayPlayerOne();
displayPlayerTwo();
// console.log(playerOneDice);
// console.log(playerTwoDice);
