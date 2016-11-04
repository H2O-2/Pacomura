/**
 * Created by H2O2 on 16/10/29.
 */

function Game() {
    //this.gameStatus = GAME_STATE.START;
    this.gameStatus = GAME_STATE.GAME;
    this.camera = new Camera();
    this.player = null;
    this.monster = new Array(4);
    this.tile = new Array(MAP_WIDTH * MAP_HEIGHT);
    
    this.gameInit = function () {
        this.player = new Player(INIT_POSN.PLAYER_X * TILE_LEN, INIT_POSN.PLAYER_Y * TILE_LEN, 5);

        this.monster = new Monster(100, 100);

        var img = new Image();
        img.onload = function () {
            spriteInit(this);
            s_map.draw(ctx, 0, 0);
            s_homuraNorm[0][0].draw(ctx, 100, 100);
        };

        img.src = "img/gameSprite.png";
    };

    this.update = function () {

    };

    this.render = function () {
        this.player.render(ctx);
    };

    this.readInput = function (e) {
        this.player.charDir = e.keyCode;
        console.log("sdfdsf");
        this.player.charMove();
    }
}


