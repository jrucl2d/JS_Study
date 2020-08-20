const container = document.querySelector(".container");
const items = document.querySelectorAll(".item");
const colors = ["red", "blue", "green", "yellow", "blueviolet", "coral", "red", "blue", "green", "yellow", "blueviolet", "coral"];
const colorsBackup = colors.slice(); // 깊은 복사
const candidate = [];

// 색깔 정해주는 부분
for (let _ = 0; _ < 12; _++) {
  candidate.push(colors.splice(Math.floor(Math.random() * colors.length), 1)[0]);
}

// 최초 보여주기
items.forEach((v) => {
  v.click();
});

container.addEventListener("click", (e) => {
  if (e.target.classList.contains("container")) return;
  e.target.classList.remove("back");
  e.target.classList.add("front");
  let num = +e.target.id.slice(4) - 1;
  e.target.style.backgroundColor = candidate[num];
});
