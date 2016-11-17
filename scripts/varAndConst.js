/**
 * Created by H2O2 on 16/10/30.
 */

var canvas, ctx, bg, bgCtx;

var WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight;

var OBSERVER_W = 10,
    OBSERVER_H = 6;

var GAME_STATE = {START: "START", GAME: "GAME", FINISH: "FINISH"};
var INIT_POSN = {PLAYER_X: 10, PLAYER_Y: 10};
var MAP_WIDTH = 31,
    MAP_HEIGHT = 32;
var BORDER = {START_POINT: 2.2, END_POINT_X: 30, END_POINT_Y: 31};

var KEY = {KEY_LEFT: 37, KEY_UP: 38, KEY_RIGHT: 39, KEY_DOWN: 40};
var KEY_TO_DIR = 37;

var TILE_STATUS = {EMPTY: "EMPTY", OCCUPIED: "OCCUPIED", BIRTH_AREA:"BIRTH_AREA"};
var TILE_LEN = 32;

var GRID_SIZE = 32;

var CHARACTER_SPEED = 2.5;

var ANIMATION_FRAMES = 4;
var REFRESH_SPEED = 8;
var CAMERA_SPEED = 10;

var MONSTER_NUM = 4;

function offsetX(cameraX) {
    return cameraX - canvas.width/2;
}

function offsetY(cameraY) {
    return cameraY - canvas.height/2;
}
