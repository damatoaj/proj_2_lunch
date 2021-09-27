let activeLinks = document.querySelectorAll('.navLi')
let bannerId = document.getElementById('bannerId');
let splitText = bannerId.textContent.split('');
let timer;
let char = 0;

if(bannerId.textContent) {
    console.log('someone signed in')
    bannerIdAnimation(bannerId);
    console.log('ran equation')
}
function bannerIdAnimation(elem) {
    timer = setInterval(onTick, 100)
    bannerId.textContent = '';
    for (let char = 0; char < splitText.length; char++) { 
        if(splitText[char] === ' ') {
            bannerId.innerHTML += "<span class='animation' style='margin:5px'></span>"
        } else {
            bannerId.innerHTML += "<span class='animation'>" + splitText[char] + "</span>";
        }
    }
}

function onTick(){
    const span = bannerId.querySelectorAll('.animation')[char];
    span.classList.add('fade');
    char++
    console.log(char)
    if(char == splitText.length) {
        complete();
        return;
    }
}

function complete() {
    console.log('run complete')
    clearInterval(timer);
    timer = null;
};