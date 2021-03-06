var P1sword = 0;
var P2sword = 0;
var P1shield = 0;
var P2shield = 0;
var P1arrow = 0;
var P2arrow = 0;
var P1helmet = 0;
var P2helmet = 0;
var P1heart = 0;
var P2heart = 0;
var P1death = 0;
var P2death = 0;

var started = true;
var playerOneTurn = false;
var roundOver = true;

var playerOneHealth = 10;
var playerTwoHealth = 10;

var rollCheck = 0;
var playerOneRolls = 0;
var playerTwoRolls = 0;

let health = document.getElementsByClassName("health");

health[0].innerHTML = playerOneHealth;
health[1].innerHTML = playerTwoHealth;

//Sets volume of music
document.getElementById("backgroundMusic").volume = 0.1;
document.getElementById("backgroundNoise").volume = 0.1;

const oneDice = new Audio("assets/Audio/oneDice.mp3");
oneDice.volume = 0.2;
const twoDice = new Audio("assets/Audio/twoDice.mp3");
twoDice.volume = 0.2;
const multiDice = new Audio("assets/Audio/multiDice.mp3");
multiDice.volume = 0.2;

const buttonPress = new Audio("assets/Audio/buttonPress.mp3");
buttonPress.volume = 0.2;
const buttonLock = new Audio("assets/Audio/buttonLock.mp3");
buttonLock.volume = 0.2;
const diceClick = new Audio("assets/Audio/diceClick.mp3");
diceClick.volume = 0.2;

const hornStart = new Audio("assets/Audio/hornStart.mp3");
hornStart.volume = 0.1;
const swordClash = new Audio("assets/Audio/swordClash.mp3");
swordClash.volume = 0.2;
const arrowClash = new Audio("assets/Audio/arrowClash.mp3");
arrowClash.volume = 0.2;
const heartPop = new Audio("assets/Audio/heartPop.mp3");
heartPop.volume = 0.2;
const damageSound = new Audio("assets/Audio/damageSound.mp3");
damageSound.volume = 0.4;
const heartBeat = new Audio("assets/Audio/heartBeat.mp3");
heartBeat.volume = 0.2;
const deathSlash = new Audio("assets/Audio/deathSlash.mp3");
deathSlash.volume = 0.2;
const startGame = new Audio("assets/Audio/startGame.mp3");
startGame.volume = 0.2;
// Create 2 arrays array that can each hold 5 object dice

const playerOneDice = [
  { number: roll(), reRoll: true },
  { number: roll(), reRoll: true },
  { number: roll(), reRoll: true },
  { number: roll(), reRoll: true },
  { number: roll(), reRoll: true },
  { number: roll(), reRoll: true },
];

const playerTwoDice = [
  { number: roll(), reRoll: true },
  { number: roll(), reRoll: true },
  { number: roll(), reRoll: true },
  { number: roll(), reRoll: true },
  { number: roll(), reRoll: true },
  { number: roll(), reRoll: true },
];

// Just making variables for future use

const container = document.querySelector("body");

const firstHalf = document.getElementById("firstHalf");

const secondHalf = document.getElementById("firstHalf");

const topUi = document.getElementById("topUi");

const bottomUi = document.getElementById("bottomUi");

const endGameScreen = document.getElementById("endGame");

endGameScreen.style.visibility = "hidden";

// Game Start

let start = document.getElementById("start");
start.addEventListener("click", async function () {
  start.classList.add("start");
  startGame.play();
  await sleep(500);
  start.parentNode.removeChild(start);
  roundOver = false;
  document.getElementById("backgroundMusic").play();
  document.getElementById("backgroundNoise").play();
  let playersTurn = roll();
  if (playersTurn >= 3) {
    playerOneTurn = true;
  } else playerOneTurn = false;
  opacityCheck();
});

// Add Event listener to dice. Also Selects ID

let dice = document.getElementsByClassName("dice");

