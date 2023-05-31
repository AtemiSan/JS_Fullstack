"use strict";
function loadImage_task4(url) {
    return new Promise(function (resolve, reject) {
        let outImg = new Image();
        outImg.onload = () => resolve(outImg);
        outImg.onerror = () => reject(new Error(`Error load img ${url}`));
        outImg.src = url;
    });
}
Promise.allSettled([
    loadImage_task4("img.png"),
    loadImage_task4("img.png"),
    loadImage_task4("img.png"),
    loadImage_task4("img1.png"),
    loadImage_task4("img.png"),
    loadImage_task4("img.png"),
    loadImage_task4("img2.png"),
    loadImage_task4("img.png"),
    loadImage_task4("img.png"),
    loadImage_task4("img.png")
])
    .then(function (result) {
    console.log(result.length);
    result.forEach(item => {
        if (item.status == "fulfilled") {
            document.body.appendChild(item.value);
        }
        else {
            let div = document.createElement("div");
            div.innerText = item.reason;
            document.body.appendChild(div);
        }
    });
});
