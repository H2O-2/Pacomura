/**
 * Created by H2O2 on 16/10/30.
 */

var canvas = document.getElementById("myCanvas"),
    ctx = canvas.getContext("2d"),
    bg = document.getElementById("bgCanvas"),
    bgCtx = bg.getContext("2d");

var WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight,
    C_WIDTH = 640,
    C_HEIGHT = 384;

var OBSERVER_W = 10,
    OBSERVER_H = 6;

var GAME_STATE = {START: "START", GAME: "GAME", FINISH: "FINISH"};

var INIT_POSN = {PLAYER_X: 2, PLAYER_Y: 2};
var MAP_WIDTH = 31,
    MAP_HEIGHT = 34;
var BORDER = {START_POINT: 2, END_POINT_X: 28, END_POINT_Y: 31};

var KEY = {KEY_LEFT: 37, KEY_UP: 38, KEY_RIGHT: 39, KEY_DOWN: 40};
var KEY_TO_DIR = 37;

var TILE_STATUS = {EMPTY: "EMPTY", OCCUPIED: "OCCUPIED", BIRTH_AREA:"BIRTH_AREA"};

var TILE_LEN = 32;

var CHARACTER_SPEED = 2.5;

var ANIMATION_FRAMES = 4;
var REFRESH_SPEED = 8;
var CAMERA_SPEED = 10;

var CAMERA_BORDER = 1/2;

var MONSTER_NUM = 4;

var WALL_ARRAY = [
    [], [], [2,5,6,7,10,11,12,13,14,15,16,19,20,21,24]
];
