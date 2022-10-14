const uuid = window.location.hash.substr(1);

var ap_theme;
const ap_themeElem = document.getElementById('ap_theme');

var ap_loop;
const ap_loopElem = document.getElementById('ap_loop');

var ap_autoplay;
const ap_autoplayElem = document.getElementById('ap_autoplay');

function populateStorage() {
    localStorage.setItem('ap_theme', document.getElementById('ap_theme').value);
    localStorage.setItem('ap_loop', document.getElementById('ap_loop').checked);
    localStorage.setItem('ap_autoplay', document.getElementById('ap_autoplay').checked);

    setStyles();
    location.reload();
}

function setStyles() {
    ap_theme = localStorage.getItem('ap_theme');
    ap_loop = localStorage.getItem('ap_loop');
    ap_autoplay = localStorage.getItem('ap_autoplay');
    ap_themeElem.value = ap_theme;
    ap_loopElem.value = ap_loop;
    ap_autoplayElem.value = ap_autoplay;
}


if (!localStorage.getItem('ap_theme')) {
    populateStorage();
} else {
    setStyles();
}

ap_themeElem.onchange = populateStorage;
ap_loopElem.onchange = populateStorage;
ap_autoplayElem.onchange = populateStorage;
console.log(ap_loop)

if (uuid) AsciinemaPlayer.create(
    ['casts', uuid].join('/'),
    document.getElementById('player'),
    {
        autoPlay: false
        , preload: true
        , loop: ap_loop
        , startAt: 0
        , speed: 1
        , idleTimeLimit: 2
        , theme: ap_theme
        , poster: "data:text/plain,Poster!"
        , fit: "width"
        , terminalFontSize: "small"
        , terminalLineHeight: 1.33333333
    }
);