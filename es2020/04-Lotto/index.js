const result = document.querySelector("#result");
const bonus = document.querySelector("#bonus");

// 로또 배열
const LottoArray = Array(45)
  .fill()
  .map((v, i) => i + 1);
const shuffle = [];
for (let i = 0; i < 45; i++) {
  let tmpIndex = Math.floor(Math.random() * LottoArray.length);
  shuffle.push(LottoArray.splice(tmpIndex, 1)[0]);
}
for (let i = 0; i < 6; i++) {
  setTimeout(() => {
    result.appendChild(document.createTextNode(shuffle[i] + "\t"));
  }, (i + 1) * 1000);
}
setTimeout(() => {
  bonus.appendChild(document.createTextNode(shuffle[6]));
}, 7000);
