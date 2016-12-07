/**
 * Created by H2O2 on 16/10/29.
 */

function Game() {
    //this.gameStatus = GAME_STATE.START;
    this.gameStatus = GAME_STATE.GAME;
    this.points = 0;

    this.camera = null;

    this.player = null;
    this.monster = new Array(MONSTER_BIRTHPLACE);

    this.dieTimer = DIE_TIME;
    this.items = new Array (ITEM_NUM);

    this.monsterReset = function () {
        for (var i = 0; i < this.monster.length; i++) {
            this.monster[i] = null;
        }

        this.monster = new Array(MONSTER_BIRTHPLACE);

        for (var j = 0; j < MONSTER_BIRTHPLACE / 2; j++) {
            this.monster[j] = new Monster(j * (TILE_LEN + 3) + INIT_POSN.MONSTER_X * TILE_LEN,
                INIT_POSN.MONSTER_Y * TILE_LEN, CHARACTER_SPEED);
            this.monster[j + MONSTER_BIRTHPLACE / 2] = new Monster(j * (TILE_LEN + 3) + INIT_POSN.MONSTER_X * TILE_LEN,
                1.5 * TILE_LEN + INIT_POSN.MONSTER_Y * TILE_LEN, CHARACTER_SPEED);
            this.monster[j].init(this.camera);
            this.monster[j + MONSTER_BIRTHPLACE / 2].init(this.camera);
        }

        for (var m = 0; m < MONSTER_NUM - MONSTER_BIRTHPLACE; m++) {
            var newMonster = new Monster(MONSTER_INIT_OUT[m][0] * TILE_LEN, MONSTER_INIT_OUT[m][1] * TILE_LEN, CHARACTER_SPEED);
            newMonster.init(this.camera);
            newMonster.outOfBirthPlace = true;
            this.monster.push(newMonster);
        }

        for (var k = 0; k < MONSTER_NUM; k++) {
            this.player.observers = this.monster;
            this.player.observers[k].attach(this.player);
        }
    };

    this.gameInit = function (ctx, bgCtx) {
        this.player = new Player(INIT_POSN.PLAYER_X * TILE_LEN, INIT_POSN.PLAYER_Y * TILE_LEN, CHARACTER_SPEED);
        console.log("PLAYER: " + this.player.posnX, this.player.posnY);

        this.camera = new Camera(this.player);
        this.player.init(this.camera);

        // initialize Monsters
        for (var j = 0; j < MONSTER_BIRTHPLACE / 2; j++) {
            this.monster[j] = new Monster(j * (TILE_LEN + 3) + INIT_POSN.MONSTER_X * TILE_LEN,
                INIT_POSN.MONSTER_Y * TILE_LEN, CHARACTER_SPEED);
            this.monster[j + MONSTER_BIRTHPLACE / 2] = new Monster(j * (TILE_LEN + 3) + INIT_POSN.MONSTER_X * TILE_LEN,
                1.5 * TILE_LEN + INIT_POSN.MONSTER_Y * TILE_LEN, CHARACTER_SPEED);
            this.monster[j].init(this.camera);
            this.monster[j + MONSTER_BIRTHPLACE / 2].init(this.camera);
        }

        for (var m = 0; m < MONSTER_NUM - MONSTER_BIRTHPLACE; m++) {
            var newMonster = new Monster(MONSTER_INIT_OUT[m][0] * TILE_LEN, MONSTER_INIT_OUT[m][1] * TILE_LEN, CHARACTER_SPEED);
            newMonster.init(this.camera);
            newMonster.outOfBirthPlace = true;
            this.monster.push(newMonster);
        }

        this.map = mapAll;
        this.map.setCamera(this.camera);

        for (var k = 0; k < MONSTER_NUM; k++) {
            this.player.observers = this.monster;
            this.player.observers[k].attach(this.player);
        }

        for (var r = 0; r < ITEM_ARRAY.length; r++) {
            this.items[r] = new Array(ITEM_ARRAY[r].length);
            var itemNum = 0;
            for (var z = 0; z < ITEM_ARRAY[r].length; z++) {
                if (ITEM_ARRAY[r][z] === 0) {
                    this.items[r][z] = undefined;
                    continue;
                }

                this.items[r][z] = new Item((z + BORDER.START_POINT + 1) * TILE_LEN, (r + BORDER.START_POINT + 1) * TILE_LEN, this.camera);
            }
        }

    };

    this.isDead = function () {
        return this.player.life <= 0;
    };

    this.update = function () {
        if (this.player.life <= 0) this.gameStatus = GAME_STATE.FINISH;
        else if (this.player.caught) this.gameStatus = GAME_STATE.DIE;

        if (this.gameStatus == GAME_STATE.DIE && this.dieTimer <= 0){
            this.gameStatus = GAME_STATE.GAME;
            this.player.revive();
            this.dieTimer = DIE_TIME   ;
        }
        //console.log(this);

        switch (this.gameStatus) {
            case GAME_STATE.START:
                break;
            case GAME_STATE.GAME:
                this.player.update();

                // update Monster
                for (var i = 0; i < this.monster.length; i++) {
                    var curMonster = this.monster[i];

                    curMonster.update();
                    
                }

                // DEBUG
                //this.monster[2].update();

                this.map.update();
                //this.player.notifyObserver();
                break;
            case GAME_STATE.DIE:
                this.dieTimer--;
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
                var renderStart = playerViewLeftTop(this.camera),
                    renderEnd = playerViewRightBottom(this.camera);

                var renderStartX = renderStart.posnX / TILE_LEN - ITEM_BORDER.START,
                    renderStartY = renderStart.posnY / TILE_LEN - ITEM_BORDER.START,
                    renderEndX = renderEnd.posnX / TILE_LEN - ITEM_BORDER.START,
                    renderEndY = renderEnd.posnY / TILE_LEN - ITEM_BORDER.START;

                bgCtx.clearRect(0,0,WIDTH,HEIGHT);
                this.map.render(bgCtx);
                for (var t = renderStartY; t < renderEndY; t++) {
                    for (var s = renderStartX; s < renderEndX; s++) {
                        //DEBUG
                        if (this.items[t] === undefined) {
                            console.log("ERROR");
                        }


                        if (this.items[t][s] === undefined) {
                            continue;
                        }
                        this.items[t][s].render(bgCtx);
                    }
                }

                ctx.clearRect(0,0,WIDTH,HEIGHT);
                this.player.render(ctx);
                enemyCtx.clearRect(0,0,WIDTH,HEIGHT);
                //DEBUG
                //this.monster[2].render(ctx);

                // render Monsters
                for (var i = 0; i < this.monster.length; i++) {
                    var curMonster = this.monster[i];

                    if (curMonster.corpseTime > MONSTER_CORPSE_TIME) {
                        curMonster.revive();
                    } else {
                        this.monster[i].render(enemyCtx);
                    }


                }
                break;
            case GAME_STATE.DIE:
                ctx.clearRect(0,0,WIDTH,HEIGHT);
                this.player.DieRender(ctx, this.dieTimer);
                this.monsterReset();
                break;
            case GAME_STATE.FINISH:
                break;
            default:
                console.log("ERROR");
        }

        s_grenade.draw(bgCtx, 0, 0);
        //console.log(C_WIDTH / 2 + offsetX(this.camera.cameraX), C_HEIGHT / 2 + offsetY(this.camera.cameraY));


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

