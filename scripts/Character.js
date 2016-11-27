/**
 * Created by H2O2 on 16/10/29.
 */

 var TEST = 0.8;

function Character(posnX, posnY, speed) {
    this.posnX = posnX;
    this.posnY = posnY;
    this.curTile = null; // current tile status
    this.height = 0; // character height
    this.width = 0; // character
    this.charDir = keyToDir(KEY.KEY_DOWN); // current direction
    this.frontEmpty = true; // true if the tile in front of the character is empty
    this.tileFront = null; // tile in front of character
    this.sideEmpty = true; // true if both tiles on two sides of the front tile are empty
    this.tileSide = null; // tile beside that in front of character
    this.sideBlock = null; // the direction of the blocked side tile
    this.kuro = false; // true if player has the effect of special item (kuroka)
    this.speed = speed; // speed of the character
    this.animationArray = new Array(ANIMATION_FRAMES);
    this.currentAnimation = null;
    //this.outOfBirthPlace = true;
}

Character.prototype = new GameElement();

Character.prototype.antiDir = function (curDir) {
    if (curDir < KEY.KEY_RIGHT) {
        return curDir + 2;
    } else {
        return curDir - 2;
    }
};

Character.prototype.posnCenter = function (posn) {
    return posn + TILE_LEN / 2;
};

Character.prototype.checkJump = function (posn) {
    for (var i = 0; i < JUMP_ARRAY.length; i += 2) {
        //console.log(posn,JUMP_ARRAY[i] * TILE_LEN);
        if (posn >= JUMP_ARRAY[i] * TILE_LEN && posn <= JUMP_ARRAY[i + 1] * TILE_LEN) {
            return true;
        }
    }
    return false;
};

// check for border
Character.prototype.checkBorder = function (dir, x, y) {
    return (((dir == KEY.KEY_UP) && (y - BORDER.START_POINT * TILE_LEN <= 0)) ||
            ((dir == KEY.KEY_DOWN) && (BORDER.END_POINT_Y * TILE_LEN - y <= 0)) ||
            ((dir == KEY.KEY_LEFT) && (x - BORDER.START_POINT * TILE_LEN <= 0)) ||
            ((dir == KEY.KEY_RIGHT) && (BORDER.END_POINT_X * TILE_LEN - x <= 0)))
};

