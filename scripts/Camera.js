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

        if (this.cameraX <= C_WIDTH * CAMERA_BORDER) {
            this.cameraX = C_WIDTH * CAMERA_BORDER;
        } else if (this.cameraX >= MAP_WIDTH * TILE_LEN - C_WIDTH * CAMERA_BORDER) {
            this.cameraX = MAP_WIDTH * TILE_LEN - C_WIDTH * CAMERA_BORDER;
        }

        if (this.cameraY <= C_HEIGHT * CAMERA_BORDER) {
            this.cameraY = C_HEIGHT * CAMERA_BORDER;
        } else if (this.cameraY >= MAP_HEIGHT * TILE_LEN - C_HEIGHT * CAMERA_BORDER) {
            this.cameraY = MAP_HEIGHT * TILE_LEN - C_HEIGHT * CAMERA_BORDER;
        }

    };
}
