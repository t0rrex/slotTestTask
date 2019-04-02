import * as PIXI from 'pixi.js';
var app;
var REEL_WIDTH = 196;
var SYMBOL_SIZE = 139;
var model = {
    createCanvas: function () {
        app = new PIXI.Application(980, 556, { antialias: true, transparent: false, resolution: 1 });
        document.body.appendChild(app.view);
        PIXI.loader
            .add("src/assets/img/symbols/01.png", "src/assets/img/symbols/01.png")
            .add("src/assets/img/symbols/02.png", "src/assets/img/symbols/02.png")
            .add("src/assets/img/symbols/03.png", "src/assets/img/symbols/03.png")
            .add("src/assets/img/symbols/04.png", "src/assets/img/symbols/04.png")
            .add("src/assets/img/symbols/05.png", "src/assets/img/symbols/05.png")
            .add("src/assets/img/symbols/06.png", "src/assets/img/symbols/06.png")
            .add("src/assets/img/symbols/07.png", "src/assets/img/symbols/07.png")
            .add("src/assets/img/symbols/08.png", "src/assets/img/symbols/08.png")
            .add("src/assets/img/symbols/09.png", "src/assets/img/symbols/09.png")
            .add("src/assets/img/symbols/10.png", "src/assets/img/symbols/10.png")
            .add("src/assets/img/symbols/11.png", "src/assets/img/symbols/11.png")
            .add("src/assets/img/symbols/12.png", "src/assets/img/symbols/12.png")
            .add("src/assets/img/symbols/13.png", "src/assets/img/symbols/13.png")
            .add("src/assets/img/winningFrameBackground.jpg", "src/assets/img/winningFrameBackground.jpg")
            .load(setup);
    }
};
var view = {
    loadGame: function () {
        model.createCanvas();
    }
};
view.loadGame();
function setup() {
    var slotTextures = [
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
    var backgroundTexture = [
        PIXI.Texture.fromImage("src/assets/img/winningFrameBackground.jpg")
    ];
    var reels = [];
    var reelContainer = new PIXI.Container();
    for (var i = 0; i < 5; i++) {
        var rc = new PIXI.Container();
        rc.x = i * REEL_WIDTH;
        reelContainer.addChild(rc);
        var reel = {
            container: rc,
            symbols: [],
            position: 0,
            previousPosition: 0,
        };
        for (var j = 0; j < 4; j++) {
            var symbol = new PIXI.Sprite(slotTextures[Math.floor(Math.random() * (slotTextures.length))]);
            var backGround = new PIXI.Sprite(backgroundTexture[backgroundTexture.length - 1]);
            backGround.y = symbol.y = j * SYMBOL_SIZE;
            symbol.scale.x = symbol.scale.y = Math.min(SYMBOL_SIZE / symbol.width, SYMBOL_SIZE / symbol.height);
            symbol.x = 25 || Math.round((SYMBOL_SIZE - symbol.width) / 2);
            reel.symbols.push(symbol);
            rc.addChild(backGround);
            rc.addChild(symbol);
        }
        reels.push(reel);
    }
    app.stage.addChild(reelContainer);
}
