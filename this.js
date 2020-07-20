// this는 속해있는 '객체'를 가리킨다.
function func(){
    if(this === window){
        console.log("yes");
    }
}
func(); // 함수 func가 어떤 객체에도 속해있지 않으므로 this는 전역객체 window를 가리킨다.
var o = {
    func: function(){ // func(){ 로 줄여써도 됨
        if(this === o){
            console.log("yes2");
        }
    }
}
o.func(); // 함수 func가 객체 o에 속해있으므로 this는 객체 o를 가리킨다.
var o2 = {
    func: () => {
        if(this === o2){
            console.log("yes3");
        }
    }
}
// 함수를 축약형으로 선언하면 객체 내부의 func라도
// this는 해당 객체 위의 객체(여기선 전역 객체)를 가리킨다.
o2.func();

let fthis = null;
function a(){
    fthis = this;
}
const a1 = a(); // 생성자가 아닌 일반 함수로 사용, this는 전역 객체 window
if(fthis === window){
    console.log("this is right");
}
const a2 = new a(); // new를 사용하면 생성자가 자동으로 빈 객체를 생성하므로 this는 객체 a2를 가리킴
if(fthis === a2){
    console.log("this is right too");
}

