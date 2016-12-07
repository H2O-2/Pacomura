/**
 * Created by H2O2 on 16/10/29.
 */

function Character(posnX, posnY, speed) {
    this.posnX = posnX;
    this.posnY = posnY;
    this.height = 0; // character height
    this.width = 0; // character
    this.charDir = keyToDir(KEY.KEY_UP); // current direction
    this.frontEmpty = true; // true if the tile in front of the character is empty
    this.tileFront = null; // tile in front of character
    this.sideEmpty = true; // true if both tiles on two sides of the front tile are empty
    this.tileSide = null; // tile beside that in front of character
    this.kuro = true; // true if player has the effect of special item (kuroka)
    this.outOfBirthPlace = false;
    this.speed = speed; // speed of the character
    this.animationArray = new Array(ANIMATION_FRAMES);
    this.currentAnimation = null;
}

Character.prototype = new GameElement();

// check if Character should jump to the other side of the map
Character.prototype.checkJump = function (posn) {
    for (var i = 0; i < JUMP_ARRAY.length; i += 2) {
        if (posn >= JUMP_ARRAY[i] * TILE_LEN && posn <= JUMP_ARRAY[i + 1] * TILE_LEN) {
            return true;
        }
    }
    return false;
};

// check for border
Character.prototype.checkBorder = function (dir, x, y) {
    return ((dir == KEY.KEY_UP) && (y - BORDER.START_POINT * TILE_LEN <= 0)) ||
        ((dir == KEY.KEY_DOWN) && (BORDER.END_POINT_Y * TILE_LEN - y <= 0)) ||
        ((dir == KEY.KEY_LEFT) && (x - BORDER.START_POINT * TILE_LEN <= 0)) ||
        ((dir == KEY.KEY_RIGHT) && (BORDER.END_POINT_X * TILE_LEN - x <= 0));
};

Character.prototype.exitCollision = function (posnX) {
    return (posnX > BIRTH.EXIT_START * TILE_LEN) && (posnX < BIRTH.EXIT_END * TILE_LEN);
};

Character.prototype.birthAreaCollisionY = function (posnY) {
    return posnY > BIRTH.START_POINT_Y * TILE_LEN && posnY < BIRTH.END_POINT_Y * TILE_LEN;
};

Character.prototype.checkBirthBorder = function (dir, x, y) {
    var test = this.exitCollision(x);
    var test1 = (dir == KEY.KEY_UP);
    var test2 = dir == (y - BIRTH.START_POINT_Y * TILE_LEN <= 0);

    return ((dir == KEY.KEY_UP) && (y - (BIRTH.START_POINT_Y + 2) * TILE_LEN <= 0) && !this.exitCollision(x)) ||
        ((dir == KEY.KEY_DOWN) && (BIRTH.END_POINT_Y * TILE_LEN - y <= 0)) ||
        ((dir == KEY.KEY_LEFT) && (x - BIRTH.START_POINT_X * TILE_LEN <= 0)) ||
        ((dir == KEY.KEY_RIGHT) && (BIRTH.END_POINT_X * TILE_LEN - x <= 0));
};


