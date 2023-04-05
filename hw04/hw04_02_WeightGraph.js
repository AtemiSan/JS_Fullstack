// Взвешенный граф

class TWeightGraphItem {
    constructor(uid, value) {
        this.uid = uid;
        this.value = value;
    }
}

/*class TWeightGraphWayItem {
    constructor(uid, weight) {
        this.uid = uid;
        this.weight = weight;
    }
}*/

class TWeightGraph {
    #list = [];     // список вершин
    #weights = [];  // матрица весов

    addItem(item) {
        this.#list.push(item);
        this.#weights.push([]); // Добавим столбец
        // Заполним нулями последний столбец и строку
        for (let i = 0; i < this.#weights.length; i++) {
            this.#weights[this.#weights.length-1].push(0); // столбец
            if (i < this.#weights.length-1) { // кроме последнего
                this.#weights[i].push(0); // строка
            }
        }
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

    // Индекс элемента
    indexOf(item) {
        for (let i = 0; i < this.#list.length; i++) {
            if (this.#list[i] === item) {
                return i;
            }
        }
        return -1;
    }

    // Количество элементов
    length() {
        return this.#list.length;
    }

    // Создать связь и назначить вес
    setWeight(item1, item2, weight) {
        let idx1 = this.indexOf(item1);
        let idx2 = this.indexOf(item2);
        if ((idx1 > -1) && (idx2 > -1)) {
            this.#weights[idx1][idx2] = weight;
            this.#weights[idx2][idx1] = weight;
        }
    }

    // Удаление элемента
    delete(item) {
        let idx = this.indexOf(item);
        if (idx > -1) {
            this.#list.splice(idx, 1);
            // Удалим его столбец из матрицы весов
            this.#weights.splice(idx, 1);
            // Удалим его строку из матрицы весов
            for (let i = 0; i < this.#list.length-1; i++) {
                this.#weights[i].splice(idx, 1);
            }
        }
    }

    // Поиск элемента
    find(uid) {
        for (let i=0; i<this.length(); i++) {
            if (this.#list[i].uid === uid) {
                return this.#list[i];
            }
        }
        return null;
    }

/*
    // Поиск следующего либо равного start_min минимума в массиве весов
    #getNextMinWeight(arr, start_key, start_min) {
        let newMin = 0;
        let newKey = -1;
        for(let i = 0; i < arr.length; i++) {
            if (((start_min == 0) && (arr[i] > 0)) // исключаем нулевые при первом поиске
                || ((start_min > 0) && ((arr[i] > start_min) || ((arr[i] == start_min) && (i < start_key))))) // ищем следующий минимум при повторном поиске исключая меньшие чем start_min
            {
                if ((newMin == 0) || (arr[i] <= newMin)) {
                    newMin = arr[i];
                    newKey = i;
                }
            }
        }
        return [newKey, newMin];
    }

    // Не сработал, ушёл на длинный путь, архивируем, может пригодится
    // Поиск кратчайшего расстояния между вершинами (по весам)
    getMinWay(item1, item2, res) {
        if (res.length == 0) { // добавили первый элемент в цепочку
            res.push(new TWeightGraphWayItem(item1.uid, 0));
        }

        if (item1 === item2) {
            return true;  // нашли
        }

        let idx1 = this.indexOf(item1);
        let idx2 = this.indexOf(item2);
        let min = [-1, 0];

        do {
            min = this.#getNextMinWeight(this.#weights[idx1], min[0], min[1]);
            if (min[0] > -1) { // найден минимум
                // Проверим на цикл
                let i = 0;
                let isDouble = false;
                while (!isDouble && (i < res.length)) {
                    if (res[i].uid == this.item(min[0]).uid) {
                        isDouble = true;
                    }
                    i++;
                }
                // Если минимум - новая вершина, то добавляем её в результат и углубляемся по ней
                if (!isDouble) {
                    res.push(new TWeightGraphWayItem(this.item(min[0]).uid, min[1]));
                    if (this.getMinWay(this.item(min[0]), item2, res)) {
                        return true;
                    } else {
                        // пошли не по тому пути, удаляем добавленный элемент, ищем следующий минимум
                        //res.pop; // pop не сработал, не понятно
                        res.splice(res.length-1, 1);
                    }
                }
            }
        } while (min[0] > -1);
        return false; // путь не найден
    }
*/

    // Поиск всех путей из вершины item1 в item2
    getAllWays(item1, item2, res) {
        if (res.length == 0) { // добавили первый элемент в цепочку
            res.push([]);
//            res[0].push(new TWeightGraphWayItem(item1.uid, 0));
            res[0].push({'uid': item1.uid, 'weight': 0});
        }

        if (item1 === item2) {
            return true;  // нашли
        }

        let idx1 = this.indexOf(item1);
        let idx2 = this.indexOf(item2);

        for (let i = 0; i < this.#weights[idx1].length; i++) {
            if (this.#weights[idx1][i] > 0) { // найдено ребро
                // Проверим на цикл
                let j = -1;
                let isDouble = false;
                while (!isDouble && (++j < res[0].length)) {
                    if (res[0][j].uid == this.item(i).uid) {
                        isDouble = true;
                    }
                }
                // Если новая вершина, то добавляем её в результат и углубляемся по ней
                if (!isDouble) {
//                    res[0].push(new TWeightGraphWayItem(this.item(i).uid, this.#weights[idx1][i]));
                    res[0].push({'uid': this.item(i).uid, 'weight': this.#weights[idx1][i]});
                    if (this.getAllWays(this.item(i), item2, res)) {
                        // Если пришёл true - нашли путь, делаем копию res[0] без последнего элемента и продолжаем поиск
                        // res.unshift(res[0]); // такой способ не подходит, копия по ссылке, в результате изменяются оба массива
                        res.unshift([]);
                        res[0] = JSON.parse(JSON.stringify(res[1]));
                        res[0].splice(res[0].length-1, 1);
                    } else {
                        // пошли не по тому пути, удаляем добавленный элемент, ищем следующий минимум
                        //res.pop; // pop не сработал, не понятно
                        res[0].splice(res[0].length-1, 1);
                    }
                }
            }
        }
        // Если на выходе массив из 1 элемента, последний поиск ничего не нашёл
        if (res[0].length == 1) {
            res.splice(0, 1);
        }
        return false; // поиск завершён
    }

    // Поиск кратчайшего расстояния между вершинами (по весам)
    getMinWay(item1, item2) {
        let arrAll = [];
        this.getAllWays(item1, item2, arrAll);
        if (arrAll.length > 0) {
            // Посчитаем суммы весов
            let arrSumWeights = [];
            for (let i = 0; i < arrAll.length; i++) {
                arrSumWeights.push(0);
                for (let j = 0; j < arrAll[i].length; j++) {
                    arrSumWeights[i] += arrAll[i][j].weight;
                }
            }
            // Определим путь с минимальным весом
            let min = 0;
            let key = -1;
            for (let i = 0; i < arrSumWeights.length; i++) {
                if ((min == 0) || (arrSumWeights[i] < min)) {
                    min = arrSumWeights[i];
                    key = i;
                }
            }
            if (key > -1) {
                // res = [...arrAll[key]]; // при таком копировании объекты и вложенные массивы копируются по ссылке
                // res = JSON.parse(JSON.stringify(arrAll[key])); // так создаётся полноценная копия

                // Оба варианта выше не подходят, т.к. при переприсвоении похоже создаётся новая (локальная) переменная res
                // и на выходе мы получаем всё тот же пустой массив, который подавали на вход. 
                // Решить проблему можно объявив res глобально (без let)
                // либо изменением возвращаемого значения, например так: return JSON.parse(JSON.stringify(arrAll[key]));
                // либо копированием вручную, что и сделаем:
                arrAll[key].forEach((value) => res.push(value));
                return true;
            }
        } else {
            return false;
        }
    }
}

//========================================================================================================
let graph = new TWeightGraph();
/*graph.addItem(new TWeightGraphItem(1, 11));
graph.addItem(new TWeightGraphItem(2, 22));
graph.addItem(new TWeightGraphItem(3, 33));
graph.addItem(new TWeightGraphItem(4, 44));
graph.addItem(new TWeightGraphItem(5, 55));*/

graph.addItem({'uid': 1, 'weight': 11});
graph.addItem({'uid': 2, 'weight': 22});
graph.addItem({'uid': 3, 'weight': 33});
graph.addItem({'uid': 4, 'weight': 44});
graph.addItem({'uid': 5, 'weight': 55});

graph.setWeight(graph.find(2), graph.find(4), 24);
graph.setWeight(graph.find(2), graph.find(1), 21);
graph.setWeight(graph.find(1), graph.find(3), 13);
graph.setWeight(graph.find(1), graph.find(5), 15);
graph.setWeight(graph.find(3), graph.find(5), 35);
graph.setWeight(graph.find(3), graph.find(4), 34);

let res = [];
graph.getMinWay(graph.find(2), graph.find(5), res); 
console.log(res);
//graph.delete(graph.find(2));