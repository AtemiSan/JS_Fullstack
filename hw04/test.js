let a = {'aa': 1, 'bb': 2};
let b = {'aa': 1, 'bb': 2};
if (a==b) {console.log('true')} else {console.log('false')}
if (a===b) {console.log('true')} else {console.log('false')}


TClass = class {
    constructor(aa, bb) {
        this.aa = aa;
        this.bb = bb;
    }
}
let a1 = new TClass(1, 2);
let b1 = new TClass(1, 2);
if (a1==b1) {console.log('true')} else {console.log('false')}
if (a1===b1) {console.log('true')} else {console.log('false')}


let a2 = {a: 1};
let b2 = {a: 1};
if (a2==b2) {console.log('true')} else {console.log('false')}


myLabel: for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        if (i == 2) break myLabel;
        console.log(i);
    }
}



function func<Type>(a: Type): Type {}
class A {}
let B = func(A)

// Какого типа будет B, ответ B: new () => A

// кортежи, литеральные типы