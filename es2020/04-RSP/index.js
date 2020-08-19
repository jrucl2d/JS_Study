const image = document.querySelector("#image");

image.style.background = `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) 0px 0`;

const rspCoord = {
  rock: 0,
  scissors: -135,
  paper: -270,
};
let computerSelect = "rock";

function intervalAct() {
  if (computerSelect === "rock") {
    computerSelect = "scissors";
    image.style.background = `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${rspCoord.scissors}px 0`;
  } else if (computerSelect === "scissors") {
    computerSelect = "paper";
    image.style.background = `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${rspCoord.paper}px 0`;
  } else {
    computerSelect = "rock";
    image.style.background = `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${rspCoord.rock}px 0`;
  }
}

let myInterval = setInterval(intervalAct, 1000);

const rockTag = document.querySelector(".rock");
const scissorsTag = document.querySelector(".scissors");
const paperTag = document.querySelector(".paper");

const scoreBoard = {
  rock: 0,
  scissors: -1,
  paper: 1,
};

const checkResult = (myChoice) => () => {
  clearInterval(myInterval);
  const score = document.querySelector("#score");
  const diff = myChoice - scoreBoard[computerSelect];
  let newScore = +score.textContent;
  if (diff === 1 || diff === -2) {
    console.log("이김");
    newScore++;
    console.log(newScore);
    score.textContent = String(newScore);
    setTimeout(() => {
      myInterval = setInterval(intervalAct, 1000);
    }, 1000);
  } else if (diff === -1 || diff === 2) {
    console.log("짐");
    newScore--;
    score.textContent = String(newScore);
    setTimeout(() => {
      myInterval = setInterval(intervalAct, 1000);
    }, 1000);
  } else if (diff === 0) {
    console.log("비김");
    setTimeout(() => {
      myInterval = setInterval(intervalAct, 1000);
    }, 1000);
  }
};

rockTag.addEventListener("click", checkResult(scoreBoard.rock));
scissorsTag.addEventListener("click", checkResult(scoreBoard.scissors));
paperTag.addEventListener("click", checkResult(scoreBoard.paper));