// return -1 (can't move), 0 (front tolerate), 1(can move), 2(double direction tolerate)
Character.prototype.canMove = function (dir, outOfBirthPlace) {

    //if (x < 0 || y < 0 || x > MAP_WIDTH * TILE_LEN || x > MAP_HEIGHT * TILE_LEN) return false;


    if (this.checkBorder(dir, this.posnX, this.posnY)) {
        return false;
    }

    if (dir == KEY.KEY_UP) {
        var testing = this.posnCenter(this.posnY) - this.speed - TILE_LEN / 2;
        var selfY = this.posnCenter(this.posnY);
        var tileNow  = posnToTile(this.posnCenter(this.posnX), this.posnCenter(this.posnY));
        this.tileFront = posnToTile(this.posnCenter(this.posnX), this.posnCenter(this.posnY) - this.speed - TILE_LEN / 2);
        if (this.posnX - this.tileFront.posnX <= 0) {
            this.tileSide = posnToTile(this.tileFront.posnX - TILE_LEN / 2, this.tileFront.posnY);
            this.sideBlock = KEY.KEY_LEFT;
        } else if (this.posnX - this.tileFront.posnX > 0) {
            this.tileSide = posnToTile(this.tileFront.posnX + 3 * TILE_LEN / 2, this.tileFront.posnY);
            this.sideBlock = KEY.KEY_RIGHT;
        }
    } else if (dir == KEY.KEY_DOWN) {
        this.tileFront = posnToTile(this.posnCenter(this.posnX), this.posnCenter(this.posnY) + this.speed + TILE_LEN / 2);
        if (this.posnX - this.tileFront.posnX <= 0) {
            this.tileSide = posnToTile(this.tileFront.posnX - TILE_LEN / 2, this.tileFront.posnY);
            this.sideBlock = KEY.KEY_LEFT;
        } else if (this.posnX - this.tileFront.posnX > 0) {
            this.tileSide = posnToTile(this.tileFront.posnX + 3 * TILE_LEN / 2, this.tileFront.posnY);
            this.sideBlock = KEY.KEY_RIGHT;
        }
    } else if (dir == KEY.KEY_RIGHT) {
        this.tileFront = posnToTile(this.posnCenter(this.posnX) + this.speed + TILE_LEN / 2, this.posnCenter(this.posnY));
        if (this.posnY - this.tileFront.posnY <= 0) {
            this.tileSide = posnToTile(this.tileFront.posnX, this.tileFront.posnY - TILE_LEN / 2);
            this.sideBlock = KEY.KEY_UP;
        } else if (this.posnY - this.tileFront.posnY > 0) {
            this.tileSide = posnToTile(this.tileFront.posnX, this.tileFront.posnY + 3 * TILE_LEN / 2);
            this.sideBlock = KEY.KEY_DOWN;
        }
    } else {
        this.tileFront = posnToTile(this.posnCenter(this.posnX) - this.speed - TILE_LEN / 2, this.posnCenter(this.posnY));
        if (this.posnY - this.tileFront.posnY <= 0) {
            this.tileSide = posnToTile(this.tileFront.posnX, this.tileFront.posnY - TILE_LEN / 2);
            this.sideBlock = KEY.KEY_UP;
        } else if (this.posnY - this.tileFront.posnY > 0) {
            this.tileSide = posnToTile(this.tileFront.posnX, this.tileFront.posnY + 3 * TILE_LEN / 2);
            this.sideBlock = KEY.KEY_DOWN;
        }
    }

    this.frontEmpty = this.tileFront.isEmpty(outOfBirthPlace);

    if (this.tileSide !== null) {
        this.sideEmpty = this.tileSide.isEmpty(outOfBirthPlace);
    }

    //console.log(this.tileFront, this);

    if (this.frontEmpty && this.sideEmpty) {
        //console.log(1);
        return MOVE_ACTION.MOVE;
    } else if (this.frontEmpty && !this.sideEmpty && this.collision(this.tileSide) === MOVE_ACTION.FRONT_TOLERANT) {
        //console.log(2);
        //console.log("collision " + !this.collision(this.tileSide));
        return MOVE_ACTION.DOUBLE_TOLERANT;
    } else if (this.frontEmpty && !this.sideEmpty) {
        //console.log(3);
        //console.log("collision " + this.collision(this.tileFront));
        //console.log(this.tileFront);
        return this.collision(this.tileSide);
    } else if (!this.frontEmpty && this.sideEmpty) {
        //console.log(4);
        return this.collision(this.tileFront);
    }

    return this.collision(this.tileFront);
};

