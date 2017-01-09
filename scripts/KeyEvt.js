/**
 * Created by H2O2 on 16/10/29.
 */

window.addEventListener("keydown", readInput);

function KeyEvt() {
    var gameStart = false;
    var dirPressed;
    var inputting = false;

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
    };

    this.getInputStatus = function () {
        return inputting;
    };

    this.inputToggle = function () {
        if (inputting) inputting = false;
        else inputting = true;
    };
}

var keyEvt = new KeyEvt();

function readInput(e) {
    if (e.keyCode === KEY.KEY_UP || e.keyCode === KEY.KEY_DOWN ||
        e.keyCode === KEY.KEY_LEFT || e.keyCode === KEY.KEY_RIGHT) {
        keyEvt.setDir(e.keyCode);
    }

    if (e.keyCode == KEY.ENTER && !keyEvt.getInputStatus()) {
        keyEvt.setGame(true);
    }
}
