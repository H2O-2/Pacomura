/**
 * Created by H2O2 on 16/10/27.
 */

function main() {

    var MOBILE_OFFESET = 1/10;

    var e = "touchstart";
    if(WIDTH >= C_WIDTH) {
        canvas.width = C_WIDTH;
        canvas.height = C_HEIGHT;
        canvas.style.padding = "1px";
        canvas.style.borderRadius = "10px";
        enemy.width = C_WIDTH;
        enemy.height = C_HEIGHT;
        enemy.style.padding = "1px";
        enemy.style.borderRadius = "10px";
        bg.width = C_WIDTH;
        bg.height = C_HEIGHT;
        bg.style.padding = "1px";
        bg.style.borderRadius = "10px";
        info.width = INFO_WIDTH;
        info.height = INFO_HEIGHT;
        info.style.padding = "1px";
        info.style.borderRadius = "10px";
        infoCtx.fillStyle = '#242424';
        infoCtx.font = "20px Helvetica";
        infoCtx.fillText("LIFE: ",20,27);
        infoCtx.fillText("SCORE: 0",C_WIDTH - 200, 27);
        e = "mousedown";
    } else {
        canvas.width = WIDTH * (1 + MOBILE_OFFESET);
        canvas.height = HEIGHT * (1 + MOBILE_OFFESET);
        canvas.style.padding = "1px";
        canvas.style.borderRadius = "10px";
        enemy.width = WIDTH * (1 + MOBILE_OFFESET);
        enemy.height = HEIGHT * (1 + MOBILE_OFFESET);
        enemy.style.padding = "1px";
        enemy.style.borderRadius = "10px";
        bg.width = WIDTH * (1 + MOBILE_OFFESET);
        bg.height = HEIGHT * (1 + MOBILE_OFFESET);
        bg.style.padding = "1px";
        bg.style.borderRadius = "10px";
    }

    var img = new Image();
    img.src = "img/gameSprite.png";

    img.onload = function () {
        spriteInit(this);
        var game = new Game();
        game.gameInit(ctx, bgCtx);

        var loop = function () {
            var gameStatus = game.update();
            game.render(ctx, bgCtx);
            window.requestAnimationFrame(loop);
        };
        window.requestAnimationFrame(loop);
    };
}


window.onload = function () {
    main();
};