for (let i = 0; i < dice.length; i++) {
  dice[i].addEventListener("click", function () {
    if (roundOver == false) {
      console.log(roundOver);
      let diceID = this.id;
      reRollValue(diceID);
    }
  });
}

//Rolling Button

let rollButtonTop = document.getElementById("rollButtonTop");

rollButtonTop.addEventListener("click", function (event) {
  if (
    playerOneTurn == true &&
    rollCheck == 0 &&
    playerOneRolls <= 3 &&
    roundOver == false
  ) {
    rollCheck += 1;
    playerOneRolls += 1;
    console.log(playerOneRolls);
    let diceRolled = 0;
    //audio and reReoll check
    for (let i = 0; i < playerOneDice.length; i++) {
      if (playerOneDice[i].reRoll == true) {
        diceRolled += 1;
        playerOneDice[i].number = roll();

        //Last Roll Check

        if (playerOneRolls >= 3) {
          diceRolled = 0;
          let i = 0;
          while (i < playerOneDice.length) {
            if (playerOneDice[i].reRoll == true) {
              playerOneDice[i].number = roll();
              diceRolled += 1;
            }
            playerOneDice[i].reRoll = false;
            let id = `P1dice${i + 1}`;
            console.log(id);
            let selector = document.getElementById(id);
            console.log(selector);
            selector.classList.remove("reRoll");
            rollCheck = 0;
            i++;
          }
          playerOneTurn = false;
          opacityCheck();
        }
      }
    }
    diceRolledAudio(diceRolled);
    console.log(diceRolled);
    displayPlayerOne();
    roundOverCheck();
    opacityCheck();
  } else buttonLock.play();
  buttonLock.currentTime = 0;
});

let rollButtonBottom = document.getElementById("rollButtonBottom");

rollButtonBottom.addEventListener("click", function (event) {
  if (
    playerOneTurn == false &&
    rollCheck == 0 &&
    playerTwoRolls <= 3 &&
    roundOver == false
  ) {
    rollCheck += 1;
    playerTwoRolls += 1;
    console.log(playerTwoRolls);
    let diceRolled = 0;
    //audio and reReoll check
    for (let i = 0; i < playerTwoDice.length; i++) {
      if (playerTwoDice[i].reRoll == true) {
        diceRolled += 1;
        playerTwoDice[i].number = roll();

        // Last Roll Check

        if (playerTwoRolls >= 3) {
          let i = 0;
          diceRolled = 0;
          while (i < playerTwoDice.length) {
            if (playerTwoDice[i].reRoll == true) {
              playerTwoDice[i].number = roll();
              diceRolled += 1;
            }
            playerTwoDice[i].reRoll = false;
            let id = `P2dice${i + 1}`;
            console.log(id);
            let selector = document.getElementById(id);
            console.log(selector);
            selector.classList.remove("reRoll");
            rollCheck = 0;
            i++;
          }
          playerOneTurn = true;
          opacityCheck();
        }
      }
    }
    diceRolledAudio(diceRolled);
    console.log(diceRolled);
    displayPlayerTwo();
    roundOverCheck();
    opacityCheck();
  } else buttonLock.play();
  buttonLock.currentTime = 0;
});

//Audio for rolling

function diceRolledAudio(diceRolled) {
  //Audio linked to rollButton()
  if (diceRolled >= 3) {
    console.log("Multi");
    multiDice.currentTime = 0;
    multiDice.play();
  } else if (diceRolled >= 2) {
    twoDice.currentTime = 0;
    twoDice.play();
    console.log("Two");
  } else if (diceRolled == 1) {
    oneDice.currentTime = 0;
    oneDice.play();
    console.log("One");
  } else console.log("No Audio");
}

//Finish button
let finishButtonTop = document.getElementById("finishButtonTop");
let finishButtonBottom = document.getElementById("finishButtonBottom");

