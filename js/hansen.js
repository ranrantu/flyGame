/*
	2015.12.21 create by isez 
*/
var GAME = GAME || {};

GAME.hansen = function (){
	/* aircraft.png */
	this.texture = PIXI.Texture.fromImage('images/aircraft-test.png');
	this.maskTexture = PIXI.Texture.fromImage('images/aircraft-red.png');
	/* 
		anchor 轴心
		position 位置
		speed 速度
		direct 方向枚举
		gravity 重力加速度

		当前机型 48 × 59
	*/
	this.model = {
		width : 48,
		height : 59,
		name : '普通小型客机'
	}
	this.view = new PIXI.Sprite(this.texture);
	this.mask = new PIXI.Sprite(this.maskTexture);
	this.mask.alpha = 0;
	this.view.width = this.mask.width = 48*GAME.ratio;
	this.view.height = this.mask.height = 59*GAME.ratio;
	this.view.anchor.x = this.mask.anchor.x = 0.5;
	this.view.anchor.y = this.mask.anchor.y = 0.5;
	this.view.position.x = this.mask.position.x = GAME.width/2 + 50;
	this.view.position.y = this.mask.position.y = -50;
	this.view.speed = 3;
	this.view.downSpeed = 3;
	this.view.rotation = 0;//Math.PI/2;

	// this.mask = new PIXI.Sprite(this.redTexture);
	// this.view.mask = new PIXI.Sprite(this.redTexture);
	// this.view.gravity = 0.05;
	this.view.direct = {
		ahead:['y',1],
		back:['y',-1],
		top:['x',1],
		down:['x',-1]
	};
	this.view.direction = {
		ahead:false,
		back:false,
		top:false,
		down:false
	};

}

GAME.hansen.prototype.createHansen = function (){
	stage.addChild(this.view);
	stage.addChild(this.mask);
}

GAME.hansen.prototype.entering = function (){
	dr = this.view.direct;
	(this.view.position[dr.ahead[0]] += PIXI.ticker.shared.deltaTime*this.view.speed*1.5*dr.ahead[1]);
	(this.mask.position[dr.ahead[0]] += PIXI.ticker.shared.deltaTime*this.view.speed*1.5*dr.ahead[1]);
	if(this.view.position.y>110*GAME.ratio){
		hansenEntered = true;
		console.log('获得控制');
	}
}

GAME.hansen.prototype.damage = function (){
	// 坠毁
	dr = this.view.direct;
	(this.view.position[dr.ahead[0]] += PIXI.ticker.shared.deltaTime*this.view.speed*0.2*dr.ahead[1])
	&&(this.mask.position[dr.ahead[0]] += PIXI.ticker.shared.deltaTime*this.view.speed*0.2*dr.ahead[1]);
	(this.view.position[dr.down[0]] += PIXI.ticker.shared.deltaTime*this.view.downSpeed*0.2*dr.down[1])
	&&(this.mask.position[dr.down[0]] += PIXI.ticker.shared.deltaTime*this.view.downSpeed*0.2*dr.down[1]);
	this.view.rotation+=0.05;
	this.mask.rotation+=0.05;
	if(this.view.position.x<0){
		pause = true;
		GAME.failure();
	}
}

