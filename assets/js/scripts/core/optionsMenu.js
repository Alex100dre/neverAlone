app.core.optionsMenu = {

    init: function(){
        // this.createScene();
    },

    preload: function(){
        // Images
        game.load.image('bg', 'assets/images/sprites/ui/menu/bg.jpg');
        game.load.spritesheet('btn2', 'assets/images/sprites/ui/menu/play.png', 345, 183);
        game.load.spritesheet('btn1', 'assets/images/sprites/ui/menu/options.png', 345, 183);
        game.load.spritesheet('btn0', 'assets/images/sprites/ui/menu/credits.png', 345, 183);
    },

    create: function(){

        //Menu panel
        game.add.sprite(0,0,'bg');
        that = app.core.optionsMenu;
        var btnTab = [];
        for(var i =0; i < 3; i++){
            btn = game.add.button(game.camera.width*.5, -100, 'btn'+i, that.actionOnClick, this, 1, 0, 0);
            btnTab.push(btn);
            btn.anchor.setTo(0.5, 0.5);
            game.add.tween(btn).to({y: game.camera.height-100-btn.height*i}, 800, Phaser.Easing.Bounce.Out, true, 400*i, false);
        }
        btnTab[2].name = 'jouer';
        btnTab[1].name = 'options';
        btnTab[0].name = 'credits';

        
        // play = game.add.button(game.camera.width*.5, -100, 'play', that.actionOnClick, this, 1, 0, 0);
        // play.anchor.setTo(0.5, 0.5);
        


    },

    update: function(){

    },

    render : function(){

    },

    actionOnClick:function(btn){
        // console.log(btn.name);
        game.state.start(btn.name);
    }
}