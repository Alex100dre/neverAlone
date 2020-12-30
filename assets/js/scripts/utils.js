// =======================================================================================
// ================================= Fonctions utiles ====================================
// =======================================================================================
app.utils = {

// Fonction 'random' simplifiée qui permet de retourner une valeur au hasard ENTRE 'min' et 'max'
    rand: function (min, max, round) {
        round = !! round;

        if (round)
            return Math.round((Math.random() * (max - min)) + min);

        return (Math.random() * (max - min)) + min;
    },
    firstCharCap: function(string){
        return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
    }
};