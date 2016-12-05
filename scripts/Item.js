/**
 * Created by H2O2 on 16/10/29.
 */

function Item(posnX, posnY) {
	this.posnX = posnX ;
	this.posnY = posnY ; // move item to the node position
	this.type = ITEM_TYPE.POINT;
	this.isUsed = false;

	this.render = function (bgCtx) {
		if (this.isUsed) return;

		if (this.type == ITEM_TYPE.POINT) {
			s_greifSeed.draw(bgCtx, this.posnX - Math.round(POINT_WIDTH / 2), this.posnY - Math.round(POINT_HEIGHT / 2));
			//s_greifSeed.draw(bgCtx, this.posnX - 4, this.posnY - 7);
		} else if (this.type == ITEM_TYPE.EFFECT_01) {
			s_grenade.draw(bgCtx, this.posnX, this.posnY);
		} else if (this.type == ITEM_TYPE.EFFECT_02) {
			s_shotgun.draw(bgCtx, this.posnX, this.posnY);
		} else if (this.type == ITEM_TYPE.EFFECT_03) {
			s_rocket.draw(bgCtx, this.posnX, this.posnY);
		} else if(this.type == ITEM_TYPE.EFFECT_04) {
			s_pistol.draw(bgCtx, this.posnX, this.posnY);
		} else {
			s_soulgem.draw(bgCtx, this.posnX, this.posnY);
		}
	};
}

Item.prototype = new GameElement();
