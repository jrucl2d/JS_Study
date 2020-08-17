let company = {
  // 동일한 객체(간결성을 위해 약간 압축함)
  sales: [
    { name: "John", salary: 1000 },
    { name: "Alice", salary: 1600 },
  ],
  development: {
    sites: [
      { name: "Peter", salary: 2000 },
      { name: "Alex", salary: 1800 },
    ],
    internals: [{ name: "Jack", salary: 1300 }],
  },
};
function sumSalaries(department) {
  if (Array.isArray(department)) {
    return department.reduce((acc, cur) => acc + cur.salary, 0);
  } else {
    let sum = 0;
    for (let subDep of Object.values(department)) {
      sum += sumSalaries(subDep);
    }
    return sum;
  }
}
console.log(sumSalaries(company));
