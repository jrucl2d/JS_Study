const table = document.querySelector("tbody");
let data;

function init() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      table.children[i].children[j].textContent = "";
    }
  }
  data = Array(4)
    .fill()
    .map(() => {
      return Array(4)
        .fill()
        .map((v) => (v = 0));
    });
  let x = [0, 1, 2, 3].splice(Math.random() * 4, 1)[0];
  let y = [0, 1, 2, 3].splice(Math.random() * 4, 1)[0];
  data[x][y] = 2;

  table.children[x].children[y].textContent = 2;
}
init();

// 리렌더링
function render() {
  data.forEach((v, i) => {
    v.forEach((v2, j) => {
      table.children[i].children[j].textContent = "";
      if (data[i][j] !== 0) table.children[i].children[j].textContent = v2;
    });
  });
  let candidate = [];
  let win = false;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (data[i][j] == 2048) {
        win = true;
        break;
      }
      if (data[i][j] === 0) candidate.push([i, j]);
    }
    if (win) break;
  }
  if (win) {
    alert("승리!");
    init();
    return;
  }
  if (candidate.length === 0) {
    alert("패배...");
    init();
    return;
  }
  const getOne = candidate[Math.floor(Math.random() * candidate.length)];
  table.children[getOne[0]].children[getOne[1]].textContent = 2;
  data[getOne[0]][getOne[1]] = 2;
}

// 마우스 무빙
let moving = false;
let start = [];
let end = [];
table.addEventListener("mousedown", (e) => {
  moving = true;
  start = [e.clientX, e.clientY];
});
table.addEventListener("mouseup", (e) => {
  if (moving) {
    moving = false;
    end = [e.clientX, e.clientY];
    let movedX = end[0] - start[0];
    let movedY = end[1] - start[1];
    let direction;
    if (movedY < 0 && Math.abs(movedX) < Math.abs(movedY)) {
      direction = "u";
    } else if (movedY > 0 && Math.abs(movedX) < Math.abs(movedY)) {
      direction = "d";
    } else if (movedX < 0 && Math.abs(movedX) > Math.abs(movedY)) {
      direction = "l";
    } else if (movedX > 0 && Math.abs(movedX) > Math.abs(movedY)) {
      direction = "r";
    }
    move(direction);
  }
});

// 숫자 이동
function move(direction) {
  let newData = [[], [], [], []];
  switch (direction) {
    case "u":
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          if (data[j][i] === 0) continue;
          newData[i].push(data[j][i]);
        }
      }
      // 겹침 파악
      for (let i = 0; i < 4; i++) {
        if (newData[i].length >= 2 && newData[i][newData[i].length - 1] == newData[i][newData[i].length - 2]) {
          newData[i][newData[i].length - 2] *= 2;
          newData[i].length -= 1;
        }
      }
      for (let i = 0; i < 4; i++) {
        while (newData[i].length != 4) {
          newData[i].push(0);
        }
      }
      break;
    case "d":
      for (let i = 0; i < 4; i++) {
        for (let j = 3; j >= 0; j--) {
          if (data[j][i] === 0) continue;
          newData[i].unshift(data[j][i]);
        }
      }
      // 겹침 파악
      for (let i = 0; i < 4; i++) {
        if (newData[i].length >= 2 && newData[i][0] == newData[i][1]) {
          newData[i].shift();
          newData[i][0] *= 2;
        }
      }
      for (let i = 0; i < 4; i++) {
        while (newData[i].length != 4) {
          newData[i].unshift(0);
        }
      }
      console.log(newData);

      break;
    case "l":
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          if (data[i][j] === 0) continue;
          newData[i].push(data[i][j]);
        }
      }
      // 겹침 파악
      for (let i = 0; i < 4; i++) {
        if (newData[i].length >= 2 && newData[i][newData[i].length - 1] == newData[i][newData[i].length - 2]) {
          newData[i][newData[i].length - 2] *= 2;
          newData[i].length -= 1;
        }
      }
      for (let i = 0; i < 4; i++) {
        while (newData[i].length != 4) {
          newData[i].push(0);
        }
      }
      break;
    case "r":
      for (let i = 0; i < 4; i++) {
        for (let j = 3; j >= 0; j--) {
          if (data[i][j] === 0) continue;
          newData[i].unshift(data[i][j]);
        }
      }
      // 겹침 파악
      for (let i = 0; i < 4; i++) {
        if (newData[i].length >= 2 && newData[i][0] == newData[i][1]) {
          newData[i].shift();
          newData[i][0] *= 2;
        }
      }
      for (let i = 0; i < 4; i++) {
        while (newData[i].length != 4) {
          newData[i].unshift(0);
        }
      }
      break;
  }

  if (direction === "l" || direction === "r") {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (!newData[i][j]) data[i][j] = 0;
        else data[i][j] = newData[i][j];
      }
    }
  } else {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (!newData[i][j]) data[j][i] = 0;
        else data[j][i] = newData[i][j];
      }
    }
  }

  //   console.log(newData, data);
  render();
}
