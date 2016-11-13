/**
 * Created by H2O2 on 16/10/29.
 */

function Camera(player) {
    this.cameraX = 0;
    this.cameraY = 0;
    this.player = player;

    this.update = function () {
        this.cameraX += (player.posnX - this.cameraX) / CAMERA_SPEED;
        this.cameraY += (player.posnY - this.cameraY) / CAMERA_SPEED;
    }
}