// return -1 (can't move), 0 (front tolerate), 1(can move), 2(double direction tolerate)
Character.prototype.canMove = function (dir, outOfBirthPlace) {
    if (this instanceof Monster && !this.outOfBirthPlace && this.checkBirthBorder(dir, this.posnX, this.posnY)) {
        return -1;
    }

    if (this.checkBorder(dir, this.posnX, this.posnY)) {
        return -1;
    }

    if (dir == KEY.KEY_UP) {
        this.tileFront = posnToTile(posnCenter(this.posnX), posnCenter(this.posnY) - this.speed - TILE_LEN / 2);
        if (this.posnX - this.tileFront.posnX <= 0) {
            this.tileSide = posnToTile(this.tileFront.posnX - TILE_LEN / 2, this.tileFront.posnY);
        } else if (this.posnX - this.tileFront.posnX > 0) {
            this.tileSide = posnToTile(this.tileFront.posnX + 3 * TILE_LEN / 2, this.tileFront.posnY);
        }
    } else if (dir == KEY.KEY_DOWN) {
        this.tileFront = posnToTile(posnCenter(this.posnX), posnCenter(this.posnY) + this.speed + TILE_LEN / 2);
        if (this.posnX - this.tileFront.posnX <= 0) {
            this.tileSide = posnToTile(this.tileFront.posnX - TILE_LEN / 2, this.tileFront.posnY);
        } else if (this.posnX - this.tileFront.posnX > 0) {
            this.tileSide = posnToTile(this.tileFront.posnX + 3 * TILE_LEN / 2, this.tileFront.posnY);
        }
    } else if (dir == KEY.KEY_RIGHT) {
        this.tileFront = posnToTile(posnCenter(this.posnX) + this.speed + TILE_LEN / 2, posnCenter(this.posnY));
        if (this.posnY - this.tileFront.posnY <= 0) {
            this.tileSide = posnToTile(this.tileFront.posnX, this.tileFront.posnY - TILE_LEN / 2);
        } else if (this.posnY - this.tileFront.posnY > 0) {
            this.tileSide = posnToTile(this.tileFront.posnX, this.tileFront.posnY + 3 * TILE_LEN / 2);
        }
    } else {
        this.tileFront = posnToTile(posnCenter(this.posnX) - this.speed - TILE_LEN / 2, posnCenter(this.posnY));
        if (this.posnY - this.tileFront.posnY <= 0) {
            this.tileSide = posnToTile(this.tileFront.posnX, this.tileFront.posnY - TILE_LEN / 2);
        } else if (this.posnY - this.tileFront.posnY > 0) {
            this.tileSide = posnToTile(this.tileFront.posnX, this.tileFront.posnY + 3 * TILE_LEN / 2);
        }
    }

    this.frontEmpty = this.tileFront.isEmpty(outOfBirthPlace);

    if (this.tileSide !== null) {
        this.sideEmpty = this.tileSide.isEmpty(outOfBirthPlace);
    }

    if (this.frontEmpty && this.sideEmpty) {
        return MOVE_ACTION.MOVE;
    } else if (this.frontEmpty && !this.sideEmpty && this.collision(this.tileSide) === MOVE_ACTION.FRONT_TOLERANT) {
        return MOVE_ACTION.DOUBLE_TOLERANT;
    } else if (this.frontEmpty && !this.sideEmpty) {
        return this.collision(this.tileSide);
    } else if (!this.frontEmpty && this.sideEmpty) {
        return this.collision(this.tileFront);
    }

    return this.collision(this.tileFront);
};

Character.prototype.basicMove = function (outOfBirthPlace) {
    if (((this.charDir === keyToDir(KEY.KEY_LEFT)) && (this.posnX - BORDER.START_POINT * TILE_LEN <= 0) &&
        this.checkJump(this.posnY))) {
        this.posnX = BORDER.END_POINT_X * TILE_LEN;
    } else if ((this.charDir === keyToDir(KEY.KEY_RIGHT)) && (BORDER.END_POINT_X * TILE_LEN - this.posnX <= 0) &&
        this.checkJump(this.posnY)) {
        this.posnX = BORDER.START_POINT * TILE_LEN;
    }

    if ((this.charDir === keyToDir(KEY.KEY_UP)) && this.canMove(KEY.KEY_UP, outOfBirthPlace) > MOVE_ACTION.MOVE) {
        this.posnY = this.tileFront.posnY + TILE_LEN + GLOBAL_BUFFER;
    } else if ((this.charDir === keyToDir(KEY.KEY_UP)) && this.canMove(KEY.KEY_UP, outOfBirthPlace) === MOVE_ACTION.MOVE) {
        this.posnY -= this.speed;
    } else if ((this.charDir === keyToDir(KEY.KEY_DOWN)) && this.canMove(KEY.KEY_DOWN, outOfBirthPlace) > MOVE_ACTION.MOVE) {
        this.posnY = this.tileFront.posnY - TILE_LEN;
    } else if ((this.charDir === keyToDir(KEY.KEY_DOWN)) && this.canMove(KEY.KEY_DOWN, outOfBirthPlace) === MOVE_ACTION.MOVE) {
        this.posnY += this.speed;
    } else if ((this.charDir === keyToDir(KEY.KEY_LEFT)) && this.canMove(KEY.KEY_LEFT, outOfBirthPlace) > MOVE_ACTION.MOVE) {
        this.posnX = this.tileFront.posnX + TILE_LEN + GLOBAL_BUFFER;
    } else if ((this.charDir === keyToDir(KEY.KEY_LEFT)) && this.canMove(KEY.KEY_LEFT, outOfBirthPlace) === MOVE_ACTION.MOVE) {
        this.posnX -= this.speed;
    } else if ((this.charDir === keyToDir(KEY.KEY_RIGHT)) && this.canMove(KEY.KEY_RIGHT, outOfBirthPlace) > MOVE_ACTION.MOVE) {
        this.posnX = this.tileFront.posnX - TILE_LEN;
    } else if ((this.charDir === keyToDir(KEY.KEY_RIGHT)) && this.canMove(KEY.KEY_RIGHT, outOfBirthPlace) === MOVE_ACTION.MOVE) {
        this.posnX += this.speed;
    } else if(this.charDir === undefined && this.charDirPrev !== undefined) {
        this.charDir = this.charDirPrev;
        this.basicMove(outOfBirthPlace);
    }

    return;
};

