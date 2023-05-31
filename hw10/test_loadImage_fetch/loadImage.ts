async function loadImage_fetch(url: string) {
    let result = await fetch(url);
    let blobURL = URL.createObjectURL(await result.blob());
    let img = document.createElement('img');
    img.src = blobURL;
    return img;
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

