GAME.button = function (){
	this.containerTexture = new PIXI.Texture.fromImage('images/circle.png');
    this.moveTexture = new PIXI.Texture.fromImage('images/moveButton.png');
    this.maskTexture = new PIXI.Texture.fromImage('images/mask.png');

    this.containerBtn = new PIXI.Sprite(this.containerTexture);
    this.moveBtn = new PIXI.Sprite(this.moveTexture);
    this.mask = new PIXI.Sprite(this.maskTexture);
    this.x = 77.5;
    this.y = 77.5;
    this.moving = false;

    this.moveBtn.x = 38*GAME.ratio;
    this.moveBtn.y = 36*GAME.ratio;
}

GAME.button.prototype.createButton = function() {
	this.containerBtn.anchor.x = 0;
    this.containerBtn.anchor.y = 0;
    this.containerBtn.alpha = 0;

    this.containerBtn.position.x = 15*GAME.ratio;
    this.containerBtn.position.y = 20*GAME.ratio;

    this.moveBtn.anchor.x = 0;
    this.moveBtn.anchor.y = 0;
    this.moveBtn.alpha = 0;

    this.moveBtn.position.x = 43*GAME.ratio;//38
    this.moveBtn.position.y = 46*GAME.ratio;//36

    this.mask.anchor.x = 0;
    this.mask.anchor.y = 0;

    
    this.containerBtn.width = this.containerBtn.height 
    = this.mask.width = this.mask.height = 135*GAME.ratio;
    this.moveBtn.width = this.moveBtn.height = 80*GAME.ratio;

    this.mask.position.x = 15*GAME.ratio;
    this.mask.position.y = 20*GAME.ratio;
    this.mask.buttonMode = true;
    this.mask.interactive = true;
    var self = this;

    this.mask.on('touchstart',function (data){
        var e = data.data.originalEvent;
        var touches = e.changedTouches;
        this.data = data.data;
        self.moving = true;
        this.dragging = true;

        for(var i=0;i<touches.length;i++){
            ongoingTouches.push(copyTouch(touches[i]));
            self.x = touches[0].pageX;
            self.y = touches[0].pageY;
        }
    }).on('touchmove',function (data){
        if(this.dragging){
            var e = data.data.originalEvent;
            var touches = e.changedTouches;
            self.moving = true;

            if(self.y<0){
                self.moving = false;
                this.dragging = false;
            }

            for(var i=0;i<touches.length;i++){
                var idx = ongoingTouchIndexById(touches[i].identifier);
                if(idx>-1){
                    self.x = touches[i].pageX;
                    self.y = touches[i].pageY;

                    ongoingTouches.splice(idx, 1, copyTouch(touches[i]));
                }
            }
        }
    }).on('touchend',function (data){
        var e = data.data.originalEvent;
        var touches = e.changedTouches;
        e.preventDefault();

        for(var i=0;i<touches.length; i++){
            var idx = ongoingTouchIndexById(touches[i].identifier);
            if(idx>-1){
                self.moving = false;
                this.dragging = false;
                this.data = null;
                ongoingTouches.splice(idx, 1);
            }
        }
    }).on('touchendoutside', function (data){
        var e = data.data.originalEvent;
        var touches = e.changedTouches;
        e.preventDefault();

        for(var i=0;i<touches.length; i++){
            var idx = ongoingTouchIndexById(touches[i].identifier);
            if(idx>-1){
                self.moving = false;
                this.dragging = false;
                this.data = null;
                ongoingTouches.splice(idx, 1);
            }
        }
    }).on('touchcancel', function (data){
        var e = data.data.originalEvent;
        var touches = e.changedTouches;
        e.preventDefault();

        for (var i=0; i < touches.length; i++) {
            ongoingTouches.splice(i, 1);
        }
    });

    background.backgroundSprite.on('touchstart',function (data){
        var e = data.data.originalEvent;
        var touches = e.changedTouches;
        this.data = data.data;

        for(var i=0;i<touches.length;i++){
            ongoingTouches.push(copyTouch(touches[i]));
        }
    }).on('touchend',function (data){
        var e = data.data.originalEvent;
        var touches = e.changedTouches;
        e.preventDefault();

        for(var i=0;i<touches.length; i++){
            var idx = ongoingTouchIndexById(touches[i].identifier);
            if(idx>-1){
                self.moving = false;
                this.dragging = false;
                this.data = null;
                ongoingTouches.splice(idx, 1);
            }
        }
    }).on('touchendoutside',function (data){
        var e = data.data.originalEvent;
        var touches = e.changedTouches;
        e.preventDefault();

        for(var i=0;i<touches.length; i++){
            var idx = ongoingTouchIndexById(touches[i].identifier);
            if(idx>-1){
                self.moving = false;
                this.dragging = false;
                this.data = null;
                ongoingTouches.splice(idx, 1);
            }
        }
    });

    stage.addChild(this.containerBtn);
    stage.addChild(this.moveBtn);
    stage.addChild(this.mask);

};

GAME.button.prototype.moveTo = function (obj,x,y){
    //小圆圆心
    //obj.position.x+40  obj.position.y+40
    //大圆圆心
    //82.5,87.5
    if(obj.position.x+40*GAME.ratio>x) obj.position.x-=2.5;
    if(obj.position.x+40*GAME.ratio<x) obj.position.x+=2.5;
    if(obj.position.y+42*GAME.ratio>y) obj.position.y-=2.5;
    if(obj.position.y+42*GAME.ratio<y) obj.position.y+=2.5;
}

GAME.button.prototype.btnControl = function (){
    if(this.moving){
        var locate = get_XY(82.5*GAME.ratio,87.5*GAME.ratio,67.5*GAME.ratio,40*GAME.ratio,this.x,this.y);
        this.moveTo(this.moveBtn,locate.x,locate.y);
        locate.x>95*GAME.ratio?hansen.flyTop():hansen.flyStop();
        locate.x<76*GAME.ratio?hansen.flyDown():hansen.flyDownStop();
        locate.y>95*GAME.ratio?hansen.flyAhead():hansen.flyAheadStop();
        locate.y<76*GAME.ratio?hansen.flyBack():hansen.flyBackStop();
    }else{
        this.moveTo(this.moveBtn,82.5*GAME.ratio,87.5*GAME.ratio);
        hansen.flyStop();
    } 
}