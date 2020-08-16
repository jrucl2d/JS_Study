// 1번
// function camelize(string) {
//   return string
//     .split("-")
//     .map((item, index) => {
//       return index === 0 ? item : item[0].toUpperCase() + item.slice(1);
//     })
//     .join("");
// }
// console.log(camelize("background-color"));
// console.log(camelize("list-style-image"));
// console.log(camelize("-webkit-transition"));

// 2번
// function filterRange(arr, a, b) {
//   return arr.filter((item) => item >= a && item <= b);
// }
// let arr = [5, 3, 8, 1];
// let filtered = filterRange(arr, 1, 4);
// console.log(filtered);
// console.log(arr);

// 3번
// let arr = [5, 3, 8, 1];
// filterRangeInPlace(arr, 1, 4); // 1과 4 사이에 있지 않은 요소는 모두 제거함
// console.log(arr); // [3, 1]
// function filterRangeInPlace(arr, a, b) {
//   arr.forEach((item, index) => {
//     if (item < a || item > b) {
//       arr.splice(index, 1);
//     }
//   });
// }

// 4번
// let arr = [5, 2, 1, -10, 8];
// arr.sort((a, b) => b - a);
// console.log(arr); // 8, 5, 2, 1, -10

// 5번
// let arr = ["HTML", "JavaScript", "CSS"];
// let sorted = copySorted(arr);
// console.log(sorted); // CSS, HTML, JavaScript
// console.log(arr); // HTML, JavaScript, CSS (no changes)
// function copySorted(arr) {
//   return [...arr].sort();
//   // 혹은 arr.slice().sort();
// }

// 7번
// let john = { name: "John", age: 25 };
// let pete = { name: "Pete", age: 30 };
// let mary = { name: "Mary", age: 28 };
// let users = [john, pete, mary];
// let names = users.map((item) => (item = item.name));
// console.log(names); // John, Pete, Mary

// 8번
// let john = { name: "John", surname: "Smith", id: 1 };
// let pete = { name: "Pete", surname: "Hunt", id: 2 };
// let mary = { name: "Mary", surname: "Key", id: 3 };
// let users = [john, pete, mary];
// let usersMapped = users.map((item) => {
//   return {
//     id: item.id,
//     fullName: `${item.name} ${item.surname}`,
//   };
// });
// console.log(usersMapped[0].id); // 1
// console.log(usersMapped[0].fullName); // John Smith

// 11번
let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 29 };
let arr = [john, pete, mary];
console.log(getAverageAge(arr)); // (25 + 30 + 29) / 3 = 28
function getAverageAge(arr) {
  return (
    arr.reduce((acc, cur) => {
      return acc + cur.age;
    }, 0) / arr.length
  );
}
