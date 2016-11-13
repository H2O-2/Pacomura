/**
 * Created by H2O2 on 16/10/29.
 */

//var INIT_STATUS = s_homuraNorm[3][0];

function Character(posnX, posnY, speed) {
    this.posnX = posnX;
    this.posnY = posnY;
    this.charDir = KEY.KEY_UP - KEY_TO_DIR;
    this.kuro = false;
    this.speed = speed;
    this.animationArray = new Array(ANIMATION_FRAMES);
    this.currentAnimation = null;
}

Character.prototype.charMove = function () {

};

Character.prototype.update = function () {

};

Character.prototype.render = function () {

};

function Monster(posnX, posnY) {
    this.posnX = posnX;
    this.posnY = posnY;
}

Monster.prototype = new Character();

function Player(posnX, posnY, speed) {
    this.posnX = posnX;
    this.posnY = posnY;
    this.speed = speed;
    this.animationArray = new Array(ANIMATION_FRAMES * 2);
    this.camera = null;
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
    if (this.charDir === KEY.KEY_UP - KEY_TO_DIR) {
        this.posnY -= this.speed;
    } else if (this.charDir === KEY.KEY_DOWN - KEY_TO_DIR) {
        this.posnY += this.speed;
    } else if (this.charDir === KEY.KEY_LEFT - KEY_TO_DIR) {
        this.posnX -= this.speed;
    } else if (this.charDir === KEY.KEY_RIGHT - KEY_TO_DIR) {
        this.posnX += this.speed;
    }
};

Player.prototype.setAnimation = function () {
    if (this.kuro) {
        this.currentAnimation = this.animationArray[ANIMATION_FRAMES + this.charDir];
    } else {
        this.currentAnimation = this.animationArray[this.charDir];
    }
};

Player.prototype.update = function () {
    this.charDir = keyEvt.getDir();
    this.setAnimation();
    this.charMove();
    if (this.currentAnimation) this.currentAnimation.update();
};

Player.prototype.render = function (ctx) {
    //console.log(this.camera.cameraX);
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


