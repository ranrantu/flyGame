var mountain1,mountain2,tree,rainbow,screw;
var buildings = [];

GAME.around = function (){
	this.graphics = new PIXI.Graphics();
	this.aroundSpeed = 1;
	this.stars = [];


	this.sunTexture = new PIXI.Texture.fromImage('images/sun.png');
	this.suner = new PIXI.Sprite(this.sunTexture);
	this.moonTexture = new PIXI.Texture.fromImage('images/moon.png');
	this.mooner = new PIXI.Sprite(this.moonTexture);
	this.flystarTexture = new PIXI.Texture.fromImage('images/meteor.png');
	this.flystarA = new PIXI.Sprite(this.flystarTexture);
	this.flystarB = new PIXI.Sprite(this.flystarTexture);
	this.starTexture = new PIXI.Texture.fromImage('images/star.png');
	for(var i=0;i<20;i++){
		var star = new PIXI.Sprite(this.starTexture);
		star.anchor.x = 0;
    	star.anchor.y = 0;
    	star.alpha = 0;
		this.stars.push(star);
	}

	this.cloud1Texture = new PIXI.Texture.fromImage('images/cloud1.png');
	this.cloud1 = new PIXI.Sprite(this.cloud1Texture);
	this.cloud2Texture = new PIXI.Texture.fromImage('images/cloud2.png');
	this.cloud2 = new PIXI.Sprite(this.cloud2Texture);
	this.cloud3Texture = new PIXI.Texture.fromImage('images/cloud3.png');
	this.cloud3 = new PIXI.Sprite(this.cloud3Texture);
	/* 
	mountain 277 × 512
	rainbow 172 × 454
	*/
	/* mountain.png */
	this.mountain1Texture = new PIXI.Texture.fromImage('images/mountain.png');
	mountain1 = new PIXI.Sprite(this.mountain1Texture);
	mountain2Texture = new PIXI.Texture.fromImage('images/mountain2.png');
	mountain2 = new PIXI.Sprite(this.mountain2Texture);
	this.rainbowTexture = new PIXI.Texture.fromImage('images/rainbow.png');
	rainbow = new PIXI.Sprite(this.rainbowTexture);
	this.screw = new PIXI.Texture.fromImage('images/screw.png');
	screw = new PIXI.Sprite(this.screw);
	tree = new PIXI.Sprite.fromImage('images/tree.png');
	/* buildings */
	var blist = ['images/b1.png','images/b2.png','images/b3.jpg','images/b4.png','images/b5.jpg'];
	for(var i=0;i<blist.length;i++){
		var b = new PIXI.Sprite.fromImage(blist[i]);
		buildings.push(b);
	}
	bgb = new PIXI.Sprite.fromImage('images/bgb.png');

	/**/
	// this.bgbuilding

	this.roadTexure = new PIXI.Texture.fromImage('images/road.jpg');
	this.roader = new PIXI.extras.TilingSprite(this.roadTexure, 13, window.innerHeight);
}

