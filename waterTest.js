var fishTextures=[PIXI.Texture.fromImage("img/angler.png"),PIXI.Texture.fromImage("img/fish_01.png"),PIXI.Texture.fromImage("img/fish_02.png"),PIXI.Texture.fromImage("img/fish_02.png"),PIXI.Texture.fromImage("img/fish_03.png"),PIXI.Texture.fromImage("img/fish_04.png"),PIXI.Texture.fromImage("img/fish_05.png")];
fishCount=0;

Fish=function(){fishCount++;
PIXI.Sprite.call(this,fishTextures[fishCount%7]);
if(fishCount%7)this.scale.x=this.scale.y=0.25+0.5*Math.random(),this.position.y=600*Math.random();
else{console.log("!");
var a=PIXI.Sprite.fromImage("img/light_ADD.png");
this.addChild(a);
a.anchor.x=a.anchor.y=0.5;
a.position.x=10;
a.position.y=90;
this.glow=a;
a.blendMode="w";
var b=PIXI.Sprite.fromImage("img/light_OVERLAY.png");
b.blendMode="hxx";
b.anchor.x=b.anchor.y=0.5;
b.scale.x=b.scale.y=3;
b.alpha=0.3;
this.glow2=b;
a.addChild(b);

this.position.y=300+300*Math.random()}this.speed=1+4*Math.random();
0.5<Math.random()&&(this.scale.x*=-1,this.speed*=-1);
this.count=100*Math.random()};
Fish.constructor=Fish;
Fish.prototype=Object.create(PIXI.Sprite.prototype);
Fish.prototype.updateTransform=function(){this.position.x-=this.speed;
	this.glow&&(this.count+=0.05,this.glow2.alpha=0.3+0.08*Math.sin(this.count));
-300>this.position.x&&(this.position.x+=1900);
1900<this.position.x&&(this.position.x-=1900);
PIXI.DisplayObjectContainer.prototype.updateTransform.call(this)};

var PIXI=PIXI||{};
Tentacle=function(a,b,d){this.chain=new Chain;
	this.count=100*Math.random();
this.speed=1+2*Math.random();
this.chain.build(d);
this.targetPoint=new PIXI.Point;
PIXI.Rope.call(this,a,this.chain.links);
this.width=b};
Tentacle.constructor=Tentacle;
Tentacle.prototype=Object.create(PIXI.Rope.prototype);

Tentacle.prototype.updateTransform=function(){PIXI.Rope.prototype.updateTransform.call(this);
	this.targetPoint.x+=0.3*(stage.interactionManager.mouse.global.x-this.worldTransform[2]-this.targetPoint.x);
this.targetPoint.y+=0.3*(stage.interactionManager.mouse.global.y-this.worldTransform[5]-(canvas?0:222)-this.targetPoint.y);
this.chain.update(this.targetPoint);
this.count+=0.3*this.speed;
for(var a=this.points,b=0;
	b<a.length;
b++);
};

var Chain=function(){var a=45,b=[],d=[],k=[],l=[];
	this.links=[];
this.build=function(h){a=h/15;
	h=-a;
var c;
for(c=0;
	15>=c;
c++)b[c]=0+0*c+c,d[c]=0+h*c,k[c]=0+0*c,l[c]=0+h*c,this.links[c]=new PIXI.Point(20*c,20*c)};
	this.update=function(a){b[0]=0;
	d[0]=0;
this.verlet();
this.satisfyConstraints();
a&&this.detect(a);
this.satisfyJoints()};
this.satisfyJoints=function(){for(var a=0;
	15>=a;
a++)this.links[a].x=b[a],this.links[a].y=d[a]};
this.detect=function(a){for(var c=2;
	14>c;
c++){var f=a.x-b[c],e=a.y-d[c],g=Math.sqrt(f*
f+e*e);
150>g&&(e=-e/g,b[c]=k[c]=a.x+150*(-f/g),d[c]=l[c]=a.y+150*e)}};
this.getAngle=function(b,a,d,e){return Math.atan2(a-e,b-d)};
this.verlet=function(){for(var a=0;
	15>=a;
a++){var c=b[a],f=d[a];
	b[a]+=1*(0.99999*b[a]-0.99999*k[a]);
d[a]+=1*(0.99999*d[a]-0.99999*l[a])-0.4;
k[a]=c;
l[a]=f}};
this.satisfyConstraints=function(){for(var h=1;
	15>=h;
h++)for(var c=1;
15>=c;
c++){var f=b[c]-b[c-1],e=d[c]-d[c-1],g=Math.sqrt(f*f+e*e),j=g-a,f=j*f/g/2,e=j*e/g/2;
	b[c]-=f;
d[c]-=e;
b[c-1]+=f;
d[c-1]+=e;
15>c&&(f=b[c+1]-b[c-
1],e=d[c+1]-d[c-1],g=Math.sqrt(f*f+e*e),j=2*a,g<j&&(j=g-j,f=j*f/g/2,e=j*e/g/2,b[c+1]-=f,d[c+1]-=e,b[c-1]+=f,d[c-1]+=e))}};
this.destroy=function(){links=l=k=d=b=null};
this.setLength=function(h,c){var f,e;
	f=0;
e=400/15;
a=0.8*h/15;
if(c)for(var g=0;
	15>g;
g++)b[g]=k[g]=0+f*g,d[g]=l[g]=0+e*g}};

