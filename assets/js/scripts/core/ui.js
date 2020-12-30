app.core.ui = {

    init: function(){
        // this.createScene();
    },

    preload: function(){
        // Images
        game.load.image('personalityBoard', 'assets/images/sprites/ui/personality.png');
        game.load.image('pause', 'assets/images/sprites/ui/pause.png');
        game.load.image('pause', 'assets/images/sprites/ui/continue.png');
        game.load.image('pause', 'assets/images/sprites/ui/restart.png');
        game.load.image('pause', 'assets/images/sprites/ui/quit.png');
        game.load.image('loose', 'assets/images/sprites/ui/ig/gameOver.png');
        game.load.image('win', 'assets/images/sprites/ui/ig/win.png');
    },

    create: function(){
        //personalityBoard
        bgX=1280;
        personalityBoard = game.add.sprite(1280-156, 85, 'personalityBoard');
        personalityBoard.anchor.setTo(0.5, 0.5);
        personalityBoard.fixedToCamera = true;
        personalityBoard.angleSaved = personalityBoard.angle;
        app.data.personalityBoard = personalityBoard;
        app.data.menu = game.add.group();
    },

    update: function(){

    },

    personalityBoardRotation: function(sens){

        // app.data.personalityBoard.angle += 1*sens;
         
        game.add.tween(app.data.personalityBoard).to({angle: app.data.personalityBoard.angleSaved+120*sens}, 500, Phaser.Easing.Quadratic.InOut, true, 0, false);
        app.data.personalityBoard.angleSaved += 120*sens;
        // if(MATH.abs(app.data.personalityBoard.angle) >= 120){
        //     app.data.personalityBoard.angle = 120*sens
        // }else if((MATH.abs(app.data.personalityBoard.angle) == 0){
        //     app.data.personalityBoard.angle = 0;
        // }
        console.log(app.data.personalityBoard.angle);
    },

    drawPauseMenu: function(){
        if(app.data.isPaused){
            //cache rectangle
            // cache = new Phaser.Rectangle(0, 0, game.canvas.width, game.canvas.height);
            // app.data.cachePause = cache;

            //Pause panel
            menu = game.add.sprite(game.camera.x+game.camera.width*.5, game.camera.y+game.camera.height*.5, 'pause');
            menu.anchor.setTo(0.5, 0.5);
            menu.fixedToCamera = true;
            // app.data.menu.add(menu);
            app.data.pause = menu;
        }else{
            app.data.pause.destroy();
        }
    },

    drawLoose:function(){
        if(!app.data.player.isDead){
            //Pause panel
            app.data.sounds.die.play();
            // menu = game.add.sprite(game.camera.width*.5, game.camera.height*.5, 'loose');
            that = this;
            menu = game.add.button(game.camera.width*.5, game.camera.height*.5, 'loose', that.actionOnClick, this, 0, 0, 0);
            menu.anchor.setTo(0.5, 0.5);
            menu.fixedToCamera = true;
            app.data.loose=menu;
            // console.log(app.data.player.isDead);
            // console.log(app.data.loose);
            app.data.player.body.velocity.x =0;
            app.data.player.body.velocity.y =0;
            app.data.player.isDead = true;
            app.data.sounds.theme.stop();
        }
    },

    drawWin:function(){
        if(!app.data.player.isDead && !app.data.gameIsFinished){
            that = this;
            menu = game.add.button(game.camera.width*.5, game.camera.height*.5, 'win', that.actionOnClickWin, this, 0, 0, 0);
            menu.anchor.setTo(0.5, 0.5);
            menu.fixedToCamera = true;
            app.data.win=menu;
            app.data.gameIsFinished = true;
            app.data.player.animations.play('idle'+app.data.player.personality, 1.5,true);
            app.data.player.body.velocity.x=0;
            app.data.player.body.velocity.y=0;
            app.data.sounds.theme.stop();
        }
    },

    actionOnClick:function(){
        app.data.score=0;
        game.state.start('lvl'+app.data.currentlvl);
    },
    actionOnClickWin:function(){
        app.data.score=0;
        game.state.start('jouer');
        app.data.gameIsFinished = false;
    }
};