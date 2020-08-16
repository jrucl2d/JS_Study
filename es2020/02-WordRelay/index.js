const btn = document.querySelector("#button");

btn.addEventListener("click", (e) => {
  e.preventDefault();
  const word = document.querySelector("#word").textContent;
  const input = document.querySelector("#input");
  const w = word[word.length - 1];
  const i = input.value[0];
  const error = document.querySelector("#error");
  if (w === i) {
    document.querySelector("#word").textContent = input.value;
    error.textContent = "";
    input.value = "";
    input.focus();
  } else {
    error.textContent = "땡";
    input.value = "";
    input.focus();
  }
});
