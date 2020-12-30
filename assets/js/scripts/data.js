app.data = {
    loadingText : null,
    pad1    :{
        _connected: false
    },
    keyboard : {
        up    : false,
        right : false,
        down  : false,
        left  : false,
        space : false
    },

    gameIsFinished : false,
    isPlayingTheme : false,
    isPaused     : false,
    canPause     : true,
    input        : {},
    canPress     : {
        pauseKey : true
    },
    floorList : [],
    platformList : [],
    platformType : {},
    endLVL       : null,
    cursors      : null,
    sounds       : null,
    score        : 0,
    scoreText    : null,
    bg           : [],

    player       : {
        personality : 0,
        isDead      : false
    },
    enemyType:{},
    enemyList:[],
    itemType:{},
    itemList:[],
    // Test level
    lvl0 : {
        Platform : [
            //Floor
            {x:0, y:720-15, width:4480, height:15},
            {x:6916, y:720-15, width:16371-6916, height:15},
            //Platforms
            {x:500, y:455, width:114, height:20},
            {x:700, y:312, width:100, height:20},
            {x:1000, y:430, width:108, height:20},
        

        ],
        Enemies : [
            {type:'Dog', x: 500, y: 100},
            {type:'Dog', x: 800, y: 100},
        ],
        Items : [
            {type:'door', x: 2700, y: 700, index: 1},
            {type:'lever', x: 500, y: 500, index: 1},
            {type:'gem', x: 180, y: 100, index: 0},
            {type:'gem', x: 250, y: 100, index: 0}
        ]
    },
    // Real levels
    lvl1 : {
        Platform : [
            //Floor
            {x:0, y:720-15, width:4480, height:15},
            {x:6916, y:720-15, width:16371-6916, height:15},
            //Platforms
            {x:4525, y:455, width:114, height:20},
            {x:4750, y:312, width:100, height:20},
            {x:5010, y:430, width:108, height:20},
            {x:5256, y:348, width:110, height:20},
            {x:5640, y:400, width:112, height:20},
            {x:6113, y:289, width:112, height:20},
            {x:6742, y:430, width:112, height:20},
            {x:8900, y:400, width:112, height:20}

        ],
        Enemies : [
            {type:'Dog', x: 7400, y: 100},
            {type:'Dog', x: 2000, y: 100},
            {type:'Dog', x: 9000, y: 100},
            {type:'Dog', x: 12700, y: 100},
            {type:'Dog', x: 9500, y: 100},

            {type:'Zombie', x: 10000, y: 100},
            {type:'Zombie', x: 11000, y: 100},
            {type:'Zombie', x: 13400, y: 100},
            {type:'Zombie', x: 13800, y: 100}
        ],
        Items : [
            {type:'door', x: 13900, y: 700, index: 1},
            {type:'lever', x: 13400, y: 300, index: 1},
            {type:'door', x: 2800, y: 700, index: 2},
            {type:'lever', x: 2150, y: 500, index: 2},
            
            {type:'gem', x: 350, y: 100, index: 0},
            {type:'gem', x: 600, y: 100, index: 0},
            {type:'gem', x: 800, y: 100, index: 0},
            {type:'gem', x: 2219, y: 100, index: 0},
            {type:'gem', x: 2500, y: 100, index: 0},
            {type:'gem', x: 3500, y: 100, index: 0},
            {type:'gem', x: 12000, y: 100, index: 0},
            {type:'gem', x: 15000, y: 100, index: 0},
            {type:'gem', x: 15500, y: 100, index: 0},
            {type:'gem', x: 17000, y: 100, index: 0}

        ]
    },
    lvl3 : {
        Platform : [
            //Floor
            {x:0, y:720-15, width:16371, height:15},
            //Platforms
            {x:7999, y:431, width:150, height:289},
            {x:8535, y:606, width:168, height:113}

        ],
        Enemies : [
            {type:'Zombie', x: 500, y: 100},
            {type:'Golem', x: 1100, y: 100},
            {type:'Dog', x: 1600, y: 100},
            {type:'Dog', x: 2300, y: 100},
            {type:'Zombie', x: 5000, y: 100},
            {type:'Dog', x: 6000, y: 100},
            {type:'Golem', x: 8300, y: 100},
            {type:'Golem', x: 8800, y: 100},
            {type:'Golem', x: 9150, y: 100},
            {type:'Dog', x: 9300, y: 100},
            {type:'Golem', x: 9600, y: 100},
            {type:'Zombie', x: 12000, y: 100},
            {type:'Dog', x: 12800, y: 100},
            {type:'Zombie', x: 13500, y: 100},
        ],
        Items : [
            {type:'gem', x: 600, y: 100, index: 0},
            {type:'gem', x: 800, y: 100, index: 0},
            {type:'gem', x: 2219, y: 100, index: 0},
            {type:'gem', x: 2500, y: 100, index: 0},
            {type:'gem', x: 3500, y: 100, index: 0},
            {type:'gem', x: 8555, y: 100, index: 0},
            {type:'gem', x: 15000, y: 100, index: 0},
            {type:'gem', x: 15500, y: 100, index: 0},
            {type:'gem', x: 17000, y: 100, index: 0}

        ]
    }
    
};