Character.prototype.basicMove = function (outOfBirthPlace) {
    //console.log("START: " + this.posnX, this.posnY);
    if (((this.charDir === keyToDir(KEY.KEY_LEFT)) && (this.posnX - BORDER.START_POINT * TILE_LEN <= 0) &&
        this.checkJump(this.posnY))) {
        this.posnX = BORDER.END_POINT_X * TILE_LEN;
    } else if ((this.charDir === keyToDir(KEY.KEY_RIGHT)) && (BORDER.END_POINT_X * TILE_LEN - this.posnX <= 0) &&
        this.checkJump(this.posnY)) {
        this.posnX = BORDER.START_POINT * TILE_LEN;
    }

    var moveNum;
    if ((this.charDir === keyToDir(KEY.KEY_UP)) && this.canMove(KEY.KEY_UP, outOfBirthPlace) > MOVE_ACTION.MOVE) {
        moveNum = this.canMove(KEY.KEY_UP, outOfBirthPlace);
        this.posnY = this.tileFront.posnY + TILE_LEN + TEST;
        //console.log(this);
        /*
        if (moveNum === MOVE_ACTION.DOUBLE_TOLERANT && this.sideBlock === KEY.KEY_LEFT) {
            this.posnX = this.tileFront.posnX;
        } else if (moveNum === MOVE_ACTION.DOUBLE_TOLERANT && this.sideBlock === KEY.KEY_RIGHT) {
            this.posnX = this.tileFront.posnX - TILE_LEN;
        }
        */
    } else if ((this.charDir === keyToDir(KEY.KEY_UP)) && this.canMove(KEY.KEY_UP, outOfBirthPlace) === MOVE_ACTION.MOVE) {
        this.posnY -= this.speed;
    } else if ((this.charDir === keyToDir(KEY.KEY_DOWN)) && this.canMove(KEY.KEY_DOWN, outOfBirthPlace) > MOVE_ACTION.MOVE) {
        moveNum = this.canMove(KEY.KEY_DOWN, outOfBirthPlace);
        console.log(this.posnY);
        this.posnY = this.tileFront.posnY - TILE_LEN;
        console.log(this.posnY);
        /*
        if (moveNum === MOVE_ACTION.DOUBLE_TOLERANT && this.sideBlock === KEY.KEY_LEFT) {
            console.log("PASS");
            this.posnX = this.tileFront.posnX + TEST;
        } else if (moveNum === MOVE_ACTION.DOUBLE_TOLERANT && this.sideBlock === KEY.KEY_RIGHT) {
            this.posnX = this.tileFront.posnX + TEST;
        }
        */
    } else if ((this.charDir === keyToDir(KEY.KEY_DOWN)) && this.canMove(KEY.KEY_DOWN, outOfBirthPlace) === MOVE_ACTION.MOVE) {
        this.posnY += this.speed;
    } else if ((this.charDir === keyToDir(KEY.KEY_LEFT)) && this.canMove(KEY.KEY_LEFT, outOfBirthPlace) > MOVE_ACTION.MOVE) {
        moveNum = this.canMove(KEY.KEY_LEFT, outOfBirthPlace);
        this.posnX = this.tileFront.posnX + TILE_LEN + TEST;
        /*
        if (moveNum === MOVE_ACTION.DOUBLE_TOLERANT && this.sideBlock === KEY.KEY_UP) {
            this.posnY = this.tileFront.posnY - TEST;
        } else if (moveNum === MOVE_ACTION.DOUBLE_TOLERANT && this.sideBlock === KEY.KEY_DOWN) {
            this.posnY = this.tileFront.posnY - TILE_LEN;
        }
        */
    } else if ((this.charDir === keyToDir(KEY.KEY_LEFT)) && this.canMove(KEY.KEY_LEFT, outOfBirthPlace) === MOVE_ACTION.MOVE) {
        this.posnX -= this.speed;
    } else if ((this.charDir === keyToDir(KEY.KEY_RIGHT)) && this.canMove(KEY.KEY_RIGHT, outOfBirthPlace) > MOVE_ACTION.MOVE) {
        moveNum = this.canMove(KEY.KEY_RIGHT, outOfBirthPlace);
        this.posnX = this.tileFront.posnX - TILE_LEN;
        /*
        if (moveNum === MOVE_ACTION.DOUBLE_TOLERANT && this.sideBlock === KEY.KEY_UP) {
            this.posnY = this.tileFront.posnY - TILE_LEN;
        } else if (moveNum === MOVE_ACTION.DOUBLE_TOLERANT && this.sideBlock === KEY.KEY_DOWN) {
            this.posnY = this.tileFront.posnY;
        }
        */
    } else if ((this.charDir === keyToDir(KEY.KEY_RIGHT)) && this.canMove(KEY.KEY_RIGHT, outOfBirthPlace) === MOVE_ACTION.MOVE) {
        this.posnX += this.speed;
    }
    //console.log("END: " + this.posnX, this.posnY);
};

function Monster(posnX, posnY, speed) {
    this.posnX = posnX;
    this.posnY = posnY;
    this.prevX = -1;
    this.prevY = -1;
    this.speed = speed;
    this.availableDir = new Array(1);
    this.outOfBirthPlace = true;
    this.player = null;
    this.animationArray = new Array(ANIMATION_FRAMES);
    this.currentAnimation = null;
    this.newDirMove = 0;
    this.camera = null;
}


// MONSTER IMPLEMENTATION
Monster.prototype = new Character();

Monster.prototype.init = function (camera) {
    for (var i = 0; i < ANIMATION_FRAMES; i++) {
        this.animationArray[i] = new Animation(s_qb[i]);
    }

    //this.charDir = keyToDir(KEY.KEY_UP);
    this.availableDir[0] = this.charDir;
    this.curTile = posnToTile(this.posnX, this.posnY);
    //console.log("1: " + this.availableDir);
    console.log("SPEED: ", this.speed);

    this.camera = camera;
};

Monster.prototype.attach = function (player) {
    this.player = player;
};

var TURN_BUFFER = 3;
var TILE_LEN_BUFFER = TILE_LEN - 1;

