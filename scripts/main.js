/**
 * Created by H2O2 on 16/10/27.
 */

function main() {


    var e = "touchstart";
    if(WIDTH >= 500) {
        canvas.width = C_WIDTH;
        canvas.height = C_HEIGHT;
        canvas.style.padding = "1px";
        canvas.style.borderRadius = "10px";
        bg.width = 640;
        bg.height = 384;
        bg.style.padding = "1px";
        bg.style.borderRadius = "10px";
        e = "mousedown";
        console.log(C_WIDTH, C_HEIGHT);
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
            window.requestAnimationFrame(loop);
        };
        window.requestAnimationFrame(loop);
    };
}

window.onload = function () {
    main();
};


