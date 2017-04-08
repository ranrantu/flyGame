var star,oil,tornado;

GAME.reward = function (){
	this._starSpeed = 0.01;
	this._starChange = 0.001;
	this._starSize = 0.8;
	this._starExpand = true;
	this._starUp = true;
	this._starX = GAME.width/2;

	this._oilUp = true;
	this._oilRotatePrev = true;
	this._oilX = GAME.width/2;
	this._oilRotation = Math.PI/2;

}

GAME.reward.prototype.createReward = function (){
	// loader = PIXI.loader;
	// loader.add('images/reward/reward.json');
	// loader.add('images/cloud1.png');
	// loader.once('complete',this.console);
	// loader.load(this.onRewardLoaded);
}

GAME.reward.prototype.onRewardLoaded = function (){
	this.tornadoFrames = [
		PIXI.Texture.fromFrame('tornado0.png'),
		PIXI.Texture.fromFrame('tornado1.png'),
		PIXI.Texture.fromFrame('tornado2.png')
	];
	this.starTexture = PIXI.Texture.fromFrame('star.png');
	this.oilTexture = PIXI.Texture.fromFrame('oil.png');

	tornado = new PIXI.extras.MovieClip(this.tornadoFrames);
	star = new PIXI.Sprite(this.starTexture);
	oil = new PIXI.Sprite(this.oilTexture);

    tornado.position.set(GAME.width/2+GAME.width/4*Math.random(),GAME.height*6/5+GAME.height/2*Math.random());
    tornado.scale.set(0.5);
    tornado.rotation = Math.PI/2;

    tornado.anchor.set(0.5);
    tornado.animationSpeed = 0.5;

    tornado.play();

    star.position.set(GAME.width/5+GAME.width*3/5*Math.random(),GAME.height+40);
    star.scale.set(0.8);
    star.rotation = Math.PI/2;
    star.delay = 10+Math.random()*10;

    star.anchor.set(0.5);

    star.reset = function (){
    	star.position.set(GAME.width/5+GAME.width*3/5*Math.random(),GAME.height+40);
    	star.delay = 10+Math.random()*10;
    }


    oil.position.set(GAME.width+50,GAME.height*0.5+GAME.height*0.4*Math.random());
    oil.scale.set(0.8);
    oil.rotation = Math.PI/2;
    oil.delay = 10+Math.random()*10;
    oil.speed = 1+Math.random();

    oil.anchor.set(0.5);

    oil.reset = function (){
    	oil.position.set(GAME.width+50,GAME.height*0.5+GAME.height*0.4*Math.random());
    	oil.delay = 20+Math.random()*30;
    	oil.speed = Math.random();
    }
	
	stage.addChild(tornado);
	stage.addChild(star);
	stage.addChild(oil);
}

GAME.reward.prototype.bounce = function (){
	/* 星星缩放+上下移动+随机下落 */
	this._starExpand&&this._starSize>0.9&&(this._starExpand = false);
	!this._starExpand&&this._starSize < 0.8&&(this._starExpand = true);
	this._starExpand?(this._starSize+=this._starSpeed):(this._starSize-=this._starSpeed);
	this._starUp&&this._starX>GAME.width*4/5&&(this._starUp = false);
	!this._starUp&&this._starX<GAME.width/2&&(this._starUp = true);
	this._starUp?(this._starX+=1):(this._starX-=1);

	star&&star.scale.set(this._starSize);
	star&&(star.position.x=this._starX);
	(star.delay>0)&&(star.delay-=0.1);
	// star&&(!oil.delay>0)&&star.position.y<-40&&(star.position.y=GAME.height+40);
	star&&!(star.delay>0)&&(star.position.y-=1);
	if(star.position.y<-40) star.reset();

	/* 油桶随机下落 */
	this._oilRotatePrev&&this._oilRotation<(Math.PI*5/12)&&(this._oilRotatePrev = false);
	!this._oilRotatePrev&&this._oilRotation>(Math.PI*7/12)&&(this._oilRotatePrev = true);
	this._oilRotatePrev?(this._oilRotation-=0.01):(this._oilRotation+=0.01);

	(oil.delay>0)&&(oil.delay-=0.1);
	oil&&!(oil.delay>0)&&(oil.rotation=this._oilRotation)&&(oil.position.x-=1)&&(oil.position.y-=oil.speed);
	if(oil.position.x<-100) oil.reset();

	/* 风暴随机出现 */
	tornado&&(tornado.position.y-=1);
}