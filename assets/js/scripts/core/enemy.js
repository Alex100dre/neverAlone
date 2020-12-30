app.core.enemy = {
    
    preload:function(){
        // Spritesheet
        game.load.spritesheet('spriteDog', 'assets/images/sprites/enemy/dog/sprite.png', 150, 150);
        game.load.spritesheet('spriteZombie', 'assets/images/sprites/enemy/zombie/sprite.png', 150, 150);
        game.load.spritesheet('spriteGolem', 'assets/images/sprites/enemy/golem/sprite.png', 159, 165);

        // Audio
        game.load.audio('dogDead',  ['assets/audio/enemy/dog/dead.mp3', 'assets/audio/enemy/dog/dead.ogg']);
    },

    init:function(){
        this.createEnemyClass();
        this.createEnemyTypes();
        // app.data.enemyList[0] = this.createEnemy('Dog');
        app.data.enemies = game.add.group();
        // var p = new Phaser.point(200,200);
        var lvl=app.data['lvl'+app.data.currentlvl];

        for(var i = 0; i < lvl.Enemies.length; i++){
            app.data.enemyList[i] = this.createEnemy(lvl.Enemies[i].type, lvl.Enemies[i].x, lvl.Enemies[i].y);
            app.data.enemies.add(app.data.enemyList[i].spritesheet);
        }

        // app.data.enemyList[0] = this.createEnemy('Dog', 500, 100);
        // app.data.enemyList[1] = this.createEnemy('Dog', 1000, 100);
        // app.data.enemyList[2] = this.createEnemy('Dog', 1500, 100);
        // app.data.enemyList[3] = this.createEnemy('Dog', 1200, 100);
        // app.data.enemyList[4] = this.createEnemy('Dog', 1900, 100);
    },

    // createDogTest: function(){
    //     app.data.enemyList.Dog = new app.data.enemyType.Dog();
    //     // app.data.enemyList.Dog.testType();

    //     app.data.enemyList.Dog.createAnimationWalk([0,1,2,3,4,5,6]);
    //     app.data.enemyList.Dog.createAnimationIdle([7,8]);
    //     app.data.enemyList.Dog.setPhysics();
    // },

    createEnemy: function(type, x, y){
        if(app.data.enemyType[type] == undefined)    return false;
        var e = new app.data.enemyType[type](x,y);
        e.spritesheet.isDead = false;
        console.log(e.spritesheet.body);
        return e;
    },

    updateEnemy: function(){
        // app.data.enemyList.Dog.walk();
        for(var i =0; i<app.data.enemyList.length; i++){
            app.data.enemyList[i].detectPlayer();
        }
        // app.data.enemyList.Dog.walk([8,9,10,11,12,13,14,15]);
    },
    attackPlayer: function (player, enemy) {
        // var nbLifes = app.data.lifes.countLiving();
        // console.log(app.data.player.nbLife);
        if(enemy.isDead) return false;
        app.core.player.hurt(1, player, enemy); //enemy.strength à la place du 1 pour enlever 2 coeurs plus tard 
    },
    // queue: function(enemy1, enemy2){
    //     var distE1 = Math.abs(enemy1.x)-app.data.player.x; 
    //     var distE2 = Math.abs(enemy2.x)-app.data.player.x; 
    //     enemy1.idle();
    // },
    die: function(player, enemy, hit){
        tryDie = hit - Date.now();
        if(tryDie < -1000){
            enemy.kill();
        }else{
            that = this;
            setTimeout(function(){ that.die(player, enemy, hit); }, 1000);
            
        }
        
    },

    // ================================ENNEMY CLASS=================================
    createEnemyClass:function() {
        app.data.Enemy = function (type, x, y, width, height, gravity, speedX, speedY, strength, visionLimit, hitBox, spritesheet ){
                this.x           = x           || 0;
                this.y           = y           || 0;
                this.gravity     = gravity     || 500;
                this.speedX      = speedX      || 5;
                this.speedY      = speedY      || 5;
                this.width       = width       || 300;
                this.height      = height      || 300;
                this.strength    = strength    || 1;
                this.visionLimit = visionLimit || 1000;
                this.spritesheet = spritesheet || null;
                this.type        = type        || "unknow";

                this.hitBox      = {
                    width  : hitBox.width || 100,
                    height : hitBox.height || 100,
                    x      : hitBox.x || 0,
                    y      : hitBox.y || 0
                };
            }
        app.data.Enemy.prototype={
            addSprite: function(){
                // app.data.enemyList[this.type] = this.spritesheet;
            },
            setPhysics:function(){
                game.physics.arcade.enableBody(this.spritesheet);
                this.spritesheet.body.setSize(this.hitBox.width, this.hitBox.height, this.hitBox.x, this.hitBox.y);
                this.spritesheet.body.gravity.y = this.gravity;
                this.spritesheet.body.bounce.y = 0;
                this.spritesheet.anchor.setTo(0.5, 0.5);
                this.spritesheet.strength = this.strength;
            },
            createAnimationWalk: function(frames){
                this.spritesheet.animations.add('walk', frames);
            },
            createAnimationIdle: function(frames){
                this.spritesheet.animations.add('idle', frames);
            },
            createAnimationAttack: function(frames){
                this.spritesheet.animations.add('attack', frames);
            },
            createAnimationHurt:function(frames){
                this.spritesheet.animations.add('hurt', frames);
            },
            createAnimationDie:function(frames){
                this.spritesheet.animations.add('die', frames);
            },
            walk:function(direction){
                this.spritesheet.animations.play('walk', 6, true);
                this.spritesheet.body.velocity.x = direction*this.speedX;
                this.spritesheet.scale.x = -direction;
            },
            idle:function(){
                this.spritesheet.animations.play('idle', 3, true);
                this.spritesheet.body.velocity.x = 0;
            },
            attack:function(){
                this.spritesheet.animations.play('attack', 5, true);
            },
            hurt:function(){
                this.spritesheet.animations.play('hurt', 5, true);
            },
            die:function(){
                this.spritesheet.animations.play('die', 5, false);
            },
            detectPlayer:function(){
                if(this.spritesheet.isDead == true) {
                    this.spritesheet.body.velocity.x = 0;
                    return false;
                }
                if(this.spritesheet.x-app.data.player.x < 50 && this.spritesheet.x-app.data.player.x > -50){
                    // console.log('idle');
                    this.idle();
                }else if(this.spritesheet.x-app.data.player.x > 0 && Math.abs(this.spritesheet.x-app.data.player.x) <this.visionLimit){
                    // console.log('left');
                    this.walk(-1);
                }else if(this.spritesheet.x-app.data.player.x < 0 && Math.abs(this.spritesheet.x-app.data.player.x) <this.visionLimit){
                    // console.log('right');
                    this.walk(1);
                }
            },
            testType:function(){
                console.log(this.type);
                console.log(app.data.enemyList[this.type].spritesheet);
            }
        }

    },

    createEnemyTypes:function(){
        app.data.enemyType.Dog = function(x, y){
            app.data.Enemy.call(this, 'Dog', x, y, 150, 150, 1500, 20, 20, 1, 1000, {width:120,height:100,x:0,y:0}, game.add.sprite(x, y, 'spriteDog') );
            this.createAnimationWalk([0,1,2,3,4,5,6]);
            this.createAnimationIdle([7,8]);
            this.createAnimationDie([9,10]); // /!\
            this.setPhysics();
        }
        app.data.enemyType.Dog.prototype = Object.create(app.data.Enemy.prototype);

        //TRUCS BIZZARES AVEC LES SPRITES
        app.data.enemyType.Zombie = function(x, y){
            app.data.Enemy.call(this, 'Zombie', x, y, 150, 150, 1500, 20, 20, 2, 1000, {width:120,height:100,x:0,y:0}, game.add.sprite(x, y, 'spriteZombie') );
            this.createAnimationWalk([0,1,2,3,4,5,6]);
            this.createAnimationIdle([8,7]); // /!\
            this.createAnimationDie([9,10]);
            this.setPhysics();
        }
        app.data.enemyType.Zombie.prototype = Object.create(app.data.Enemy.prototype);

        app.data.enemyType.Golem = function(x, y){
            app.data.Enemy.call(this, 'Golem', x, y, 159, 165, 1500, 20, 20, 2, 500, {width:150,height:155,x:0,y:0}, game.add.sprite(x, y, 'spriteGolem') );
            this.setPhysics();
        }
        app.data.enemyType.Golem.prototype = Object.create(app.data.Enemy.prototype);
        
    }



};