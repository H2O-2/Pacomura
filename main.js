/**
 * Created by H2O2 on 16/10/27.
 */

var canvas, ctx, width, height;


window.onload = function () {
    width = window.innerWidth;
    height = window.innerHeight;

    canvas = document.createElement("canvas");

    var e = "touchstart";
    if(width >= 500) {
        canvas.width = 640;
        canvas.height = 426;
        canvas.style.padding = "1px";
        //canvas.style.border = "5px solid #000";
        //canvas.style.background = "#FFF"
        canvas.style.borderRadius = "10px";
        e = "mousedown";
    }

    ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);
    var img = new Image();
    img.src = 'gameSprite.png';
    img.onload = function () {
        spriteInit(this);



        // DEBUG
        /*
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 3; j++) {
                s_qb[i][j].draw(ctx, j * 32, i * 32);
            }
        }
        */
        /*
        for (var k = 0; k < 3; k++) {
            s_soulgem[k].draw(ctx, k * 32, 0);
        }
        */
        s_homuraNorm[0][0].draw(ctx, 100, 100);
        s_map.draw(ctx, 0, 0);


    };
};
