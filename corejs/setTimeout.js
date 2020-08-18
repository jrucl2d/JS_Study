// 1번
function printNumbers(from, to) {
  let i = from;
  let myInterval = setInterval(() => {
    console.log(i);
    if (i === to) {
      clearInterval(myInterval);
    }
    i++;
  }, 1000);
}
// printNumbers(1, 5);
function printNumbers2(from, to) {
  let i = from;
  setTimeout(function mySetTimeout() {
    console.log(i);
    if (i !== to) {
      i++;
      setTimeout(mySetTimeout, 1000);
    }
  }, 1000);
}
printNumbers2(1, 5);
