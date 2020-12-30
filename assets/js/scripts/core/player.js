app.core.player = {

    input : app.data.input,

    init: function(){
        
    },
    preload: function(){
        // Load the main player assets (image/audio)
        // Chargement des assets du player (image/audio)

        // Spritesheet
        game.load.image('life', 'assets/images/sprites/player/life.png');
        game.load.image('lifeLoosed', 'assets/images/sprites/player/lifeLoosed.png');
        game.load.spritesheet('spritePlayer', 'assets/images/sprites/player/sprite.png', 133, 155);
    },
    create: function(){
        
        app.data.player = game.add.sprite(32*10, 32*4, 'spritePlayer');
        app.data.player.isDead=false;
        app.data.player.personality=0;
        app.data.player.state = 'idle';
        app.data.player.fps = 1.5;
        app.data.player.sens = 1;
        app.data.player.nbLife = 5;
        app.data.player.lastHurt = 0;
        app.data.player.lastPunch = 0;
        // app.data.player = game.add.sprite(32*10, 32*4, 'idlePlayer');
        // rotate & flip around the center of the sprite
        // rotattion sur le centre du sprite (symetrie)
        app.data.player.anchor.setTo(0.5, 0.5);
        // width, height, translateX, translateY
        game.physics.arcade.enableBody(app.data.player);
        app.data.player.body.setSize(20, 142, 0, 3);
        // Define the 'walk' animation
        // Création de l'animation 'walk'
        // app.data.player.animations.add('walk', [0,1,2,3,4,5,6,7]);

        // ==========================SCARE===========================
        // app.data.player.animations.add('walk0', [8,9,10,11,12,13,14,15]);
        app.data.player.animations.add('walk0', [24,25,26,27,28]);
        app.data.player.animations.add('idle0', [32,33]);
        app.data.player.animations.add('jumpUp0', [38]);
        app.data.player.animations.add('jumpDown0', [39]);
        app.data.player.animations.add('jumpFall0', [30]);

        // ==========================SADIST===========================
        app.data.player.animations.add('walk1', [16,17,18,19,20,21,22,23]);
        app.data.player.animations.add('idle1', [36,37]);
        app.data.player.animations.add('jumpUp1', [42]);
        app.data.player.animations.add('jumpDown1', [43]);
        app.data.player.animations.add('jumpFall1', [30]);
        app.data.player.animations.add('action1', [29,30,31]);

        // ==========================PARANO===========================
        app.data.player.animations.add('walk2', [0,1,2,3,4,5,6,7]);
        app.data.player.animations.add('idle2', [34,35]);
        app.data.player.animations.add('jumpUp2', [40]);
        app.data.player.animations.add('jumpDown2', [41]);
        app.data.player.animations.add('jumpFall2', [30]);

        // ============================DEAD===========================
        app.data.player.animations.add('die', [44,45,46,47]);

        
        app.data.player.body.gravity.y = 1000;
        app.data.player.body.bounce.y = 0;
        app.data.player.body.linearDamping = 1;
        // app.data.player.body.collideWorldBounds = true;
        this.createPunch();
        app.data.lifes = game.add.group();
        this.drawLife(app.data.player.nbLife, 15, 1);
    },

    update: function(){
        // ==========================VARIABLES===========================
        var player = app.data.player;
        var cursors = app.data.cursors;
        var canPress = app.data.canPress;

        // Check the velocity of the player at 0 for each new frame
        // À chaque nouvelle frame la vitesse du player retourne à 0
        app.data.player.body.velocity.x = 0;

        if(app.data.player.personality==0){ 
            app.data.player.speedX = 350;
            app.data.player.speedY = 800;
        }else{
            app.data.player.speedX = 150;
            app.data.player.speedY = 650;
        }
        if(game.input.gamepad.supported && game.input.gamepad.active && game.input.gamepad.pad1.connected) {
            // console.log('Manette connectée.');
            this.checkActionsGamepad(player, cursors, canPress);
        } else {
            // console.log('Manette non connectée.');
            this.checkActions(player, cursors, canPress);
        }   
        // this.checkActions(player, cursors, canPress);
        this.updatePunch(player);
        this.checkLimits(player);
        this.checkLife(player);
    },

    drawLife: function (nbLife, x, y) {
        var lifeCache = game.cache.getImage('life');
        for (var i = 0; i < nbLife; i++) {
            life = app.data.lifes.create(x + (((lifeCache.width-10)*nbLife)-(lifeCache.width-10)*i), y, 'life');
        }
        app.data.lifes.fixedToCamera = true;
    },

    // Fonction call when the player collide gems
    // Fonction appellée lorsque le player entre en collision avec une gem
    // ==========    collectGem: function (player, gem) {
    collectGem: function (player, gem) {
        gem.kill();
        app.data.sounds.collect.play();
        app.data.score ++;
        // Changement de l'affichage du score à l'écran
        app.data.scoreText.text = app.data.score;
        app.data.scoreText.x = (game.canvas.width*.5)-(app.data.scoreText.width*.5);

    },
    killEnemy: function (player, enemy) {
        if(app.data.player.state == 'action' && app.data.player.personality == 1){
            hit = Date.now();
            enemy.animations.play('die', 2, false);
            enemy.isDead = true;
            app.data.sounds.dog.dead.play();
            app.core.enemy.die(player, enemy, hit);
            game.add.tween(enemy).to({alpha: 0, y : 600}, 800, Phaser.Easing.Quadratic.InOut, true, 650, false);
            // app.data.score += 50;
            // app.data.scoreText.text = 'Score : ' + app.data.score;
        }
    },

    checkActionsGamepad: function(player, cursors, canPress){
        // console.log(app.data.pad1._rawButtons[0].pressed);
        // ==========================MOVEMENT===========================
        player.animations.play(player.state+player.personality, player.fps, true);
        player.body.velocity.x = 0;
        player.sens  = 0;
        player.state = "idle";
        player.fps   = 1.5;
        // console.log(player);
        if( cursors.left.isDown || app.data.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.15){
            player.sens = -1;
            player.state="walk";
            player.fps=10;
        }

        if( cursors.right.isDown || app.data.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.15){
            player.sens = 1;
            player.state="walk";
            player.fps=10;
        }
        if( player.sens*player.sens >0){
            player.body.velocity.x = player.sens*player.speedX;
            // flip left sprite
           player.scale.x = player.sens;
        }

        // ^^^^ JUMP ^^^^
        if ( cursors.up.isDown &&  player.body.touching.down ||  app.data.pad1._rawButtons[2].pressed &&  player.body.touching.down) { 
            // le touching.down permet de s'assurer que le body du joueur touche bien un autre objet vers le bas (pour nous, le sol et les plateformes)         
             player.body.velocity.y = - player.speedY;
            // app.data.sounds.jump.play();
        }
        if( player.body.velocity.y != 0 &&  app.data.input.action.isUp){ // START FALL SPRITE
            player.fps = .005;
            player.body.velocity.y<0 ? player.state = 'jumpUp' : player.state = 'jumpDown';
            player.animations.play(player.state+ player.personality+'', .005, false);
            // player.isJumping=true;
        }

        // ==========================ACTIONS===========================
        if ( app.data.input.action.isDown || app.data.pad1._rawButtons[0].pressed){
            if(player.personality == 1){
                player.animations.play('action1', 10,true);
                player.state="action";
                player.fps = 10;
                var tryPunch = Date.now();
                if(player.lastPunch-tryPunch < -300){
                    app.data.sounds['action'+player.personality] ? app.data.sounds['action'+player.personality].play() : console.log('pas d\'action');
                    player.lastPunch = tryPunch;
                }
            }
        }
        // if ( app.data.input.action.isDown && app.data.canPress.action ){
        //     app.data.canPress.action = false;
            
        //     // player.animations.play('action'+player.personality, .00005, false);
        //     // app.data.sounds['action'+player.personality] ? app.data.sounds['action'+player.personality].play() : console.log('pas d\'action');
        //     // console.log('punch !')
        // }
        // if( app.data.input.action.isUp ){
        //     app.data.canPress.action = true;
        //     // player.state="idle";
        // }


        // ==========================PERSONALITY===========================
        if((this.input.personalityPlus.isUp && this.input.personalityMin.isUp) && (app.data.pad1._rawButtons[7].pressed === false && app.data.pad1._rawButtons[6].pressed === false) && !canPress.personality ){
            canPress.personality = true;
        }
        //increment personality
        if( this.input.personalityPlus.isDown && canPress.personality || app.data.pad1._rawButtons[7].pressed && canPress.personality){
            player.personality ++;
            canPress.personality = false;
            if ( player.personality > 2){
                player.personality = 0;
            }
            //console.log(player.personality);
            app.core.ui.personalityBoardRotation(-1);
        }
        //decrement personality
        if( this.input.personalityMin.isDown  && canPress.personality || app.data.pad1._rawButtons[6].pressed && canPress.personality){
            player.personality --;
            canPress.personality = false;
            if ( player.personality < 0 ){
                player.personality = 2;
            }
            //console.log(player.personality);
            app.core.ui.personalityBoardRotation(1);
        }
        
        player.personality == 2 ? app.core.item.revealHiddenObjects(.8) : app.core.item.revealHiddenObjects(0);
        
        

    },

    checkActions: function(player, cursors, canPress){
        // ==========================MOVEMENT===========================
        player.animations.play(player.state+player.personality, player.fps, true);
        player.body.velocity.x = 0;
        player.sens  = 0;
        player.state = "idle";
        player.fps   = 1.5;
        // console.log(player);
        if( cursors.left.isDown){
            player.sens = -1;
            player.state="walk";
            player.fps=10;
        }

        if( cursors.right.isDown){
            player.sens = 1;
            player.state="walk";
            player.fps=10;
        }
        if( player.sens*player.sens >0){
            player.body.velocity.x = player.sens*player.speedX;
            // flip left sprite
           player.scale.x = player.sens;
        }

        // ^^^^ JUMP ^^^^
        if ( cursors.up.isDown &&  player.body.touching.down) { 
            // le touching.down permet de s'assurer que le body du joueur touche bien un autre objet vers le bas (pour nous, le sol et les plateformes)         
             player.body.velocity.y = - player.speedY;
            // app.data.sounds.jump.play();
        }
        if( player.body.velocity.y != 0 &&  app.data.input.action.isUp){ // START FALL SPRITE
            player.fps = .005;
            player.body.velocity.y<0 ? player.state = 'jumpUp' : player.state = 'jumpDown';
            player.animations.play(player.state+ player.personality+'', .005, false);
            // player.isJumping=true;
        }

        // ==========================ACTIONS===========================
        if ( app.data.input.action.isDown){
            if(player.personality != 0){
                player.state="action";
                player.fps = 10;
                var tryPunch = Date.now();
                if(player.lastPunch-tryPunch < -200){
                    app.data.sounds['action'+player.personality] ? app.data.sounds['action'+player.personality].play() : console.log('pas d\'action');
                    player.lastPunch = tryPunch;
                }
            }
        }
        // if ( app.data.input.action.isDown && app.data.canPress.action ){
        //     app.data.canPress.action = false;
            
        //     // player.animations.play('action'+player.personality, .00005, false);
        //     // app.data.sounds['action'+player.personality] ? app.data.sounds['action'+player.personality].play() : console.log('pas d\'action');
        //     // console.log('punch !')
        // }
        // if( app.data.input.action.isUp ){
        //     app.data.canPress.action = true;
        //     // player.state="idle";
        // }


        // ==========================PERSONALITY===========================
        if((this.input.personalityPlus.isUp && this.input.personalityMin.isUp) && !canPress.personality ){
            canPress.personality = true;
        }
        //increment personality
        if( this.input.personalityPlus.isDown && canPress.personality ){
            player.personality ++;
            canPress.personality = false;
            if ( player.personality > 2){
                player.personality = 0;
            }
            //console.log(player.personality);
            app.core.ui.personalityBoardRotation(-1);
        }
        //decrement personality
        if( this.input.personalityMin.isDown && canPress.personality ){
            player.personality --;
            canPress.personality = false;
            if ( player.personality < 0 ){
                player.personality = 2;
            }
            //console.log(player.personality);
            app.core.ui.personalityBoardRotation(1);
        }
        
        player.personality == 2 ? app.core.item.revealHiddenObjects(.8) : app.core.item.revealHiddenObjects(0);
        
        

    },
    checkLimits:function(player){
        if(player.body.position.y>game.world.height){
            app.core.ui.drawLoose();
        }
    },
    // sleep: function (milliSeconds){
    //     var startTime = new Date().getTime();
    //     while (new Date().getTime() < startTime + milliSeconds);
    // }

    createPunch:function(){
        app.data.punch = game.add.sprite(0,0, null);
        game.physics.arcade.enableBody(app.data.punch);
        app.data.punch.body.setSize(15, 15, 0, 0);
        app.data.punch.anchor.setTo(0.5, 0.5);
        app.data.punch.sens = 1;
    },

    updatePunch:function(player){
        if(player.sens*player.sens > 0){
            app.data.punch.sens = player.sens;
        }
        app.data.punch.x = player.x + (50*app.data.punch.sens);
        app.data.punch.y = player.y;
    },

    hurt: function(damage, player, enemy){

        var tryHurt = Date.now();
        if(player.lastHurt-tryHurt < -1000){
            // console.log(app.data.player.lastHurt-tryHurt);
            var lifeLoosed = app.data.lifes.getFirstAlive();
            if (player.nbLife>0) {
                app.data.sounds.hurt.play();
                lifeLoosed.alive = false;
                lifeLoosed.loadTexture('lifeLoosed');
                player.nbLife-=damage;
            };
            player.lastHurt = tryHurt;
        };
    },

    checkLife:function(player){
        if(player.nbLife <= 0){
            player.animations.play('die', 2, true);
            app.core.ui.drawLoose();
        }
    }

};