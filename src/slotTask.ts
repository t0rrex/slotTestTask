import * as PIXI from 'pixi.js';

let app;
let REEL_WIDTH = 196;
let SYMBOL_SIZE = 139;

let model = {
    createCanvas: function() {
        app = new PIXI.Application(930, 556, {antialias: true, transparent: false, resolution: 1});
        document.body.appendChild(app.view);

        PIXI.loader
            .add("src/assets/img/symbols/01.png","src/assets/img/symbols/01.png")
            .add("src/assets/img/symbols/02.png","src/assets/img/symbols/02.png")
            .add("src/assets/img/symbols/03.png","src/assets/img/symbols/03.png")
            .add("src/assets/img/symbols/04.png","src/assets/img/symbols/04.png")
            .add("src/assets/img/symbols/05.png","src/assets/img/symbols/05.png")
            .add("src/assets/img/symbols/06.png","src/assets/img/symbols/06.png")
            .add("src/assets/img/symbols/07.png","src/assets/img/symbols/07.png")
            .add("src/assets/img/symbols/08.png","src/assets/img/symbols/08.png")
            .add("src/assets/img/symbols/09.png","src/assets/img/symbols/09.png")
            .add("src/assets/img/symbols/10.png","src/assets/img/symbols/10.png")
            .add("src/assets/img/symbols/11.png","src/assets/img/symbols/11.png")
            .add("src/assets/img/symbols/12.png","src/assets/img/symbols/12.png")
            .add("src/assets/img/symbols/13.png","src/assets/img/symbols/13.png")
            .load(setup);
    }

}

let view = {
    loadGame: function(){
        model.createCanvas();
    }
}

view.loadGame();

function setup()
{
    let slotTextures = [
        PIXI.Texture.fromImage("src/assets/img/symbols/01.png"),
        PIXI.Texture.fromImage("src/assets/img/symbols/02.png"),
        PIXI.Texture.fromImage("src/assets/img/symbols/03.png"),
        PIXI.Texture.fromImage("src/assets/img/symbols/04.png"),
        PIXI.Texture.fromImage("src/assets/img/symbols/05.png"),
        PIXI.Texture.fromImage("src/assets/img/symbols/06.png"),
        PIXI.Texture.fromImage("src/assets/img/symbols/07.png"),
        PIXI.Texture.fromImage("src/assets/img/symbols/08.png"),
        PIXI.Texture.fromImage("src/assets/img/symbols/09.png"),
        PIXI.Texture.fromImage("src/assets/img/symbols/10.png"),
        PIXI.Texture.fromImage("src/assets/img/symbols/11.png"),
        PIXI.Texture.fromImage("src/assets/img/symbols/12.png"),
        PIXI.Texture.fromImage("src/assets/img/symbols/13.png")
    ];

    let reels = [];
    let reelContainer = new PIXI.Container();
    for( let i = 0; i < 5; i++)
    {
        let rc = new PIXI.Container();
        rc.x = i*REEL_WIDTH;
        reelContainer.addChild(rc);

        let reel = {
            container: rc,
            symbols:[],
            position:0,
            previousPosition:0,
        };

        for(let j = 0; j < 4; j++)
        {
            let symbol = new PIXI.Sprite(slotTextures[ Math.floor(Math.random()*slotTextures.length)]);

            symbol.y = j*SYMBOL_SIZE;
            symbol.scale.x = symbol.scale.y = Math.min( SYMBOL_SIZE / symbol.width, SYMBOL_SIZE/symbol.height);
            symbol.x = Math.round((SYMBOL_SIZE - symbol.width)/2);
            reel.symbols.push( symbol );
            rc.addChild(symbol);
        }
        reels.push(reel);
    }

    app.stage.addChild(reelContainer);

}
