/**
 * Created by H2O2 on 16/10/29.
 */

function Character(posnX, posnY, speed) {
    this.posnX = posnX;
    this.posnY = posnY;
    this.height = 0;
    this.width = 0;
    this.charDir = keyToDir(KEY.KEY_UP);
    this.kuro = false;
    this.speed = speed;
    this.animationArray = new Array(ANIMATION_FRAMES);
    this.currentAnimation = null;
}

Character.prototype.antiDir = function (curDir) {
    if (curDir < KEY.KEY_RIGHT) {
        return curDir + 2;
    } else {
        return curDir - 2;
    }
};

Character.prototype.canMove = function (dir, outOfBirthPlace) {

    //if (x < 0 || y < 0 || x > MAP_WIDTH * TILE_LEN || x > MAP_HEIGHT * TILE_LEN) return false;


    // check for border
    if (((dir == KEY.KEY_UP) && (this.posnY - BORDER.START_POINT * TILE_LEN <= 0)) ||
        ((dir == KEY.KEY_DOWN) && (BORDER.END_POINT_Y * TILE_LEN - this.posnY <= 0)) ||
        ((dir == KEY.KEY_LEFT) && (this.posnX - BORDER.START_POINT * TILE_LEN <= 0)) ||
        ((dir == KEY.KEY_RIGHT) && (BORDER.END_POINT_X * TILE_LEN - this.posnX <= 0))) {
        return false;
    }


    if (dir == KEY.KEY_UP && outOfBirthPlace) {
        console.log("GO");
        return posnToTile(this.posnX, this.posnY - TILE_LEN / 2).isEmpty();
    } else if (dir == KEY.KEY_DOWN && outOfBirthPlace) {
        return posnToTile(this.posnX, this.posnY + TILE_LEN / 2).isEmpty();
    } else if (dir == KEY.KEY_RIGHT && outOfBirthPlace) {
        //console.log(this.posnX, this.posnY);
        return posnToTile(this.posnX + TILE_LEN / 2, this.posnY).isEmpty();
    } else if (dir == KEY.KEY_LEFT && outOfBirthPlace) {
        return posnToTile(this.posnX - TILE_LEN / 2, this.posnY).isEmpty();
    } else if (dir == KEY.KEY_UP) {
        return posnToTile(this.posnX, this.posnY - TILE_LEN / 2).isEmptyForBirth();
    } else if (dir == KEY.KEY_DOWN) {
        return posnToTile(this.posnX, this.posnY + TILE_LEN / 2).isEmptyForBirth();
    } else if (dir == KEY.KEY_RIGHT) {
        return posnToTile(this.posnX + TILE_LEN / 2, this.posnY).isEmptyForBirth();
    } else {
        return posnToTile(this.posnX - TILE_LEN / 2, this.posnY).isEmptyForBirth();
    }
};

Character.prototype.basicMove = function (outOfBirthPlace) {
    if ((this.charDir === keyToDir(KEY.KEY_UP)) && this.canMove(KEY.KEY_UP, outOfBirthPlace)) {
        this.posnY -= this.speed;
    } else if ((this.charDir === keyToDir(KEY.KEY_DOWN)) && this.canMove(KEY.KEY_DOWN, outOfBirthPlace)) {
        this.posnY += this.speed;
    } else if ((this.charDir === keyToDir(KEY.KEY_LEFT)) && this.canMove(KEY.KEY_LEFT, outOfBirthPlace)) {
        this.posnX -= this.speed;
    } else if ((this.charDir === keyToDir(KEY.KEY_RIGHT)) && this.canMove(KEY.KEY_RIGHT, outOfBirthPlace)) {
        this.posnX += this.speed;
    }
};

Character.prototype.charMove = function () {

};

Character.prototype.update = function () {

};

Character.prototype.render = function () {

};

function Monster(posnX, posnY) {
    this.posnX = posnX;
    this.posnY = posnY;
    this.availableDir = new Array(1);
    this.outOfBirthPlace = false;
    this.player = null;
}


// MONSTER IMPLEMENTATION
Monster.prototype = new Character();

Monster.prototype.init = function () {
    this.availableDir[0] = this.charDir;
};

Monster.prototype.attach = function (player) {
    this.player = player
};

