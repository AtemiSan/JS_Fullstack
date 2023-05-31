"use strict";
class CSingleton {
    constructor(id) {
        this.id = id;
    }
    // public
    static getInstance(id) {
        if (!CSingleton._instance) {
            CSingleton._instance = new CSingleton(id);
        }
        return CSingleton._instance;
    }
    showId() {
        console.log(this.id);
    }
}
let obj = CSingleton.getInstance(5);
let obj2 = CSingleton.getInstance(8); // Мы не попадём в конструктор, id останется = 5
obj.showId();
