const tbody = document.querySelector("#table tbody");
const horTag = document.querySelector("#hor");
const verTag = document.querySelector("#ver");
const mineTag = document.querySelector("#mine");
let hor;
let ver;
let mine;
const result = document.querySelector("#result");
let overFlag = false;

let dataset = [];
const code = {
  normal: 1,
  opened: 0,
  mine: -1,
};
let opnedCount = 0;

document.querySelector("#exec").addEventListener("click", () => {
  hor = +horTag.value;
  ver = +verTag.value;
  mine = +mineTag.value;
  // 초기화
  tbody.innerHTML = "";
  result.textContent = "";
  dataset = [];
  overFlag = false;
  opnedCount = 0;
  // 판 만들기
  Array(hor)
    .fill()
    .map((v, i) => {
      let arr = [];
      let tr = document.createElement("tr");
      Array(ver)
        .fill()
        .map((v, i) => {
          arr.push(code.normal);
          let td = document.createElement("td");
          td.dataset.isMine = "N";
          tr.appendChild(td);
        });
      tbody.appendChild(tr);
      dataset.push(arr);
    });

  // 지뢰 심기
  const tmpArr = Array(hor * ver)
    .fill()
    .map((v, i) => i);
  const candidate = [];
  for (let i = 0; i < mine; i++) {
    candidate.push(tmpArr.splice(Math.floor(Math.random() * tmpArr.length), 1)[0]);
  }

  // 지뢰 보여주기
  candidate.forEach((v) => {
    let row = Math.floor(v / ver);
    let col = v - row * ver;
    // tbody.rows[row].cells[col].textContent = "X";
    tbody.rows[row].cells[col].dataset.isMine = "X";
    dataset[row][col] = code.mine;
  });
  console.log(candidate);
  console.log(dataset);
  tbody.addEventListener("click", (e) => leftClick(e));
});

// 좌클릭
function leftClick(e) {
  if (overFlag) return;
  if (e.target.nodeName != "TD") return;
  let row = e.target.parentNode.rowIndex - 1;
  let col = e.target.cellIndex;
  if (dataset[row][col] === code.opened) return;

  // 게임 오버
  if (dataset[row][col] === code.mine) {
    tbody.rows[row].cells[col].textContent = "펑";
    result.textContent = "게임 오버 ㅠㅠ";
    overFlag = true;
    return;
  }
  // 주변 지뢰 개수 탐색
  let mineList = [dataset[row][col - 1], dataset[row][col + 1]];
  if (row > 0) {
    mineList = mineList.concat([dataset[row - 1][col - 1], dataset[row - 1][col], dataset[row - 1][col + 1]]);
  }
  if (row < dataset.length - 1) {
    mineList = mineList.concat([dataset[row + 1][col - 1], dataset[row + 1][col], dataset[row + 1][col + 1]]);
  }
  let mineCount = mineList.filter((v) => {
    return v == code.mine;
  }).length;

  // 열음 표시
  tbody.rows[row].cells[col].classList.add("opened");
  dataset[row][col] = code.opened;
  opnedCount += 1;

  // 게임 승리
  if (opnedCount == ver * hor - mine) {
    overFlag = true;
    result.textContent = "승리했습니다!";
  }

  // 0 클릭하면 재귀함수
  if (mineCount === 0) {
    let mineList = [tbody.rows[row].cells[col - 1], tbody.rows[row].cells[col + 1]];
    if (row > 0) {
      mineList = mineList.concat(tbody.rows[row - 1].cells[col - 1], tbody.rows[row - 1].cells[col], tbody.rows[row - 1].cells[col + 1]);
    }
    if (row < dataset.length - 1) {
      mineList = mineList.concat(tbody.rows[row + 1].cells[col - 1], tbody.rows[row + 1].cells[col], tbody.rows[row + 1].cells[col + 1]);
    }
    mineList.filter((v) => !!v).map((v) => v.click());
  }

  tbody.rows[row].cells[col].textContent = mineCount || "";
}
// 우클릭
tbody.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  if (overFlag) return;
  if (e.target.nodeName != "TD") return;
  let row = e.target.parentNode.rowIndex - 1;
  let col = e.target.cellIndex;
  if (dataset[row][col] === code.opened) return;

  if (tbody.rows[row].cells[col].dataset.isMine === "X" || tbody.rows[row].cells[col].dataset.isMine === "N") {
    tbody.rows[row].cells[col].textContent = "!";
    tbody.rows[row].cells[col].dataset.isMine = "!";
  } else if (tbody.rows[row].cells[col].textContent === "!") {
    tbody.rows[row].cells[col].textContent = "?";
    tbody.rows[row].cells[col].dataset.isMine = "?";
  } else if (tbody.rows[row].cells[col].textContent === "?") {
    // tbody.rows[row].cells[col].textContent = dataset[row][col] == -1 ? "X" : "";
    // tbody.rows[row].cells[col].dataset.isMine = dataset[row][col] == -1 ? "X" : "N";
    tbody.rows[row].cells[col].textContent = "";
    tbody.rows[row].cells[col].dataset.isMine = "N";
  }
});
