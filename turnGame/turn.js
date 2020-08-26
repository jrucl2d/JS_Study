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
};
document.getElementById("battle-menu").onsubmit = function (e) {
  var input = document.getElementById("battle-input");
  var option = input.value;
  e.preventDefault();
  input.value = "";
};
