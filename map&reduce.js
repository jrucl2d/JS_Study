// map
const arr = [1,2,3];
let result = arr.map(v =>{
    console.log(v);
    return v;
});
console.log(arr);
console.log(result);
console.log(arr === result); // 다른 객체가 생성되는 것이다. 그러나 배열 안의 객체는 공유된다.

result = arr.map(v =>{ // 함수의 내용되로 반환되므로 자유도가 높다.
    if(v %2){
        return 'odd';
    }
    else{
        return 'even';
    }
});
console.log(result);

// reduce -> 배열.reduce((누적값, 현값, 인덱스, 요소) => { return 결과 }, 초기값)
result = arr.reduce((acc, cur, i) =>{
    console.log(acc, cur, i);
    return acc + cur;
}, 0); // 초기값이 들어갔으므로 0 1 0 / 1 2 1 /  3 3 2로 진행된다.
console.log(result); // 초기값이 없으면 첫 요소부터 1 2 1 / 3 2 2가 된다.
// reduceRight은 요소 순회를 거꾸로 함. 0 3 2 / 3 2 1 / 5 1 0

// map을 reduce로 구현
result = arr.reduce((acc, cur)=>{
    acc.push(cur%2 ? 'odd':'even');
    return acc;
},[]);
console.log(result);
// filter를 reduce로 구현
result = arr.reduce((acc, cur) =>{
    if(cur%2) acc.push(cur); // 홀수만 filter
    return acc;
}, []);
console.log(result);

// 비동기 프로그래밍에 사용 -> 모든 반복되는 프로그래밍에 사용 가능
const promiseMine = (time) =>{
    return new Promise((resolve, reject) =>{
        console.log(time);
        setTimeout(resolve, time);
    });
}
[1000,2000,3000,4000].reduce((acc, cur) =>{
    return acc.then(() => promiseMine(cur));
}, Promise.resolve()); // 처음 resolve된 것에 대해서 then을 이어붙임