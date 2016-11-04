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

function Player(posnX, posnY) {
    this.posnX = posnX;
    this.posnY = posnY;
    this.charDir = KEY.KEY_DOWN;
}

Player.prototype = new Character();


Player.prototype.charMove = function () {
    if (charDir === KEY.KEY_UP) {
        this.posnY += this.speed;
    } else if (charDir === KEY.KEY_DOWN) {
        this.posnY -= this.speed;
    }
};

Player.prototype.render = function (ctx) {
    console.log("TEST");
    //s_homuraNorm[0][0].draw(ctx, 100, 100);
};


