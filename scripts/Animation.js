/**
 * Created by H2O2 on 16/11/8.
 */

function Animation(sprite) {
    this.sprite = sprite;
    this.globalFrame = 0;
    this.frames = 0;

    this.update = function () {

        if (this.globalFrame % REFRESH_SPEED === 0) { this.frames++; }

        if (this.frames >= ANIMATION_FRAMES) {
            this.frames = 0;
        }

        this.globalFrame++;
    };

    this.currentFrame = function () {
        return this.sprite[this.frames];
    }
}

