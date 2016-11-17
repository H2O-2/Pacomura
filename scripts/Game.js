/**
 * Created by H2O2 on 16/10/29.
 */

function Game() {
    //this.gameStatus = GAME_STATE.START;
    this.gameStatus = GAME_STATE.GAME;
    this.camera = null;

    this.player = null;
    this.monster = new Array(4);
    
    this.gameInit = function (ctx, bgCtx) {
        //this.player = new Player(INIT_POSN.PLAYER_X * TILE_LEN, INIT_POSN.PLAYER_Y * TILE_LEN, CHARACTER_SPEED);
        this.player = new Player(INIT_POSN.PLAYER_X * TILE_LEN, INIT_POSN.PLAYER_Y * TILE_LEN, CHARACTER_SPEED);

        this.camera = new Camera(this.player);
        this.player.init(this.camera);

        this.map = mapAll;
        s_map.draw(bgCtx, 0, 0);
        this.map.setCamera(this.camera);
        //s_qb[0][0].draw(bgCtx, 200, 200);

        this.monster = new Monster(100, 100);
        //console.log(s_map);
        //s_homuraNorm[0][0].draw(ctx, 100, 100);
    };

    this.update = function () {
        this.player.update();
        this.map.update();
        //console.log(this.player);
    };

    this.render = function (ctx, bgCtx) {
        ctx.clearRect(0,0,WIDTH,HEIGHT);
        //console.log(this.camera.cameraX);
        this.player.render(ctx);
        bgCtx.clearRect(0,0,WIDTH,HEIGHT);
        this.map.render(bgCtx);
    };
}

