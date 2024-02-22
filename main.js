var hexData = [ 'A', 'B', 'C', 'D', 'E', 'F','0','1','2','3','4','5','6','7','8','9'];
var pallet= [];
var newPalette = document.querySelector('#paletteButton');
var parentGrid = document.getElementById('parent-grid');
var labelGrid = document.querySelector('.label-grid');
var lockedStatus = [false, false, false, false, false]

newPalette.addEventListener('click', function(event){
    event.preventDefault();
    getRandomPallet();
    updateHtml();
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
        pallet.push(getHexCode())
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
