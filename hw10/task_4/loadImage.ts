function loadImage_fetch(url: string) {
    return new Promise<any> (function(resolve, reject) {
        let outImg: HTMLImageElement = new Image();
        outImg.onload = () => resolve(outImg);
        outImg.onerror = () => reject(new Error(`Error load img ${url}`));
        outImg.src = url;
    })
}

Promise.allSettled([
    loadImage_fetch("img.png"),
    loadImage_fetch("img.png"),
    loadImage_fetch("img.png"),
    loadImage_fetch("img1.png"),
    loadImage_fetch("img.png"),
    loadImage_fetch("img.png"),
    loadImage_fetch("img2.png"),
    loadImage_fetch("img.png"),
    loadImage_fetch("img.png"),
    loadImage_fetch("img.png")
])
.then(
    function(result) {
        console.log(result.length);
        result.forEach(item => {
            if (item.status == "fulfilled") {
                document.body.appendChild(item.value);                
            } else {
                let div = document.createElement("div");
                div.innerText = item.reason;
                document.body.appendChild(div);
            }    
        });
    }
)

