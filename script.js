var started = true;

//Sets volume of music
document.getElementById("backgroundMusic").volume = 0.4;
document.getElementById("backgroundNoise").volume = 0.3;
var oneDice = new Audio("assets/Audio/oneDice.mp3");
var twoDice = new Audio("assets/Audio/twoDice.mp3");
var multiDice = new Audio("assets/Audio/multiDice.mp3");

var playerOneTurn = true;

// Create 2 arrays array that can each hold 5 object dice

let playerOneDice = [
  { number: roll(), reRoll: true },
  { number: roll(), reRoll: true },
  { number: roll(), reRoll: true },
  { number: roll(), reRoll: true },
  { number: roll(), reRoll: true },
];

let playerTwoDice = [
  { number: roll(), reRoll: true },
  { number: roll(), reRoll: true },
  { number: roll(), reRoll: true },
  { number: roll(), reRoll: true },
  { number: roll(), reRoll: true },
];

// Just making variables for future use

let container = document.querySelector("body");

let firstHalf = document.getElementById("firstHalf");

let secondHalf = document.getElementById("firstHalf");

//Rolling Button

let rollButtonTop = document.getElementById("rollButtonTop");

rollButtonTop.addEventListener("click", function (event) {
  start = false;
  let diceRolled = 0;
  for (let i = 0; i < playerOneDice.length; i++) {
    if (playerOneDice[i].reRoll == true) {
      diceRolled += 1;
      playerOneDice[i].number = roll();
    } else console.log("No reroll");
  }
  displayPlayerOne();
  diceRolledAudio(diceRolled);
});

let rollButtonBottom = document.getElementById("rollButtonBottom");

rollButtonBottom.addEventListener("click", function (event) {
  let diceRolled = 0;
  started = false;
  for (let i = 0; i < playerTwoDice.length; i++) {
    if (playerTwoDice[i].reRoll == true) {
      diceRolled += 1;
      playerTwoDice[i].number = roll();
    } else console.log("Not reRolled");
  }
  displayPlayerTwo();
  diceRolledAudio(diceRolled);
});

function diceRolledAudio(diceRolled) {
  //Audio linked to rollButton()
  if (diceRolled > 2) {
    multiDice.currentTime = 0;
    multiDice.play();
  } else if (diceRolled > 1) {
    twoDice.currentTime = 0;
    twoDice.play();
  } else if (diceRolled === 1) {
    oneDice.currentTime = 0;
    oneDice.play();
  } else console.log("No Audio");
}

// Add Event listener to dice. Also Selects ID

let dice = document.getElementsByClassName("dice");

for (let i = 0; i < dice.length; i++) {
  dice[i].addEventListener("click", function () {
    let diceID = this.id;
    reRollValue(diceID);
  });
}

// Changes value of ReRoll

function reRollValue(diceID) {
  let selector = document.getElementById(diceID);
  if (diceID === "P1dice1") {
    playerOneDice[0].reRoll = !playerOneDice[0].reRoll;
    console.log(playerOneDice[0]);
    let diceSelected = playerOneDice[0];
    display(diceSelected, selector);
  } else if (diceID === "P1dice2") {
    playerOneDice[1].reRoll = !playerOneDice[1].reRoll;
    console.log(playerOneDice[1]);
    let diceSelected = playerOneDice[1];
    display(diceSelected, selector);
  } else if (diceID === "P1dice3") {
    playerOneDice[2].reRoll = !playerOneDice[2].reRoll;
    console.log(playerOneDice[2]);
    let diceSelected = playerOneDice[2];
    display(diceSelected, selector);
  } else if (diceID === "P1dice4") {
    playerOneDice[3].reRoll = !playerOneDice[3].reRoll;
    console.log(playerOneDice[3]);
    let diceSelected = playerOneDice[3];
    display(diceSelected, selector);
  } else if (diceID === "P1dice5") {
    playerOneDice[4].reRoll = !playerOneDice[4].reRoll;
    console.log(playerOneDice[4]);
    let diceSelected = playerOneDice[4];
    display(diceSelected, selector);
  } else if (diceID === "P2dice1") {
    playerTwoDice[0].reRoll = !playerTwoDice[0].reRoll;
    console.log(playerTwoDice[0]);
    let diceSelected = playerTwoDice[0];
    display(diceSelected, selector);
  } else if (diceID === "P2dice2") {
    playerTwoDice[1].reRoll = !playerTwoDice[1].reRoll;
    console.log(playerTwoDice[1]);
    let diceSelected = playerTwoDice[1];
    display(diceSelected, selector);
  } else if (diceID === "P2dice3") {
    playerTwoDice[2].reRoll = !playerTwoDice[2].reRoll;
    console.log(playerTwoDice[2]);
    let diceSelected = playerTwoDice[2];
    display(diceSelected, selector);
  } else if (diceID === "P2dice4") {
    playerTwoDice[3].reRoll = !playerTwoDice[3].reRoll;
    console.log(playerTwoDice[3]);
    let diceSelected = playerTwoDice[3];
    display(diceSelected, selector);
  } else if (diceID === "P2dice5") {
    playerTwoDice[4].reRoll = !playerTwoDice[4].reRoll;
    console.log(playerTwoDice[4]);
    let diceSelected = playerTwoDice[4];
    display(diceSelected, selector);
  }
}

