/**
 * Created by H2O2 on 16/10/29.
 */

function Tile(tileX, tileY) {
    this.posnX = tileX;
    this.posnY = tileY;
    this.height = TILE_LEN;
    this.width = TILE_LEN;
    this.tileStatus = TILE_STATUS.EMPTY;

    this.isEmpty = function (outOfBirthPlace) {
        if (outOfBirthPlace) return this.tileStatus == TILE_STATUS.EMPTY;

        return (this.tileStatus == TILE_STATUS.EMPTY || this.tileStatus == TILE_STATUS.BIRTH_AREA);
    };

    this.isEmptyForBirth = function () {
        return (this.tileStatus == TILE_STATUS.EMPTY || this.tileStatus == TILE_STATUS.BIRTH_AREA);
    }
}

Tile.prototype = new GameElement();
