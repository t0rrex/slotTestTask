import * as PIXI from 'pixi.js';

let app;
let REEL_WIDTH = 196;
let SYMBOL_SIZE = 139;
let BUTTON_SIZE = 160;

let model = {
    createCanvas: function() {
        app = new PIXI.Application(980, 716, {backgroundColor: 0xffffff, antialias: true, transparent: false, resolution: 1});
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
            .add("src/assets/img/winningFrameBackground.jpg","src/assets/img/winningFrameBackground.jpg")
            .add("src/assets/img/btn_spin_disable.png","src/assets/img/btn_spin_disable.png")
            .add("src/assets/img/btn_spin_hover.png","src/assets/img/btn_spin_hover.png")
            .add("src/assets/img/btn_spin_normal.png","src/assets/img/btn_spin_normal.png")
            .add("src/assets/img/btn_spin_pressed.png","src/assets/img/btn_spin_pressed.png")
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
        let bg = new PIXI.Container();
        let rc = new PIXI.Container();
        bg.x = rc.x = i*REEL_WIDTH;
        reelContainer.addChild(bg);
        reelContainer.addChild(rc);

        let reel = {
            container: rc,
            symbols:[],
            position:0,
            previousPosition:0,
            blur: new PIXI.filters.BlurFilter()
        };
        reel.blur.blurX = 0;
        reel.blur.blurY = 0;
        rc.filters = [reel.blur];

        for(let j = 0; j < 5; j++)
        {
            let symbol = new PIXI.Sprite(slotTextures[ Math.floor(Math.random()*(slotTextures.length))]);
            let background = PIXI.Sprite.fromImage("src/assets/img/winningFrameBackground.jpg");

            background.y = symbol.y = j*SYMBOL_SIZE;
            symbol.scale.x = symbol.scale.y = Math.min( SYMBOL_SIZE / symbol.width, SYMBOL_SIZE/symbol.height);
            symbol.x = 25;
            reel.symbols.push( symbol );
            bg.addChild(background);
            rc.addChild(symbol);
        }
        reels.push(reel);
    }

    app.stage.addChild(reelContainer);

    let bottom = new PIXI.Graphics();
    bottom.beginFill(0,1);
    bottom.drawRect(0,SYMBOL_SIZE*4,app.screen.width, BUTTON_SIZE);
    app.stage.addChild(bottom);

    let button = PIXI.Sprite.fromImage("src/assets/img/btn_spin_normal.png");
    button.x = app.screen.width - BUTTON_SIZE;
    button.y = SYMBOL_SIZE*4;
    button.scale.x = button.scale.y = SYMBOL_SIZE / BUTTON_SIZE;
    app.stage.addChild(button);

    /*
    let style = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 18,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#ffffff', '#00ff99'], // gradient
        stroke: '#4a1850',
        strokeThickness: 5,
        wordWrap: true,
        wordWrapWidth: 440
    });

    let playText = new PIXI.Text('Spin', style);
    playText.x = app.screen.width/2-17;
    playText.y = SYMBOL_SIZE*4+30;
    button.addChild(playText);*/
    //app.stage.addChild(playText);

    button.interactive = true;
    button.buttonMode = true;
    button.addListener("pointerdown", function(){
        startPlay();
    });

    let running = false;

    function startPlay(){
        if(running) return;
        running = true;

        for(let i = 0; i < reels.length; i++)
        {
            let r = reels[i];
            let extra = Math.floor(Math.random()*5);
            tweenTo(r, "position", r.position+50+i*5+extra, 500+i*600, backout(0.1), null, i == reels.length-1 ? reelsComplete : null);
        }
    }

    function reelsComplete(){
        running = false;
    }

    app.ticker.add(function() {
        for( let i = 0; i < reels.length; i++)
        {
            let r = reels[i];
            r.blur.blurY = (r.position-r.previousPosition)*8;
            r.previousPosition = r.position;

            for( let j = 0; j < r.symbols.length; j++)
            {
                let s = r.symbols[j];
                let prevy = s.y;
                s.y = (r.position + j)%r.symbols.length*SYMBOL_SIZE-SYMBOL_SIZE;
                if(s.y < 0 && prevy > SYMBOL_SIZE){
                    s.texture = slotTextures[Math.floor(Math.random()*slotTextures.length)];
                    s.scale.x = s.scale.y = Math.min( SYMBOL_SIZE / s.texture.width, SYMBOL_SIZE/s.texture.height);
                    s.x = 25;
                }
            }
        }
    });
}

let tweening = [];
function tweenTo(object, property, target, time, easing, onchange, oncomplete)
{
    let tween = {
        object:object,
        property:property,
        propertyBeginValue:object[property],
        target:target,
        easing:easing,
        time:time,
        change:onchange,
        complete:oncomplete,
        start:Date.now()
    };

    tweening.push(tween);
    return tween;
}

app.ticker.add(function() {
    let now = Date.now();
    let remove = [];
    for(let i = 0; i < tweening.length; i++)
    {
        let t = tweening[i];
        let phase = Math.min(1,(now-t.start)/t.time);

        t.object[t.property] = lerp(t.propertyBeginValue, t.target, t.easing(phase));
        if(t.change) t.change(t);
        if(phase == 1)
        {
            t.object[t.property] = t.target;
            if(t.complete)
                t.complete(t);
            remove.push(t);
        }
    }
    for(let i = 0; i < remove.length; i++)
    {
        tweening.splice(tweening.indexOf(remove[i]),1);
    }
});

function lerp(a1,a2,t){
    return a1*(1-t) + a2*t;
}

let backout = function(amount) {
    return function(t) {
        return (--t*t*((amount+1)*t + amount) + 1);
    };
};