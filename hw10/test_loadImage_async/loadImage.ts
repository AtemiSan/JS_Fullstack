function loadImage_async(url: string) {
    return new Promise<any> (function(resolve, reject) {
        let outImg: HTMLImageElement = new Image();
        outImg.onload = () => resolve(outImg);
        outImg.onerror = () => reject(new Error(`Error load img ${url}`));
        outImg.src = url;
    })
}

// Замена Promise.all
async function async_func() {
    try {
        let i1: HTMLImageElement = await loadImage_async("img.png");
        let i2: HTMLImageElement = await loadImage_async("img.png");
        let i3: HTMLImageElement = await loadImage_async("img.png");
        return {status: 200, value: [i1, i2, i3]};
    } catch (err: any) {
        return {status: 0, value: err};    
    }
}

async_func().then(
    function(result) {
        if (result.status == 200) {
            result.value.forEach(item => {
                document.body.appendChild(<HTMLImageElement>item);
            });
        } else {
            alert("FAIL");
            document.body.innerText = (<Error>result.value).message;
        }
    }
);
