function Ultra(){};
Ultra.prototype.prop = true;

function Super(){};
Super.prototype = new Ultra();

function Sub(){};
Sub.prototype = new Super();

const o = new Sub();
console.log(o.prop);
// 객체의 원형이 어딘가에 저장되어 있는데 그곳이 바로 prototype이라고 하는 property이다.
// 만약 new를 이용해서 생성자를 호출하게 되면 그 생성자 함수의 prototype property에 저장되어 있는
// 객체를 꺼내서 리턴해준다.

// prototype chain
function func(){}
console.log(func.prototype); 
func.prototype.name = 'yu'; // func라는 함수의 원형에 name이라는 property를 추가했다.
const o1 = new func(); // new를 통해 생성자를 호출하면 func()함수의 prototype에 저장되어 있는 객체(name 속성을 가지고 있음)가 리턴됨
console.log(o1);

// 상속 시의 주의점
// Sub.prototype = new Super(); 이 아닌
// Sub.prototype = Super.prototype; 을 하게되면 Sub에 추가한 속성이 Super의 속성에 영향을 끼치게 된다.