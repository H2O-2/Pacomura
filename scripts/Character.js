/**
 * Created by H2O2 on 16/10/29.
 */

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
        //console.log(this.charDir);
        this.currentAnimation = this.animationArray[ANIMATION_FRAMES + this.charDir];
    } else {
        //console.log(this.charDir);
        /*
        console.log(this.animationArray[3]);
        console.log(this.animationArray[this.charDir]);
        */
        this.currentAnimation = this.animationArray[this.charDir];
        //this.animationArray[3].currentFrame().draw(ctx, 200, 200);
    }
};

Player.prototype.update = function () {
    //console.log("pass");
    this.charDir = keyEvt.getDir();
    //console.log(this.charDir);
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
        for (var i = 0; i < 4; i++) {
            s_homuraNorm[2][i].draw(ctx, 200 + 40 * i, 200);
            s_homuraNorm[0][i].draw(ctx, 200 + 40 * i, 250);
        }
    }
};


