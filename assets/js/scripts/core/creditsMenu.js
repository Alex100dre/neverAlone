app.core.creditsMenu = {

    init: function(){
        // this.createScene();
    },

    preload: function(){
        // Images
        game.load.image('bg', 'assets/images/sprites/ui/menu/bg.jpg');
        game.load.spritesheet('btn', 'assets/images/sprites/ui/menu/back.png', 345, 183);
    },

    create: function(){
        bg=game.add.sprite(0,0,'bg');
        bg.x = game.canvas.width*.5-bg.width*.5
        var text = "Crédits";
        var style = { font: "65px Arial", fill: "#ffffff" };
        var styleText = { font: "30px Arial", fill: "#ffffff" };

        var title = game.add.text(0, 120, text, style);
        title.x = game.canvas.width*.5-title.width*.5;
        title.setShadow(5, 5, 'rgba(0,0,0,0.5)', 15);

        var devs = game.add.text(400, 200, 'Developpeur : \n Alexandre Hachim ', styleText);
        devs.setShadow(0, 0, 'rgba(0, 0, 0, 0.5)', 0);

        var graphs = game.add.text(800, 300, 'Graphistes : \n Jules Corbel ', styleText);
        graphs.setShadow(0, 0, 'rgba(0, 0, 0, 0.5)', 0);

        var btn = game.add.button(game.camera.width*.5, 500, 'btn', that.actionOnClick, this, 1, 0, 0);
        btn.anchor.setTo(0.5, 0.5);
        btn.name='menu';

    },

    update: function(){

    },

    render : function(){

    },

    actionOnClick:function(btn){
        // console.log(btn.name);
        game.state.start(btn.name);
    }
}