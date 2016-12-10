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
                s_soulgem[0].draw(bgCtx, this.posnX - offsetX(this.camera.cameraX),
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
	this.width = ITEM_SIZE.POINT_WIDTH;
	this.height = ITEM_SIZE.POINT_HEIGHT;
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
    this.width = ITEM_SIZE.GRENADE_WIDTH;
    this.height = ITEM_SIZE.GRENADE_HEIGHT;
	this.type = itemType;
	this.camera = camera;
}

SpecialItem.prototype = new Item();

SpecialItem.prototype.init = function () {
    switch (this.type) {
        case ITEM_TYPE.GRENADE:
            this.width = ITEM_SIZE.GRENADE_WIDTH;
            this.height = ITEM_SIZE.GRENADE_HEIGHT;
            break;
        case ITEM_TYPE.PISTOL:
            this.width = ITEM_SIZE.PISTOL_WIDTH;
            this.height = ITEM_SIZE.PISTOL_HEIGHT;
            break;
        case ITEM_TYPE.ROCKET:
            this.width = ITEM_SIZE.ROCKET_WIDTH;
            this.height = ITEM_SIZE.ROCKET_HEIGHT;
            break;
        case ITEM_TYPE.SHOTGUN:
            this.width = ITEM_SIZE.SHOTGUN_WIDTH;
            this.height = ITEM_SIZE.SHOTGUN_HEIGHT;
            break;
        case ITEM_TYPE.LIFE:
            this.width = ITEM_SIZE.LIFE_WIDTH;
            this.height = ITEM_SIZE.LIFE_HEIGHT;
            break;
        default:
            break;
    }
};
