// Двусвязный список

class TDualListItem {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class TDualList {
    #list = [];

    constructor() {
    }

    // Добавление в конец списка
    push(item) {
        this.#list.push(item);
        if (this.#list.length > 1) {
            this.#list[this.#list.length-1].prev = this.#list[this.#list.length-2];            
            this.#list[this.#list.length-2].next = this.#list[this.#list.length-1];
        }
    }

    // Извлечение с конца списка
    pop() {
        if (this.#list.length > 1) {
            this.#list[this.#list.length-1].prev = null;
            this.#list[this.#list.length-2].next = null;
        }
        return this.#list.pop();
    }

    // Добавление в начало списка
    unshift(item) {
        this.#list.unshift(item);
        if (this.#list.length > 1) {
            this.#list[0].next = this.#list[1];            
            this.#list[1].prev = this.#list[0];
        }
    }

    // Извлечение с начала списка
    shift() {
        if (this.#list.length > 1) {
            this.#list[0].next = null;
            this.#list[1].prev = null;
        }
        return this.#list.shift();
    }

    // Длина списка
    length() {
        return this.#list.length;
    }

    // Первый элемент
    first() {
        return this.#list[0];
    }

    // Последний элемент
    last() {
        return this.#list[this.#list.length-1];
    }

    // Элемент с индексом
    item(idx) {
        if (idx >= 0) {
            if (idx > this.#list.length-1) {
                return null;
            } else {
                return this.#list[idx];
            }
        } else {
            if (-idx > this.#list.length) {
                return null;
            } else {
                return this.#list[this.#list.length + idx];
            }
        }
    }

    // Удаление элемента
    delete(idx) {
        if (this.item(idx) !== null) {
            if (this.item(idx).next !== null) {
                this.item(idx).next.prev = this.item(idx).prev;
            }
            if (this.item(idx).prev !== null) {
                this.item(idx).prev.next = this.item(idx).next;
            }
            this.#list.splice(idx, 1);
        }
    }

    // Поиск элемента
    find(value) {
        for (let i=0; i<this.length(); i++) {
            if (this.#list[i].value === value) {
                return this.#list[i];
            }
        }
        return null;
    }
}

let lst = new TDualList();
lst.push(new TDualListItem(5));
lst.unshift(new TDualListItem(4));
//for (let i=0; i<lst.length(); i++) {
//    lst.delete(1);
if (lst.find(3) === null) {
    console.log('null');
} else {
    console.log(lst.find(3).value);
}
/*    console.log(lst.item(0).next.value);
    console.log(lst.item(-1).value);
    console.log(lst.item(-2).value);*/
//    console.log(lst.item(-3).value);