function Monster(posnX, posnY, speed) {
    this.posnX = posnX;
    this.posnY = posnY;
    this.prevX = -1;
    this.prevY = -1;
    this.speed = speed;
    this.availableDir = new Array(1);
    this.outOfBirthPlace = false;
    this.player = null;
    this.animationArray = new Array(ANIMATION_FRAMES);
    this.currentAnimation = null;
    this.newDirMove = 0; // makes Monster move at least NEW_DIR_MOVE of frames before changing direction again
    this.camera = null;
    this.killed = false;
    this.corpseTime = 0;
}


// MONSTER IMPLEMENTATION
Monster.prototype = new Character();

Monster.prototype.init = function (camera) {
    for (var i = 0; i < ANIMATION_FRAMES; i++) {
        this.animationArray[i] = new Animation(s_qb[i]);
    }

    this.availableDir[0] = this.charDir;
    console.log("SPEED: ", this.speed);

    this.camera = camera;
};

Monster.prototype.attach = function (player) {
    this.player = player;
};

Monster.prototype.checkPlayer = function () {
    if (manhattanS(this, this.player) > 2 * TILE_LEN) return;

    if (this.player.collision(this) == MOVE_ACTION.NO_MOVE && !this.player.caught) {
        if (!this.player.kuro) {
            console.log("COLLIDE");
            this.player.caught = true;
            this.player.life--;
        } else {
            this.killed = true;
        }
    }
};

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
    if (this.outOfBirthPlace && this.newDirMove < NEW_DIR_MOVE && !this.collided()) return false;
    if (!this.outOfBirthPlace && this.newDirMove < BIRTH_DIR_MOVE && !this.collided()) return false;

    if (this.charDir == keyToDir(KEY.KEY_UP) || this.charDir == keyToDir(KEY.KEY_DOWN)) {
        if (this.dirIsAvailable(KEY.KEY_LEFT, this.outOfBirthPlace)) this.availableDir.push(keyToDir(KEY.KEY_LEFT));
        if (this.dirIsAvailable(KEY.KEY_RIGHT, this.outOfBirthPlace)) this.availableDir.push(keyToDir(KEY.KEY_RIGHT));
    } else {
        if (this.dirIsAvailable(KEY.KEY_UP, this.outOfBirthPlace)) this.availableDir.push(keyToDir(KEY.KEY_UP));
        if (this.dirIsAvailable(KEY.KEY_DOWN, this.outOfBirthPlace)) this.availableDir.push(keyToDir(KEY.KEY_DOWN));
    }

    if (this.availableDir.length === 1) return false;
};

Monster.prototype.collided = function () {
    return this.posnX === this.prevX && this.posnY === this.prevY;
};

