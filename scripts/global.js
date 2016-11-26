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

        if (((this instanceof Player && this.radius + obj.width/2 > Math.abs(this.posnX - obj.posnX) + tolerance &&
            this.radius + obj.height/2 > Math.abs(this.posnY - obj.posnY) + tolerance) ||
            (obj instanceof Player && this.width/2 + obj.radius > Math.abs(this.posnX - obj.posnX) + tolerance &&
            this.height/2 + obj.radius > Math.abs(this.posnY - obj.posnY) + tolerance)) ||
            (!(this instanceof Player) && !(obj instanceof Player) &&
            this.width/2 + obj.width/2 > Math.abs(this.posnX - obj.posnX) + tolerance &&
            this.height/2 + obj.height/2 > Math.abs(this.posnY - obj.posnY) + tolerance)) {
            return MOVE_ACTION.NO_MOVE;
        } else if (((this instanceof Player && this.radius + obj.width/2 < Math.abs(this.posnX - obj.posnX) &&
            this.radius + obj.height/2 < Math.abs(this.posnY - obj.posnY)) ||
            (obj instanceof Player && this.width/2 + obj.radius < Math.abs(this.posnX - obj.posnX) &&
            this.height/2 + obj.radius < Math.abs(this.posnY - obj.posnY))) ||
            (!(this instanceof Player) && !(obj instanceof Player) &&
            this.width/2 + obj.width/2 < Math.abs(this.posnX - obj.posnX) &&
            this.height/2 + obj.height/2 < Math.abs(this.posnY - obj.posnY))) {
            return MOVE_ACTION.MOVE;
        }
        //console.log('PASS');

        return MOVE_ACTION.FRONT_TOLERANT;
    };
}

/*
function collision(obj1, obj2) {
    if (obj1 instanceof Player || obj2 instanceof Player) {

    }
}
*/

function offsetX(cameraX) {
    return cameraX - canvas.width/2;
}

function offsetY(cameraY) {
    return cameraY - canvas.height/2;
}

function keyToDir(key) {
    return key - KEY_TO_DIR;
}
