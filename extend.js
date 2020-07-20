// 생성자가 존재하는 함수(클래스 용도)는 대문자로 작성
function Vehicle(name, speed){
    this.name = name;
    this.speed = speed;
};
// 모든 상속받는 함수들에 대해서 공통 적용되는 부분
Vehicle.prototype.drive = function() {
    console.log(`${this.name} runs at ${this.speed}`);
}
const tico = new Vehicle('tico', 50);
tico.drive();

// 여기서부터 상속
// 상속의 기본
function Bong(name, speed){
    this.name = name;
    this.speed = speed;
}
Bong.prototype = new Vehicle(); // 프로토타입에 new로 넣어주면 상속됨
Bong.drive();

function Sedan(name, speed, maxSpeed){
    Vehicle.apply(this, arguments); // this 요소들을 복사
    this.maxSpeed = maxSpeed;
}
// Object.create은 안의 것을 상속하는 새로운 객체를 만드는 메소드
// new와는 달리 객체는 만들되 생성자는 실행하지 않는다. 프로토타입만 넣는다.
Sedan.prototype = Object.create(Vehicle.prototype); // Vehicle의 프로토타입을 연결해야 drive 메소드 사용 가능

// 생성자.prototype.constructor === 생성자
// 이거 없으면 Sedan. .. === Vehicle이 됨.
Sedan.prototype.constructor = Sedan;
Sedan.prototype.boost = function() {
    console.log(`${this.name} boosts its speed at ${this.maxSpeed}`);
};
const sonata = new Sedan('sonata', 100, 200);
sonata.drive();
sonata.boost();

function Truck(name, speed, capacity){
    Vehicle.apply(this,arguments);
    this.capacity = capacity;
}
Truck.prototype = Object.create(Vehicle.prototype);
Truck.prototype.constructor = Truck;
Truck.prototype.load = function (weight){
    if(weight > this.capacity){
        return console.error("무겁다");
    }
    else{
        return console.log("짐을 실었다");
    }
}
const bongo = new Truck('bongo', 40, 100);
bongo.drive();
bongo.load(120); // 무겁다(오류로 출력)
bongo.load(50); // 짐을 실었다