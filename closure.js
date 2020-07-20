// var의 문제점. var의 스코프는 함수 스코프이기 때문에 setTimeout 안의 시간 매개변수 i*1000은
// 정상적으로 0, 1000, 2000... 이렇게 상승한다. 하지만 내부의 콜백 함수의 i는 비동기적 실행에 의해
// 이미 10이 되어있는 i를 가져오기 때문에 10이 계속해서 찍히게 된다.
for(var i = 0 ; i < 10; i++){
    setTimeout(function(){
        console.log(i);
    }, i * 1000);
}
// 해결법 1. 클로져를 이용한 해결
// 익명 함수를 IIFE으로 선언해서 i를 매개변수로 넘겨주면 새로운 함수 내부에서 새로운 스코프가 생기므로
// setTimeout 내부의 콜백함수는 전달받은 매개변수 j를 사용하게 된다. 
for(var i = 0 ; i < 10; i++){
    (function (j){
        setTimeout(function(){
            console.log(j);
        }, j*1000);
    })(i);
}
// 해결법 2. let을 사용해서 해결
// let은 괄호를 모두 스코프로 인식하기 때문에(블록 레벨 스코프) 따로 내부에 익명 함수를 사용하지 않아도
// i를 순서대로 사용할 수 있다. 
for(let i = 0 ; i < 10; i++){
    setTimeout(function(){
        console.log(i);
    }, i * 1000);
}