/**
 * Created by H2O2 on 16/10/29.
 */

window.addEventListener("keydown", readInput);

function KeyEvt() {
    var gameStart = false;
    var dirPressed;

    this.setDir = function (dir) {
        dirPressed = dir - KEY_TO_DIR;
    };

    this.getDir = function () {
        return dirPressed;
    };

    this.setGame = function (isStarted) {
        gameStart = isStarted;
    };

    this.getGame = function () {
        return gameStart;
    }
}

var keyEvt = new KeyEvt();

function readInput(e) {
    if (e.keyCode === KEY.KEY_UP || e.keyCode === KEY.KEY_DOWN ||
        e.keyCode === KEY.KEY_LEFT || e.keyCode === KEY.KEY_RIGHT) {
        keyEvt.setDir(e.keyCode);
    }

    console.log(e.keyCode);
    if (e.keyCode == KEY.SPACE) {
        console.log("TRUE");
        keyEvt.setGame(true);
    }
}
