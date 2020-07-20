'use strict';
// new
function Person(name){
    this.name = name
    this.introduce = function(){
        return console.log(`this is ${this.name}`);
    }
}
const p1 = new Person('babo');
const p2 = new Person('Thitho');
p1.introduce();
p2.introduce();

// 전역 객체 -> window
function func(){
    console.log("nope");
}
window.func();
var o = {'func':function(){
    console.log('Hello?');
}}
o.func();
window.o.func();
