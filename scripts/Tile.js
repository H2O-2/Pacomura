/**
 * Created by H2O2 on 16/10/29.
 */

function Tile(tileX, tileY) {
    this.posnX = tileX;
    this.posnY = tileY;
    this.actualX = tileX;
    this.actualY = tileY;
    this.height = TILE_LEN;
    this.width = TILE_LEN;
    this.tileStatus = TILE_STATUS.EMPTY;

    this.isEmpty = function (outOfBirthPlace) {
        if (outOfBirthPlace) return this.tileStatus == TILE_STATUS.EMPTY;

        return (this.tileStatus == TILE_STATUS.EMPTY || this.tileStatus == TILE_STATUS.BIRTH_AREA);
    };

    this.update = function (camera, player) {
        //console.log("PASS");
        this.actualX = this.posnX - offsetX(camera.cameraX);
        this.actualY = this.posnX - offsetY(camera.cameraY);
    }
}

Tile.prototype = new GameElement();