Bubbles=function(){PIXI.DisplayObjectContainer.call(this);
	this.target=new PIXI.Point;
this.particals=[];
this.max=100;
this.posIndex=this.count=0;
this.positions=[];
for(var a=0;
	100>a;
a++){var b=new Partical;
	b.blendMode="w";
this.addChild(b);
this.particals.push(b);
b.count=0;
b.speed.x=1*(Math.random()-0.5);
b.speed.y=2+3*Math.random();
b.accel=0.1+Math.random();
this.posIndex++;
b.position.x=0;
b.position.y=0}};
Bubbles.constructor=Bubbles;
Bubbles.prototype=Object.create(PIXI.DisplayObjectContainer.prototype);

Bubbles.prototype.update=function(){for(var a=0;
	a<this.particals.length;
a++){var b=this.particals[a];
	b.position.x+=0.5*b.speed.x;
b.position.y-=b.speed.y;
b.speed.y+=0.0050*b.accel;
-200>b.position.y&&(b.alpha*=0.92);
-300>b.position.y&&(b.position.y=Math.random()-0.5,b.position.x=0,b.alpha=1,b.speed.y=1)}};
Partical=function(){PIXI.Sprite.call(this,PIXI.Texture.fromImage("img/bubble.png"));
this.anchor.x=0.5;
this.anchor.y=0.5;
this.count=0;
this.speed=new PIXI.Point};
Partical.constructor=Partical;

Partical.prototype=Object.create(PIXI.Sprite.prototype);
$(document).ready(onReady);
$(window).resize(onResize);
var music=document.getElementById("music");
music.playing=!0;
function linkToSound(){window.open("https://soundcloud.com/jeffmatthews/driving","_blank")}fullscreen=function(){document.body.mozRequestFullScreen?document.body.mozRequestFullScreen():document.body.webkitRequestFullScreen&&document.body.webkitRequestFullScreen()};
var gui=new dat.GUI({width:350});
gui.close();
tentacleCount=20;

gui.add(this,"tentacleCount",0,100).name("Number of Tentacles").onChange(updateTentacles);
gui.add(music,"playing").name("Sound On").onChange(function(a){a?music.play():music.pause()});
gui.add(this,"linkToSound").name("Check out music");
gui.add(this,"fullscreen").name("Fullscreen");

