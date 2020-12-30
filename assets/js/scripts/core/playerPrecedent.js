app.core.player = {

    init: function(){
        
    },
    preload: function(){
        // Load the main player assets (image/audio)
        // Chargement des assets du player (image/audio)

        // Spritesheet
        game.load.spritesheet('spritePlayer', 'assets/images/sprites/player/sprite.png', 133, 155);

        // Audio
        // game.load.audio('jump',     ['assets/audio/player/jump.mp3', 'assets/audio/player/jump.ogg']);
        game.load.audio('collect',  ['assets/audio/bonus/collect.mp3', 'assets/audio/bonus/collect.ogg']);
    },
    create: function(){
        app.data.player = game.add.sprite(32*10, 32*4, 'spritePlayer');
        app.data.player.personality=0;
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

        // ==========================PARANO===========================
        app.data.player.animations.add('walk2', [0,1,2,3,4,5,6,7]);
        app.data.player.animations.add('idle2', [34,35]);
        app.data.player.animations.add('jumpUp2', [40]);
        app.data.player.animations.add('jumpDown2', [41]);
        app.data.player.animations.add('jumpFall2', [30]);
        
        app.data.player.body.gravity.y = 1000;
        app.data.player.body.bounce.y = 0;
        app.data.player.body.linearDamping = 1;
        // app.data.player.body.collideWorldBounds = true;

    },

    update: function(){
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

        this.checkActions();
    },

    // Fonction call when the player collide gems
    // Fonction appellée lorsque le player entre en collision avec une gem
    // ==========
    collectGem: function (player, gem) {
        gem.kill();
        app.data.sounds.collect.play();
        app.data.score += 10;
        // Changement de l'affichage du score à l'écran
        app.data.scoreText.text = 'Score : ' + app.data.score;

    },

    checkActions: function(){
        // ==========================MOVEMENT===========================
        if (app.data.cursors.left.isDown){ // <<<< GO LEFT <<<<
            app.data.player.animations.play('walk'+app.data.player.personality+'', 10, true);
            app.data.player.body.velocity.x = -app.data.player.speedX;
            // flip left sprite
            app.data.player.scale.x = -1;

        }else if (app.data.cursors.right.isDown){ // >>>> GO RIGHT >>>>
            app.data.player.animations.play('walk'+app.data.player.personality+'', 10, true);
            app.data.player.body.velocity.x = app.data.player.speedX;
            // flip right sprite
            app.data.player.scale.x = 1;

        }else{ // |||| STAND UP ||||
            app.data.player.animations.play('idle'+app.data.player.personality+'', 1.5, true);
        }
        
        // ^^^^ JUMP ^^^^
        if (app.data.cursors.up.isDown && app.data.player.body.touching.down) { 
            // le touching.down permet de s'assurer que le body du joueur touche bien un autre objet vers le bas (pour nous, le sol et les plateformes)         
            app.data.player.body.velocity.y = -app.data.player.speedY;
            // app.data.sounds.jump.play();
        }
        if(app.data.player.body.velocity.y<0){ // START JUMP SPRITE
            app.data.player.animations.play('jumpUp'+app.data.player.personality+'', .005, false);
            app.data.player.isJumping=true;
        }
        if(app.data.player.body.velocity.y>0){ // START FALL SPRITE
            app.data.player.animations.play('jumpDown'+app.data.player.personality+'', .005, false);
            app.data.player.isJumping=true;
        }

        // ==========================PAUSE===========================
        if ( app.data.input.pauseKey.isDown && app.data.canPress.pauseKey){
            app.data.canPress.pauseKey = false;
            console.log('pause');
        }
        if( app.data.input.pauseKey.isUp ){
            app.data.canPress.pauseKey = true;
        }

        // ==========================PERSONALITY===========================
        if((app.data.input.personalityPlus.isUp && app.data.input.personalityMin.isUp) && !app.data.canPress.personality ){
            app.data.canPress.personality = true;
        }
        //increment personality
        if( app.data.input.personalityPlus.isDown && app.data.canPress.personality ){
            app.data.player.personality ++;
            app.data.canPress.personality = false;
            if ( app.data.player.personality > 2){
                app.data.player.personality = 0;
            }
            console.log(app.data.player.personality);
        }
        //decrement personality
        if( app.data.input.personalityMin.isDown && app.data.canPress.personality ){
            app.data.player.personality --;
            app.data.canPress.personality = false;
            if ( app.data.player.personality < 0 ){
                app.data.player.personality = 2;
            }
            console.log(app.data.player.personality);
        }
        
        

    },

    fallInRavine:function(){
        console.log('patapouf !');
    }
    // sleep: function (milliSeconds){
    //     var startTime = new Date().getTime();
    //     while (new Date().getTime() < startTime + milliSeconds);
    // }

};