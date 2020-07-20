// arguments
function sum(){
    let sum = 0;
    for(let i = 0 ; i < arguments.length; i++){
        sum += arguments[i];
    }
    return sum;
}
// 원래 함수는 매개변수가 없지만 arguments라는 내제된 기능을 이용해서 인자를 전달, 사용할 수 있다.
console.log(sum(1,2,3,4)); 

// apply
console.log(sum.apply(null, [1,2,3,4])); // 일반 함수 호출과 같은 역할

o1 = {val1:1, val2:2, val3:3,};
o2 = {v1:10, v2:50, v3:100, v4:25,};
function sum2(){
    let sum = 0;
    for(prop in this){ // 현재 this는 정해져있지 않다.
        sum += this[prop];
    }
    return sum;
}
console.log(sum2.apply(o1)); // o1을 인자로 주게 되면 o1이 sum2함수의 this가 된다.
console.log(sum2.apply(o2)); // 즉, sum2함수 맨 위에 let this = o1의 코드가 들어간 것과 같다.

// 위와 동일하게 작동하는 코드. 하지만 객체 안에 함수를 따로 추가하는 것보다 위처럼 하는 것이 더 낫다.
o3 = {val1:10, val2:20, val3:30, sum3:sum3,};
o4 = {v1:100, v2:500, v3:1000, v4:250, sum3:sum3, };
function sum3(){
    let sum = 0;
    for(prop in this){
        if(typeof this[prop] !== 'function') // 이 부분이 없으면 마지막 sum3까지 출력된다.
            sum += this[prop];
    }
    return sum;
}
console.log(o3.sum3());
console.log(o4.sum3());