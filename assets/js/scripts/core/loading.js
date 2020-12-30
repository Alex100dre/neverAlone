app.core.loading = {

    init: function(){
        // this.createScene();
    },

    preload: function(){
        // PLAYER SOUNDS
        game.load.audio('collect',  ['assets/audio/bonus/collect.mp3', 'assets/audio/bonus/collect.ogg']);
        game.load.audio('punch',  ['assets/audio/player/punch.mp3', 'assets/audio/player/punch.ogg']);
        game.load.audio('hurt', ['assets/audio/player/hurt2.mp3', 'assets/audio/player/hurt2.ogg'])
        game.load.audio('die', ['assets/audio/player/die.mp3', 'assets/audio/player/die.ogg'])
        app.core.loading['preload'+app.data.lvlTarget]();
    },
    preloadlvl1:function(){
        //Theme
        game.load.audio('theme',  ['assets/audio/theme/theme.mp3', 'assets/audio/theme/theme.ogg']);
    }, 
    preloadlvl3:function(){
        //Theme
        game.load.audio('theme',  ['assets/audio/theme/lvl3/theme.mp3', 'assets/audio/theme/lvl3/theme.ogg']);
    },

    create: function(){
        loadingText = game.add.text(15, 15, 'Chargement...', { fontSize : '32px', fill : '#fff'});
        var margin=10;
        loadingText.x = game.canvas.width-loadingText.width-margin;
        loadingText.y = game.canvas.height-loadingText.height-margin;
        loadingText.alpha = 0;
        app.data.loadingText = loadingText;
        console.log('loading...');
        game.add.tween(app.data.loadingText).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
        
    },

    gofull : function() {

    },

    update: function(){
       if (this.cache.isSoundDecoded('theme')){
            console.log('niveau chargé');
            app.data.sounds.themeMenu.stop();
            // app.data.isPlayingTheme = false;
            game.state.start(app.data.lvlTarget);
        } 
    },

    render : function(){

    }
}