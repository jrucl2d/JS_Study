class UserStorage {
  loginUser(id, password, onSuccess, onError) {
    // id와 pw를 입력 받고, 성공하면 onSuccess / 실패하면 onError 콜백함수 실행
    setTimeout(() => {
      // 1초 동안 진행되는 과정
      if (
        (id === "yu" && password === "123") ||
        (id === "fucker" && password === "122")
      ) {
        onSuccess(id);
      } else {
        onError(new Error("not found"));
      }
    }, 1000);
  }

  getRoles(user, onSuccess, onError) {
    // 역할을 가져오는 비동기 함수
    setTimeout(() => {
      // 총 1초 동한 진행 됨
      if (user === "yu") {
        onSuccess({ name: "yu", role: "admin" }); // 이름이 yu이면 이름과 역할을 객체로 전달
      } else {
        onError(new Error("no access"));
      }
    }, 1000);
  }
}

const userStorage = new UserStorage();
const id = prompt("input your id");
const pw = prompt("input your pw");
userStorage.loginUser(
  id,
  pw,
  (user) => {
    // loginUser 함수에서의 id가 여기로 전달됨
    // 세 번째 매개변수, 성공시 getRoles 함수 실행
    userStorage.getRoles(
      user,
      (userWithRole) => {
        alert(`Hello ${userWithRole.name}, you have a ${userWithRole.role}`);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  (error) => {
    console.log(error);
  }
);
