/**
 * Created by H2O2 on 16/11/17.
 */

function GameElement(posnX, posnY) {
    this.posnX = posnX;
    this.posnY = posnY;
    this.height = 0;
    this.width = 0;

    // return -1 (can't move), 0 (can move), 1(tolerate)
    this.collision = function (obj) {
        if (obj === null) return false;

        var tolerance;

        if (this instanceof Player && this.kuro === false) {
            tolerance = CHARACTER_SPEED;
        } else if (this instanceof Player) {
            tolerance = KURO_SPEED;
        }

        if (((this instanceof Player && (this.radius + obj.width/2 > Math.abs(this.posnX - obj.posnX)) &&
            (this.radius + obj.height/2 > Math.abs(this.posnY - obj.posnY) + tolerance)) ||
            (obj instanceof Player && this.width/2 + obj.radius > Math.abs(this.posnX - obj.posnX) + tolerance &&
            this.height/2 + obj.radius > Math.abs(this.posnY - obj.posnY) + tolerance)) ||
            (!(this instanceof Player) && !(obj instanceof Player) &&
            TILE_LEN/2 + obj.width/2 >= Math.abs(this.posnX - obj.posnX) + tolerance &&
            TILE_LEN/2 + obj.height/2 >= Math.abs(this.posnY - obj.posnY) + tolerance)) {
            return MOVE_ACTION.NO_MOVE;
        } else if (((this instanceof Player && this.radius + obj.width/2 < Math.abs(this.posnX - obj.posnX) &&
            this.radius + obj.height/2 < Math.abs(this.posnY - obj.posnY)) ||
            (obj instanceof Player && this.width/2 + obj.radius < Math.abs(this.posnX - obj.posnX) &&
            this.height/2 + obj.radius < Math.abs(this.posnY - obj.posnY))) ||
            (!(this instanceof Player) && !(obj instanceof Player) &&
            TILE_LEN/2 + obj.width/2 < Math.abs(this.posnX - obj.posnX) &&
            TILE_LEN/2 + obj.height/2 < Math.abs(this.posnY - obj.posnY))) {
            return MOVE_ACTION.MOVE;
        }

        return MOVE_ACTION.FRONT_TOLERANT;
    };
}

function offsetX(cameraX) {
    return cameraX - canvas.width/2;
}

function offsetY(cameraY) {
    return cameraY - canvas.height/2;
}

function keyToDir(key) {
    return key - KEY_TO_DIR;
}

function posnCenter(posn) {
    return posn + TILE_LEN / 2;
}

function playerViewLeftTop(camera) {
    var leftPosn = offsetX(camera.cameraX),
        topPosn = offsetY(camera.cameraY);

    if (leftPosn < ITEM_BORDER.START * TILE_LEN) {
        leftPosn = ITEM_BORDER.START * TILE_LEN;
    }

    if (topPosn < ITEM_BORDER.START * TILE_LEN) {
        topPosn = ITEM_BORDER.START * TILE_LEN;
    }

    //console.log(leftPosn, topPosn);

    return posnToTile(leftPosn, topPosn);
}

function playerViewRightBottom(camera) {
    var rightPosn = offsetX(camera.cameraX) + C_WIDTH + TILE_LEN,
        bottomPosn = offsetY(camera.cameraY) + C_HEIGHT + TILE_LEN;

    if (rightPosn > ITEM_BORDER.END_X * TILE_LEN) {
        rightPosn = ITEM_BORDER.END_X * TILE_LEN;
    }

    if (bottomPosn > ITEM_BORDER.END_Y * TILE_LEN) {
        bottomPosn = ITEM_BORDER.END_Y * TILE_LEN;
    }

    return posnToTile(rightPosn, bottomPosn);
}

function manhattanS(obj1, obj2) {
    return (Math.abs(posnCenter(obj1.posnX) - posnCenter(obj2.posnX)) +
            Math.abs(posnCenter(obj1.posnY) - posnCenter(obj2.posnY)));
}
