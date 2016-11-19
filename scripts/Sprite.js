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

Sprite.prototype.draw = function (context, xCanvas, yCanvas) {
    // xCanvas and yCanvas are positions of the image to place in the canvas
    context.drawImage(this.img, this.xSprite, this.ySprite, this.width, this.height, xCanvas, yCanvas, this.width, this.height);
};

function spriteInit(img) {
    // in s_X[a][b], character faces front for a = 0, left for a = 1,
    // right for a = 2 and back for a = 3
    s_homuraNorm = [
        // left
        [
            new Sprite(img, TILE_LEN + 4, TILE_LEN, 24, 32),
            new Sprite(img, 4, TILE_LEN + 1, 26, 31),
            new Sprite(img, TILE_LEN + 4, TILE_LEN, 24, 32),
            new Sprite(img, TILE_LEN * 2 + 4, TILE_LEN + 1, 24, 31)
        ],
        // up
        [
            new Sprite(img, TILE_LEN + 4, TILE_LEN * 3, 25, 32),
            new Sprite(img, 5, TILE_LEN * 3 + 1, 23, 31),
            new Sprite(img, TILE_LEN + 4, TILE_LEN * 3, 25, 32),
            new Sprite(img, TILE_LEN * 2 + 4, TILE_LEN * 3 + 1, 24, 31)
        ],
        // right
        [
            new Sprite(img, TILE_LEN + 4, TILE_LEN * 2, 24, 32),
            new Sprite(img, 2, TILE_LEN * 2 + 1, 26, 31),
            new Sprite(img, TILE_LEN + 4, TILE_LEN * 2, 24, 32),
            new Sprite(img, TILE_LEN * 2 + 4, TILE_LEN * 2 + 1, 24, 31)
        ],
        // down
        [
            new Sprite(img, TILE_LEN + 3, 0, 27, 32),
            new Sprite(img, 4, 1, 27, 31),
            new Sprite(img, TILE_LEN + 3, 0, 27, 32),
            new Sprite(img, TILE_LEN * 2 + 2, 1, 27, 31)
        ]
    ];

    s_homuraKuro = [
        // left
        [
            new Sprite(img, TILE_LEN * 4 + 4, TILE_LEN, 24, 32),
            new Sprite(img, TILE_LEN * 3 + 4, TILE_LEN + 1, 26, 31),
            new Sprite(img, TILE_LEN * 4 + 4, TILE_LEN, 24, 32),
            new Sprite(img, TILE_LEN * 5 + 4, TILE_LEN + 1, 24, 31)
        ],
        // up
        [
            new Sprite(img, TILE_LEN + 4, TILE_LEN * 3, 25, 32),
            new Sprite(img, 5, TILE_LEN * 3 + 1, 23, 31),
            new Sprite(img, TILE_LEN + 4, TILE_LEN * 3, 25, 32),
            new Sprite(img, TILE_LEN * 2 + 4, TILE_LEN * 3 + 1, 24, 31)
        ],
        // right
        [
            new Sprite(img, TILE_LEN * 4 + 4, TILE_LEN * 2, 24, 32),
            new Sprite(img, TILE_LEN * 3 + 2, TILE_LEN * 2 + 1, 26, 31),
            new Sprite(img, TILE_LEN * 4 + 4, TILE_LEN * 2, 24, 32),
            new Sprite(img, TILE_LEN * 5 + 4, TILE_LEN * 2 + 1, 24, 31)
        ],
        // down
        [
            new Sprite(img, TILE_LEN * 4 + 3, 0, 27, 32),
            new Sprite(img, TILE_LEN * 3 + 4, 1, 27, 31),
            new Sprite(img, TILE_LEN * 4 + 3, 0, 27, 32),
            new Sprite(img, TILE_LEN * 5 + 2, 1, 27, 31)
        ]



    ];

    s_qb = [
        // left
        [
            new Sprite(img, TILE_LEN * 13 + 2, TILE_LEN + 9, 29, 23),
            new Sprite(img, TILE_LEN * 12 + 2, TILE_LEN + 11, 28, 21),
            new Sprite(img, TILE_LEN * 13 + 2, TILE_LEN + 9, 29, 23),
            new Sprite(img, TILE_LEN * 14 + 2, TILE_LEN + 9, 30, 23)
        ],
        // up
        [
            new Sprite(img, TILE_LEN * 13 + 4, TILE_LEN * 3 + 8, 24, 24),
            new Sprite(img, TILE_LEN * 12 + 4, TILE_LEN * 3 + 9, 24, 23),
            new Sprite(img, TILE_LEN * 13 + 4, TILE_LEN * 3 + 8, 24, 24),
            new Sprite(img, TILE_LEN * 14 + 4, TILE_LEN * 3 + 9, 24, 23)
        ],
        // right
        [
            new Sprite(img, TILE_LEN * 13 + 1, TILE_LEN * 2 + 9, 29, 23),
            new Sprite(img, TILE_LEN * 12 + 2, TILE_LEN * 2 + 11, 28, 21),
            new Sprite(img, TILE_LEN * 13 + 1, TILE_LEN * 2 + 9, 29, 23),
            new Sprite(img, TILE_LEN * 14, TILE_LEN * 2 + 9, 30, 23)
        ],
        // down
        [
            new Sprite(img, TILE_LEN * 13 + 4, 3, 24, 29),
            new Sprite(img, TILE_LEN * 12 + 3, 4, 26, 28),
            new Sprite(img, TILE_LEN * 13 + 4, 3, 24, 29),
            new Sprite(img, TILE_LEN * 14 + 3, 4, 26, 28)
        ]



    ];

    s_qbDead = new Sprite(img, TILE_LEN * 15 + 5, TILE_LEN * 3 + 6, 22, 21);

    s_soulgem = [
        new Sprite(img, TILE_LEN * 3 + 7, TILE_LEN * 3 + 5, 17, 23),
        new Sprite(img, TILE_LEN * 4 + 7, TILE_LEN * 3 + 5, 17, 23),
        new Sprite(img, TILE_LEN * 5 + 7, TILE_LEN * 3 + 5, 17, 23)
    ];

    s_greifSeed = new Sprite(img, TILE_LEN * 15 + 12, 10, 7, 12);
    s_rocket = new Sprite(img, TILE_LEN * 15 + 4, TILE_LEN + 11, 24, 11);
    s_grenade = new Sprite(img, TILE_LEN * 16 + 10, TILE_LEN + 7, 13, 19);
    s_pistol = new Sprite(img, TILE_LEN * 15 + 8, TILE_LEN * 2 + 5, 16, 23);
    s_shotgun = new Sprite(img, TILE_LEN * 16 + 4, TILE_LEN * 2 + 7, 24, 19);

    s_map = new Sprite(img, 0, TILE_LEN * 9, TILE_LEN * (MAP_WIDTH + 4), TILE_LEN * (MAP_HEIGHT + 4));
}