function onReady(){tentacleCache=[];
	tentacleTextures=[PIXI.Texture.fromImage("img/frond_01.png"),PIXI.Texture.fromImage("img/frond_02.png"),PIXI.Texture.fromImage("img/frond_03.png"),PIXI.Texture.fromImage("img/frond_04.png"),PIXI.Texture.fromImage("img/frond_05.png"),PIXI.Texture.fromImage("img/frond_06.png"),PIXI.Texture.fromImage("img/frond_07.png"),PIXI.Texture.fromImage("img/frond_08.png")];
last=0;
TweenLite.defaultOverwrite="all";
loader=new PIXI.AssetLoader(["img/stormLogo.png","img/black.png",
"img/rotateFish.png"]);
loader.onComplete=startMainLoad;
loader.load()}
function updateTentacles(){for(var a=0;
	a<tentacleCache.length;
a++)a>tentacleCount&&TweenLite.to(tentacleCache[a].scale,0.4,{y:0,ease:Cubic.easeOut});
for(a=0;
	a<tentacleCount;
a++){var b;
	if(a<tentacleCache.length)b=tentacleCache[a];
else{b=tentacleTextures[a%8];
	var d=0.23+0.39*Math.random();
b=new Tentacle(b,2.4*b.height*d,2*b.width*d);
b.position.y=793+100*Math.random();
b.position.x=100+1400*Math.random();
tentacleCache.push(b);
container.addChild(b);
b.scale.y=0}b.visible=!0;
b.speed*=a%2?-1:1;
a>last&&TweenLite.to(b.scale,
0.4,{y:1,ease:Cubic.easeOut})}last=tentacleCount}
function startMainLoad(){renderer=PIXI.autoDetectRenderer(1600,1E3);
	document.body.appendChild(renderer.view);
hasLoaded=!1;
stage=new PIXI.Stage(0,!0);
loader=new PIXI.AssetLoader("img/frond_01.png img/frond_02.png img/frond_03.png img/frond_04.png img/fish_02.png img/pixiLogo.png img/seaTint.png img/seaBG.jpg img/rainFall.png img/surface_ADD.png img/seaBedALT.png img/seaSky.jpg".split(" "));
loader.onComplete=buildScene;
count=0;
stats=new Stats;
stats.domElement.style.position="absolute";
stats.domElement.style.top=
"0px";
black=PIXI.Sprite.fromImage("img/black.png");
stage.addChild(black);
logo=PIXI.Sprite.fromImage("img/stormLogo.png");
loaderGraphic=new PIXI.DisplayObjectContainer;
var a=PIXI.Sprite.fromImage("img/stormLogo.png");
loaderGraphic.addChild(a);
stage.addChild(loaderGraphic);
loaderGraphic.position.x=800;
loaderGraphic.position.y=500;
a.anchor.x=a.anchor.y=0.5;
loaderGraphic.alpha=0;
loaderFish=PIXI.Sprite.fromImage("img/rotateFish.png");
loaderFish.anchor.x=loaderFish.anchor.y=0.5;
loaderGraphic.addChildAt(loaderFish,0);
TweenLite.to(loaderGraphic,0.5,{alpha:1,ease:Sine.easeIn
});
	onResize();
	requestAnimFrame(update);
	loader.load()
}
function buildScene(){
	loader.onComplete=null;
	canvas=renderer instanceof PIXI.CanvasRenderer;
	seaBG=PIXI.Sprite.fromImage("img/seaBG.jpg");
	seaSky=PIXI.Sprite.fromImage("img/seaSky.jpg");
	seaTint=PIXI.Sprite.fromImage("img/seaTint.png");
	stage.addChild(seaSky);
	var a=new PIXI.DisplayObjectContainer;
	rain=PIXI.Sprite.fromImage("img/rainFall.png");
	a.addChild(rain);
	rain2=PIXI.Sprite.fromImage("img/rainFall.png");
	a.addChild(rain2);
	a.position.x=700;
	a.position.y=135;
	a.alpha=0.7;
	stage.addChild(a);
	seaTint.alpha=0.7;
	container=new PIXI.DisplayObjectContainer;
	container.addChild(seaBG);
	canvas&&stage.addChild(container);
	bubbles=new Bubbles;
	bubbles.position.x=1200;
	bubbles.position.y=770;
	container.addChild(bubbles);
	tentacleCount=100;
	updateTentacles();
	tentacleCount=canvas?5:20;
	updateTentacles();
	for(a=0;14>a;a++){
		var b=new Fish;
		b.position.x=100*a;
		fishCount%7?container.addChildAt(b,Math.round(Math.random()*(container.children.length-1))):container.addChildAt(b,container.children.length-1)
	}
	canvas?container.position.y=222:(renderTexture=new PIXI.RenderTexture(1600,1E3),sprite=new PIXI.Sprite(renderTexture),stage.addChild(sprite),sprite.filter="water",sprite.position.y=222);
	container.addChildAt(seaTint,container.children.length-4);
	floor=PIXI.Sprite.fromImage("img/seaBedALT.png");
	floor.position.y=788;
	floor.anchor.y=1;
	container.addChild(floor);
	surface=PIXI.Sprite.fromImage("img/surface_ADD.png");
	surface.blendMode="w";
	surface.scale.x=1600/28;
	canvas||container.addChild(surface);
	logo2=PIXI.Sprite.fromImage("img/pixiLogo.png");

	logo2.anchor.x=logo2.anchor.y=1;
	stage.addChild(logo2);
	logo2.position.x=20;
	logo2.position.y=20;
	logo2.setInteractive(!0);
	logo2.click=logo2.tap=function(){window.open("http://www.goodboydigital.com/pixi-js-storm-webgl-demo/")};
	stage.addChild(logo);
	logo.position.x=10;
	logo.position.y=10;
	stage.addChild(black);
	hasLoaded=!0;
	onResize();
	TweenLite.to(black,3,{alpha:0,onComplete:onFadeIn,delay:1});
	stage.addChild(loaderGraphic);
	TweenLite.to(loaderGraphic,2,{alpha:0,ease:Sine.easeInOut});
	music.play();
	music.playing=!0
}
function onFadeIn(){
	stage.removeChild(black);
	stage.removeChild(loaderGraphic)}function update(){if(hasLoaded){var a=0.5*(Math.sin(20*count)+1);
	seaTint.alpha=0.5+0.25*a;
	bubbles.update();
	count+=0.0010;
	canvas||(renderer.gl.useProgram(PIXI.waterShaderProgram),renderer.gl.uniform1f(PIXI.waterShaderProgram.waveUniform,count),renderTexture.render(container));
	rain2.position.x=20+10*Math.sin(30*count)}loaderFish.stage&&(loaderFish.rotation-=0.01);
	renderer.render(stage);
	requestAnimFrame(update)
}
function onResize(){
	var a=$(window).width(),b=$(window).height();
	renderer.view.style.width=a+"px";
	renderer.view.style.height=b+"px";
	a=1600/a;
	b=1E3/b;
	logo.scale.x=0.666*a;
	logo.scale.y=0.666*b;
	hasLoaded&&(logo2.scale.x=0.666*a,logo2.scale.y=0.666*b,logo2.position.x=1600,logo2.position.y=980,black.scale.x=16,black.scale.y=10)
};
