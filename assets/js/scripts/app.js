var app = {

    init: function(){
        
        var transparent = false;
        var antialias = true;

        // Create of the Phaser game instance OUYA RES 1280 720
        game = new Phaser.Game(
            window.innerWidth, window.innerHeight,
            (app.data.settings.enableDebugging ? Phaser.CANVAS : Phaser.AUTO),
            'game-div',
            // {preload: app.core.preload, 
            // create: app.core.create, 
            // update: app.core.update,
            // render: app.core.render
            // },
            transparent,
            antialias);

        //=======================================
        //MENUS
        var menu = {
            preload: app.core.menu.preload, 
            create: app.core.menu.create, 
            update: app.core.menu.update,
            render: app.core.menu.render
        };

        var lvlMenu = {
            preload: app.core.lvlMenu.preload, 
            create: app.core.lvlMenu.create, 
            update: app.core.lvlMenu.update,
            render: app.core.lvlMenu.render
        };

        var loading = {
            preload : app.core.loading.preload,
            create : app.core.loading.create,
            update : app.core.loading.update,
            render : app.core.loading.render
        }

        var optionsMenu = {
            preload: app.core.optionsMenu.preload, 
            create: app.core.optionsMenu.create, 
            update: app.core.optionsMenu.update,
            render: app.core.optionsMenu.render
        };

        var creditsMenu = {
            preload: app.core.creditsMenu.preload, 
            create: app.core.creditsMenu.create, 
            update: app.core.creditsMenu.update,
            render: app.core.creditsMenu.render
        };
        //===========================================
        // Test level
        var lvl0 = {
            preload: app.core.initlvl0, 
            create: app.core.create, 
            update: app.core.update,
            render: app.core.render
        };

        //Real levels
        var lvl1 = {
            preload: app.core.initlvl1, 
            create: app.core.create, 
            update: app.core.update,
            render: app.core.render
        };

        var lvl3 = {
            preload: app.core.initlvl3, 
            create: app.core.create, 
            update: app.core.update,
            render: app.core.render
        };
        

        //===========================================        
        //UI STATE
        game.state.add('menu', menu);
        game.state.add('jouer', lvlMenu);
        game.state.add('loading', loading);
        game.state.add('options', optionsMenu);
        game.state.add('credits', creditsMenu);

        //LVL STATE
        game.state.add('lvl0', lvl0);
        game.state.add('lvl1', lvl1);
        game.state.add('lvl3', lvl3);
        
        
        // Start the state
        game.state.start('menu');


        console.log('Jeu initialisé')
    },


};