Monster.prototype.charMove = function () {

    this.checkDir();

    if (this.charDir === keyToDir(KEY.KEY_LEFT) || this.charDir === keyToDir(KEY.KEY_RIGHT)) {
        this.height = MONSTER_SIDE_HEIGHT;
        this.width = MONSTER_SIDE_WIDTH;
    } else if (this.charDir === keyToDir(KEY.KEY_UP)) {
        this.height = MONSTER_BACK_LEN;
        this.width = MONSTER_BACK_LEN;
    } else {
        this.height = MONSTER_FRONT_LEN;
        this.width = MONSTER_FRONT_LEN;
    }

    if (this.availableDir.length === 1 && !this.collided()) {
        this.prevX = this.posnX;
        this.prevY = this.posnY;
        this.charDir = this.availableDir[0];
        this.basicMove(this.outOfBirthPlace);
        this.newDirMove++;
        return;
    } else if (this.availableDir.length === 1 && !this.checkDir() && this.collided()) {
        if (this.charDir == keyToDir(KEY.KEY_UP) || this.charDir == keyToDir(KEY.KEY_DOWN)) {
            this.availableDir.push(keyToDir(KEY.KEY_RIGHT));
        } else {
            this.availableDir.push(keyToDir(KEY.KEY_DOWN));
        }
    }

    var newDir = this.availableDir[Math.floor(Math.random() * this.availableDir.length)];

    this.charDir = newDir;
    this.basicMove(this.outOfBirthPlace);

    for (var i = 0; i < this.availableDir.length; i++) {
        this.availableDir[i] = null;
    }

    this.availableDir = null;
    this.availableDir = new Array(1);
    this.availableDir[0] = newDir;
    this.newDirMove = 0;
};

Monster.prototype.revive = function () {
    this.posnX = INIT_POSN.MONSTER_X * TILE_LEN;
    this.posnY = INIT_POSN.MONSTER_Y * TILE_LEN;
    this.charDir = keyToDir(KEY.KEY_UP);
    this.frontEmpty = true;
    this.tileFront = null;
    this.sideEmpty = true;
    this.tileSide = null;
    this.outOfBirthPlace = false;
    this.corpseTime = 0;
    this.killed = false;
    this.newDirMove = 0;

    keyEvt = new KeyEvt();
};

Monster.prototype.setAnimation = function () {
    this.currentAnimation = this.animationArray[this.charDir];
};

Monster.prototype.update = function () {
    if (!this.outOfBirthPlace) {
        this.outOfBirthPlace = this.posnY < BIRTH.START_POINT_Y * TILE_LEN;
    }

    if (this.killed) {
        this.corpseTime++;
    } else {
        this.setAnimation();
        this.charMove();
        if (this.currentAnimation) this.currentAnimation.update();
    }
};

Monster.prototype.render = function (bgCtx) {
    if (this.killed) {
        s_qbDead.draw(bgCtx, this.posnX - offsetX(this.camera.cameraX), 
            this.posnY - offsetY(this.camera.cameraY));
    } else {
        this.currentAnimation.currentFrame().draw(enemyCtx, this.posnX - offsetX(this.camera.cameraX),
                                                this.posnY - offsetY(this.camera.cameraY));
    }
};


// PLAYER IMPLEMENTATION
function Player(posnX, posnY, speed) {
    this.posnX = posnX;
    this.posnY = posnY;
    this.radius = PLAYER_RAD;
    this.height = PLAYER_RAD * 2;
    this.width = PLAYER_RAD * 2;
    this.charDir = undefined;
    this.charDirPrev = undefined;
    this.speed = speed;
    this.itemNum = 0; // the POINT ITEM player gets
    this.camera = null;
    this.animationArray = new Array(ANIMATION_FRAMES * 2);
    this.observers = new Array(MONSTER_NUM);
    this.life = PLAYER_LIFE; // life of player
    this.caught = false;
    this.outOfBirthPlace = false;
}

Player.prototype = new Character();

Player.prototype.init = function (camera) {
    for (var i = 0; i < ANIMATION_FRAMES; i++) {
        this.animationArray[i] = new Animation(s_homuraNorm[i]);
    }

    for (var j = 4; j < ANIMATION_FRAMES * 2; j++) {
        this.animationArray[j] = new Animation(s_homuraKuro[j - ANIMATION_FRAMES]);
    }

    this.camera = camera;
};

