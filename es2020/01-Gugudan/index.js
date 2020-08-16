// 이 위에 이렇게 하면 안 되는 이유 : 처음 새로고침 되었을 때 값이 존재하지 않는다. 따라서 아무것도 안 들어간다.
// const a = document.querySelector("#first").value;
// const b = document.querySelector("#second").value;

document.querySelector("#click").addEventListener("click", () => {
  // 값 저장은 최대한 사용하는 곳과 가까운 곳에서 하자.
  const a = document.querySelector("#first").value; // input에 입력한 값을 가져올 때는 value로 가져온다.
  const b = document.querySelector("#second").value;
  const r = document.querySelector("#result");
  console.log(a, b);
  if (a) {
    if (b) {
      r.textContent = a * b;
    } else {
      r.textContent = "두 번째 값을 입력해주세요";
    }
  } else {
    r.textContent = "첫 번째 값을 입력해주세요";
  }
});
