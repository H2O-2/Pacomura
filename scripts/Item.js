/**
 * Created by H2O2 on 16/10/29.
 */

function Item(posnX, posnY, camera) {
	this.posnX = posnX ;
	this.posnY = posnY ; // move item to the node position
	this.type = ITEM_TYPE.POINT;
	this.isUsed = false;
	this.camera = camera;
}

Item.prototype = new GameElement();

Item.prototype.render = function (bgCtx) {
		if (this.isUsed) return;

		switch (this.type) {
			case ITEM_TYPE.POINT:
                s_greifSeed.draw(bgCtx, this.posnX - Math.round(POINT_WIDTH / 2) - offsetX(this.camera.cameraX),
                    this.posnY - Math.round(POINT_HEIGHT / 2) - offsetY(this.camera.cameraY));
                break;
			case ITEM_TYPE.GRENADE:
                s_grenade.draw(bgCtx, this.posnX - Math.round(POINT_WIDTH / 2) - offsetX(this.camera.cameraX),
                    this.posnY - Math.round(POINT_HEIGHT / 2) - offsetY(this.camera.cameraY));
                break;
			case ITEM_TYPE.PISTOL:
                s_pistol.draw(bgCtx, this.posnX - Math.round(POINT_WIDTH / 2) - offsetX(this.camera.cameraX),
                    this.posnY - Math.round(POINT_HEIGHT / 2) - offsetY(this.camera.cameraY));
                break;
			case ITEM_TYPE.ROCKET:
                s_rocket.draw(bgCtx, this.posnX - Math.round(POINT_WIDTH / 2) - offsetX(this.camera.cameraX),
                    this.posnY - Math.round(POINT_HEIGHT / 2) - offsetY(this.camera.cameraY));
                break;
			case ITEM_TYPE.SHOTGUN:
                s_shotgun.draw(bgCtx, this.posnX - Math.round(POINT_WIDTH / 2) - offsetX(this.camera.cameraX),
                    this.posnY - Math.round(POINT_HEIGHT / 2) - offsetY(this.camera.cameraY));
                break;
			case ITEM_TYPE.LIFE:
                s_soulgem.draw(bgCtx, this.posnX - offsetX(this.camera.cameraX),
					this.posnY - Math.round(POINT_HEIGHT / 2) - offsetY(this.camera.cameraY));
                break;
			default:
				console.log("ITEM ERROR");
				break;
		}
	};

function PointItem(posnX, posnY, camera) {
	this.posnX = posnX;
	this.posnY = posnY;
	this.width = 7;
	this.height = 12;
	this.camera = camera;
}

PointItem.prototype = new Item();

PointItem.prototype.update = function () {
	if (this.isUsed) {
		return;
	}

	this.isUsed = true;
};

function SpecialItem(posnX, posnY, itemType, camera) {
	this.posnX = posnX;
	this.posnY = posnY;
    this.width = 13;
    this.height = 19;
	this.type = itemType;
	this.camera = camera;
}

SpecialItem.prototype = new Item();

SpecialItem.prototype.init = function () {
    switch (this.type) {
        case ITEM_TYPE.GRENADE:
            this.width = 13;
            this.height = 19;
            break;
        case ITEM_TYPE.PISTOL:
            this.width = 16;
            this.height = 23;
            break;
        case ITEM_TYPE.ROCKET:
            this.width = 24;
            this.height = 11;
            break;
        case ITEM_TYPE.SHOTGUN:
            this.width = 24;
            this.height = 19;
            break;
        case ITEM_TYPE.LIFE:
            this.width = 17;
            this.height = 23;
            break;
        default:
            console.log("ITEM ERROR");
            break;
    }
};