finishButtonTop.addEventListener("click", function (event) {
  if (playerOneTurn == true && roundOver == false && rollCheck == 1) {
    rollCheck = 0;
    playerOneTurn = false;
    for (let i = 0; i < playerOneDice.length; i++) {
      if (playerOneDice[i].reRoll == true) {
        let id = document.getElementById(`P1dice${[i + 1]}`);
        id.innerHTML = ``;
        opacityCheck();
      }
    }
    buttonPress.play();
    opacityCheck();
  } else buttonLock.play();
  buttonLock.currentTime = 0;
});

finishButtonBottom.addEventListener("click", function (event) {
  if (playerOneTurn == false && roundOver == false && rollCheck == 1) {
    rollCheck = 0;
    playerOneTurn = true;
    for (let i = 0; i < playerTwoDice.length; i++) {
      if (playerTwoDice[i].reRoll == true) {
        let id = document.getElementById(`P2dice${[i + 1]}`);
        id.innerHTML = ``;
        opacityCheck();
      }
    }
    opacityCheck();
    buttonPress.play();
  } else buttonLock.play();
  buttonLock.currentTime = 0;
});

// Changes value of ReRoll

function reRollValue(diceID) {
  let selector = document.getElementById(diceID);
  if (playerOneTurn == true) {
    if (diceID === "P1dice1") {
      playerOneDice[0].reRoll = !playerOneDice[0].reRoll;
      console.log(playerOneDice[0]);
      let diceSelected = playerOneDice[0];
      display(diceSelected, selector);
      diceClick.currentTime = 0;
      diceClick.play();
    }
    if (diceID === "P1dice2") {
      playerOneDice[1].reRoll = !playerOneDice[1].reRoll;
      console.log(playerOneDice[1]);
      let diceSelected = playerOneDice[1];
      display(diceSelected, selector);
      diceClick.currentTime = 0;
      diceClick.play();
    }
    if (diceID === "P1dice3") {
      playerOneDice[2].reRoll = !playerOneDice[2].reRoll;
      console.log(playerOneDice[2]);
      let diceSelected = playerOneDice[2];
      display(diceSelected, selector);
      diceClick.currentTime = 0;
      diceClick.play();
    }
    if (diceID === "P1dice4") {
      playerOneDice[3].reRoll = !playerOneDice[3].reRoll;
      console.log(playerOneDice[3]);
      let diceSelected = playerOneDice[3];
      display(diceSelected, selector);
      diceClick.currentTime = 0;
      diceClick.play();
    }
    if (diceID === "P1dice5") {
      playerOneDice[4].reRoll = !playerOneDice[4].reRoll;
      console.log(playerOneDice[4]);
      let diceSelected = playerOneDice[4];
      display(diceSelected, selector);
      diceClick.currentTime = 0;
      diceClick.play();
    }
    if (diceID === "P1dice6") {
      playerOneDice[5].reRoll = !playerOneDice[5].reRoll;
      console.log(playerOneDice[5]);
      let diceSelected = playerOneDice[5];
      display(diceSelected, selector);
      diceClick.currentTime = 0;
      diceClick.play();
    }
  } else if (playerOneTurn == false) {
    if (diceID === "P2dice1") {
      playerTwoDice[0].reRoll = !playerTwoDice[0].reRoll;
      console.log(playerTwoDice[0]);
      let diceSelected = playerTwoDice[0];
      display(diceSelected, selector);
      diceClick.currentTime = 0;
      diceClick.play();
    }
    if (diceID === "P2dice2") {
      playerTwoDice[1].reRoll = !playerTwoDice[1].reRoll;
      console.log(playerTwoDice[1]);
      let diceSelected = playerTwoDice[1];
      display(diceSelected, selector);
      diceClick.currentTime = 0;
      diceClick.play();
    }
    if (diceID === "P2dice3") {
      playerTwoDice[2].reRoll = !playerTwoDice[2].reRoll;
      console.log(playerTwoDice[2]);
      let diceSelected = playerTwoDice[2];
      display(diceSelected, selector);
      diceClick.currentTime = 0;
      diceClick.play();
    }
    if (diceID === "P2dice4") {
      playerTwoDice[3].reRoll = !playerTwoDice[3].reRoll;
      console.log(playerTwoDice[3]);
      let diceSelected = playerTwoDice[3];
      display(diceSelected, selector);
      diceClick.currentTime = 0;
      diceClick.play();
    }
    if (diceID === "P2dice5") {
      playerTwoDice[4].reRoll = !playerTwoDice[4].reRoll;
      console.log(playerTwoDice[4]);
      let diceSelected = playerTwoDice[4];
      display(diceSelected, selector);
      diceClick.currentTime = 0;
      diceClick.play();
    }
    if (diceID === "P2dice6") {
      playerTwoDice[5].reRoll = !playerTwoDice[5].reRoll;
      console.log(playerTwoDice[5]);
      let diceSelected = playerTwoDice[5];
      display(diceSelected, selector);
      diceClick.currentTime = 0;
      diceClick.play();
    }
  }

  function display(diceSelected, selector) {
    if (diceSelected.reRoll == true) {
      selector.classList.add("reRoll");
    } else selector.classList.remove("reRoll");
  }
}

