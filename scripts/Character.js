/**
 * Created by H2O2 on 16/10/29.
 */

function Character(posnX, posnY, speed) {
    this.posnX = posnX;
    this.posnY = posnY;
    this.charDir = KEY.KEY_UP;
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
    this.charDir = KEY.KEY_DOWN;
    this.speed = speed;
}

Player.prototype = new Character();

Player.prototype.charMove = function () {
    if (this.charDir === KEY.KEY_UP) {
        this.posnY -= this.speed;
    } else if (this.charDir === KEY.KEY_DOWN) {
        this.posnY += this.speed;
    } else if (this.charDir === KEY.KEY_LEFT) {
        this.posnX -= this.speed;
    } else if (this.charDir === KEY.KEY_RIGHT) {
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
    s_homuraNorm[0][0].draw(ctx, this.posnX, this.posnY);
    //console.log(this.posnX);
    //console.log("TEST");
    //s_homuraNorm[0][0].draw(ctx, 100, 100);
};


