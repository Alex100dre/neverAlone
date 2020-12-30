app.core.lvlMenu = {

    init: function(){
        // this.createScene();
    },

    preload: function(){
        // Images
        game.load.image('bg', 'assets/images/sprites/ui/menu/bg.jpg');
        game.load.image('lvl1', 'assets/images/sprites/ui/lvlMenu/lvlThumbnails/1.jpg');
        game.load.image('lvl2', 'assets/images/sprites/ui/lvlMenu/lvlThumbnails/2.jpg');
        game.load.image('lvl3', 'assets/images/sprites/ui/lvlMenu/lvlThumbnails/3.jpg');
        game.load.image('lvl4', 'assets/images/sprites/ui/lvlMenu/lvlThumbnails/cs.jpg');
        game.load.image('lvl5', 'assets/images/sprites/ui/lvlMenu/lvlThumbnails/cs.jpg');
        game.load.image('lvl6', 'assets/images/sprites/ui/lvlMenu/lvlThumbnails/cs.jpg');
        game.load.spritesheet('back', 'assets/images/sprites/ui/menu/back.png', 345, 183);

    },

    create: function(){

        //Menu panel
        bg=game.add.sprite(0,0,'bg');
        bg.x = game.canvas.width*.5-bg.width*.5
        that = app.core.lvlMenu;
        var x;
        var y;
        var indexX = 1;
        var indexY = 1;
        for(var i =1; i <= 6; i++){
           
            x = 252*indexX;
            y = 185*indexY;
            btn = game.add.button(x, y, 'lvl'+i, that.actionOnClick, this, 1, 0, 0);
            btn.alpha = 0;
            game.add.tween(btn).to({alpha: 1}, 400, Phaser.Easing.Quadratic.InOut, true, 50, false);
             if(i % 3 === 0){
                indexX = 1;
                indexY++;
            }else{
                indexX++;
            }
        }

        
       var btn = game.add.button(15, 15, 'back', that.actionOnClickBack, this, 1, 0, 0);
        // btn.anchor.setTo(0.5, 0.5);
        btn.name='menu';
        


    },

    update: function(){

    },

    render : function(){

    },
    actionOnClickBack:function(btn){
        game.state.start('menu');
    },

    actionOnClick:function(btn){
        if(game.state.checkState(btn.key) === true){
            app.data.lvlTarget = btn.key;
            game.state.start('loading');
        }else{
            console.log('truc');
        }
    }
}