Monster.prototype.dirIsAvailable = function (dir, outOfBirthPlace) {
    if (dir == KEY.KEY_UP) {
        for (var a = 1; a <= TURN_BUFFER; a++) {
            if (this.posnY - a * TILE_LEN <= BORDER.START_POINT ||
                !posnToTile(this.posnX, this.posnY - a * TILE_LEN).isEmpty(outOfBirthPlace) ||
                !posnToTile(this.posnX + TILE_LEN_BUFFER, this.posnY - a * TILE_LEN).isEmpty(outOfBirthPlace)) {
                return false;
            }
        }

        return true;
    } else if (dir == KEY.KEY_DOWN) {
        for (var b = 1; b <= TURN_BUFFER; b++) {
            if (this.posnY + b * TILE_LEN >= BORDER.END_POINT_Y * TILE_LEN ||
                !posnToTile(this.posnX, this.posnY + b * TILE_LEN).isEmpty(outOfBirthPlace) ||
                !posnToTile(this.posnX + TILE_LEN_BUFFER, this.posnY + b * TILE_LEN).isEmpty(outOfBirthPlace)) {
                return false;
            }
        }

        return true;
    } else if (dir == KEY.KEY_RIGHT) {
        for (var c = 1; c <= TURN_BUFFER; c++) {
            if ((!this.checkJump(this.posnY) && this.posnX + c * TILE_LEN >= BORDER.END_POINT_X * TILE_LEN) ||
                !posnToTile(this.posnX + c * TILE_LEN, this.posnY).isEmpty(outOfBirthPlace) ||
                !posnToTile(this.posnX + c * TILE_LEN, this.posnY + TILE_LEN_BUFFER).isEmpty(outOfBirthPlace)) {
                return false;
            }
        }

        return true;
    } else {
        for (var d = 1; d <= TURN_BUFFER; d++) {
            if ((!this.checkJump(this.posnY) && this.posnX - d * TILE_LEN <= BORDER.START_POINT) ||
                !posnToTile(this.posnX - d * TILE_LEN, this.posnY).isEmpty(outOfBirthPlace) ||
                !posnToTile(this.posnX - d * TILE_LEN, this.posnY + TILE_LEN_BUFFER).isEmpty(outOfBirthPlace)) {
                return false;
            }
        }

        return true;
    }
};

Monster.prototype.checkDir = function () {
    if (this.newDirMove < NEW_DIR_MOVE && !this.collided()) return;

    if (this.charDir == keyToDir(KEY.KEY_UP) || this.charDir == keyToDir(KEY.KEY_DOWN)) {
        if (this.dirIsAvailable(KEY.KEY_LEFT, this.outOfBirthPlace)) this.availableDir.push(keyToDir(KEY.KEY_LEFT));
        if (this.dirIsAvailable(KEY.KEY_RIGHT, this.outOfBirthPlace)) this.availableDir.push(keyToDir(KEY.KEY_RIGHT));
    } else {
        if (this.dirIsAvailable(KEY.KEY_UP, this.outOfBirthPlace)) this.availableDir.push(keyToDir(KEY.KEY_UP));
        if (this.dirIsAvailable(KEY.KEY_DOWN, this.outOfBirthPlace)) this.availableDir.push(keyToDir(KEY.KEY_DOWN));
    }
};

Monster.prototype.collided = function () {
    return this.posnX === this.prevX && this.posnY === this.prevY;
};

Monster.prototype.charMove = function () {

    //console.log("2: " + this.availableDir);
    this.checkDir();
    //console.log("3: " + this.availableDir);
/*
    if (this.availableDir.length === 1) {
        this.charDir = this.availableDir[0];
        //console.log("test: " + this.charDir);
        this.basicMove(this.outOfBirthPlace);
        this.newDirMove++;
        return;
    }
*/
    if (this.charDir === keyToDir(KEY.KEY_LEFT) || this.charDir === keyToDir(KEY.KEY_RIGHT)) {
        this.height = MONSTER_SIDE_HEIGHT;
        this.width = MONSTER_SIDE_WIDTH;
    } else if (this.charDir === keyToDir(KEY.KEY_UP)) {
        this.height = MONSTER_BACK_LEN;
        this.width = MONSTER_BACK_LEN
    } else {
        this.height = MONSTER_FRONT_LEN;
        this.width = MONSTER_FRONT_LEN;
    }

    if (this.availableDir.length === 1 && !this.collided()) {
        this.prevX = this.posnX;
        this.prevY = this.posnY;
        this.charDir = this.availableDir[0];
        //console.log("test: " + this.charDir);
        this.basicMove(this.outOfBirthPlace);
        this.newDirMove++;
        return;
    } else if (this.availableDir.length === 1) {
        this.checkDir();
    }

    //console.log(Math.floor(Math.random() * this.availableDir.length));
    //var newDir = this.availableDir[Math.floor(Math.random() * this.availableDir.length)];

    var newDir = this.availableDir[Math.floor(Math.random() * this.availableDir.length)];

    this.charDir = newDir;
    //console.log("test: " + this.charDir);
    this.basicMove(this.outOfBirthPlace);

    for (var i = 0; i < this.availableDir.length; i++) {
        this.availableDir[i] = null;
    }

    this.availableDir = null;
    this.availableDir = new Array(1);
    this.availableDir[0] = newDir;
    this.newDirMove = 0;
};

