const getHen = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve("Hen"), 1000);
  });
const getEgg = (hen) =>
  new Promise((resolve, reject) => {
    //   setTimeout(() => resolve(`${hen} => egg`), 1000);
    setTimeout(() => reject(new Error(`error occured!!!`)), 1000);
  });
const getFood = (egg) =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${egg} => food`), 1000);
  });

//   getHen()
//     .then((hen) => getEgg(hen))
//     .then((egg) => getFood(egg))
//     .then((res) => console.log(res));

// error catch
//   getHen().then(getEgg).then(getFood).then(console.log).catch(console.log);

// error catch at the middle
getHen()
  .then(getEgg)
  .catch((error) => {
    return "fucker";
  })
  .then(getFood)
  .then(console.log);
