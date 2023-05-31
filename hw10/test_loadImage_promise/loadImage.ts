/*function loadImage_promise(url: string) {
    return new Promise<any> (function(resolve, reject) {
        let outImg: HTMLImageElement = new Image();
        outImg.onload = () => resolve(outImg);
        outImg.onerror = () => reject(new Error(`Error load img ${url}`));
        outImg.src = url;
    })
}/**/

function loadImage_promise(url: string) {
    return new Promise<any> ((resolve, reject) => {
        let outImg: HTMLImageElement = new Image();
        outImg.onload = () => resolve(outImg);
        outImg.onerror = () => reject(new Error(`Error load img ${url}`));
        outImg.src = url;
    })
}


let promise: Promise<any> = loadImage_promise("img.png");

/* Первый вариант
promise.then(
    function(img: HTMLImageElement) {
        document.body.appendChild(img);
    },
    function(err: Error) {
        alert("FAIL");
        document.body.innerText = err.message;
    }
)
*/

// Полный синтаксис
promise.then(
    function(img: HTMLImageElement) {
        document.body.appendChild(img);
    }
)
.catch(
    function(err: Error) {
        alert("FAIL");
        document.body.innerText = err.message;
    }
)
.finally(
    function() {
        alert("Выполнится в любом случае");
    }
)