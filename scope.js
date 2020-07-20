const obj = { // namespace를 만든다
    x: 'local',
    y:function(){
        console.log(this.x);
    }
}
obj.y();
obj.x = "nope"; // 다른 사람이 함부로 객체 내부 변수에 접근 가능
obj.y();

// IIFE(즉시 호출 함수 표현식), 모듈 패턴을 이용
const obj2 = (function(){ // 함수로 한 번 감싸기
    const x = 'local2';
    return {
        y:function(){
            console.log(x);
        }
    }
})();
obj2.y();
// 변수 x가 함수 스코프 내부에 존재하므로 함수 외부에서 내부 변수 x를 변경 불가
obj2.x = 'nope'; 
obj2.y();

