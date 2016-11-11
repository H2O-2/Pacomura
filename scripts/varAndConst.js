/**
 * Created by H2O2 on 16/10/30.
 */

var canvas, ctx;

var WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight;

var GAME_STATE = {START: "START", GAME: "GAME", FINISH: "FINISH"};
var INIT_POSN = {PLAYER_X: 3, PLAYER_Y: 3};
var MAP_WIDTH = 28,
    MAP_HEIGHT = 31;

var KEY = {KEY_LEFT: 37, KEY_UP: 38, KEY_RIGHT: 39, KEY_DOWN: 40};
var KEY_TO_DIR = 37;

var TILE_STATUS = {EMPTY: "EMPTY", OCCUPIED: "OCCUPIED", USER: "USER"};
var TILE_LEN = 32;

var GRID_SIZE = 32;

var ANIMATION_FRAMES = 4;
var REFRESH_SPEED = 7;

var PLAYER_SPEED = 2.5;
