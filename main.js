let body = document.querySelector("body");

let inputP1 = document.querySelector(" .player1-name");
let inputP2 = document.querySelector(".player2-name");
let newBtn = document.querySelector(".new-btn");
let player1 = document.querySelector(".f-player");
let player2 = document.querySelector(".s-player");
let novalidate = document.querySelector(".novalidate");
let deleteNoval = document.querySelector(".btn");
//catch all squares
let allSquare = document.querySelectorAll(".game-square");

if (JSON.parse(localStorage.getItem("playerName"))) {
  setPlayerName();
}
newBtn.addEventListener("click", putPlayersNamesInLocalStorage);

function putPlayersNamesInLocalStorage() {
  if (inputP1.value === "" || inputP2.value === "") {
    novalidate.style.cssText = "display:flex";
  } else {
    emptySquare();
    localStorage.removeItem("savesShapes");
    // put players names in array
    let player1 = {
      name: inputP1.value,
      scoor: 0,
    };
    let player2 = {
      name: inputP2.value,
      scoor: 0,
    };
    let playerNames = [];
    playerNames.push(player1, player2);

    localStorage.setItem("playerName", JSON.stringify(playerNames));
    inputP1.value = "";
    inputP2.value = "";
    setPlayerName();
  }
}
function setPlayerName() {
  let playerNames = JSON.parse(localStorage.getItem("playerName"));

  player1.innerHTML = playerNames[0].name + " :" + playerNames[0].scoor;
  player2.innerHTML = playerNames[1].name + " :" + playerNames[1].scoor;
}

//witch player will plays x-flase o-ture
let whoPlay;
if (JSON.parse(localStorage.getItem("savesShapes"))) {
  let arr = JSON.parse(localStorage.getItem("savesShapes"));

  if (arr.length % 2 == 1) {
    whoPlay = true;
    console.log(whoPlay);
  } else {
    whoPlay = false;
    console.log(whoPlay);
  }
} else {
  whoPlay = false;
}

// loop in all spuares to put click event
allSquare.forEach(function (item) {
  item.addEventListener("click", putInSquareTheShape);
});

function putInSquareTheShape() {
  if (
    whoPlay &&
    !this.classList.contains("doneo") &&
    !this.classList.contains("donex")
  ) {
    //create o shape and append
    let oShape = document.createElement("span");
    oShape.className = "middle-screen o";
    this.append(oShape);
    whoPlay = false;
    this.classList.add("doneo");
    let done = "doneo";
    let squareName = this.getAttribute("name");
    this.setAttribute("kind", "doneo");

    //save the shape in local storage
    makeOpjectOfShape(squareName, done);
    checkWin();
  } else if (
    whoPlay === false &&
    !this.classList.contains("donex") &&
    !this.classList.contains("doneo")
  ) {
    // create x shape and append
    let x = document.createElement("div");
    x.className = "x middle-screen";
    let x1 = document.createElement("span");
    x1.className = "x1";
    let x2 = document.createElement("span");
    x2.className = "x2";
    x.append(x1, x2);
    this.append(x);
    whoPlay = true;
    this.classList.add("donex");
    this.setAttribute("kind", "donex");
    let done = "donex";
    let squareName = this.getAttribute("name");

    //save the shape in local storage
    makeOpjectOfShape(squareName, done);
    checkWin();
  }
}

//save the shape in local function
let arrOfSaveShape = JSON.parse(localStorage.getItem("savesShapes"))
  ? JSON.parse(localStorage.getItem("savesShapes"))
  : [];
function makeOpjectOfShape(squareName, doneKind) {
  let shape = {
    name: squareName,
    doneKind: doneKind,
  };

  //puch the object to arr
  arrOfSaveShape.push(shape);
  saveTheShapesInLocal(arrOfSaveShape);
}

function saveTheShapesInLocal(arrOfSaveShape) {
  localStorage.setItem("savesShapes", JSON.stringify(arrOfSaveShape));
}

getShapesFormLocal();
function getShapesFormLocal() {
  let arrOfShapes = JSON.parse(localStorage.getItem("savesShapes"))
    ? JSON.parse(localStorage.getItem("savesShapes"))
    : [];

  allSquare.forEach(function (square) {
    drawTheShapes(arrOfShapes, square);
  });
}

function drawTheShapes(arrOfShapes, square) {
  arrOfShapes.forEach(function (item) {
    if (
      square.getAttribute("name") === item.name &&
      item.doneKind === "donex"
    ) {
      // create x shape and append
      let x = document.createElement("div");
      x.className = "x middle-screen";
      let x1 = document.createElement("span");
      x1.className = "x1";
      let x2 = document.createElement("span");
      x2.className = "x2";
      x.append(x1, x2);
      square.append(x);
      square.setAttribute("kind", "donex");
    } else if (
      square.getAttribute("name") === item.name &&
      item.doneKind === "doneo"
    ) {
      let oShape = document.createElement("span");
      oShape.className = "middle-screen o";
      square.append(oShape);
      whoPlay = false;
      square.setAttribute("kind", "doneo");
    }
  });
}

