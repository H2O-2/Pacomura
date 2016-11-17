/**
 * Created by H2O2 on 16/10/27.
 */

function main() {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    bg = document.getElementById("bgCanvas");
    bgCtx = bg.getContext("2d");

    var e = "touchstart";
    if(WIDTH >= 500) {
        canvas.width = 640;
        canvas.height = 384;
        canvas.style.padding = "1px";
        canvas.style.borderRadius = "10px";
        bg.width = 640;
        bg.height = 426;
        bg.style.padding = "1px";
        bg.style.borderRadius = "10px";
        e = "mousedown";
    }

    var img = new Image();
    img.src = "img/gameSprite.png";

    img.onload = function () {
        spriteInit(this);
        var game = new Game();
        game.gameInit(ctx, bgCtx);


        var loop = function () {
            game.update();
            game.render(ctx, bgCtx);
            //console.log(game.player.posnX, game.player.posnY);
            window.requestAnimationFrame(loop);
        };
        window.requestAnimationFrame(loop);
    };
}

window.onload = function () {
    main();
};


