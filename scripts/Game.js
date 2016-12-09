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

    this.failUI = new Animation(s_homuraKuro[3]);
    this.victoryUI = new Array (2);

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

    this.gameInit = function () {
        this.player = new Player(INIT_POSN.PLAYER_X * TILE_LEN, INIT_POSN.PLAYER_Y * TILE_LEN, CHARACTER_SPEED);
        console.log("PLAYER: " + this.player.posnX, this.player.posnY);

        this.camera = new Camera(this.player);
        this.player.init(this.camera);

        this.victoryUI[0] = new Animation(s_homuraNorm[3]);
        this.victoryUI[1] = new Animation(s_madoka[3]);

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

                switch (ITEM_ARRAY[r][z]) {
                    case 1:
                        this.items[r][z] = new PointItem((z + BORDER.START_POINT + 1) * TILE_LEN,
                            (r + BORDER.START_POINT + 1) * TILE_LEN, this.camera);
                        break;
                    case 2:
                        this.items[r][z] = new SpecialItem((z + BORDER.START_POINT + 1) * TILE_LEN,
                            (r + BORDER.START_POINT + 1) * TILE_LEN, ITEM_TYPE.GRENADE, this.camera);
                        break;
                    case 3:
                        this.items[r][z] = new SpecialItem((z + BORDER.START_POINT + 1) * TILE_LEN,
                            (r + BORDER.START_POINT + 1) * TILE_LEN, ITEM_TYPE.PISTOL, this.camera);
                        break;
                    case 4:
                        this.items[r][z] = new SpecialItem((z + BORDER.START_POINT + 1) * TILE_LEN,
                            (r + BORDER.START_POINT + 1) * TILE_LEN, ITEM_TYPE.SHOTGUN, this.camera);
                        break;
                    case 5:
                        this.items[r][z] = new SpecialItem((z + BORDER.START_POINT + 1) * TILE_LEN,
                            (r + BORDER.START_POINT + 1) * TILE_LEN, ITEM_TYPE.ROCKET, this.camera);
                        break;
                    default:
                        console.log("ERROR");
                        break;
                }
            }
        }
    };

    this.isDead = function () {
        return this.player.life <= 0;
    };

    this.isVictory = function () {
        return this.player.itemNum >= POINT_TOTAL;
    };

    this.update = function () {
        if (this.isDead()) this.gameStatus = GAME_STATE.FAILURE;
        else if (this.isVictory()) this.gameStatus = GAME_STATE.VICTORY;
        else if (this.player.caught) this.gameStatus = GAME_STATE.DIE;

        if (this.gameStatus == GAME_STATE.DIE && this.dieTimer <= 0){
            this.gameStatus = GAME_STATE.GAME;
            this.player.revive();
            this.dieTimer = DIE_TIME;
        }

        switch (this.gameStatus) {
            case GAME_STATE.START:
                break;
            case GAME_STATE.GAME:
                this.player.update();

                // update Monster
                for (var i = 0; i < this.monster.length; i++) {
                    var curMonster = this.monster[i];

                    if (curMonster === undefined) continue;
/*
                    if (manhattanS(curMonster, this.player) < OBSERVER_RAD * TILE_LEN) {
                        var OBSERVER_COLLISION = 10;
                        if (curMonster.posnX - this.player.posnX <= OBSERVER_COLLISION * TILE_LEN &&
                            curMonster.posnX - this.player.posnX > 0) {
                            this.monster[i].charDir = keyToDir(KEY.KEY_LEFT);
                        } else if (curMonster.posnX - this.player.posnX >= -OBSERVER_COLLISION * TILE_LEN &&
                            curMonster.posnX - this.player.posnX < 0) {
                            this.monster[i].charDir = keyToDir(KEY.KEY_RIGHT);
                        } else if (curMonster.posnY - this.player.posnY <= OBSERVER_COLLISION * TILE_LEN &&
                            curMonster.posnY - this.player.posnY > 0) {
                            this.monster[i].charDir = keyToDir(KEY.KEY_DOWN);
                        } else {
                            this.monster[i].charDir = keyToDir(KEY.KEY_UP);
                        }
                    }
*/
                    curMonster.update();
                }


                // DEBUG
                //this.monster[2].update();

                this.map.update();
                console.log(this.points);
                var playerTile = posnToTile(posnCenter(this.player.posnX), posnCenter(this.player.posnY));

                var playerItemX = playerTile.posnX / TILE_LEN - ITEM_BORDER.START,
                    playerItemY = playerTile.posnY / TILE_LEN - ITEM_BORDER.START;

                if (playerItemX < 0) playerItemX = 0;
                if (playerItemY < 0) playerItemY = 0;

                // Item update
                for (var a = 0; a < ITEM_OBSERVER; a++) {
                    for (var b = 0; b < ITEM_OBSERVER; b++) {
                        var curX = playerItemX + b;
                        var curY = playerItemY + a;

                        if (curY >= this.items.length) {
                            curY = this.items.length - 1;
                        }

                        var curItem = this.items[curY][curX];
                        if (curItem === undefined) continue;

                        var curPlayer = new Player(this.player.posnX, this.player.posnY, this.player.speed);
                        curPlayer.posnX = posnCenter(this.player.posnX);
                        curPlayer.posnY = posnCenter(this.player.posnY);

                        if (curPlayer.collision(curItem) === MOVE_ACTION.NO_MOVE) {
                            switch (curItem.type) {
                                case ITEM_TYPE.POINT:
                                    this.points += POINTS.POINT;
                                    this.player.itemNum++;
                                    break;
                                case ITEM_TYPE.LIFE:
                                    this.points += POINTS.LIFE;
                                    this.player.life++;
                                    break;
                                default:
                                    this.points += POINTS.SPECIAL;
                                    this.player.kuro = true;
                                    this.player.speed = KURO_SPEED;
                                    break;
                            }

                            this.items[curY][curX] = undefined;
                        }
                    }
                }
                break;
            case GAME_STATE.DIE:
                this.dieTimer--;
                break;
            case GAME_STATE.FAILURE:
                if (this.dieTimer > 0) this.dieTimer--;
                break;
            case GAME_STATE.VICTORY:
                for (var v = 0; v < this.monster.length; v++) {
                    var victoryMonster = this.monster[v];
                    victoryMonster.killed = true;
                    victoryMonster.update();
                }
                break;
            default:
                break;
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

                bgCtx.clearRect(0,0,C_WIDTH,C_HEIGHT);
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

                ctx.clearRect(0,0,C_WIDTH,C_HEIGHT);
                this.player.render(ctx);
                enemyCtx.clearRect(0,0,C_WIDTH,C_HEIGHT);
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

                // render info
                infoCtx.clearRect(80,0,100,INFO_HEIGHT);
                var d = PLAYER_LIFE - this.player.life;
                while (d < PLAYER_LIFE) {
                    s_soulgem[d].draw(infoCtx, 80 + 27 * (d - PLAYER_LIFE + this.player.life), 8);
                    d++;
                }
                break;
            case GAME_STATE.DIE:
                ctx.clearRect(0,0,WIDTH,HEIGHT);
                this.player.DieRender(ctx, this.dieTimer);
                this.monsterReset();
                break;
            case GAME_STATE.FAILURE:
                if (this.dieTimer > 0) {
                    ctx.clearRect(0,0,WIDTH,HEIGHT);
                    this.player.DieRender(ctx, this.dieTimer);
                } else {
                    ctx.clearRect(0,0,C_WIDTH,C_HEIGHT);
                    enemyCtx.clearRect(0,0,C_WIDTH,C_HEIGHT);
                    bgCtx.clearRect(0,0,C_WIDTH,C_HEIGHT);
                    this.failUI.currentFrame().draw(bgCtx, C_WIDTH/2 - TILE_LEN / 2, C_HEIGHT/3);
                    this.failUI.update();
                }
                break;
            case GAME_STATE.VICTORY:

                if (this.monster[0].corpseTime > MONSTER_CORPSE_TIME / 2) {
                    ctx.clearRect(0,0,C_WIDTH,C_HEIGHT);
                    enemyCtx.clearRect(0,0,C_WIDTH,C_HEIGHT);
                    bgCtx.clearRect(0,0,C_WIDTH,C_HEIGHT);
                    this.victoryUI[0].currentFrame().draw(bgCtx, C_WIDTH/2 - TILE_LEN, C_HEIGHT/3);
                    this.victoryUI[1].currentFrame().draw(bgCtx, C_WIDTH/2, C_HEIGHT/3);
                    this.victoryUI[0].update();
                    this.victoryUI[1].update();
                } else {
                    enemyCtx.clearRect(0,0,C_WIDTH,C_HEIGHT);

                    for (var m = 0; m < this.monster.length; m++) {
                        this.monster[m].render(enemyCtx);
                    }
                }
                break;
            default:
                break;
        }
    };
}

