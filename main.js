var hexData = [ 'A', 'B', 'C', 'D', 'E', 'F','0','1','2','3','4','5','6','7','8','9'];
var pallet= [];
var newPalette = document.querySelector('#paletteButton');
var unlockIcons = document.querySelectorAll('.icon');
var isLocked = [false, false, false, false, false];

newPalette.addEventListener('click', function(event){
    event.preventDefault();
    getRandomPallet();
    updateHtml();
});

unlockIcons.forEach(function (icon, index) {
    icon.addEventListener('click', function (event) {
        event.preventDefault();
        lockIcon(icon);
        toggleLock(index);
    });
});

function getRandomIndex(array){
    var randomIndex = Math.floor(Math.random() * array.length)
    return array[randomIndex]
}

function getHexCode(){
    var randomHex =[];
    for (let i = 0; i < 6; i++) {
        randomHex.push(getRandomIndex(hexData))  
    }
    return randomHex.join('');
}

function getRandomPallet () {
    pallet = [];
    for (let i = 0; i < 5; i++) {
        if (!isLocked[i]){
            pallet.push(getHexCode());
        } else {
            pallet.push(document.getElementById('color-' + (i + 1)).textContent.substr(1));
        }
    }
}

function updateHtml() {
    for (let i = 0; i < 5; i++) {
        var boxId = 'box-' + (i + 1);
        var colorId = 'color-' + (i + 1);

        document.getElementById(boxId).style.backgroundColor = '#' + pallet[i];
        document.getElementById(colorId).textContent = '#' + pallet[i];
    }
}

function lockIcon(icon) {
    var currentIcon = icon.getAttribute('src');
    var newIcon;

    if (currentIcon === 'assets/unlocked.png') {
        newIcon = 'assets/locked.png';
    } else {
        newIcon = 'assets/unlocked.png';
    }

    icon.setAttribute('src', newIcon);
}

function toggleLock(index) {
    isLocked[index] = !isLocked[index];

    
    unlockIcons[index].src = isLocked[index] ? 'assets/locked.png' : 'assets/unlocked.png';
}