Player.prototype.charMove = function () {
    this.basicMove(true);
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
        if (this.observers[i] === null) {
            var test = this.observers[i];
        }
        this.observers[i].checkPlayer();
    }
};

Player.prototype.findItem = function () {
    var curTile = posnToTile(posnCenter(this.posnX), posnCenter(this.posnY));


};

Player.prototype.revive = function () {
    this.posnX = INIT_POSN.PLAYER_X * TILE_LEN;
    this.posnY = INIT_POSN.PLAYER_Y * TILE_LEN;
    this.speed = CHARACTER_SPEED;
    this.charDir = undefined;
    this.charDirPrev = undefined;
    this.frontEmpty = true;
    this.tileFront = null;
    this.sideEmpty = true;
    this.tileSide = null;
    this.kuro = false;
    this.caught = false;

    keyEvt = new KeyEvt();
};

Player.prototype.update = function () {
    this.charDirPrev = this.charDir;
    this.charDir = keyEvt.getDir();
    this.charMove();
    if (this.charDir === undefined && this.posnX != INIT_POSN.PLAYER_X * TILE_LEN && this.posnY != INIT_POSN.posnY * TILE_LEN) {
        this.charDir = this.charDirPrev;
    }
    this.setAnimation();
    if (this.currentAnimation) this.currentAnimation.update();

    this.notifyObserver();
};

var ANIMATION_CORRECTION = 2;

Player.prototype.render = function (ctx) {
    if (this.charDir !== undefined) {
        var curAnime = this.currentAnimation.currentFrame();

        if (curAnime === s_homuraNorm[2][1] || curAnime === s_homuraKuro[2][1]) {
            curAnime.draw(ctx, this.posnX - offsetX(this.camera.cameraX) - ANIMATION_CORRECTION + MODIFY_RIGHT,
                                                        this.posnY - offsetY(this.camera.cameraY));
        } else if (this.charDir == keyToDir(KEY.KEY_RIGHT)) {
            curAnime.draw(ctx, this.posnX - offsetX(this.camera.cameraX) + MODIFY_RIGHT,
                this.posnY - offsetY(this.camera.cameraY));
        } else {
            curAnime.draw(ctx, this.posnX - offsetX(this.camera.cameraX), this.posnY - offsetY(this.camera.cameraY));
        }

    } else {
        s_homuraNorm[0][0].draw(ctx, this.posnX - offsetX(this.camera.cameraX), this.posnY - offsetY(this.camera.cameraY));
    }
};

Player.prototype.DieRender = function(ctx , dieTime) {
    var curAnime;
    if (this.charDir !== undefined) {
        curAnime = this.currentAnimation.currentFrame();
        console.log(curAnime.height * (dieTime / DIE_TIME));

        if (curAnime === s_homuraNorm[2][1] || curAnime === s_homuraKuro[2][1]) {
            curAnime.drawWithSize(ctx, this.posnX - offsetX(this.camera.cameraX) - ANIMATION_CORRECTION + MODIFY_RIGHT,
                this.posnY - offsetY(this.camera.cameraY), curAnime.width, curAnime.height * (dieTime / DIE_TIME));
        } else if (this.charDir == keyToDir(KEY.KEY_RIGHT)) {
            curAnime.drawWithSize(ctx, this.posnX + MODIFY_RIGHT - offsetX(this.camera.cameraX),
                this.posnY - offsetY(this.camera.cameraY), curAnime.width, curAnime.height * (dieTime / DIE_TIME));
        } else {
            curAnime.drawWithSize(ctx, this.posnX - offsetX(this.camera.cameraX),
                this.posnY - offsetY(this.camera.cameraY), curAnime.width, curAnime.height * (dieTime / DIE_TIME));
        }
    } else {
        curAnime = s_homuraNorm[3][0];
        s_homuraNorm[3][0].drawWithSize(ctx, this.posnX - offsetX(this.camera.cameraX),
            this.posnY - offsetY(this.camera.cameraY), curAnime.width, curAnime.height * (dieTime / DIE_TIME));
    }
};