// Creates random number 1-6

function roll() {
  return Math.floor(Math.random() * 6 + 1);
}

// Displays Dice

async function displayPlayerOne() {
  console.log("displayPlayerOne()");
  for (let i = 0; i < playerOneDice.length; i++) {
    let diceRoll = playerOneDice[i].number;
    let diceContainer = document.getElementById(`P1dice${i + 1}`);
    diceContainer.style.visibility = "hidden";
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
  await sleep(200);
  for (let i = 0; i < playerOneDice.length; i++) {
    let diceContainer = document.getElementById(`P1dice${i + 1}`);
    diceContainer.style.visibility = "visible";
  }
}

async function displayPlayerTwo() {
  console.log("displayPlayerTwo()");
  for (let i = 0; i < playerTwoDice.length; i++) {
    let diceRoll = playerTwoDice[i].number;
    let diceContainer = document.getElementById(`P2dice${i + 1}`);
    diceContainer.style.visibility = "hidden";
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
  await sleep(200);
  for (let i = 0; i < playerTwoDice.length; i++) {
    let diceContainer = document.getElementById(`P2dice${i + 1}`);
    diceContainer.style.visibility = "visible";
  }
}
//Makes round over

function roundOverCheck() {
  if (playerOneRolls == 3 && playerTwoRolls == 3) {
    firstHalf.style.opacity = 1;
    secondHalf.style.opacity = 1;
    topUi.style.opacity = 1;
    bottomUi.style.opacity = 1;
    console.log("RoundOver Check");
    roundOver = true;
    roundOverDisplay();
  } else return;
}
//Adds moving of dice during finish (Looks bad but works)
async function roundOverDisplay() {
  hornStart.play();
  test();
  healthMath();
  firstHalf.style.opacity = 1;
  secondHalf.style.opacity = 1;
  topUi.style.opacity = 1;
  bottomUi.style.opacity = 1;
  await sleep(2000);
  for (let i = 0; i < playerOneDice.length; i++) {
    firstHalf.style.opacity = 1;
    secondHalf.style.opacity = 1;
    topUi.style.opacity = 1;
    bottomUi.style.opacity = 1;
    let id1 = document.getElementById(`P1dice${i + 1}`);
    let id2 = document.getElementById(`P2dice${i + 1}`);
    let diceNumber1 = playerOneDice[i].number;
    let diceNumber2 = playerTwoDice[i].number;
    arrowsOne(diceNumber1, diceNumber2, id1, id2);
    helmetTwo(diceNumber1, diceNumber2, id1, id2);
    arrowsTwo(diceNumber1, diceNumber2, id1, id2);
    helmetOne(diceNumber1, diceNumber2, id1, id2);
    swordOne(diceNumber1, diceNumber2, id1, id2);
    shieldTwo(diceNumber1, diceNumber2, id1, id2);
    swordTwo(diceNumber1, diceNumber2, id1, id2);
    shieldOne(diceNumber1, diceNumber2, id1, id2);
    heartTwo(diceNumber1, diceNumber2, id1, id2);
    heartOne(diceNumber1, diceNumber2, id1, id2);
    deathOne(diceNumber1, diceNumber2, id1, id2);
    deathTwo(diceNumber1, diceNumber2, id1, id2);
  }
  await sleep(16000);
  console.log("Now");
  restart();
}

function test() {
  secondHalf.style.opacity = 1;
  bottomUi.style.opacity = 1;
  firstHalf.style.opacity = 1;
  topUi.style.opacity = 1;
  console.log(bottomUi.style.opacity);
  console.log(topUi.style.opacity);
}

function healthMath() {
  P1sword = 0;
  P2sword = 0;
  P1shield = 0;
  P2shield = 0;
  P1arrow = 0;
  P2arrow = 0;
  P1helmet = 0;
  P2helmet = 0;
  P1heart = 0;
  P2heart = 0;
  P1death = 0;
  P2death = 0;
  for (let i = 0; i < playerOneDice.length; i++) {
    //Calculates Per
    if (playerOneDice[i].number == 2) {
      P1sword += 1;
    }
    if (playerTwoDice[i].number == 2) {
      P2sword += 1;
    }
    if (playerOneDice[i].number == 1) {
      P1arrow += 1;
    }
    if (playerTwoDice[i].number == 1) {
      P2arrow += 1;
    }
    if (playerOneDice[i].number == 3) {
      P1shield += 1;
    }
    if (playerTwoDice[i].number == 3) {
      P2shield += 1;
    }
    if (playerOneDice[i].number == 4) {
      P1helmet += 1;
    }
    if (playerTwoDice[i].number == 4) {
      P2helmet += 1;
    }
    if (playerOneDice[i].number == 5) {
      P1heart += 1;
    }
    if (playerTwoDice[i].number == 5) {
      P2heart += 1;
    }
    if (playerOneDice[i].number == 6) {
      P1death += 1;
    }
    if (playerTwoDice[i].number == 6) {
      P2death += 1;
    }
  }
}

//First Round
async function arrowsOne(diceNumber1, diceNumber2, id1, id2) {
  let timesHit = 0;
  if (diceNumber1 == 1) {
    arrowClash.play();
    id1.classList.add("moveDown");
    await sleep(2450);
    id1.innerHTML = "<p></p>";
    if (P1arrow > P2helmet) {
      health[1].innerHTML = playerTwoHealth;
      damageSound.play();
    }
  }
  console.log(P1arrow, P2helmet, "Helmet");
  if (P1arrow > P2helmet && id1 == P1dice1) {
    let damage = P1arrow - P2helmet;
    playerTwoHealth = playerTwoHealth - damage;
  }
}

async function helmetTwo(diceNumber1, diceNumber2, id1, id2) {
  if (diceNumber2 == 4) {
    arrowClash.play();
    id2.classList.add("moveUp");
    await sleep(2450);
    id2.innerHTML = "<p></p>";
  }
}

//Second Round

async function arrowsTwo(diceNumber1, diceNumber2, id1, id2) {
  await sleep(3000);
  console.log(P2arrow, P1helmet, "Helmet");
  if (diceNumber2 == 1) {
    arrowClash.currentTime = 0;
    arrowClash.play();
    id2.classList.add("moveUp");
    await sleep(2450);
    id2.innerHTML = "<p></p>";
    if (P2arrow > P1helmet) {
      health[0].innerHTML = playerOneHealth;
      damageSound.play();
    }
  }
  if (P2arrow > P1helmet && id1 == P1dice1) {
    let damage = P2arrow - P1helmet;
    playerOneHealth = playerOneHealth - damage;
  }
}
async function helmetOne(diceNumber1, diceNumber2, id1, id2) {
  await sleep(3000);
  if (diceNumber1 == 4) {
    arrowClash.currentTime = 0;
    arrowClash.play();
    id1.classList.add("moveDown");
    await sleep(2450);
    id1.innerHTML = "<p></p>";
  }
}

//Third Round

async function swordOne(diceNumber1, diceNumber2, id1, id2) {
  await sleep(6000);
  if (diceNumber1 == 2) {
    swordClash.play();
    id1.classList.add("moveDown");
    await sleep(2450);
    id1.innerHTML = "<p></p>";
    if (P1sword > P2shield) {
      health[1].innerHTML = playerTwoHealth;
      damageSound.play();
    }
  }
  console.log(P1sword, P2shield);
  if (P1sword > P2shield && id1 == P1dice1) {
    let damage = P1sword - P2shield;
    playerTwoHealth = playerTwoHealth - damage;
  }
}
async function shieldTwo(diceNumber1, diceNumber2, id1, id2) {
  await sleep(6000);
  if (diceNumber2 == 3) {
    swordClash.play();
    id2.classList.add("moveUp");
    await sleep(2450);
    id2.innerHTML = "<p></p>";
  }
}

//Fourth Round

async function swordTwo(diceNumber1, diceNumber2, id1, id2) {
  await sleep(9000);
  if (diceNumber2 == 2) {
    swordClash.play();
    id2.classList.add("moveUp");
    await sleep(2450);
    id2.innerHTML = "<p></p>";
    if (P2sword > P1shield) {
      health[0].innerHTML = playerOneHealth;
      damageSound.play();
    }
  }
  if (P2sword > P1shield && id1 == P1dice1) {
    let damage = P2sword - P1shield;
    playerOneHealth = playerOneHealth - damage;
  }
}

async function shieldOne(diceNumber1, diceNumber2, id1, id2) {
  await sleep(9000);
  if (diceNumber1 == 3) {
    swordClash.play();
    id1.classList.add("moveDown");
    await sleep(2450);
    id1.innerHTML = "<p></p>";
  }
}

//Fith Round

async function heartOne(diceNumber1, diceNumber2, id1, id2) {
  await sleep(12000);
  if (diceNumber1 == 5) {
    heartPop.play();
    id1.classList.add("heart");
    await sleep(950);
    id1.innerHTML = "<p></p>";
    health[0].innerHTML = playerOneHealth;
    heartBeat.play();
  }
  if (id1 == P1dice1) {
    console.log("test");
    if (P1heart >= 4) {
      let healUp = 5;
      playerOneHealth += healUp;
    } else if (P1heart >= 3) {
      let healUp = 2;
      playerOneHealth += healUp;
    } else if (P1heart >= 2) {
      let healUp = 1;
      playerOneHealth += healUp;
    }
  }
}
async function heartTwo(diceNumber1, diceNumber2, id1, id2) {
  await sleep(12000);
  if (diceNumber2 == 5) {
    heartPop.play();
    id2.classList.add("heart");
    await sleep(950);
    id2.innerHTML = "<p></p>";
    health[1].innerHTML = playerTwoHealth;
    heartBeat.play();
  }
  if (id1 == P1dice1) {
    if (P2heart >= 4) {
      let healUp = 5;
      playerTwoHealth += healUp;
    } else if (P2heart >= 3) {
      let healUp = 2;
      playerTwoHealth += healUp;
    } else if (P2heart >= 2) {
      let healUp = 1;
      playerTwoHealth += healUp;
    }
  }
}

//6th Round

async function deathOne(diceNumber1, diceNumber2, id1, id2) {
  await sleep(14000);
  if (diceNumber1 == 6) {
    deathSlash.play();
    id1.classList.add("stabUp");
    await sleep(450);
    id1.innerHTML = "<p></p>";
  }
  if (id1 == P1dice1) {
    playerOneHealth -= P1death * 2;
    health[0].innerHTML = playerOneHealth;
  }
}

async function deathTwo(diceNumber1, diceNumber2, id1, id2) {
  await sleep(14000);
  if (diceNumber2 == 6) {
    console.log("test");
    deathSlash.play();
    id2.classList.add("stabDown");
    await sleep(450);
    id2.innerHTML = "<p></p>";
  }
  if (id1 == P1dice1) {
    playerTwoHealth -= P2death * 2;
    health[1].innerHTML = playerTwoHealth;
  }
}

function sleep(time) {
  return new Promise((resolve) => {
    setInterval(resolve, time);
  });
}

function restart() {
  if (playerOneHealth <= 0 || playerTwoHealth <= 0) {
    endGame();
    console.log("test");
  }
  playerOneRolls = 0;
  playerTwoRolls = 0;
  rollCheck = 0;
  roundOver = false;
  opacityCheck();
  for (let i = 0; i < playerOneDice.length; i++) {
    playerOneDice[i].reRoll = true;
    playerTwoDice[i].reRoll = true;
    playerOneDice[i].number = roll();
    playerTwoDice[i].number = roll();
  }
  for (let i = 0; i < playerOneDice.length; i++) {
    let id1 = document.getElementById(`P1dice${i + 1}`);
    let id2 = document.getElementById(`P2dice${i + 1}`);
    id1.classList.remove("moveDown");
    id1.classList.remove("heart");
    id1.classList.remove("stabUp");
    id2.classList.remove("moveUp");
    id2.classList.remove("heart");
    id2.classList.remove("stabDown");
    id1.classList.add("reRoll");
    id2.classList.add("reRoll");
  }
}

function opacityCheck() {
  if (playerOneTurn == false) {
    firstHalf.style.opacity = 0.3;
    topUi.style.opacity = 0.3;
    secondHalf.style.opacity = 1;
    bottomUi.style.opacity = 1;
  } else {
    secondHalf.style.opacity = 0.3;
    bottomUi.style.opacity = 0.3;
    topUi.style.opacity = 1;
    firstHalf.style.opacity = 1;
  }
}

async function endGame() {
  endGameScreen.style.visibility = "visible";
  if (playerOneHealth <= 0 && playerTwoHealth <= 0) {
    endGameScreen.innerHTML = `<h1>There are no winners in war</h1>`;
    await sleep(5000);
    endGameScreen.style.visibility = "hidden";
    playerOneHealth = 10;
    playerTwoHealth = 10;
    playerTwoHealth = 10;
    health[0].innerHTML = playerOneHealth;
    playerTwoHealth = 10;
    health[1].innerHTML = playerOneHealth;
  } else if (playerOneHealth <= 0) {
    endGameScreen.innerHTML = `<h1>Bottom Player Wins</h1>`;
    await sleep(5000);
    endGameScreen.style.visibility = "hidden";
    playerOneHealth = 10;
    playerTwoHealth = 10;
    playerTwoHealth = 10;
    health[0].innerHTML = playerOneHealth;
    playerTwoHealth = 10;
    health[1].innerHTML = playerOneHealth;
  } else if (playerTwoHealth <= 0) {
    endGameScreen.innerHTML = `<h1>Top Player Wins</h1>`;
    await sleep(5000);
    endGameScreen.style.visibility = "hidden";
    playerOneHealth = 10;
    playerTwoHealth = 10;
    playerTwoHealth = 10;
    health[0].innerHTML = playerOneHealth;
    playerTwoHealth = 10;
    health[1].innerHTML = playerOneHealth;
  }
}

secondHalf.style.opacity = 0.5;
bottomUi.style.opacity = 0.5;
firstHalf.style.opacity = 0.5;
topUi.style.opacity = 0.5;
startButton.style.opacity = 1;
