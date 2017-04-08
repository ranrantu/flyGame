var fuelparam = 0.15;

GAME.info = function (){
    this.energyContainer = document.getElementById('energyContainer');
    this.energy = document.getElementById('energy');
    this.score = document.getElementById('score');
}

GAME.info.prototype.createInfo = function (){
    $('.energyContainer').css({
        'width':43*GAME.ratio+'px',
        'height':250*GAME.ratio+'px',
        'right':15*GAME.ratio+'px',
        'top':30*GAME.ratio+'px',
        'opacity':'0'
    });
    $('.energy').css({
        'width':25*GAME.ratio+'px',
        'height':235*GAME.ratio+'px',//235
        'right':9.2*GAME.ratio+'px',
        'top':7*GAME.ratio+'px'
    });
    $('.score').css({
        'right':-15*GAME.ratio+'px',
        'bottom':50*GAME.ratio+'px',
        'opacity':'0'
    });
}

GAME.info.prototype.updateInfo = function (){
    var eHeight = parseFloat(this.energy.style.height);
    this.energy.style.height = (eHeight-fuelparam)+'px';
    if(eHeight<1){
        hansenDamage = true;
        hansen.damage();
    }
    playerScore += 0.1;
    this.score.innerHTML = Math.floor(playerScore)*10;
}