function display(diceSelected, selector) {
  if (diceSelected.reRoll == true) {
    selector.classList.add("reRoll");
  } else selector.classList.remove("reRoll");
}

// Creates random number 1-6

function roll() {
  console.log("Rolled");
  return Math.floor(Math.random() * 6 + 1);
}

// Displays Dice

function displayPlayerOne() {
  for (let i = 0; i < playerOneDice.length; i++) {
    let diceRoll = playerOneDice[i].number;
    let diceContainer = document.getElementById(`P1dice${i + 1}`);
    if (started === true) {
      diceContainer.innerHTML = '<img src="/assets/diceDeath.JPG" />';
      diceContainer.innerHTML = '<img src="/assets/diceHeart.JPG" />';
      diceContainer.innerHTML = '<img src="/assets/diceHelmet.JPG" />';
      diceContainer.innerHTML = '<img src="/assets/diceShield.JPG" />';
      diceContainer.innerHTML = '<img src="/assets/diceSword.JPG" />';
      diceContainer.innerHTML = '<img src="/assets/diceArrow.JPG" />';
    }
    if (diceRoll == 1) {
      diceContainer.innerHTML = '<img src="/assets/diceArrow.JPG" />';
    } else if (diceRoll == 2) {
      diceContainer.innerHTML = '<img src="/assets/diceSword.JPG" />';
    } else if (diceRoll == 3) {
      diceContainer.innerHTML = '<img src="/assets/diceShield.JPG" />';
    } else if (diceRoll == 4) {
      diceContainer.innerHTML = '<img src="/assets/diceHelmet.JPG" />';
    } else if (diceRoll == 5) {
      diceContainer.innerHTML = '<img src="/assets/diceHeart.JPG" />';
    } else if (diceRoll == 6) {
      diceContainer.innerHTML = '<img src="/assets/diceDeath.JPG" />';
    } else diceContainer.innerHTML = "error";
  }
}

function displayPlayerTwo() {
  for (let i = 0; i < playerTwoDice.length; i++) {
    let diceRoll = playerTwoDice[i].number;
    let diceContainer = document.getElementById(`P2dice${i + 1}`);
    if (started === true) {
      diceContainer.innerHTML = '<img src="/assets/diceDeath.JPG" />';
      diceContainer.innerHTML = '<img src="/assets/diceHeart.JPG" />';
      diceContainer.innerHTML = '<img src="/assets/diceHelmet.JPG" />';
      diceContainer.innerHTML = '<img src="/assets/diceShield.JPG" />';
      diceContainer.innerHTML = '<img src="/assets/diceSword.JPG" />';
      diceContainer.innerHTML = '<img src="/assets/diceArrow.JPG" />';
    }
    if (diceRoll == 1) {
      diceContainer.innerHTML = '<img src="/assets/diceArrow.JPG" />';
    } else if (diceRoll == 2) {
      diceContainer.innerHTML = '<img src="/assets/diceSword.JPG" />';
    } else if (diceRoll == 3) {
      diceContainer.innerHTML = '<img src="/assets/diceShield.JPG" />';
    } else if (diceRoll == 4) {
      diceContainer.innerHTML = '<img src="/assets/diceHelmet.JPG" />';
    } else if (diceRoll == 5) {
      diceContainer.innerHTML = '<img src="/assets/diceHeart.JPG" />';
    } else if (diceRoll == 6) {
      diceContainer.innerHTML = '<img src="/assets/diceDeath.JPG" />';
    } else diceContainer.innerHTML = "error";
  }
}

displayPlayerOne();
displayPlayerTwo();