Monster.prototype.dirIsAvailable = function (dir, outOfBirthPlace) {
        if (dir == KEY.KEY_UP && outOfBirthPlace) {
            return (posnToTile(this.posnX, this.posnY - TILE_LEN).isEmpty() &&
                    posnToTile(this.posnX, this.posnY - 2 * TILE_LEN).isEmpty());
        } else if (dir == KEY.KEY_DOWN && outOfBirthPlace) {
            return (posnToTile(this.posnX, this.posnY + TILE_LEN).isEmpty() &&
                    posnToTile(this.posnX, this.posnY + 2 * TILE_LEN).isEmpty());
        } else if (dir == KEY.KEY_RIGHT && outOfBirthPlace) {
            return (posnToTile(this.posnX + TILE_LEN, this.posnY).isEmpty() &&
                    posnToTile(this.posnX + 2 * TILE_LEN, this.posnY).isEmpty());
        } else if (outOfBirthPlace) {
            return (posnToTile(this.posnX - TILE_LEN, this.posnY).isEmpty() &&
                    posnToTile(this.posnX - 2 * TILE_LEN, this.posnY).isEmpty());
        } else if (dir == KEY.KEY_UP) {
            return (posnToTile(this.posnX, this.posnY - TILE_LEN).isEmptyForBirth() &&
            posnToTile(this.posnX, this.posnY - 2 * TILE_LEN).isEmptyForBirth());
        } else if (dir == KEY.KEY_DOWN) {
            return (posnToTile(this.posnX, this.posnY + TILE_LEN).isEmptyForBirth() &&
            posnToTile(this.posnX, this.posnY + 2 * TILE_LEN).isEmptyForBirth());
        } else if (dir == KEY.KEY_RIGHT) {
            return (posnToTile(this.posnX + TILE_LEN, this.posnY).isEmptyForBirth() &&
            posnToTile(this.posnX + 2 * TILE_LEN, this.posnY).isEmptyForBirth());
        } else {
            return (posnToTile(this.posnX - TILE_LEN, this.posnY).isEmptyForBirth() &&
            posnToTile(this.posnX - 2 * TILE_LEN, this.posnY).isEmptyForBirth());
        }
};

Monster.prototype.checkDir = function () {
    if (this.charDir == keyToDir(KEY.KEY_UP) || this.charDir == keyToDir(KEY.KEY_DOWN)) {
        if (this.dirIsAvailable(KEY.KEY_LEFT)) this.availableDir.push(keyToDir(KEY.KEY_LEFT));
        if (this.dirIsAvailable(KEY.KEY_RIGHT)) this.availableDir.push(keyToDir(KEY.KEY_RIGHT));
    } else {
        if (this.dirIsAvailable(KEY.KEY_UP)) this.availableDir.push(keyToDir(KEY.KEY_UP));
        if (this.dirIsAvailable(KEY.KEY_DOWN)) this.availableDir.push(keyToDir(KEY.KEY_DOWN));
    }
};

Monster.prototype.charMove = function () {
    this.checkDir();

    if (this.availableDir.length == 1) {
        this.basicMove(this.outOfBirthPlace);
        return;
    }

    var newDir = this.availableDir[Math.random() * this.availableDir.length];

    if (newDir == this.charDir) {
        for (var i = 0; i < this.availableDir.length; i++) { this.availableDir.pop(); }
    } else {
        this.availableDir = null;
        this.availableDir = new Array(1);
        this.availableDir.push(newDir);
        this.charDir = newDir;
        this.basicMove(this.outOfBirthPlace);
    }
};


// PLAYER IMPLEMENTATION
function Player(posnX, posnY, speed) {
    this.posnX = posnX;
    this.posnY = posnY;
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
        this.observers[i].update();
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
    if (this.charDir != undefined) {
        if (this.currentAnimation.currentFrame() === s_homuraNorm[2][1] || this.currentAnimation.currentFrame() === s_homuraKuro[2][1]) {
            this.currentAnimation.currentFrame().draw(ctx, this.posnX - offsetX(this.camera.cameraX) - 2, this.posnY - offsetY(this.camera.cameraY));
        } else {
            this.currentAnimation.currentFrame().draw(ctx, this.posnX - offsetX(this.camera.cameraX), this.posnY - offsetY(this.camera.cameraY));
        }

    } else {
        s_homuraNorm[3][0].draw(ctx, this.posnX - offsetX(this.camera.cameraX), this.posnY - offsetY(this.camera.cameraY))
    }
};


