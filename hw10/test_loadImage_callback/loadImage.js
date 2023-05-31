"use strict";
function loadImage_callback(url, callback) {
    let outImg = new Image();
    outImg.onload = () => callback(null, outImg);
    outImg.onerror = () => callback(new Error(`Error load img ${url}`), null);
    outImg.src = url;
}
loadImage_callback("img.png", function (err, img) {
    if (img) {
        document.body.appendChild(img);
    }
    else if (err) {
        alert("FAIL");
        /*
                let p = document.createElement("p");
                p.innerText = err.message;
                document.body.appendChild(p);
        */
        //        document.body.innerHTML = `<p>${err.message}</p>`;
        document.body.innerText = err.message;
    }
});
