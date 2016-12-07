/**
 * Created by H2O2 on 16/11/12.
 */

function Map() {
    this.tiles = new Array(MAP_WIDTH);

    this.init = function () {
        for (var i = 0; i < MAP_WIDTH; i++) {
            this.tiles[i] = new Array(MAP_HEIGHT);
            for (var j = 0; j < MAP_HEIGHT; j++) {
                this.tiles[i][j] = new Tile(TILE_LEN * (i + BORDER.START_POINT), TILE_LEN * (j + BORDER.START_POINT));
            }
        }

        this.tiles[MAP_WIDTH - 1].push(new Tile(-1,-1));
        this.tiles[MAP_WIDTH - 1][MAP_HEIGHT].tileStatus = TILE_STATUS.OCCUPIED;

        console.log("FIRST");
        console.log(this.tiles[0][0]);

        for (var m = 0; m < WALL_ARRAY.length; m++) {
            for (var n = 0; n < WALL_ARRAY[m].length; n++) {
                //console.log(m, WALL_ARRAY[m][n]);
                this.tiles[WALL_ARRAY[m][n]][m].tileStatus = TILE_STATUS.OCCUPIED;
            }
        }

        for (var a = 0; a < BIRTH_WIDTH; a++) {
            for (var b = 0; b < BIRTH_HEIGHT; b++) {
                this.tiles[BIRTH_BORDER_X + a - 1][BIRTH_BORDER_Y + b - 1].tileStatus = TILE_STATUS.BIRTH_AREA;
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
        //console.log(-offsetX(this.camera.cameraX),-offsetY(this.camera.cameraY));
        s_map.draw(bgCtx, -offsetX(this.camera.cameraX), -offsetY(this.camera.cameraY));
        //s_homuraKuro[3][0].drawWithSize(bgCtx, this.tiles[0][0].posnX, this.tiles[0][0].posnY, s_homuraKuro[3][0].width, 5);
        //console.log(this.tiles[0][0].posnX, this.tiles[0][0].posnY);
        //console.log(this.tiles);
        //console.log("TESTER: " + this.tiles[0][0].posnX, this.tiles[0][0].posnY);
    };
}

var mapAll = new Map();
mapAll.init();

function posnToTile(x, y) {
    var tileX = Math.floor(x / TILE_LEN) - 2;
    var tileY = Math.floor(y / TILE_LEN) - 2;

    if (tileX < 0) {
        tileX = 0;
    } else if (tileX >= MAP_WIDTH) {
        tileX = MAP_WIDTH - 1;
    }

    if (tileY < 0) {
        tileY = 0;
    } else if (tileY >= MAP_HEIGHT) {
        tileY = MAP_HEIGHT - 1;
    }

    //console.log(x, y, tileX, tileY, mapAll.tiles[tileX][tileY].tileStatus);
    //console.log(x);

    return mapAll.tiles[tileX][tileY];
}