GAME.around.prototype.createAround = function (){
	
	this.suner.alpha = 0.5;
	this.suner.anchor.x = 0.5;
    this.suner.anchor.y = 0.5;
	this.suner.rotation = Math.PI/2;
    this.suner.position.x = window.innerWidth*0.9 -50;
    this.suner.position.y = window.innerHeight - 100;
    this.mooner.alpha = 0;
	this.mooner.anchor.x = 0.5;
    this.mooner.anchor.y = 0.5;
	this.mooner.rotation = Math.PI/2;
    this.mooner.position.x = window.innerWidth*0.9 -50;
    this.mooner.position.y = window.innerHeight - 100;
    for(var i=0;i<20;i++){
    	this.stars[i].position.x = window.innerWidth*Math.random();
    	this.stars[i].position.y = window.innerHeight*Math.random();
    }


    this.cloud1.alpha = this.cloud2.alpha = this.cloud3.alpha = 0.5;
	this.cloud1.anchor.x = this.cloud2.anchor.x = this.cloud3.anchor.x = 0.5;
    this.cloud1.anchor.y = this.cloud2.anchor.y = this.cloud3.anchor.y = 0.5;
    this.cloud1.position.x = window.innerWidth*0.9 -50;
    this.cloud2.position.x = window.innerWidth*0.7 -50;
    this.cloud3.position.x = window.innerWidth*0.9 -50;
    for(var i=1;i<4;i++){
    	this['cloud'+i].position.x = window.innerWidth*0.6+window.innerWidth*0.2*Math.random();
		this['cloud'+i].position.y = window.innerHeight*0.3*i;
		this['cloud'+i+'Speed'] = 0.2+Math.random()*0.1;
    }

    this.scaleNum = 0.8;
    mountain1.position.x = 0;
    mountain1.position.y = 950;
    mountain1.width = 277*GAME.ratio*this.scaleNum;
    mountain1.height = 512*GAME.ratio*this.scaleNum;
    mountain2.position.x = 13;
    mountain2.position.y = 300;
    mountain2.width = 216*GAME.ratio*this.scaleNum;
    mountain2.height = 367*GAME.ratio*this.scaleNum;
    mountain2.alpha = 0.5;
    tree.width = 150*GAME.ratio*this.scaleNum;
    tree.height = 429*GAME.ratio*this.scaleNum;
    tree.position.x = 10;
    tree.position.y = 1500;
    for(var i=0;i<5;i++){
    	buildings[i].position.x = 13;
    	buildings[i].position.y = (2500+i*100+200*Math.random());
    }
    bgb.position.x=13;
    bgb.position.y=2000;


    rainbow.position.x = 0;
    rainbow.position.y = 500;
    rainbow.width = 172*GAME.ratio*this.scaleNum;
    rainbow.height = 454*GAME.ratio*this.scaleNum;
    screw.anchor.x = 0.5;
    screw.anchor.y = 0.5;
    screw.width = 200*GAME.ratio*this.scaleNum;
    screw.height = 200*GAME.ratio*this.scaleNum;
    screw.position.x = 0+125*GAME.ratio*this.scaleNum;
    screw.position.y = 500+60*GAME.ratio*this.scaleNum;


	stage.addChild(this.graphics);
	stage.addChild(this.suner);
	stage.addChild(this.mooner);
	stage.addChild(this.roader);
	stage.addChild(this.cloud1);
	stage.addChild(this.cloud2);
	stage.addChild(this.cloud3);

	stage.addChild(mountain2);
	stage.addChild(mountain1);
	stage.addChild(tree);
	stage.addChild(rainbow);
	stage.addChild(screw);
	for(var i=0;i<20;i++){
		stage.addChild(this.stars[i]);
	}
	stage.addChild(bgb);
	for(var i=0;i<5;i++){
		stage.addChild(buildings[i]);
	}
	
}

GAME.around.prototype.movingBuildings = function (pause){
	
	if(!pause){
		if(globaltime<2000){
			this.suner.position.x -= 0.05;
			this.suner.position.y -= 0.3;
		}else{
			this.suner.alpha>0&&(this.suner.alpha-=0.05);
			this.mooner.alpha<0.5&&(this.mooner.alpha+=0.05);
			this.mooner.position.x -= 0.05;
			this.mooner.position.y -= 0.3;
			for(var i=0;i<20;i++){
				if(this.stars[i].alpha>0){
					this.stars[i].alpha-=0.01*Math.random();
				}else{
					this.stars[i].alpha=Math.random();
				}
			}
		}
		

		screw.position.y -= this.aroundSpeed;
		rainbow.position.y -= this.aroundSpeed;
		mountain1.position.y -= this.aroundSpeed;
		mountain2.position.y -= this.aroundSpeed;
		tree.position.y -= this.aroundSpeed;
		for(var i=0;i<5;i++){
			buildings[i].position.y -= this.aroundSpeed;
		}
		bgb.position.y -= this.aroundSpeed;
		
	}

	for(var i=1;i<4;i++){
		this['cloud'+i].position.y -= this['cloud'+i+'Speed'];
		if(this['cloud'+i].position.y<-100){
			this['cloud'+i].position.y = window.innerHeight+100;
			this['cloud'+i+'Speed'] = 0.2+Math.random()*0.1;
		}
	}

	screw.rotation += 0.1;
}