GAME.hansen.prototype.flying = function (){
	//dr方向枚举,direct当前方向
	dr = this.view.direct;
	direct = this.view.direction;
	direct.ahead&&this.view.position[dr.ahead[0]]<window.innerHeight - 40
				&&(this.view.position[dr.ahead[0]] += PIXI.ticker.shared.deltaTime*this.view.speed*dr.ahead[1])
				&&(this.mask.position[dr.ahead[0]] += PIXI.ticker.shared.deltaTime*this.view.speed*dr.ahead[1]);
	direct.back&&this.view.position[dr.back[0]]>40
				&&(this.view.position[dr.back[0]] += PIXI.ticker.shared.deltaTime*this.view.speed*dr.back[1])
				&&(this.mask.position[dr.back[0]] += PIXI.ticker.shared.deltaTime*this.view.speed*dr.back[1]);
	direct.top&&this.view.position[dr.top[0]]<window.innerWidth - 40
				&&(this.view.position[dr.top[0]] += PIXI.ticker.shared.deltaTime*this.view.speed*dr.top[1])
				&&(this.mask.position[dr.top[0]] += PIXI.ticker.shared.deltaTime*this.view.speed*dr.top[1]);
	direct.down&&this.view.position[dr.down[0]]>40
				&&(this.view.position[dr.down[0]] += PIXI.ticker.shared.deltaTime*this.view.downSpeed*dr.down[1])
				&&(this.mask.position[dr.down[0]] += PIXI.ticker.shared.deltaTime*this.view.downSpeed*dr.down[1]);
	/* 检测与星星、油桶、龙卷风的碰撞 */
	star&&(Math.abs(star.position.x-this.view.position.x)<(this.view.width+star.width/4))
	&&(Math.abs(star.position.y-this.view.position.y)<(this.view.height-star.width/4))
	&&(playerScore+=50)&&star.reset();

	oil&&(Math.abs(oil.position.x-this.view.position.x)<(this.view.width+oil.width/4))
	&&(Math.abs(oil.position.y-this.view.position.y)<(this.view.height-oil.width/4))
	&&updateEnergy();

	isContact=false;

	tornado&&(Math.abs(tornado.position.x-this.view.position.x)<(this.view.width+tornado.width/4))
	&&(Math.abs(tornado.position.y-this.view.position.y)<(this.view.height-tornado.width/4))
	&&(isContact=true);


	if((this.view.position.y+this.view.height/2)>mountain1.position.y&&
		(this.view.position.y-this.view.height/2)<(mountain1.height+mountain1.position.y)){
		mountain1&&this.collisionMountain1();
	}

	function updateEnergy(){
		(parseFloat(energy.style.height)+20>235*GAME.ratio)?(energy.style.height=235*GAME.ratio+'px'):(energy.style.height=(parseFloat(energy.style.height)+20)+'px');
		oil.reset();
	}

	/* 闪烁警报 */
	if(isContact){
		if(this.mask.alpha < 0){
		    this.mask.alpha = 1; 
		}else{
		    this.mask.alpha -= 0.05;
		}
		fuelparam = 0.8;
	}else{
		this.mask.alpha = 0;
		fuelparam = 0.15;
	}
    
}

GAME.hansen.prototype.flyAhead = function (){
	this.view.direction.ahead = true;
}

GAME.hansen.prototype.flyBack = function (){
	this.view.direction.back = true;
}

GAME.hansen.prototype.flyTop = function (){
	this.view.direction.top = true;
}

GAME.hansen.prototype.flyDown = function (){
	this.view.direction.down = true;
}

GAME.hansen.prototype.flyAheadStop = function (){
	this.view.direction.ahead = false;
}

GAME.hansen.prototype.flyBackStop = function (){
	this.view.direction.back = false;
}

GAME.hansen.prototype.flyTopStop = function (){
	this.view.direction.top = false;
}

GAME.hansen.prototype.flyDownStop = function (){
	this.view.direction.down = false;
}
GAME.hansen.prototype.flyStop = function (){
	this.view.direction.ahead = this.view.direction.back = this.view.direction.top = this.view.direction.down = false;
}


// mountain1碰撞检测
GAME.hansen.prototype.collisionMountain1 = function (){
	/* 相对坐标 */
	var dirX = this.view.position.x;
	var dirY = this.view.position.y - mountain1.position.y + this.view.height/2;
	/* 判断进入mountain1范围 */
	/*
	* (15,0)-(75,90)
	*/
	var r = GAME.ratio*0.8;
	var w = this.view.width;
	var h = this.view.height;
	if(dirX<(mountain1.width+w/2)){
		if(dirY<90*r){
			((dirX-w/2-15*r)*3-dirY*2+h)<h/5&&(isContact=true);
		}else if(dirY<236*r){
			(dirX-w/2-(dirY-h/2-90*r)*25/18-75*r)<h*25/36/5&&(isContact=true);
		}else if(dirY<338*r){
			/* 标准值 dirY<236*r+h  ...<h*55/204 */
			if(dirY<236*r+h/2){
				dirX<(mountain1.width+w/2)&&(isContact=true);
			}else{
				(dirX-220*r-w/2-(338*r-dirY+h/2)*55/102)<h*1/2204&&(isContact=true);
			}
		}else if(dirY<(512*r+h)){
			if(dirY<338*r+h){
				dirX<(220*r+w/2)&&(isContact=true);
			}else if(dirY<512*r){
				((dirX-w/2)*164/220-502*r+dirY)<h&&(isContact=true);
			}else{
				((dirX-w/2)*164/220-502*r+dirY-h)<11&&(isContact=true);
			}
		}
	}
}