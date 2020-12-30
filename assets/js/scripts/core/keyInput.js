app.core.keyInput = {

    init: function(){
        app.data.input.pauseKey = game.input.keyboard.addKey(Phaser.Keyboard.P);
        app.data.input.personalityPlus = game.input.keyboard.addKey(Phaser.Keyboard.E);
        app.data.input.personalityMin = game.input.keyboard.addKey(Phaser.Keyboard.Z);
        app.data.input.action = game.input.keyboard.addKey(Phaser.Keyboard.F);
    },

    checkInputNative: function(){
        keyboard = app.data.keyboard;
        document.addEventListener('keydown', function(evt) {

            if(keyboard.pause  = evt.keyCode === 80){ keyboard.pause=true; app.data.canPress.pauseKey=false;}

            // console.log( app.data.canPress.pauseKey);
            // ==========================PAUSE===========================
            if (app.data.canPause && app.data.keyboard.pause){
                app.data.isPaused = !app.data.isPaused;
                game.paused = !game.paused;
                console.log(app.data.isPaused);
                app.core.ui.drawPauseMenu();
                app.data.canPause = false;
            }
        });

        document.addEventListener('keyup', function(evt) {
            // keyboard.left   = evt.keyCode === 37 ? false : keyboard.left;
            // keyboard.up     = evt.keyCode === 38 ? false : keyboard.up;
            // keyboard.right  = evt.keyCode === 39 ? false : keyboard.right;
            // keyboard.down   = evt.keyCode === 40 ? false : keyboard.down;
            if(keyboard.pause  = evt.keyCode === 80){ keyboard.pause = false; app.data.canPress.pauseKey= true;}
            if(!app.data.keyboard.pause){
                app.data.canPause=true;
            }
        });
    }
};