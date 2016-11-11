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
        this.player = new Player(INIT_POSN.PLAYER_X * TILE_LEN, INIT_POSN.PLAYER_Y * TILE_LEN, PLAYER_SPEED);
        this.player.init();

        this.monster = new Monster(100, 100);
        //console.log(s_map);
        //s_homuraNorm[0][0].draw(ctx, 100, 100);
    };

    this.update = function () {
        this.player.update();
        //console.log(this.player);
    };

    this.render = function (ctx) {
        ctx.clearRect(0,0,WIDTH,HEIGHT);
        s_map.draw(ctx, 0, 0);
        this.player.render(ctx);
    };
}