Monster.prototype.setAnimation = function () {
    this.currentAnimation = this.animationArray[this.charDir];
};

Monster.prototype.update = function () {
    this.curTile = posnToTile(this.posnX, this.posnY);
    this.setAnimation();
    this.charMove();
    if (this.currentAnimation) this.currentAnimation.update();
};

Monster.prototype.render = function (ctx) {
    //console.log(this.charDir);
    this.currentAnimation.currentFrame().draw(ctx, this.posnX - offsetX(this.camera.cameraX),
                                                this.posnY - offsetY(this.camera.cameraY));
};


// PLAYER IMPLEMENTATION
function Player(posnX, posnY, speed) {
    this.posnX = posnX;
    this.posnY = posnY;
    this.radius = PLAYER_RAD;
    this.height = PLAYER_RAD * 2;
    this.width = PLAYER_RAD * 2;
    this.speed = speed;
    this.camera = null;
    this.animationArray = new Array(ANIMATION_FRAMES * 2);
    this.observers = new Array(MONSTER_NUM);
}

Player.prototype = new Character();

Player.prototype.init = function (camera) {
    for (var i = 0; i < ANIMATION_FRAMES; i++) {
        this.animationArray[i] = new Animation(s_homuraNorm[i]);
    }

    for (var j = 4; j < ANIMATION_FRAMES * 2; j++) {
        this.animationArray[j] = new Animation(s_homuraKuro[j - ANIMATION_FRAMES]);
    }

    for (var k = 0; k < MONSTER_NUM; k++) {
        this.observers[k] = new Monster(350, 350);
        console.log(this.observers[k]);
        this.observers[k].attach(this);
    }

    this.camera = camera;
    this.curTile = posnToTile(this.posnX, this.posnY);
};

Player.prototype.charMove = function () {
    this.basicMove(true);
    //console.log(this);
};

Player.prototype.setAnimation = function () {
    if (this.kuro) {
        this.currentAnimation = this.animationArray[ANIMATION_FRAMES + this.charDir];
    } else {
        this.currentAnimation = this.animationArray[this.charDir];
    }
};

Player.prototype.notifyObserver = function () {
    for (var i = 0; i < MONSTER_NUM; i++) {
        //this.observers[i].update();
    }
};

Player.prototype.update = function () {
    this.charDir = keyEvt.getDir();
    this.setAnimation();
    this.charMove();
    if (this.currentAnimation) this.currentAnimation.update();

    this.notifyObserver();
};

Player.prototype.render = function (ctx) {
    if (this.charDir !== undefined) {
        if (this.currentAnimation.currentFrame() === s_homuraNorm[2][1] ||
            this.currentAnimation.currentFrame() === s_homuraKuro[2][1])
        {

            this.currentAnimation.currentFrame().draw(ctx, this.posnX - offsetX(this.camera.cameraX) - 2 + MODIFY_RIGHT,
                                                        this.posnY - offsetY(this.camera.cameraY));
        } else if (this.charDir == keyToDir(KEY.KEY_RIGHT)) {
            this.currentAnimation.currentFrame().draw(ctx, this.posnX - offsetX(this.camera.cameraX) + MODIFY_RIGHT,
                                                        this.posnY - offsetY(this.camera.cameraY));
        } else {
            this.currentAnimation.currentFrame().draw(ctx, this.posnX - offsetX(this.camera.cameraX),
                                                        this.posnY - offsetY(this.camera.cameraY));
        }

    } else {
        s_homuraNorm[3][0].draw(ctx, this.posnX - offsetX(this.camera.cameraX), this.posnY - offsetY(this.camera.cameraY));
    }
};


