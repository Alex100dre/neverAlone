app.core = {
    // Test level
    initlvl0: function(game){
       app.data.currentlvl = 0;
       app.core.preload(game);
       app.data.settings.enableDebugging=true;
    },

    // real levels
    initlvl1: function(game){
       app.data.currentlvl = 1;
       app.core.preload(game);
    },

    initlvl3: function(game){
       app.data.currentlvl = 3;
       app.core.preload(game);
    },
    

    /* ======================================PRELOAD=================================== */
    preload: function (game) {
        console.log(game);
        app.core.scene.preload();
        app.core.player.preload();
        app.core.enemy.preload();
        app.core.item.preload();
        app.core.ui.preload();
    },

    /* ======================================CREATE=================================== */
    create: function (game) {
        app.core.gamepad.init();

        // Start the "ARCADE" physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Cursors for keyboard controls
        app.data.cursors = game.input.keyboard.createCursorKeys();
        app.core.keyInput.init();
        app.core.keyInput.checkInputNative();

        // Create the scene
        app.core.scene.create();
        
        // Create the enemies
        app.core.enemy.init();

        // Create the items/obstacles/bonus etc...
        app.core.item.init();
        
        // Create the player
        app.core.player.create();
        game.camera.follow(app.data.player);

        // Create the user interface
        app.core.ui.create();

        
        
    },

    /* ======================================UPDATE=================================== */
    update: function (game) {

        // app.core.gamepad.checkGamepad();

        if(app.data.player.isDead === false){

            // Active la collision entre le player et les éléments du groupe 'platforms'
            game.physics.arcade.collide(app.data.player, app.data.platforms);
            // Active la collision entre les éléments du groupe 'gems' et ceux du groupe 'platforms'
            game.physics.arcade.collide(app.data.gems, app.data.platforms);

            // Si on détecte une collision entre le player et les éléments du groupe 'gems', alors on fait appel à la fonction 'collectGem()' définie plus bas
            game.physics.arcade.overlap(app.data.player, app.data.gems, app.core.player.collectGem, null, this);

            // game.physics.arcade.overlap(app.data.player, app.data.ravineList[0].body, app.core.player.fallInRavine, null, this);
            if(app.data.gameIsFinished===false){
                //  Gestion du déplacement du joueur
                app.core.player.update();
                app.core.enemy.updateEnemy();
            }
            if(app.data.player.x >= game.world.width-500){
                app.core.ui.drawWin();
            }

            // game.physics.arcade.collide(app.data.enemyList[0].spritesheet, app.data.platforms);
            // game.physics.arcade.collide(app.data.enemyList[1].spritesheet, app.data.platforms);
            game.physics.arcade.collide(app.data.doors, app.data.platforms);
            game.physics.arcade.collide(app.data.doors, app.data.player);
            game.physics.arcade.collide(app.data.doors, app.data.enemies);
            game.physics.arcade.collide(app.data.enemies, app.data.platforms);
            game.physics.arcade.collide(app.data.enemies, app.data.enemies);
            game.physics.arcade.overlap(app.data.punch, app.data.enemies, app.core.player.killEnemy, null, this);
            game.physics.arcade.overlap(app.data.player, app.data.enemies, app.core.enemy.attackPlayer, null, this);
            game.physics.arcade.overlap(app.data.punch, app.data.levers, app.core.item.unlockDoorAt, null, this);
            // game.physics.arcade.overlap(app.data.enemies, app.data.enemies, app.core.enemy.queue, null, this);
            game.physics.arcade.overlap(app.data.player, app.data.endLVL, app.core.ui.drawWin, null, this);
            
            if(app.data.isPaused){
                console.log('pause');
            }
        }else{
            console.log('game over');
        }
    },

    /* ======================================RENDER=================================== */
    render: function (game) {
        //Debugging
        if (app.data.settings.enableDebugging) {
            //game.debug.cameraInfo(game.camera, 16, 16);
            game.debug.body(app.data.player);
            game.debug.body(app.data.punch);
            game.debug.body(app.data.endLVL);
            for(var i =0; i<app.data.enemyList.length; i++){
                game.debug.body(app.data.enemyList[i].spritesheet);
            }
            for(var i =0; i<app.data.itemList.length; i++){
                game.debug.body(app.data.itemList[i].spritesheet);
            }
            // game.debug.body(app.data.floor);
            for(var i = 0; i<app.data.platformList.length; i++){
                game.debug.body(app.data.platformList[i].spritesheet);
            }
            for(var i = 0; i<app.data.floorList.length; i++){
                game.debug.body(app.data.floorList[i]);
            }
            

            // game.debug.geom(app.data.floor,'#0fffff');
        }

        //Pause
        if(app.data.isPaused){
            // game.debug.geom(app.data.cachePause,'#000');
            // app.data.menu.bringToTop();
        }
    }
};