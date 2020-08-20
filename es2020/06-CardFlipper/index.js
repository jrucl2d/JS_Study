const container = document.querySelector(".container");
const items = document.querySelectorAll(".item");
let colors = ["red", "blue", "green", "yellow", "blueviolet", "coral", "red", "blue", "green", "yellow", "blueviolet", "coral"];
const colorsBackup = colors.slice(); // 깊은 복사
let candidate = [];
let clickFlag = true;
let startTime;

// 색깔 정해주는 부분
for (let _ = 0; _ < 12; _++) {
  candidate.push(colors.splice(Math.floor(Math.random() * colors.length), 1)[0]);
}

// 최초 보여주기
function starting() {
  items.forEach((v, i) => {
    clickFlag = false;
    setTimeout(() => {
      v.classList.remove("back");
      v.classList.add("front");
      v.style.backgroundColor = candidate[i];
    }, 1000 + 100 * i);
    setTimeout(() => {
      v.classList.remove("front");
      v.classList.add("back");
      v.style.backgroundColor = "#888";
      clickFlag = true;
      startTime = new Date();
    }, 3000);
  });
}
starting();

let flipped = [];
let end = 0;

container.addEventListener("click", (e) => {
  if (!clickFlag) return;
  if (e.target.classList.contains("container")) return;
  if (flipped.length === 2) return;
  if (e.target.classList.contains("front")) return;
  e.target.classList.remove("back");
  e.target.classList.add("front");
  let num = +e.target.id.slice(4) - 1;
  e.target.style.backgroundColor = candidate[num];
  flipped.push(e.target);
  if (flipped.length === 2) {
    // 두 색깔이 다르면
    if (candidate[+flipped[0].id.slice(4) - 1] !== candidate[+flipped[1].id.slice(4) - 1]) {
      clickFlag = false;
      setTimeout(() => {
        flipped.forEach((v) => {
          v.classList.remove("front");
          v.classList.add("back");
          v.style.backgroundColor = "#888";
          flipped = [];
        });
      }, 500);
      setTimeout(() => {
        clickFlag = true;
      }, 1100);
    } else {
      end += 2;
      if (end === 12) {
        let endTime = new Date();
        document.querySelector("#result").textContent = `${(endTime - startTime) / 1000}초만에 성공!`;
        const restart = document.createElement("button");
        restart.style.display = "inline-block";
        restart.style.width = "100px";
        restart.style.height = "40px";
        restart.innerText = "다시 시작";
        document.querySelector("#result").appendChild(restart);
        restart.addEventListener("click", restartGame);
      }
      flipped = [];
    }
  }
  console.log(flipped);
});

// 모두 초기화
function restartGame() {
  document.querySelector("#result").innerHTML = "";
  items.forEach((v) => {
    v.classList.remove("front");
    v.classList.add("back");
    v.style.backgroundColor = "#888";
    colors = colorsBackup.slice();
    candidate = [];
    for (let _ = 0; _ < 12; _++) {
      candidate.push(colors.splice(Math.floor(Math.random() * colors.length), 1)[0]);
    }
    clickFlag = true;
    startTime;
    end = 0;
    flipped = [];
    starting();
  });
}
