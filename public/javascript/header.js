let activeLinks = document.querySelectorAll('.navLi')
let bannerId = document.getElementById('bannerId');
let splitText
let timer;
let char = 0;

if(bannerId.textContent) {
    bannerIdAnimation(bannerId);
}

function bannerIdAnimation(elem) {
    splitText = elem.textContent.split('');
    timer = setInterval(onTick, 100, elem)
    elem.textContent = '';
    for (let char = 0; char < splitText.length; char++) { 
        if(splitText[char] === ' ') {
            elem.innerHTML += "<span class='animation' style='margin:5px'></span>"
        } else {
            elem.innerHTML += "<span class='animation'>" + splitText[char] + "</span>";
        }
    }
}

function onTick(elem){
    const span = elem.querySelectorAll('.animation')[char];
    if (!span.classList) return
    span.classList.add('fade');
    char++
    if(char === splitText.length) {
        return complete();
    }
}

function complete() {
    clearInterval(timer);
    timer = null;
};