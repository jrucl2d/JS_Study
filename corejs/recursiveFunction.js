// let company = {
//   // 동일한 객체(간결성을 위해 약간 압축함)
//   sales: [
//     { name: "John", salary: 1000 },
//     { name: "Alice", salary: 1600 },
//   ],
//   development: {
//     sites: [
//       { name: "Peter", salary: 2000 },
//       { name: "Alex", salary: 1800 },
//     ],
//     internals: [{ name: "Jack", salary: 1300 }],
//   },
// };
// function sumSalaries(department) {
//   if (Array.isArray(department)) {
//     return department.reduce((acc, cur) => acc + cur.salary, 0);
//   } else {
//     let sum = 0;
//     for (let subDep of Object.values(department)) {
//       sum += sumSalaries(subDep);
//     }
//     return sum;
//   }
// }
// console.log(sumSalaries(company));

// linked list 연습 부분
// let list = { value: 1 };
// list.next = { value: 2 };
// list.next.next = { value: 3 };
// list.next.next.next = { value: 4 };
// list = { value: "newVal", next: list };
// list.next = list.next.next;

// console.log(list);

// 1번
// function sum1(n) {
//   let sum = 0;
//   for (let i = 1; i <= n; i++) {
//     sum += i;
//   }
//   return sum;
// }
// function sum2(n) {
//   if (n === 1) return 1;
//   else {
//     return n + sum2(n - 1);
//   }
// }
// function sum3(n) {
//   return (1 + n) * (n / 2);
// }
// console.log(sum1(100000));
// console.log(sum2(100000));
// console.log(sum3(100000));

// 2번
// function factorial(n) {
//   return n === 1 ? 1 : n * factorial(n - 1);
// }
// console.log(factorial(5));

// 3번
// function fib(n) {
// // 재귀 -> 77은 시간초과 남
//   return n === 1 || n === 2 ? 1 : fib(n - 1) + fib(n - 2);
// }
// function fib(n) {
//   // dp를 이용
//   if (n === 1 || n === 2) return 1;
//   let first = 1;
//   let second = 1;
//   let ans = 0;
//   for (let i = 3; i <= n; i++) {
//     ans = first + second;
//     first = second;
//     second = ans;
//   }
//   return ans;
// }
// console.log(fib(77));

// 4번
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null,
      },
    },
  },
};
// function printList(list) {
//   // 반복문
//   let ans = [];
//   let tmp = list; // list를 그대로 사용하는 것은 위험하다.
//   while (tmp) {
//     ans.push(tmp.value);
//     tmp = tmp.next;
//   }
//   console.log(ans);
// }
// function printList(list) {
//   // 재귀
//   if (!list) return;
//   console.log(list.value);
//   printList(list.next);
// }
// printList(list);

// 5번
function printReverse(list) {
  if (!list) return;
  printReverse(list.next);
  console.log(list.value);
}
// function printReverse(list) {
//   let tmp = list;
//   let ans = [];
//   while (tmp) {
//     ans.unshift(tmp.value);
//     tmp = tmp.next;
//   }
//   console.log(ans);
// }
printReverse(list);
