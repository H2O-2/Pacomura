/**
 * Created by H2O2 on 16/11/12.
 */

function Map(bgCtx, camera) {
    this.tiles = new Array (100);
    this.camera = camera;

    this.init = function () {
        s_map.draw(bgCtx, 0, 0);
    };

    this.update = function () {
        this.camera.update();
    };

    this.render = function () {
        bgCtx.clearRect(0,0,WIDTH,HEIGHT);
        s_map.draw(bgCtx, -offsetX(camera.cameraX), -offsetY(camera.cameraY));
    }

}
