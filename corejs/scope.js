// 1번
// function sum(n) {
//   return function (m) {
//     return n + m; // n의 값은 외부 렉시컬 환경에서 가져온다.
//   };
// }
// console.log(sum(5)(-1));
// let mySum = sum(5);
// console.log(mySum(-1));

// 2번
// let arr = [1, 2, 3, 4, 5, 6, 7];
// function inBetween(a, b) {
//   return function (x) {
//     return x >= a && x <= b ? true : false;
//   };
// }
// function inArray(myArray) {
//   return function (x) {
//     return myArray.includes(x);
//   };
// }
// console.log(arr.filter(inBetween(3, 6))); // 3,4,5,6
// console.log(arr.filter(inArray([1, 2, 10]))); // 1,2

// 3번
// let users = [
//   { name: "John", age: 20, surname: "Johnson" },
//   { name: "Pete", age: 18, surname: "Peterson" },
//   { name: "Ann", age: 19, surname: "Hathaway" },
// ];
// function byField(option) {
//   return function (a, b) {
//     return a[option] > b[option] ? 1 : -1;
//   };
// }
// users.sort(byField("name"));
// console.log(users);
// users.sort(byField("age"));
// console.log(users);

// 4번
function makeArmy() {
  let shooters = [];
  let i = 0;
  while (i < 10) {
    // 콜백함수를 나중에 실행한다는 점에서 비동기이다. 따라서 내부에서 i를 못 찾아서 외부 렉시컬 환경에서 가져온다.(이미 다 10)
    // 이를 막기 위해서 내부 렉시컬 환경에 존재하는 변수 j를 선언, i의 값을 저장해서 콜백 함수 실행 시에 내부 변수 j를 출력하게 한다.
    let j = i;
    let shooter = function () {
      // shooter 함수
      console.log(j); // 몇 번째 shooter인지 출력해줘야 함
    };
    shooters.push(shooter);
    i++;
  }
  return shooters;
}
let army = makeArmy();
army[0](); // 0번째 shooter가 10을 출력함
army[5](); // 5번째 shooter 역시 10을 출력함
