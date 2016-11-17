/**
 * Created by H2O2 on 16/11/12.
 */

function Map(bgCtx) {
    this.tiles = new Array(MAP_WIDTH);

    this.init = function () {
        for (var i = 0; i < MAP_WIDTH; i++) {
            this.tiles[i] = new Array(MAP_HEIGHT);
            for (var j = 0; j < MAP_HEIGHT; j++) {
                this.tiles[i][j] = new Tile(TILE_LEN * i, TILE_LEN * j);
            }
        }
    };

    this.setCamera = function (camera) {
        this.camera = camera;
    };

    this.update = function () {
        this.camera.update();
    };

    this.render = function (bgCtx) {
        s_map.draw(bgCtx, -offsetX(this.camera.cameraX), -offsetY(this.camera.cameraY));
        s_greifSeed.draw(bgCtx, 300-offsetX(this.camera.cameraX), 300-offsetY(this.camera.cameraY));
        s_grenade.draw(bgCtx, 350-offsetX(this.camera.cameraX), 300-offsetY(this.camera.cameraY));
        s_rocket.draw(bgCtx, 400-offsetX(this.camera.cameraX), 300-offsetY(this.camera.cameraY));
    }

}

var mapAll = new Map(bgCtx);
mapAll.init();

function posnToTile(x, y) {
    return mapAll.tiles[Math.floor(x / 32)][Math.floor(y / 32)];
}

function keyToDir(key) {
    return key - KEY_TO_DIR;
}
