app.core.scene = {

    init: function(){
        // this.createScene();
    },

    preload: function(){
        // Images
        // game.load.image('background'    , 'assets/images/levels/0/0.jpg');
        for(var i = 0; i <= 12; i++) {
            game.load.image('lvl0bg'+i+''   , 'assets/images/levels/'+app.data.currentlvl+'/'+i+'.jpg');
        }
        // game.load.image('gem'           , 'assets/images/sprites/gem.png');
        // game.load.image('stone'         , 'assets/images/sprites/floor.png');
        game.load.image('gemNB', 'assets/images/sprites/ui/ig/gemNB.png');

    },

    create: function(){
        //Background
        canvasWidth=game.canvas.width;
        bgX=1280;
        for (var i = 0; i <= 12; i++) {
            var bgxm = bgX*i;
            app.data.bg[i] = game.add.sprite(bgxm, 0, 'lvl0bg'+i+'');
        };
        //SIZE
        game.world.setBounds(0,0, 16371, 720);
        //Main Sound
        app.data.sounds.theme.play('',0,1,true);
        
        // SCORE
        gemLogo=game.add.sprite(15, 5, 'gemNB');
        gemLogo.x = (canvasWidth*.5)-(gemLogo.width*.5);
        gemLogo.fixedToCamera = true;
        app.data.scoreText = game.add.text(15, 15,  app.data.score, { fontSize : '24px', fill : '#fff'});
        app.data.scoreText.alpha = .7;
        app.data.scoreText.x = (canvasWidth*.5)-(app.data.scoreText.width*.5);
        app.data.scoreText.fixedToCamera = true;
        //PLATFORMS
        app.core.platform.init();

        endLVL = game.add.sprite(game.world.width-1000, 0, null);
        endLVL.width = 50;
        endLVL.height = game.world.height;
        game.physics.arcade.enableBody(endLVL);
        endLVL.body.setSize(endLVL.width, endLVL.height, endLVL.x, endLVL.y);
        endLVL.body.immovable = true;
        app.data.endLVL=endLVL;
    }

};