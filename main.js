var hexData = [ 'A', 'B', 'C', 'D', 'E', 'F','0','1','2','3','4','5','6','7','8','9'];
var pallet= [];
var savedPalettes = [];
var newPalette = document.querySelector('#palette-Button');
var savePalette = document.querySelector('#save-Palette-Button');
var savedPaletteSection = document.querySelector('.saved-palettes-section');
var unlockIcons = document.querySelectorAll('.icon');
var isLocked = [false, false, false, false, false];
var deleteButton = document.querySelector(".delete-x")

addEventListener('load', function(){
    getRandomPalette()
    updateHtml()
});

newPalette.addEventListener('click', function(event){
    event.preventDefault();
    getRandomPalette();
    updateHtml();
});

unlockIcons.forEach(function (icon, index) {
    icon.addEventListener('click', function (event) {
        event.preventDefault();
        lockIcon(icon);
        toggleLock(index);
    });
});

savePalette.addEventListener('click', function(event){
    event.preventDefault();
    savedPalette();
});

savedPaletteSection.addEventListener('click', function(event){
    event.preventDefault();
    deletePalette(event);
});

function savedPalette() {
     var miniBoxes = '';
     
     
     for (let i = 0; i < pallet.length; i++) {
         var color = pallet[i]
         miniBoxes += `
         <div class="boxes" style="background-color: #${color};">
         </div>
         `
        
    }
    savedPaletteSection.innerHTML += `
    <section class = "miniBoxes">
    ${miniBoxes}  <img class="delete-x" src="./assets/delete.png" alt="delete-icon">
    </section>`

    removeMessage();
    savedPalettes.push([pallet]);
    updateHtml();
    getRandomPalette();
}

function deletePalette(event){
    var index = event.target.parentElement.id;
    if(event.target.className === 'delete-x'){
        event.target.parentElement.remove();
        savedPalettes.splice(index, 1);
    } 
}

function removeMessage(){
    document.querySelector('#mini-palette').classList.add('hidden');
}


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

function getRandomPalette () {
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


