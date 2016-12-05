/**
 * Created by H2O2 on 16/10/29.
 */

function Game() {
    //this.gameStatus = GAME_STATE.START;
    this.gameStatus = GAME_STATE.GAME;
    this.points = 0;

    this.camera = null;

    this.player = null;
    this.monster = new Array(MONSTER_NUM);

    this.dieTimer = 0;
    this.items = new Array (ITEM_NUM);

    this.gameInit = function (ctx, bgCtx) {
        this.player = new Player(INIT_POSN.PLAYER_X * TILE_LEN, INIT_POSN.PLAYER_Y * TILE_LEN, CHARACTER_SPEED);
        console.log("PLAYER: " + this.player.posnX, this.player.posnY);

        this.camera = new Camera(this.player);
        this.player.init(this.camera);

        // initialize Monsters
        for (var i = 0; i < this.monster.length; i++) {
            this.monster[i] = new Monster((i+3) * INIT_POSN.PLAYER_X * TILE_LEN, 2 * TILE_LEN, 1);
            this.monster[i].init(this.camera);
        }

        this.map = mapAll;
        s_map.draw(bgCtx, 0, 0);
        this.map.setCamera(this.camera);

        for (var k = 0; k < MONSTER_NUM; k++) {
            this.player.observers = this.monster;
            this.player.observers[k].attach(this.player);
        }

        for (var r = 0; r < ITEM_ARRAY.length; r++) {
            this.items[r] = new Array(ITEM_ARRAY[r].length);
            for (var z = 0; z < ITEM_ARRAY[r].length; z++) {
                this.items[r][z] = new Item((ITEM_ARRAY[r][z] + BORDER.START_POINT) * TILE_LEN, (r + BORDER.START_POINT) * TILE_LEN);
            }
        }

    };

    this.isDead = function () {
        return this.player.life <= 0;
    };

    this.update = function () {
        if (this.player.life <= 0) this.gameStatus = GAME_STATE.FINISH;
        else if (this.player.caught) this.gameStatus = GAME_STATE.DIE;

        if (this.gameStatus == GAME_STATE.DIE && this.dieTimer > DIE_TIME){
            this.gameStatus = GAME_STATE.GAME;
            this.player.revive();
            this.dieTimer = 0   ;
        }
        //console.log(this);

        switch (this.gameStatus) {
            case GAME_STATE.START:
                break;
            case GAME_STATE.GAME:
                this.player.update();

                // update Monster
                for (var i = 0; i < this.monster.length; i++) {
                    this.monster[i].update();
                }

                // DEBUG
                //this.monster[2].update();

                this.map.update(this.player);
                this.player.notifyObserver();
                break;
            case GAME_STATE.DIE:
                this.dieTimer++;
                break;
            case GAME_STATE.FINISH:
                break;
            default:
                console.log("ERROR");
        }
    };

    this.render = function (ctx, bgCtx) {
        switch (this.gameStatus) {
            case GAME_STATE.START:
                break;
            case GAME_STATE.GAME:
                ctx.clearRect(0,0,WIDTH,HEIGHT);
                this.player.render(ctx);
                bgCtx.clearRect(0,0,WIDTH,HEIGHT);


                //DEBUG
                //this.monster[2].render(ctx);

                // render Monsters
                for (var i = 0; i < this.monster.length; i++) {
                    this.monster[i].render(bgCtx);
                }

                this.map.render(bgCtx, this.player);
                break;
            case GAME_STATE.DIE:
                ctx.clearRect(0,0,WIDTH,HEIGHT);
                this.player.render(ctx);
                break;
            case GAME_STATE.FINISH:
                break;
            default:
                console.log("ERROR");
        }
/*
        for (t = 0; t < this.items.length; t++) {
            if (this.items[t] === null) {
                continue;
            }
            for (var s = 0; s < this.items[t].length; s++) {
                this.items[t][s].render(bgCtx);
            }
        }
*/

/*
        // DEBUG
        for (var t = 0; t < 8; t++) {
            s_greifSeed.draw(bgCtx, 96, 96 + 32 * t);
        }

        for (var s = 0; s < 8; s++) {
            s_greifSeed.draw(bgCtx, 96 + 32 * s, 96);
        }
*/
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

