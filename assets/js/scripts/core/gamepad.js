app.core.gamepad = {

    init: function(){
        game.input.gamepad.start();
        // To listen to buttons from a specific pad listen directly on that pad game.input.gamepad.padX, where X = pad 1-4
        app.data.pad1 = game.input.gamepad.pad1;
    },

    checkGamepad: function(){
        if(game.input.gamepad.supported && game.input.gamepad.active && game.input.gamepad.pad1.connected) {
            console.log('Manette connectée.');
        } else {
            console.log('Manette non connectée.');
        }   
    }
};  