checkWin();
function checkWin() {
  let allSquare = document.querySelectorAll(".game-square");
  let r1c1 = allSquare[0].getAttribute("kind");
  let r1c2 = allSquare[1].getAttribute("kind");
  let r1c3 = allSquare[2].getAttribute("kind");
  let r2c1 = allSquare[3].getAttribute("kind");
  let r2c2 = allSquare[4].getAttribute("kind");
  let r2c3 = allSquare[5].getAttribute("kind");
  let r3c1 = allSquare[6].getAttribute("kind");
  let r3c2 = allSquare[7].getAttribute("kind");
  let r3c3 = allSquare[8].getAttribute("kind");
  //check if x win
  if (r1c1 === "donex" && r1c2 === "donex" && r1c3 === "donex") {
    playerXIncreseScoor();
    localStorage.removeItem("savesShapes");
    emptySquare();
  } else if (r2c1 === "donex" && r2c2 === "donex" && r2c3 === "donex") {
    playerXIncreseScoor();
    localStorage.removeItem("savesShapes");
    emptySquare();
  } else if (r3c1 === "donex" && r3c2 === "donex" && r3c3 === "donex") {
    playerXIncreseScoor();
    localStorage.removeItem("savesShapes");
    emptySquare();
  } else if (r1c1 === "donex" && r2c1 === "donex" && r3c1 === "donex") {
    playerXIncreseScoor();
    localStorage.removeItem("savesShapes");
    emptySquare();
  } else if (r1c2 === "donex" && r2c2 === "donex" && r3c2 === "donex") {
    playerXIncreseScoor();
    localStorage.removeItem("savesShapes");
    emptySquare();
  } else if (r1c3 === "donex" && r2c3 === "donex" && r3c3 === "donex") {
    playerXIncreseScoor();
    localStorage.removeItem("savesShapes");
    emptySquare();
  } else if (r1c1 === "donex" && r2c2 === "donex" && r3c3 === "donex") {
    playerXIncreseScoor();
    localStorage.removeItem("savesShapes");
    emptySquare();
  } else if (r1c3 === "donex" && r2c2 === "donex" && r3c1 === "donex") {
    playerXIncreseScoor();
    localStorage.removeItem("savesShapes");
    emptySquare();
  }
  //chech if o is win
  else if (r1c1 === "doneo" && r1c2 === "doneo" && r1c3 === "doneo") {
    playerOIncreseScoor();
    localStorage.removeItem("savesShapes");
    emptySquare();
  } else if (r2c1 === "doneo" && r2c2 === "doneo" && r2c3 === "doneo") {
    playerOIncreseScoor();
    localStorage.removeItem("savesShapes");
    emptySquare();
  } else if (r3c1 === "doneo" && r3c2 === "doneo" && r3c3 === "doneo") {
    playerOIncreseScoor();
    localStorage.removeItem("savesShapes");
    emptySquare();
  } else if (r1c1 === "doneo" && r2c1 === "doneo" && r3c1 === "doneo") {
    playerOIncreseScoor();
    localStorage.removeItem("savesShapes");
    emptySquare();
  } else if (r1c2 === "doneo" && r2c2 === "doneo" && r3c2 === "doneo") {
    playerOIncreseScoor();
    localStorage.removeItem("savesShapes");
    emptySquare();
  } else if (r1c3 === "doneo" && r2c3 === "doneo" && r3c3 === "doneo") {
    playerOIncreseScoor();
    localStorage.removeItem("savesShapes");
    emptySquare();
  } else if (r1c1 === "doneo" && r2c2 === "doneo" && r3c3 === "doneo") {
    playerOIncreseScoor();
    localStorage.removeItem("savesShapes");
    emptySquare();
  } else if (r1c3 === "doneo" && r2c2 === "doneo" && r3c1 === "doneo") {
    playerOIncreseScoor();
    localStorage.removeItem("savesShapes");
    emptySquare();
  }
  let arr = JSON.parse(localStorage.getItem("savesShapes"))
    ? JSON.parse(localStorage.getItem("savesShapes"))
    : [];
  if (arr.length === 9) {
    localStorage.removeItem("savesShapes");
    emptySquare();
  }
}

function emptySquare() {
  setTimeout(function () {
    allSquare.forEach(function (item) {
      item.innerHTML = "";
    });
  }, 1500);
  setTimeout(function () {
    window.location.reload();
  }, 3000);
}

function playerXIncreseScoor() {
  let playerX = JSON.parse(localStorage.getItem("playerName"))[0];

  let playerO = JSON.parse(localStorage.getItem("playerName"))[1];
  playerX.scoor += 1;
  let playerNames = [];
  playerNames.push(playerX, playerO);
  localStorage.setItem("playerName", JSON.stringify(playerNames));
  //make the audio
  winAudio();
}

function playerOIncreseScoor() {
  let playerX = JSON.parse(localStorage.getItem("playerName"))[0];

  let playerO = JSON.parse(localStorage.getItem("playerName"))[1];
  playerO.scoor += 1;
  let playerNames = [];
  playerNames.push(playerX, playerO);
  localStorage.setItem("playerName", JSON.stringify(playerNames));
  winAudio();
}

deleteNoval.addEventListener("click", function (e) {
  novalidate.style.cssText = "display:none";
});

function winAudio() {
  let audioForm = `<audio class="audio" src="./announcement-sound-4-21464.mp3" controls ></audio>`;
  body.innerHTML += audioForm;
  let audio = document.querySelector("audio");
  audio.style.cssText = " display:none";
  audio.play();
}
