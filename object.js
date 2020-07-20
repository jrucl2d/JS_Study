// Object.메소드 는 Object 객체에 소속된 메소드로, Object.메소드의 형태로 사용하지만
// prototype이 들어가면 객체 생성시에 new를 통해서 prototype에 해당되는 객체를 리턴받기
// 때문에 Object.prototype에 속해있는 메소드를 똑같이 사용할 수 있게 된다.
// 따라서 prototype이 들어간 메소드는 객체를 생성하고, 그 객체.메소드 의 방식으로 사용한다.

// Object.keys()
const arr = ['a','b','c'];
console.log(Object.keys(arr)); // [0,1,2]가 출력됨

// Object.prototype.toString()
var a = new Array(1,2,3);
console.log(a.toString()); // "1,2,3"이 출력됨

// 오브젝트의 확장
// 모든 객체가 사용할 수 있는 메소드를 추가하고 싶으면 Object.prototype.메소드 로 추가하면 됨
Object.prototype.contain = function(needle){
    for(let name in this){
        if(this[name] === needle){
            return true;
        }
    }
    return false;
}
const o = {'name':'babo', 'city':'seoul',};
console.log(o.contain('babo')); // true
console.log(o.contain('suul')); // false
const w = ['a', 'b', 'c'];
console.log(w.contain('c')); // true
console.log(w.contain('d')); // false

// 오브젝트 확장의 문제 : 광역 객체에 property를 추가하는 것은 위험하다.
for(let name in o){
    console.log(name); // 끝에 prototype에서 추가한 contain이 같이 들어가 있다.
}
// 대안
for(let name in o){
    if(o.hasOwnProperty(name)){ // 자기 자신이 가진 property만 선택하므로 contain이 추가 안 된다.
        console.log(name);
    }
}