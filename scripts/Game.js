/**
 * Created by H2O2 on 16/10/29.
 */

function Game() {
    //this.gameStatus = GAME_STATE.START;
    this.gameStatus = GAME_STATE.GAME;
    this.camera = null;

    this.player = null;
    this.monster = new Array(MONSTER_NUM);
    
    this.gameInit = function (ctx, bgCtx) {
        this.player = new Player(INIT_POSN.PLAYER_X * TILE_LEN, INIT_POSN.PLAYER_Y * TILE_LEN, CHARACTER_SPEED);
        console.log("PLAYER: " + this.player.posnX, this.player.posnY);

        this.camera = new Camera(this.player);
        this.player.init(this.camera);

        // initialize Monsters
        for (var i = 0; i < this.monster.length; i++) {
            this.monster[i] = new Monster((i+1) * INIT_POSN.PLAYER_X * TILE_LEN, 2 * TILE_LEN, CHARACTER_SPEED);
            this.monster[i].init(this.camera);
        }

        this.map = mapAll;
        s_map.draw(bgCtx, 0, 0);
        this.map.setCamera(this.camera);

    };

    this.update = function () {
        this.player.update();

        // update Monster
        for (var i = 0; i < this.monster.length; i++) {
            this.monster[i].update();
        }

        // DEBUG
        //this.monster[2].update();

        this.map.update(this.player);
    };

    this.render = function (ctx, bgCtx) {
        ctx.clearRect(0,0,WIDTH,HEIGHT);
        this.player.render(ctx);


        // render Monsters
        for (var i = 0; i < this.monster.length; i++) {
            this.monster[i].render(ctx);
        }




        //DEBUG
        //this.monster[2].render(ctx);



        bgCtx.clearRect(0,0,WIDTH,HEIGHT);
        this.map.render(bgCtx, this.player);
    };


    this.debugging = function () {
        console.log("DEBUG");
        for (var i = 0; i < MAP_WIDTH; i++) {
            for (var j = 0; j < MAP_HEIGHT; j++) {
                //s_homuraKuro[3][0].draw(bgCtx, this.tiles[i][j].posnX, this.tiles[i][j].posnY);
                debugCtx.rect(this.map.tiles[i][j].posnX, this.map.tiles[i][j].posnY, TILE_LEN, TILE_LEN);
                debugCtx.stroke();
            }
        }
    };
}

