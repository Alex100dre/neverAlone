app.core.platform = {
    
    preload:function(){
        
    },

    init:function(){
        this.createPlatformClass();
        this.createPlatformType();
        // // app.data.enemyList[0] = this.createEnemy('Dog');

        // Ajout d'un groupe qui contiendra les plates-formes du jeu
        app.data.platforms = game.add.group();
        app.data.platforms.enableBody = true;

        if(!app.data.settings.enableDebugging){
            blockStart = this.createPlatform(0,0, 1, game.world.height);
            blockEnd = this.createPlatform(game.world.width,0, 1, game.world.height);
            // console.log(blockEnd);
            app.data.platforms.add(blockStart.spritesheet,blockEnd.spritesheet);
            app.data.platforms.add(blockEnd.spritesheet);
        };

        // // var p = new Phaser.point(200,200);
        var lvl=app.data['lvl'+app.data.currentlvl];

        for(var i = 0; i < lvl.Platform.length; i++){
            app.data.platformList[i] = this.createPlatform(lvl.Platform[i].x, lvl.Platform[i].y, lvl.Platform[i].width, lvl.Platform[i].height);
            app.data.platforms.add(app.data.platformList[i].spritesheet);
        }
    },

    createPlatform: function( x, y, width, height ){
        var e = new app.data.platformType.Platform(x,y,width,height);
        // console.log(e);
        return e;
    },

    // ================================PLATFORM CLASS=================================
    createPlatformClass:function() {
        app.data.Platform = function (type, x, y, width, height, gravity, speedX, speedY, bounce, hitBox, spritesheet ){
                this.x           = x           || 0;
                this.y           = y           || 0;
                this.gravity     = gravity     || 500;
                this.bounce      = bounce      || 0;
                this.speedX      = speedX      || 5;
                this.speedY      = speedY      || 5;
                this.width       = width       || 300;
                this.height      = height      || 300;
                this.spritesheet = spritesheet || null;
                this.type        = type        || "unknow";

                this.hitBox      = {
                    width  : hitBox.width || 100,
                    height : hitBox.height || 100,
                    x      : hitBox.x || 0,
                    y      : hitBox.y || 0
                };
            }
        app.data.Platform.prototype={
            resizeSprite: function(){
                this.spritesheet.width=this.width;
                this.spritesheet.height=this.height;
                this.spritesheet.index=this.index;
            },
            enablePhysicsFix:function(){
                game.physics.arcade.enableBody(this.spritesheet);
                // this.spritesheet.body.setSize(this.hitBox.width, this.hitBox.height, this.hitBox.x, this.hitBox.y);
                this.spritesheet.body.immovable = true;
                // this.spritesheet.anchor.setTo(0.5, 0.5);
            },
            enablePhysicsDynamic:function(){
                game.physics.arcade.enableBody(this.spritesheet);
                this.spritesheet.body.setSize(this.hitBox.width, this.hitBox.height, this.hitBox.x, this.hitBox.y);
                this.spritesheet.body.gravity.y = this.gravity;
                this.spritesheet.body.bounce.y = this.bounce;
                // this.spritesheet.anchor.setTo(0.5, 0.5);
            },
            testType:function(){
                console.log(this.type);
                console.log(app.data.platformList[this.type].spritesheet);
            }
        }

    },

    createPlatformType:function(){
        app.data.platformType.Platform = function(x, y, width, height){
            app.data.Platform.call(this, 'Platform', x, y, width, height, 0, 20, 20, 0, {width:width,height:height,x:0,y:0}, game.add.sprite(x, y, null) );
            this.resizeSprite();
            this.enablePhysicsFix();
        }
        app.data.platformType.Platform.prototype = Object.create(app.data.Platform.prototype);
    }

};