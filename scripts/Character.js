/**
 * Created by H2O2 on 16/10/29.
 */

function Character(posnX, posnY, speed) {
    this.posnX = posnX;
    this.posnY = posnY;
    this.charDir = KEY.KEY_UP - KEY_TO_DIR;
    this.isNormal = true;
    this.speed = speed;
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
    //this.charDir = KEY.KEY_DOWN - KEY_TO_DIR;
    this.speed = speed;
}

Player.prototype = new Character();

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

Player.prototype.update = function () {
    //console.log("pass");
    this.charDir = keyEvt.getDir();
    //console.log(this.charDir);
    this.charMove();
};

Player.prototype.render = function (ctx) {
    //console.log(this);
    if (this.charDir != undefined) {
        s_homuraNorm[this.charDir][0].draw(ctx, this.posnX, this.posnY);
    } else {
        console.log("PASS");
        s_homuraNorm[3][0].draw(ctx, this.posnX, this.posnY);
    }
    //console.log(this.posnX);
    //console.log("TEST");
    //s_homuraNorm[0][0].draw(ctx, 100, 100);
};


