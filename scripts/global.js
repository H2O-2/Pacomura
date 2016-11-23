/**
 * Created by H2O2 on 16/11/17.
 */

function GameElement(posnX, posnY) {
    this.posnX = posnX;
    this.posnY = posnY;
    this.height = 0;
    this.width = 0;

    this.collision = function (obj) {
        console.log(this instanceof Player);

        if ((this instanceof Player && this.radius + obj.width > Math.abs(this.posnX - obj.posnX) &&
            this.radius + obj.height > Math.abs(this.posnY - obj.posnY)) ||
            (obj instanceof Player && this.posnX + obj.radius > Math.abs(this.posnX - obj.posnX) &&
            this.height + obj.radius > Math.abs(this.posnY - obj.posnY))) {
            return true;
        } else if (!(this instanceof Player) && !(obj instanceof Player) &&
            this.width + obj.width > Math.abs(this.posnX - obj.posnX) &&
            this.height + obj.height > Math.abs(this.posnY - obj.posnY)) {
            return true;
        } else {
            console.log(this,obj);
        }

        return false;
    }
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
