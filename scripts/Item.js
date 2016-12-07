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

		if (this.type == ITEM_TYPE.POINT) {
			s_greifSeed.draw(bgCtx, this.posnX - Math.round(POINT_WIDTH / 2) - offsetX(this.camera.cameraX),
                this.posnY - Math.round(POINT_HEIGHT / 2) - offsetY(this.camera.cameraY));
			//s_greifSeed.draw(bgCtx, this.posnX - 4, this.posnY - 7);
		} else if (this.type == ITEM_TYPE.EFFECT_01) {
			s_grenade.draw(bgCtx, this.posnX - Math.round(POINT_WIDTH / 2) - offsetX(this.camera.cameraX),
				this.posnY - Math.round(POINT_HEIGHT / 2) - offsetY(this.camera.cameraY));
		} else if (this.type == ITEM_TYPE.EFFECT_02) {
			s_shotgun.draw(bgCtx, this.posnX - Math.round(POINT_WIDTH / 2) - offsetX(this.camera.cameraX),
                this.posnY - Math.round(POINT_HEIGHT / 2) - offsetY(this.camera.cameraY));
		} else if (this.type == ITEM_TYPE.EFFECT_03) {
			s_rocket.draw(bgCtx, this.posnX - Math.round(POINT_WIDTH / 2) - offsetX(this.camera.cameraX),
                this.posnY - Math.round(POINT_HEIGHT / 2) - offsetY(this.camera.cameraY));
		} else if(this.type == ITEM_TYPE.EFFECT_04) {
			s_pistol.draw(bgCtx, this.posnX - Math.round(POINT_WIDTH / 2) - offsetX(this.camera.cameraX),
                this.posnY - Math.round(POINT_HEIGHT / 2) - offsetY(this.camera.cameraY));
		} else {
			s_soulgem.draw(bgCtx, this.posnX - Math.round(POINT_WIDTH / 2) - offsetX(this.camera.cameraX),
                this.posnY - Math.round(POINT_HEIGHT / 2) - offsetY(this.camera.cameraY));
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
	if (isUsed) {
		return;
	}

	isUsed = true;
};

function SpecialItem(posnX, posnY, itemType, camera) {
	this.posnX = posnX;
	this.posnY = posnY;
	this.itemType = itemType;
	this.camera = camera;
}

SpecialItem.prototype = new Item();
