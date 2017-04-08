function get_XY(x1, y1, r1,r2, x2, y2){
	k =  (y2 - y1) / (x2 - x1);
	x = Math.sqrt((r2 - r1)*(r2 - r1) / (k*k+1));
	y = k*x;
	
	x2<x1&&(x*=-1,y*=-1);
	return {
		'x':x1+x,
		'y':y1+y
	};
}

function copyTouch(touch) {
  	return {
  		identifier: touch.identifier,
  		pageX: touch.pageX,
  		pageY: touch.pageY
  	}
}

function ongoingTouchIndexById(idToFind) {
	for (var i=0; i < ongoingTouches.length; i++) {
		var id = ongoingTouches[i].identifier;
		
		if (id == idToFind) {
		 	return i;
		}
	}
	return -1;
}

function resize()
{
    window.scrollTo(0, 0);
        
    var w = 414;
	var width = GAME.width; 
	var height = window.innerHeight || document.body.clientHeight; 
    var ratio = width / w;
        
	if(renderer)
	{
            var view = renderer.view;
            view.style.width = w * ratio +"px";

            // var newHeight = (height / ratio);

            view.style.width = width +"px";

            // game.view.resize(newWidth , h);
            

	}
	
	// GAME.width = w;
	GAME.height = height;

	containStatus();
}

function containStatus(){
	//标准屏幕尺寸
	var phoneWidth = 375;
	var phoneHeight = 603;
	
	var contain = document.getElementsByClassName('contain');
	var w = document.body.clientWidth;
	var h = document.body.clientHeight;
	var v = phoneWidth/phoneHeight;
	var scale = w/h>v?(h/phoneHeight):(w/phoneWidth);
	
	for(var i=0;i<contain.length;i++){
		contain[i].style.transform = 'scale('+scale+')';
		contain[i].style.WebkitTransform = 'scale('+scale+')';
	}
}

function scoreplay(){
	var score = $('#playerscore').html();
	var pfinal = $('#score').html();
	// console.log(score);
	if(score){
		var ps = parseInt(pfinal);
		if(score<ps){
			score=parseInt(score)+50;
			if(score>ps){
				score = ps;
				$('#playerscore').html(score);
			}else{
				$('#playerscore').html(score);
				requestAnimationFrame(scoreplay);
			}
		}
	}else{
		$('#playerscore').html(0)
		requestAnimationFrame(scoreplay);
	}
}
