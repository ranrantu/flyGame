GAME.background = function (){
	this.backgroundTexture = PIXI.Texture.fromImage('images/background.jpg');
	this.backgroundSprite;
}

GAME.background.prototype.createBackground = function (){
	this.backgroundSprite = new PIXI.extras.TilingSprite(this.backgroundTexture, window.innerWidth, window.innerHeight);
	stage.addChild(this.backgroundSprite);
};

GAME.background.prototype.moving = function (){
	this.backgroundSprite.tilePosition.y -= 0.5*PIXI.ticker.shared.deltaTime;
}