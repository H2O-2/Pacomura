/**
 * Created by H2O2 on 16/10/29.
 */

function Tile(tileX, tileY) {
    this.tileX = tileX;
    this.tileY = tileY;
    this.tileStatus = TILE_STATUS.EMPTY;

    this.isEmpty = function () {
        return this.tileStatus == TILE_STATUS.EMPTY;
    };

    this.isEmptyForBirth = function () {
        return (this.tileStatus == TILE_STATUS.EMPTY || this.tileStatus == TILE_STATUS.BIRTH_AREA);
    }
}
