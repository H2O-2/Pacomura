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
}

Player.prototype = new Character();

Player.prototype.init = function () {
    for (var i = 0; i < ANIMATION_FRAMES; i++) {
        console.log("INIT");
        this.animationArray[i] = new Animation(s_homuraNorm[i]);
    }

    for (var j = 4; j < ANIMATION_FRAMES * 2; j++) {
        this.animationArray[i] = new Animation(s_homuraKuro[i]);
    }
};

Player.prototype.charMove = function () {
    //console.log(this.charDir);
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
    //console.log("pass");
    if (this.charDir != undefined && !this.kuro) {
        //console.log(this.currentAnimation);
        //s_homuraNorm[this.charDir][0].draw(ctx, this.posnX, this.posnY);
        this.currentAnimation.currentFrame().draw(ctx, this.posnX, this.posnY);
    } else if (this.charDir != undefined && this.kuro) {
        //s_homuraKuro[this.charDir][0].draw(ctx, this.posnX, this.posnY);
        this.currentAnimation.currentFrame().draw(ctx, this.posnX, this.posnY);
    } else if (this.charDir == undefined && !this.kuro) {
        s_homuraNorm[3][0].draw(ctx, this.posnX, this.posnY);
    } else {
        s_homuraKuro[3][0].draw(ctx, this.posnX, this.posnY);
    }
    //console.log(this.posnX);
    //console.log("TEST");
    //s_homuraNorm[0][0].draw(ctx, 100, 100);
};


