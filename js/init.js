var renderer,stage;
var reward,hansen;
var hansenEntered = false;
var hansenDamage = false;
var background;
var ongoingTouches = new Array();
var playerScore = 0;
var process = true;
var energy = 0;
var score = 0;
var isContact = false;
var globaltime = 0;
var pause = true;
/*
飞机坠毁条件：
1.燃油耗尽
2.撞死
*/
GAME.width = Math.min(414,$(window).width());
GAME.height = window.innerHeight;
GAME.ratio = GAME.width>320?((GAME.width-(GAME.width-320)/2)/320):GAME.width/320;
// GAME.ratio = 1;

GAME.init = function (){
	resize();
	/* mask隐藏 */
	$('#mask').fadeOut();
	$('#control').css({
		'top':135*GAME.ratio+'px',
		'height':(GAME.height-135*GAME.ratio)+'px'
	});

	// reward = new GAME.reward();
	hansen = new GAME.hansen();
	var button = new GAME.button();
	background = new GAME.background();
	var info = new GAME.info();
	var around = new GAME.around();

	energy = info.energy;

	//创建渲染(canvas画布)
	renderer = PIXI.autoDetectRenderer(this.width, window.innerHeight, {
		view: document.getElementById('game-canvas')
	},true);

	//Create a container object called the `stage` 创建舞台
	stage = new PIXI.Container();

	// reward.onRewardLoaded();
	// reward.onRewardLoaded();
	background.createBackground();
	around.createAround();
	hansen.createHansen();
	button.createButton();
	info.createInfo();

	//Tell the `renderer` to `render` the `stage` 渲染舞台和精灵
	renderer.render(stage);
	requestAnimationFrame(animate);

	// setTimeout(function (){
	// 	process = false;
	// },0);

	$('#startbtn').on('touchend',function (){
		if(pause){
			button.moveBtn.alpha = button.containerBtn.alpha = 1;
			$('.startprocess').css('opacity','1');
			$('#mainframe').fadeOut();
		}
		pause = false;
	});
	$('#helpbtn').on('touchend',function (){
		/*if(pause){
			button.moveBtn.alpha = button.containerBtn.alpha = 1;
			$('.startprocess').css('opacity','1');
			$('#mainframe').fadeOut();
		}*/
		$('#info').show();
	});
	$('#info').on('touchend',function (){
		$(this).hide();
	});
	$('#againbtn').on('touchend',function (){
		location.reload();
	});
	$('#sharebtn').on('touchend',function (){
		$('#sharep').show();
	});
	$('#sharep').on('touchend',function (){
		$(this).hide();
	});

	// var dr,direct; 

	function animate(){
		if(!pause){

			button.btnControl();

			hansenDamage?hansen.damage():(!hansenEntered?hansen.entering():hansen.flying());

			background.moving();

			info.updateInfo();
			
			reward.bounce();

		}

		around.movingBuildings(pause);

		renderer.render(stage);


	    process&&requestAnimationFrame(animate);

	    globaltime+=1;
	    // $('#console').text(globaltime);
	}

	/*iConsole.addEventListener('touchstart',function (){
    	if(process){
			process = false;
			console.log('GAME is pause!');
		}else{
			process = true;
			requestAnimationFrame(animate);
			console.log('GAME is continue!');
		}
    },false);*/
}

GAME.failure = function (){
	$('#againframe').show();
	scoreplay();
}