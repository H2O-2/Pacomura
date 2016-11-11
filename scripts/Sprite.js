/**
 * Created by H2O2 on 16/10/10.
 */

var s_homuraNorm, s_homuraKuro, s_qb, s_qbDead, s_soulgem,
    s_greifSeed, s_rocket, s_grenade, s_pistol,
    s_shotgun, s_map;

function Sprite(img, xSprite, ySprite, width, height) {
    this.img = img; // the whole sprite sheet
    this.xSprite = xSprite; // position of the image in the sprite sheet
    this.ySprite = ySprite;
    this.width = width; // size of the image
    this.height = height;
}

Sprite.prototype.draw = function (ctx, xCanvas, yCanvas) {
    // xCanvas and yCanvas are positions of the image to place in the canvas
    ctx.drawImage(this.img, this.xSprite, this.ySprite, this.width, this.height, xCanvas, yCanvas, this.width, this.height);
};

function spriteInit(img) {
    // in s_X[a][b], character faces front for a = 0, left for a = 1,
    // right for a = 2 and back for a = 3
    s_homuraNorm = [
        // left
        [
            new Sprite(img, GRID_SIZE + 4, GRID_SIZE, 24, 32),
            new Sprite(img, 4, GRID_SIZE + 1, 26, 31),
            new Sprite(img, GRID_SIZE + 4, GRID_SIZE, 24, 32),
            new Sprite(img, GRID_SIZE * 2 + 4, GRID_SIZE + 1, 24, 31)
        ],
        // up
        [
            new Sprite(img, GRID_SIZE + 4, GRID_SIZE * 3, 25, 32),
            new Sprite(img, 5, GRID_SIZE * 3 + 1, 23, 31),
            new Sprite(img, GRID_SIZE + 4, GRID_SIZE * 3, 25, 32),
            new Sprite(img, GRID_SIZE * 2 + 4, GRID_SIZE * 3 + 1, 24, 31)
        ],
        // right
        [
            new Sprite(img, GRID_SIZE + 4, GRID_SIZE * 2, 24, 32),
            new Sprite(img, 2, GRID_SIZE * 2 + 1, 26, 31),
            new Sprite(img, GRID_SIZE + 4, GRID_SIZE * 2, 24, 32),
            new Sprite(img, GRID_SIZE * 2 + 4, GRID_SIZE * 2 + 1, 24, 31)
        ],
        // down
        [
            new Sprite(img, GRID_SIZE + 3, 0, 27, 32),
            new Sprite(img, 4, 1, 27, 31),
            new Sprite(img, GRID_SIZE + 3, 0, 27, 32),
            new Sprite(img, GRID_SIZE * 2 + 2, 1, 27, 31)
        ]
    ];

    s_homuraKuro = [
        // left
        [
            new Sprite(img, GRID_SIZE * 4 + 4, GRID_SIZE, 24, 32),
            new Sprite(img, GRID_SIZE * 3 + 4, GRID_SIZE + 1, 26, 31),
            new Sprite(img, GRID_SIZE * 4 + 4, GRID_SIZE, 24, 32),
            new Sprite(img, GRID_SIZE * 5 + 4, GRID_SIZE + 1, 24, 31)
        ],
        // up
        [
            new Sprite(img, GRID_SIZE + 4, GRID_SIZE * 3, 25, 32),
            new Sprite(img, 5, GRID_SIZE * 3 + 1, 23, 31),
            new Sprite(img, GRID_SIZE + 4, GRID_SIZE * 3, 25, 32),
            new Sprite(img, GRID_SIZE * 2 + 4, GRID_SIZE * 3 + 1, 24, 31)
        ],
        // right
        [
            new Sprite(img, GRID_SIZE * 4 + 4, GRID_SIZE * 2, 24, 32),
            new Sprite(img, GRID_SIZE * 3 + 2, GRID_SIZE * 2 + 1, 26, 31),
            new Sprite(img, GRID_SIZE * 4 + 4, GRID_SIZE * 2, 24, 32),
            new Sprite(img, GRID_SIZE * 5 + 4, GRID_SIZE * 2 + 1, 24, 31)
        ],
        // down
        [
            new Sprite(img, GRID_SIZE * 4 + 3, 0, 27, 32),
            new Sprite(img, GRID_SIZE * 3 + 4, 1, 27, 31),
            new Sprite(img, GRID_SIZE * 4 + 3, 0, 27, 32),
            new Sprite(img, GRID_SIZE * 5 + 2, 1, 27, 31)
        ]



    ];

    s_qb = [
        // left
        [
            new Sprite(img, GRID_SIZE * 13 + 2, GRID_SIZE + 9, 29, 23),
            new Sprite(img, GRID_SIZE * 12 + 2, GRID_SIZE + 11, 28, 21),
            new Sprite(img, GRID_SIZE * 13 + 2, GRID_SIZE + 9, 29, 23),
            new Sprite(img, GRID_SIZE * 14 + 2, GRID_SIZE + 9, 30, 23)
        ],
        // up
        [
            new Sprite(img, GRID_SIZE * 13 + 4, GRID_SIZE * 3 + 8, 24, 24),
            new Sprite(img, GRID_SIZE * 12 + 4, GRID_SIZE * 3 + 9, 24, 23),
            new Sprite(img, GRID_SIZE * 13 + 4, GRID_SIZE * 3 + 8, 24, 24),
            new Sprite(img, GRID_SIZE * 14 + 4, GRID_SIZE * 3 + 9, 24, 23)
        ],
        // right
        [
            new Sprite(img, GRID_SIZE * 13 + 1, GRID_SIZE * 2 + 9, 29, 23),
            new Sprite(img, GRID_SIZE * 12 + 2, GRID_SIZE * 2 + 11, 28, 21),
            new Sprite(img, GRID_SIZE * 13 + 1, GRID_SIZE * 2 + 9, 29, 23),
            new Sprite(img, GRID_SIZE * 14, GRID_SIZE * 2 + 9, 30, 23)
        ],
        // down
        [
            new Sprite(img, GRID_SIZE * 13 + 4, 3, 24, 29),
            new Sprite(img, GRID_SIZE * 12 + 3, 4, 26, 28),
            new Sprite(img, GRID_SIZE * 13 + 4, 3, 24, 29),
            new Sprite(img, GRID_SIZE * 14 + 3, 4, 26, 28)
        ]



    ];

    s_qbDead = new Sprite(img, GRID_SIZE * 15 + 5, GRID_SIZE * 3 + 6, 22, 21);

    s_soulgem = [
        new Sprite(img, GRID_SIZE * 3 + 7, GRID_SIZE * 3 + 5, 17, 23),
        new Sprite(img, GRID_SIZE * 4 + 7, GRID_SIZE * 3 + 5, 17, 23),
        new Sprite(img, GRID_SIZE * 5 + 7, GRID_SIZE * 3 + 5, 17, 23)
    ];

    s_greifSeed = new Sprite(img, GRID_SIZE * 15 + 12, 10, 7, 12);
    s_rocket = new Sprite(img, GRID_SIZE * 15 + 4, GRID_SIZE + 11, 24, 11);
    s_grenade = new Sprite(img, GRID_SIZE * 16 + 10, GRID_SIZE + 7, 13, 19);
    s_pistol = new Sprite(img, GRID_SIZE * 15 + 8, GRID_SIZE * 2 + 5, 16, 23);
    s_shotgun = new Sprite(img, GRID_SIZE * 16 + 4, GRID_SIZE * 2 + 7, 24, 19);

    s_map = new Sprite(img, 0, GRID_SIZE * 8, GRID_SIZE * 30 + 16, GRID_SIZE * 32 + 7);


}


