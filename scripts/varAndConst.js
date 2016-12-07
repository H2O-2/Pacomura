/**
 * Created by H2O2 on 16/10/30.
 */

var canvas = document.getElementById("playerCanvas"),
    ctx = canvas.getContext("2d"),
    enemy = document.getElementById("enemyCanvas"),
    enemyCtx = enemy.getContext("2d"),
    bg = document.getElementById("bgCanvas"),
    bgCtx = bg.getContext("2d");

var WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight,
    C_WIDTH = 640,
    C_HEIGHT = 384;

var GLOBAL_BUFFER = 0.8;
var TURN_BUFFER = 3;

var OBSERVER_W = 10,
    OBSERVER_H = 6;

var GAME_STATE = {START: 1, GAME: 2, DIE: 3,FINISH: 4};
//var PLAYER_STATE = {NORM: 1, DIE: 2, REVIVE: 3};

var DIE_TIME = 80;
var MONSTER_CORPSE_TIME = 150;

var MONSTER_NUM = 20;
var MONSTER_BIRTHPLACE = 12;
//var MONSTER_OTHER = 10;

//var INIT_POSN = {PLAYER_X: 15, PLAYER_Y: 24.5, MONSTER_X: 12.5, MONSTER_Y: 15};
var INIT_POSN = {PLAYER_X: 2, PLAYER_Y: 2, MONSTER_X: 12.5, MONSTER_Y: 15};
//var MONSTER_INIT_OUT = [[2,2],[2,28],[10,2],[10,28],[24,2],[24,28],[31,2],[31,28]];
var MONSTER_INIT_OUT = [[2,2],[28,2],[2,10],[28,10],[2,24],[28,24],[2,31],[28,31]];

var MAP_WIDTH = 31,
    MAP_HEIGHT = 34;
var BORDER = {START_POINT: 2, END_POINT_X: 28, END_POINT_Y: 31};
var BIRTH_BORDER_X = 11;
var BIRTH_BORDER_Y = 13;
var BIRTH_WIDTH = 7;
var BIRTH_HEIGHT = 4;
var BIRTH = {START_POINT_X: 12, START_POINT_Y: 14, END_POINT_X: 18, END_POINT_Y: 17, EXIT_START: 14, EXIT_END: 16};
var BIRTH_EXIT_LEN = 3;

var JUMP_ARRAY = [14,15,17,18];

var KEY = {KEY_LEFT: 37, KEY_UP: 38, KEY_RIGHT: 39, KEY_DOWN: 40};
var KEY_TO_DIR = 37;

var TILE_STATUS = {EMPTY: "EMPTY", OCCUPIED: "OCCUPIED", BIRTH_AREA:"BIRTH_AREA"};
var ITEM_TYPE = {POINT: 0, LIFE: 1, EFFECT_01: 2, EFFECT_02: 3, EFFECT_03: 4, EFFECT_04: 5};
var ITEM_BORDER = {START: 3, END_X: 29, END_Y: 32};
var ITEM_ARRAY = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,1],
        [1,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,1],
        [1,0,0,1,0,0,0,0,1,0,0,1,1,1,1,0,0,1,0,0,0,0,1,0,0,1],
        [1,0,0,1,1,1,1,1,1,0,0,1,0,0,1,0,0,1,1,1,1,1,1,0,0,1],
        [1,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,1],
        [1,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,1],
        [1,1,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1],
        [0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0],
        [0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0],
        [0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0],
        [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
        [0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0],
        [0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0],
        [0,0,1,0,0,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,0,0,1,0,0],
        [0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0],
        [0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0],
        [1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1],
        [1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1],
        [1,0,0,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,0,0,1],
        [1,0,0,1,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,1,0,0,1],
        [1,0,0,1,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,1,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1]
        ];

var MOVE_ACTION = {NO_MOVE: -1, MOVE: 0, FRONT_TOLERANT: 1,  DOUBLE_TOLERANT: 2};

var TILE_LEN = 32;
var TILE_LEN_BUFFER = TILE_LEN - 1;
var PLAYER_RAD = 16;
var MONSTER_FRONT_LEN = 26;
var MONSTER_BACK_LEN = 23;
var MONSTER_SIDE_WIDTH = 28;
var MONSTER_SIDE_HEIGHT = 21;

var CHARACTER_SPEED = 2.7;
var KURO_SPEED = 5;
var PLAYER_LIFE = 10;

var NEW_DIR_MOVE = 30;
var BIRTH_DIR_MOVE = 25;

var ANIMATION_FRAMES = 4;
var MODIFY_RIGHT = 7;
var REFRESH_SPEED = 8;
var CAMERA_SPEED = 10;

var CAMERA_BORDER = 1/2;
var COLLISION_TOLERENCE = 0;

var ITEM_NUM = 5;
var POINT_WIDTH = 7,
    POINT_HEIGHT = 12;

var WALL_ARRAY = [
    // MAP
    [],
    [],
    [2,5,6,7,10,11,12,13,14,15,16,19,20,21,24],
    [2,5,6,7,10,16,19,20,21,24],
    [2,10,16,24],
    [2,10,13,16,24],
    [2,3,4,7,10,13,16,19,22,23,24],
    [7,13,19],
    [7,13,19],
    [0,1,4,5,6,7,8,9,10,13,16,17,18,19,20,21,22,25,26],
    [0,1,7,19,25,26],
    [0,1,7,19,25,26],
    [4,7,19,22],
    [4,22],
    [0,1,2,3,4,22,23,24,25,26],
    [4,7,19,22],
    [4,7,19,22],
    [0,1,7,19,25,26],
    [0,1,7,8,9,10,13,16,17,18,19,25,26],
    [0,1,4,13,22,25,26],
    [0,1,4,13,22,25,26],
    [0,1,4,5,6,7,10,13,16,19,20,21,22,25,26],
    [10,16],
    [10,16],
    [2,3,4,7,10,11,12,13,14,15,16,19,22,23,24],
    [2,7,19,24],
    [2,7,19,24],
    [2,5,6,7,8,9,10,13,16,17,18,19,20,21,24],
    [13],
    [13]
];