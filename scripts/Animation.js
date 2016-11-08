/**
 * Created by H2O2 on 16/11/8.
 */

function Animation(sprite) {
    this.sprite = sprite;
    this.frames = 0;

    this.update = function () {
        this.frames++;
        if (this.frames >= ANIMATION_FRAMES) {
            this.frames = 0;
        }
    };

    this.currentFrame = function () {
        return this.sprite[frames];
    }
}

