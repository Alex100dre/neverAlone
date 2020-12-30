app.core.item = {
    
    preload:function(){
        // Spritesheet
        game.load.spritesheet('spriteDoor', 'assets/images/sprites/items/door.png', 430, 424);
        game.load.spritesheet('spriteLever', 'assets/images/sprites/items/lever.png', 38, 82);
        game.load.image('spriteGem', 'assets/images/sprites/gem.png');

        // Audio
        // game.load.audio('dogDead',  ['assets/audio/enemy/dog/dead.mp3', 'assets/audio/enemy/dog/dead.ogg']);
    },

    init:function(){
        this.createItemClass();
        this.createItemTypes();
        // app.data.enemyList[0] = this.createEnemy('Dog');

        /*=========hidden objects==========*/
        app.data.levers = game.add.group();
        app.data.levers.alpha = 0;

        app.data.doors = game.add.group();
        app.data.gems = game.add.group();

        // var p = new Phaser.point(200,200);
        var lvl=app.data['lvl'+app.data.currentlvl];

        for(var i = 0; i < lvl.Items.length; i++){
            app.data.itemList[i] = this.createItem(lvl.Items[i].type, lvl.Items[i].x, lvl.Items[i].y,lvl.Items[i].index);
            app.data[lvl.Items[i].type+'s'].add(app.data.itemList[i].spritesheet);

            // if(lvl.Items[i].type == 'Gem'){
            //     app.data.gems.add(app.data.itemList[i].spritesheet);
            // }else{
                
            //     app.data.items.add(app.data.itemList[i].spritesheet);
            // }
        }
    },

    createItem: function(type, x, y, index){
        var typeFirstMaj = app.utils.firstCharCap(type);
        if(app.data.itemType[typeFirstMaj] == undefined)    return false;
        var bounce = app.utils.rand(0.4, 0.6);
        var e = new app.data.itemType[typeFirstMaj](x,y,index,bounce);
        e.spritesheet.isDead = false;
        console.log(e);
        return e;
    },

    updateItem: function(){
        // app.data.enemyList.Dog.walk();
        // for(var i =0; i<app.data.itemList.length; i++){
            
        // }
        
    },
    unlockDoorAt: function(player, lever){
        if(app.data.player.state == 'action' && app.data.player.personality == 1){
            app.data.doors.forEachAlive(function(door){
               if(door.index == lever.index){
                    hit = Date.now();
                    lever.animations.play('switch', 1.5, false);
                    game.add.tween(door).to({alpha: 0}, 1000, Phaser.Easing.Quadratic.InOut, true, 150, false);
                    app.core.item.destroy(door, hit);
               }
            });
        }
    },
    destroy: function(item, hit){
        tryDestroy = hit - Date.now();
        if(tryDestroy < -1000){
            item.kill();
        }else{
            that = this;
            setTimeout(function(){ that.destroy(item, hit); }, 1000);
            
        }
        
    },
    revealHiddenObjects: function(val){
        game.add.tween(app.data.levers).to({alpha: val}, 100, Phaser.Easing.Quadratic.InOut, true, 0, false);
    },

    // ================================ENNEMY CLASS=================================
    createItemClass:function() {
        app.data.Item = function (type, x, y, width, height, gravity, speedX, speedY, index, bounce, hitBox, spritesheet ){
                this.x           = x           || 0;
                this.y           = y           || 0;
                this.gravity     = gravity     || 500;
                this.bounce      = bounce      || 0;
                this.speedX      = speedX      || 5;
                this.speedY      = speedY      || 5;
                this.width       = width       || 300;
                this.height      = height      || 300;
                this.index       = index       || null;
                this.spritesheet = spritesheet || null;
                this.type        = type        || "unknow";

                this.hitBox      = {
                    width  : hitBox.width || 100,
                    height : hitBox.height || 100,
                    x      : hitBox.x || 0,
                    y      : hitBox.y || 0
                };
            }
        app.data.Item.prototype={
            resizeSprite: function(){
                this.spritesheet.width=this.width;
                this.spritesheet.height=this.height;
                this.spritesheet.index=this.index;
            },
            enablePhysicsFix:function(){
                game.physics.arcade.enableBody(this.spritesheet);
                this.spritesheet.body.setSize(this.hitBox.width, this.hitBox.height, this.hitBox.x, this.hitBox.y);
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
                console.log(app.data.itemList[this.type].spritesheet);
            }
        }

    },

    createItemTypes:function(){
        app.data.itemType.Door = function(x, y, index, bounce){
            app.data.Item.call(this, 'Door', x, y-405, 430, 424, 200, 20, 20, index, bounce, {width:20,height:405,x:150,y:0}, game.add.sprite(x, y-405, 'spriteDoor') );
            this.resizeSprite();
            this.enablePhysicsFix();
        }
        app.data.itemType.Door.prototype = Object.create(app.data.Item.prototype);

        app.data.itemType.Lever = function(x, y, index, bounce){
            app.data.Item.call(this, 'Lever', x, y, 38, 82, 200, 20, 20, index, bounce, {width:38,height:82,x:0,y:0}, game.add.sprite(x, y, 'spriteLever') );
            this.resizeSprite();
            this.enablePhysicsFix();
            this.createAnimLever();
        }
        app.data.itemType.Lever.prototype = Object.create(app.data.Item.prototype);
        app.data.itemType.Lever.prototype.createAnimLever=function(){
            this.spritesheet.animations.add('switch', [0,1]);
        }
        app.data.itemType.Lever.prototype.animLever=function(){
            this.spritesheet.animations.play('switch', 1.5, false);
        }

        app.data.itemType.Gem = function(x, y, index, bounce){
            app.data.Item.call(this, 'Gem', x, y, 50, 50, 2000, 20, 20, index, bounce, {width:50,height:50,x:0,y:0}, game.add.sprite(x, y, 'spriteGem') );
            this.resizeSprite();
            this.enablePhysicsDynamic();
        }
        app.data.itemType.Gem.prototype = Object.create(app.data.Item.prototype);
        
    }

};