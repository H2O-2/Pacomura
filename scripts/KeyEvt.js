/**
 * Created by H2O2 on 16/10/29.
 */

function KeyEvt() {
    var readInput = function (e, player) {
        window.addEventListener("keyPress", function () {
            player.charDir = e.keyCode;
        });
    }
}
