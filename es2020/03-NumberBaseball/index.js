const input = document.querySelector("#input");
const check = document.querySelector("#check");
const tries = document.querySelector("#tries");

// 랜덤 정답 뽑기
candidate = Array(10)
  .fill()
  .map((v, i) => i);
answer = [];
for (let i = 0; i < 4; i++) {
  const numberIndex = Math.floor(Math.random() * candidate.length);
  answer.push(candidate[numberIndex]);
  candidate.splice(numberIndex, 1);
}
console.log("답은 " + answer);

let myInput = "";
check.addEventListener("click", () => {
  myInput = input.value;
  input.value = "";
  let strike = 0;
  let ball = 0;
  for ([i, ansNum] of answer.entries()) {
    for ([j, inputNum] of myInput.split("").entries()) {
      if (ansNum === +inputNum) {
        if (i === j) {
          strike++;
        } else {
          ball++;
        }
      }
    }
  }
  // 홈런
  if (strike === 4) {
    tries.appendChild(document.createTextNode("홈런!"));
  } else {
    tries.appendChild(document.createTextNode(`${myInput} : ${strike} 스트라이크 ${ball}볼!`));
    tries.appendChild(document.createElement("br"));
  }
});
