/**
 * Created by H2O2 on 16/10/27.
 */

function main() {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");

    var e = "touchstart";
    if(WIDTH >= 500) {
        console.log(canvas);
        canvas.width = 640;
        canvas.height = 426;
        canvas.style.padding = "1px";
        //canvas.style.border = "5px solid #000";
        //canvas.style.background = "#FFF"
        canvas.style.borderRadius = "10px";
        e = "mousedown";
    }

    var game = new Game();
    game.gameInit();

    window.addEventListener("keyDown", game.readInput);

    var loop = function () {
        console.log("RENDER");
        game.render();
        window.requestAnimationFrame(loop);
    };
    window.requestAnimationFrame(loop);


}

window.onload = function () {
    main();
};


