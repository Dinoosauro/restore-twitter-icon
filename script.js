let oldTwitterSvg = `<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 248 204">
<path fill="#1d9bf0" d="M221.95 51.29c.15 2.17.15 4.34.15 6.53 0 66.73-50.8 143.69-143.69 143.69v-.04c-27.44.04-54.31-7.82-77.41-22.64 3.99.48 8 .72 12.02.73 22.74.02 44.83-7.61 62.72-21.66-21.61-.41-40.56-14.5-47.18-35.07 7.57 1.46 15.37 1.16 22.8-.87-23.56-4.76-40.51-25.46-40.51-49.5v-.64c7.02 3.91 14.88 6.08 22.92 6.32C11.58 63.31 4.74 33.79 18.14 10.71c25.64 31.55 63.47 50.73 104.08 52.76-4.07-17.54 1.49-35.92 14.61-48.25 20.34-19.12 52.33-18.14 71.45 2.19 11.31-2.23 22.15-6.38 32.07-12.26-3.77 11.69-11.66 21.62-22.2 27.93 10.01-1.18 19.79-3.86 29-7.95-6.78 10.16-15.32 19.01-25.2 26.16z"/>
</svg>`;
function replaceIcon() {
    let replaceItem = document.querySelector("[href='/home']").childNodes[0];
    document.querySelector("[href='/home']").style = "display: flex; align-items: center; justify-content: center; margin-top: 15px;"
    replaceItem.style = "width: 30px; height: 50px;";
    replaceItem.innerHTML = oldTwitterSvg;
}
let maxinumTries = 0;
function checkIfFullyLoaded() {
    // Change the Twitter logo on the toolbar
    if (maxinumTries > 50) return;
    if (document.querySelector("[href='/home']") === null) setTimeout(() => { checkIfFullyLoaded(); maxinumTries++}, 150); else {replaceIcon(); checkArticle(); addObserver();}
}
checkIfFullyLoaded();
for (let item of document.querySelectorAll("svg")) if (item.innerHTML.indexOf("M14.258 10.152L23") !== -1) item.innerHTML = oldTwitterSvg; // Change the placeholder
function changeFavicon() {
    let img = document.createElement("img");
    img.onload = () => {
        let canvas = document.createElement("canvas");
        canvas.width = "128";
        canvas.height = "128";
        canvas.getContext("2d").drawImage(img, 0,11, 128, 105); // The svg is not a square, so a proprortion needs to be made (128 : 105). Then, to center the icon: (128-105)/2
        for (let item of document.querySelectorAll('link[rel*="icon"]')) item.href = canvas.toDataURL("image/png");
    }
    img.src = URL.createObjectURL(new Blob([oldTwitterSvg], {type: "image/svg+xml"}));
}
changeFavicon();
function checkArticle() {
    if (document.querySelectorAll("article").length === 0) setTimeout(() => {checkArticle()}, 150); else changeFavicon();
}
function addObserver() {
    if (document.title.endsWith("/ X")) document.title = `${document.title.substring(0, document.title.lastIndexOf("/ X"))}/ Twitter`;
    let observer = new MutationObserver(() => {
            if (document.title.endsWith("/ X")) document.title = `${document.title.substring(0, document.title.lastIndexOf("/ X"))}/ Twitter`;
    });
    observer.observe(document.querySelector('head > title'), { subtree: true, characterData: true, childList: true });
}
