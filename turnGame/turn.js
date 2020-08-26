const TurnGame = (function () {
  let instance;
  const init = function (heroName) {
    const hero = {
      name: heroName,
      level: 1,
      maxHP: 100,
      hp: 100,
      EXP: 0,
      attack: 10,
    };
    const monsters = [
      {
        name: "파란원숭이",
        hp: 25 + hero.level * 3,
        attack: 10 + hero.level,
        EXP: 10 + hero.level,
      },
      {
        name: "노란원숭이",
        hp: 50 + hero.level * 5,
        attack: 15 + hero.level * 2,
        EXP: 20 + hero.level * 3,
      },
      {
        name: "킹콩[보스]",
        hp: 100 + hero.level * 10,
        attack: 15 + hero.level * 5,
        EXP: 20 + hero.level * 5,
      },
    ];
    let monster = null;
    let turn = true;
    return {
      showLevel() {
        document.getElementById("hero-level").innerHTML = `${hero.level} level`;
        return this;
      },
      showEXP() {
        if (hero.EXP > 15 * hero.level) {
          hero.EXP -= 15 * hero.level;
          hero.maxHP += 10;
          hero.hp = hero.maxHP;
          hero.attack += hero.level;
          hero.level++;
          window.setTimeout(() => {
            this.setMessage("레벨업!");
          }, 1000);
        }
        document.getElementById("hero-exp").innerHTML = `EXP: ${hero.EXP} / ${
          5 * hero.level
        }`;
        document.getElementById(
          "hero-attack"
        ).innerHTML = `Attack: ${hero.attack}`;
        return this.showLevel().showHP(); // return this가 있기 때문에 이렇게 메소드 체이닝을 할 수 있다.
      },
      showHP() {
        if (hero.hp < 0) {
          return this.gameOver();
        }
        document.getElementById(
          "hero-hp"
        ).innerHTML = `HP: ${hero.hp} / ${hero.maxHP}`;
        return this;
      },
      toggleMenu() {
        document.getElementById("hero-name").innerHTML = hero.name;
        document.getElementById("start-screen").style.display = "none";
        if (document.getElementById("game-menu").style.display === "block") {
          document.getElementById("game-menu").style.display = "none";
          document.getElementById("battle-menu").style.display = "block";
          document.getElementById("battle-input").focus();
        } else {
          document.getElementById("game-menu").style.display = "block";
          document.getElementById("battle-menu").style.display = "none";
          document.getElementById("menu-input").focus();
        }
        return this;
      },
      setMessage(msg) {
        document.getElementById("message").innerHTML = msg;
        return this;
      },
      generateMonster() {
        // 깊은 복사를 해줌
        monster = JSON.parse(
          JSON.stringify(monsters[Math.floor(Math.random() * monsters.length)])
        );
        document.getElementById("monster-name").innerHTML = monster.name;
        document.getElementById("monster-hp").innerHTML = "HP: " + monster.hp;
        document.getElementById("monster-attack").innerHTML =
          "Attack: " + monster.attack;
        this.setMessage(monster.name + "이(가) 공격해옵니다");
        return this.toggleMenu();
      },
      menuInput(input) {
        switch (input) {
          case "1":
            return this.generateMonster();
          case "2":
            hero.hp = hero.maxHP;
            return this.showHP().setMessage("체력을 회복했습니다");
          case "3":
            return this.exit();
          default:
            alert("잘못된 입력");
        }
      },
      battleInput(input) {
        switch (input) {
          case "1":
            return this.attackMonster();
          case "2":
            hero.hp =
              hero.hp + hero.level * 20 < hero.maxHP
                ? hero.hp + hero.level * 20
                : hero.maxHP;
            return this.showHP().setMessage("체력을 회복했습니다").nextTurn();
          case "3":
            return this.clearMonster().setMessage("도망쳤습니다");
          default:
            alert("잘못된 입력");
        }
      },
      attackMonster() {
        monster.hp -= hero.attack;
        document.getElementById("monster-hp").innerHTML = `HP: ${monster.hp}`;
        if (monster.hp > 0) {
          return this.setMessage(
            hero.attack + "의 데미지를 입혔습니다"
          ).nextTurn();
        }
        return this.win();
      },
      attackHero() {
        hero.hp -= monster.attack;
        return this.showHP();
      },
      nextTurn() {
        turn = !turn;
        document.getElementById("battle-button").disabled = true;
        if (!turn) {
          (async () => {
            await setTimeout(
              () => this.setMessage(monster.name + "의 턴입니다"),
              1000
            );
            await setTimeout(() => {
              document.getElementById("battle-button").disabled = false;
              if (this.attackHero())
                this.setMessage(monster.attack + "의 데미지를 입었습니다");
            }, 1000);
            await setTimeout(
              () => this.setMessage(hero.name + "의 턴입니다"),
              1000
            );
            return this.nextTurn();
          })();
        }
        return this;
      },
      win() {
        this.setMessage(
          monster.name +
            " 사냥에 성공해서 경험치 " +
            monster.EXP +
            "을 얻었습니다"
        );
        hero.EXP += monster.EXP;
        return this.clearMonster().showEXP();
      },
      clearMonster() {
        monster = null;
        document.getElementById("monster-name").innerHTML = "";
        document.getElementById("monster-hp").innerHTML = "";
        document.getElementById("monster-attack").innerHTML = "";
        return this.toggleMenu();
      },
      gameOver() {
        document.getElementById("screen").innerHTML =
          hero.name +
          "은 레벨" +
          hero.level +
          "에서 죽었습니다. 새로 시작하려면 새로고침하세요";
        return false;
      },
      exit(input) {
        document.getElementById("screen").innerHTML =
          "게임을 종료합니다. 다시 시작하려면 새로고침하세요";
      },
    };
  };
  return {
    getInstance(name) {
      // 싱글턴 패턴 : 인스턴스 생성은 단 한 번만 한다.
      if (!instance) {
        instance = init(name);
      }
      return instance;
    },
  };
})();

document.getElementById("start-screen").onsubmit = function (e) {
  var name = document.getElementById("name-input").value;
  e.preventDefault();
  if (name && name.trim() && confirm(name + "으로 하시겠습니까?")) {
    TurnGame.getInstance(name).showEXP().toggleMenu(); // 체이닝
  } else {
    alert("이름을 입력해주세요");
  }
};
document.getElementById("game-menu").onsubmit = function (e) {
  var input = document.getElementById("menu-input");
  var option = input.value;
  e.preventDefault();
  input.value = "";
  TurnGame.getInstance().menuInput(option);
};
document.getElementById("battle-menu").onsubmit = function (e) {
  var input = document.getElementById("battle-input");
  var option = input.value;
  e.preventDefault();
  input.value = "";
  TurnGame.getInstance().battleInput(option);
};
