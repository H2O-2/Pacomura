/**
 * Created by H2O2 on 16/10/29.
 */

window.addEventListener("keydown", readInput);

function KeyEvt() {
    var dirPressed;

    this.setDir = function (dir) {
        dirPressed = dir - KEY_TO_DIR;
    };

    this.getDir = function () {
        return dirPressed;
    }
}

var keyEvt = new KeyEvt();

function readInput(e) {
    if (e.keyCode === KEY.KEY_UP || e.keyCode === KEY.KEY_DOWN ||
        e.keyCode === KEY.KEY_LEFT || e.keyCode === KEY.KEY_RIGHT) {
        keyEvt.setDir(e.keyCode);
    }
}
