/**
 * Created by H2O2 on 16/10/27.
 */

var debugging = document.getElementById("debug"),
    debugCtx = debugging.getContext("2d");

function main() {

    var MOBILE_OFFESET = 1/10;

    var e = "touchstart";
    if(WIDTH >= C_WIDTH) {
        canvas.width = C_WIDTH;
        canvas.height = C_HEIGHT;
        canvas.style.padding = "1px";
        canvas.style.borderRadius = "10px";
        bg.width = C_WIDTH;
        bg.height = C_HEIGHT;
        bg.style.padding = "1px";
        bg.style.borderRadius = "10px";
        debugging.width = C_WIDTH;
        debugging.height = C_HEIGHT;
        e = "mousedown";
        console.log("DEBUG" + debugging.height);
    } else {
        canvas.width = WIDTH * (1 + MOBILE_OFFESET);
        canvas.height = HEIGHT * (1 + MOBILE_OFFESET);
        canvas.style.padding = "1px";
        canvas.style.borderRadius = "10px";
        bg.width = WIDTH * (1 + MOBILE_OFFESET);
        bg.height = HEIGHT * (1 + MOBILE_OFFESET);
        bg.style.padding = "1px";
        bg.style.borderRadius = "10px";
        debugging.width = WIDTH * (1 + MOBILE_OFFESET);
        debugging.height = HEIGHT * (1 + MOBILE_OFFESET);
        e = "mousedown";
        console.log("DEBUG" + debugging.height);
    }

    var img = new Image();
    img.src = "img/gameSprite.png";

    img.onload = function () {
        spriteInit(this);
        var game = new Game();
        game.gameInit(ctx, bgCtx);
        //game.debugging();

        var loop = function () {
            game.update();
            game.render(ctx, bgCtx);
            window.requestAnimationFrame(loop);
        };
        window.requestAnimationFrame(loop);
    };
}

/*
// DEBUG
function debugging(debugCtx) {
    console.log("DEBUG");
    for (var i = 0; i < MAP_WIDTH; i++) {
        for (var j = 0; j < MAP_HEIGHT; j++) {
            //console.log(this.tiles[i][j].posnX);
            //s_homuraKuro[3][0].draw(bgCtx, this.tiles[i][j].posnX, this.tiles[i][j].posnY);
            debugCtx.rect(this.tiles[i][j].posnX, this.tiles[i][j].posnY, TILE_LEN, TILE_LEN);
            debugCtx.stroke();
        }
    }
}
*/


window.onload = function () {
    main();
};


