import * as PIXI from 'pixi.js';
import { Howl } from 'howler';
var landingSound = new Howl({
    src: ['src/assets/sounds/Landing_1.mp3', 'src/assets/sounds/Landing_1.mp3'],
    volume: 0.5
});
var reelSound = new Howl({
    src: ['src/assets/sounds/Reel_Spin.mp3', 'src/assets/sounds/Reel_Spin.mp3'],
    volume: 0.5,
    loop: true
});
var app;
var REEL_WIDTH = 196;
var SYMBOL_SIZE = 139;
var BUTTON_SIZE = 160;
var MARGIN_X = 30;
var MARGIN_Y = 37;
var model = {
    createCanvas: function () {
        app = new PIXI.Application(1055, 770, { backgroundColor: 0xffffff, antialias: true, transparent: false, resolution: 1 });
        document.getElementsByClassName("pixi")[0].appendChild(app.view);
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
            .add("src/assets/img/btn_spin_disable.png", "src/assets/img/btn_spin_disable.png")
            .add("src/assets/img/btn_spin_hover.png", "src/assets/img/btn_spin_hover.png")
            .add("src/assets/img/btn_spin_normal.png", "src/assets/img/btn_spin_normal.png")
            .add("src/assets/img/btn_spin_pressed.png", "src/assets/img/btn_spin_pressed.png")
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
    var buttonOn = PIXI.Texture.fromImage('src/assets/img/btn_spin_normal.png');
    var buttonHover = PIXI.Texture.fromImage('src/assets/img/btn_spin_hover.png');
    var buttonPressed = PIXI.Texture.fromImage('src/assets/img/btn_spin_pressed.png');
    var buttonDisable = PIXI.Texture.fromImage('src/assets/img/btn_spin_disable.png');
    var reels = [];
    var reelContainer = new PIXI.Container();
    reelContainer.x = MARGIN_X;
    reelContainer.y = MARGIN_Y;
    for (var i = 0; i < 5; i++) {
        var bg = new PIXI.Container();
        var rc = new PIXI.Container();
        bg.x = rc.x = i * REEL_WIDTH;
        reelContainer.addChild(bg);
        reelContainer.addChild(rc);
        var reel = {
            container: rc,
            symbols: [],
            position: 0,
            previousPosition: 0,
            blur: new PIXI.filters.BlurFilter()
        };
        reel.blur.blurX = 0;
        reel.blur.blurY = 0;
        rc.filters = [reel.blur];
        for (var j = 0; j < 5; j++) {
            var symbol = new PIXI.Sprite(slotTextures[Math.floor(Math.random() * (slotTextures.length))]);
            var background = PIXI.Sprite.fromImage("src/assets/img/winningFrameBackground.jpg");
            background.y = symbol.y = j * SYMBOL_SIZE;
            symbol.scale.x = symbol.scale.y = Math.min(SYMBOL_SIZE / symbol.width, SYMBOL_SIZE / symbol.height);
            symbol.x = 25;
            reel.symbols.push(symbol);
            bg.addChild(background);
            rc.addChild(symbol);
        }
        reels.push(reel);
    }
    app.stage.addChild(reelContainer);
    var top = new PIXI.Graphics();
    top.beginFill(0xffffff);
    top.drawRect(0, 0, app.screen.width, MARGIN_Y);
    app.stage.addChild(top);
    var bottom = new PIXI.Graphics();
    bottom.beginFill(0xffffff);
    bottom.drawRect(0, SYMBOL_SIZE * 4 + MARGIN_Y, app.screen.width, BUTTON_SIZE);
    app.stage.addChild(bottom);
    var button = new PIXI.Sprite(buttonOn);
    button.x = app.screen.width / 2 - BUTTON_SIZE / 2;
    button.y = SYMBOL_SIZE * 4 + MARGIN_Y + 10;
    button.scale.x = button.scale.y = SYMBOL_SIZE / BUTTON_SIZE;
    app.stage.addChild(button);
    button.interactive = true;
    button.buttonMode = true;
    button
        .on('pointerdown', onButtonDown)
        .on('pointerup', onButtonUp)
        .on('pointerupoutside', onButtonUp)
        .on('pointerover', onButtonOver)
        .on('pointerout', onButtonOut);
    button.addListener("pointerdown", function () {
        startPlay();
    });
    var running = false;
    reelSound.stop();
    function startPlay() {
        if (running)
            return;
        running = true;
        reelSound.play();
        for (var i = 0; i < reels.length; i++) {
            var r = reels[i];
            var extra = Math.floor(Math.random() * 5);
            tweenTo(r, "position", r.position + 50 + i * 5 + extra, 500 + i * 600, backout(0.1), null, i == reels.length - 1 ? reelsComplete : null);
        }
    }
    function reelsComplete() {
        running = false;
        reelSound.stop();
        landingSound.play();
        button.texture = buttonOn;
    }
    function onButtonDown() {
        if (running) {
            return;
        }
        this.isdown = true;
        this.texture = buttonPressed;
        this.alpha = 1;
    }
    function onButtonUp() {
        this.isdown = false;
        if (this.isOver && !running) {
            this.texture = buttonHover;
        }
        else if (this.isOver && running) {
            this.texture = buttonDisable;
        }
        else {
            this.texture = buttonOn;
        }
    }
    function onButtonOver() {
        this.isOver = true;
        if (this.isdown || running) {
            return;
        }
        this.texture = buttonPressed;
    }
    function onButtonOut() {
        this.isOver = false;
        if (this.isdown || running) {
            return;
        }
        this.texture = buttonOn;
    }
    app.ticker.add(function () {
        for (var i = 0; i < reels.length; i++) {
            var r = reels[i];
            r.blur.blurY = (r.position - r.previousPosition) * 8;
            r.previousPosition = r.position;
            for (var j = 0; j < r.symbols.length; j++) {
                var s = r.symbols[j];
                var prevy = s.y;
                s.y = (r.position + j) % r.symbols.length * SYMBOL_SIZE - SYMBOL_SIZE;
                if (s.y < 0 && prevy > SYMBOL_SIZE) {
                    s.texture = slotTextures[Math.floor(Math.random() * slotTextures.length)];
                    s.scale.x = s.scale.y = Math.min(SYMBOL_SIZE / s.texture.width, SYMBOL_SIZE / s.texture.height);
                    s.x = 25;
                }
            }
        }
    });
    var slotOverlay = PIXI.Sprite.fromImage("src/assets/img/slotOverlay.png");
    slotOverlay.x = 0;
    slotOverlay.y = 0;
    slotOverlay.width = app.screen.width;
    slotOverlay.height = app.screen.height - BUTTON_SIZE;
    //slotOverlay.scale.x = slotOverlay.scale.y = app.screen.height;
    app.stage.addChild(slotOverlay);
}
var tweening = [];
function tweenTo(object, property, target, time, easing, onchange, oncomplete) {
    var tween = {
        object: object,
        property: property,
        propertyBeginValue: object[property],
        target: target,
        easing: easing,
        time: time,
        change: onchange,
        complete: oncomplete,
        start: Date.now()
    };
    tweening.push(tween);
    return tween;
}
app.ticker.add(function () {
    var now = Date.now();
    var remove = [];
    for (var i = 0; i < tweening.length; i++) {
        var t = tweening[i];
        var phase = Math.min(1, (now - t.start) / t.time);
        t.object[t.property] = lerp(t.propertyBeginValue, t.target, t.easing(phase));
        if (t.change)
            t.change(t);
        if (phase == 1) {
            t.object[t.property] = t.target;
            if (t.complete)
                t.complete(t);
            remove.push(t);
        }
    }
    for (var i = 0; i < remove.length; i++) {
        tweening.splice(tweening.indexOf(remove[i]), 1);
    }
});
function lerp(a1, a2, t) {
    return a1 * (1 - t) + a2 * t;
}
var backout = function (amount) {
    return function (t) {
        return (--t * t * ((amount + 1) * t + amount) + 1);
    };
};
