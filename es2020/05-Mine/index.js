const tbody = document.querySelector("#table tbody");
let dataset = [];

document.querySelector("#exec").addEventListener("click", () => {
  var hor = +document.querySelector("#hor").value;
  var ver = +document.querySelector("#ver").value;
  var mine = +document.querySelector("#mine").value;

  // 초기화
  tbody.innerHTML = "";
  dataset = [];
  // 판 만들기
  Array(hor)
    .fill()
    .map((v, i) => {
      let arr = [];
      let tr = document.createElement("tr");
      Array(ver)
        .fill()
        .map((v, i) => {
          arr.push("");
          let td = document.createElement("td");
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
    tbody.rows[row].cells[col].textContent = "X";
    dataset[row][col] = "X";
  });
  console.log(candidate);
  console.log(dataset);
});

// tbody.rows[row].cells[col].textContent

// 좌클릭
tbody.addEventListener("click", (e) => {
  if (e.target.nodeName != "TD") return;

  let row = e.target.parentNode.rowIndex - 1;
  let col = e.target.cellIndex;
  tbody.rows[row].cells[col].classList.add("opened");
  if (dataset[row][col] === "X") {
    tbody.rows[row].cells[col].textContent = "펑";
    return;
  }
  let mineList = [dataset[row][col - 1], dataset[row][col + 1]];
  if (row > 0) {
    mineList = mineList.concat([dataset[row - 1][col - 1], dataset[row - 1][col], dataset[row - 1][col + 1]]);
  }
  if (row < dataset.length - 1) {
    mineList = mineList.concat([dataset[row + 1][col - 1], dataset[row + 1][col], dataset[row + 1][col + 1]]);
  }
  let mineCount = mineList.filter((v) => {
    return v == "X";
  }).length;

  // 0 클릭하면 재귀함수
  if (mineCount === 0) {
  }

  tbody.rows[row].cells[col].textContent = mineCount;
});
// 우클릭
tbody.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  if (e.target.nodeName != "TD") return;
  let row = e.target.parentNode.rowIndex - 1;
  let col = e.target.cellIndex;

  if (tbody.rows[row].cells[col].textContent === "X" || tbody.rows[row].cells[col].textContent === "") {
    tbody.rows[row].cells[col].textContent = "!";
  } else if (tbody.rows[row].cells[col].textContent === "!") {
    tbody.rows[row].cells[col].textContent = "?";
  } else if (tbody.rows[row].cells[col].textContent === "?") {
    tbody.rows[row].cells[col].textContent = dataset[row][col];
  }
});
