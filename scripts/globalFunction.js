/**
 * Created by H2O2 on 16/11/17.
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
