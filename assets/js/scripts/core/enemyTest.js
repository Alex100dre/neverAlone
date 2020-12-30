app.core.enemy = {

    createDogTest: function(){
        game.load.spritesheet('spriteDog', 'assets/images/sprites/enemy/dog/sprite.png', 150, 150);
        
        // init contructors
        this.setEnemies();
        // this.setTypes();
        var test3= new app.data.Dog("meduse",12,20);
        console.log(test3)


        // app.data.enemy.dogTest = new app.data.Dog({x:1500,y:650});
        // console.log(app.data.enemy.dogTest)
    },

    updateDogTest: function(){
        // app.data.enemy.dogTest = game.add.sprite(1500, 650, 'dogSprite');
        // app.data.enemy.dogTest.initAnimations();
        // app.data.enemy.dogTest.detectPlayer();
    },

    // ================================ENNEMY CLASS=================================
    setEnemies:function() {
        app.data.Enemy = function (type, x, y, width, height, speedX, speedY, visionLimit, spritesheet){
            console.log(x,y)
                this.x           = x           || 0;
                this.y           = y           || 0;
                this.speedX      = speedX      || 5;
                this.speedY      = speedY      || 5;
                this.width       = width       || 300;
                this.height      = height      || 300;
                this.visionLimit = visionLimit || 1000;
                this.spritesheet = spritesheet || null;
                this.type        = type        || "caca";
            }
        app.data.Enemy.prototype={
            createAnimationWalk: function(frames){
                app.data.enemy[this.type].animations.add('walk', frames);
            },
            createAnimationIdle: function(frames){
                app.data.enemy[this.type].animations.add('idle', frames);
            },
            createAnimationAttack: function(frames){
                app.data.enemy[this.type].animations.add('attack', frames);
            },
            createAnimationHurt:function(frames){
                app.data.enemy[this.type].animations.add('hurt', frames);
            },
            createAnimationDie:function(frames){
                app.data.enemy[this.type].animations.add('die', frames);
            },
            walk:function(direction){
                app.data.enemy[this.type].animations.play('walk', 5, true);
                this.body.velocity.x = direction-this.speedX;
            },
            idle:function(){
                app.data.enemy[this.type].animations.play('idle', 5, true);
            },
            attack:function(){
                app.data.enemy[this.type].animations.play('attack', 5, true);
            },
            hurt:function(){
                app.data.enemy[this.type].animations.play('hurt', 5, true);
            },
            die:function(){
                app.data.enemy[this.type].animations.play('die', 5, false);
            },
            detectPlayer:function(){
                if(this.x-app.data.player.x > 0 && Math.abs(this.x-app.data.player.x) <this.visionLimit){
                    this.walk(-1);
                }else if(this.x-app.data.player.x < 0 && Math.abs(this.x-app.data.player.x) <this.visionLimit){
                    this.walk(1);
                }
            }
        }


        app.data.Dog = function (){
            this.Ouaf=function(){
                console.log("ouaf")
            }
        }

        app.data.Dog.prototype = new app.data.Enemy(); // clonage du prototype 
        app.data.Dog.prototype.constructor = app.data.Dog;
        app.data.Dog.prototype.type="dog";
        // Dog.width=300;
        // Dog.height=300;
        // Dog.speedX=5;
        // Dog.speedY=5;
        // Dog.visionLimit=1000;
        // Dog.spritesheet=app.data.enemy.dogTest;


        // console.log(Dog)
        // var test  = new Dog();
        // var test2= new Enemy();
        // console.log(test2.type)
        // console.log(test.type)







    },
    setTypes:function(){
        // ================================DOG=================================
       /* app.data.Dog=function(x, y){
            app.data.Enemy.call("dog", x, y, 300, 300, 5, 5, 1000, app.data.enemy.dogTest); //(type, x, y, width, height, speedX, speedY, visionLimit, spritesheet)

        };
        app.data.Dog.prototype = Object.create( app.data.Enemy ); // clonage du prototype 
        app.data.Dog.prototype.initAnimations = function(){
            this.createAnimationWalk(0,1,2,3,4,5,6,7);
            this.createAnimationIdle(8,9);
            // this.createAnimationAttack();
            // this.createAnimationHurt();
            this.createAnimationDie(9,10);
        };*/
        // app.data.Dog=function(x, y){
        //     app.data.Enemy.call("dog", x, y, 300, 300, 5, 5, 1000, app.data.enemy.dogTest); //(type, x, y, width, height, speedX, speedY, visionLimit, spritesheet)

        // };
        var Dog=function(){
            this.Ouaf=function(){
                console.log("ouaf")
            }
        }

        Dog.prototype = new app.data.Enemy(); // clonage du prototype 
        Dog.prototype.constructor = Dog;
        // Dog.type="dog";
        // Dog.width=300;
        // Dog.height=300;
        // Dog.speedX=5;
        // Dog.speedY=5;
        // Dog.visionLimit=1000;
        // Dog.spritesheet=app.data.enemy.dogTest;


        console.log(Dog)
        var test  = new app.data.Dog({x:1500,y:650});
        console.log(test)
    }

};