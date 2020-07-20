class UserStorage {
  loginUser(id, password) {
    // id와 pw를 입력 받고, 성공하면 onSuccess / 실패하면 onError 콜백함수 실행
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // 1초 동안 진행되는 과정
        if (
          (id === "yu" && password === "123") ||
          (id === "fucker" && password === "122")
        ) {
          resolve(id);
        } else {
          reject(new Error("not found"));
        }
      }, 1000);
    });
  }

  getRoles(user) {
    // 역할을 가져오는 비동기 함수
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // 총 1초 동한 진행 됨
        if (user === "yu") {
          resolve({ name: "yu", role: "admin" }); // 이름이 yu이면 이름과 역할을 객체로 전달
        } else {
          reject(new Error("no access"));
        }
      }, 1000);
    });
  }
}

const userStorage = new UserStorage();
const id = prompt("input your id");
const pw = prompt("input your pw");
async function func() {
  try {
    const myLogin = await userStorage.loginUser(id, pw);
    const user = await userStorage.getRoles(id);
    return `Hello ${user.name}, you have a ${user.role}`;
  } catch (error) {
    return error;
  }
}
mine = func();
mine.then(console.log).catch(console.log);
