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
        //this.player = new Player(INIT_POSN.PLAYER_X * TILE_LEN, INIT_POSN.PLAYER_Y * TILE_LEN, CHARACTER_SPEED);
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
        //s_qb[0][0].draw(bgCtx, 200, 200);
        //console.log(s_map);
        //s_homuraNorm[0][0].draw(ctx, 100, 100);



    };

    this.update = function () {
        this.player.update();

        // update Monster
        for (var i = 0; i < this.monster.length; i++) {
            this.monster[i].update();
        }

        //console.log(this.player.animationArray);

        //console.log(this.monster[0].animationArray);
        //console.log(this.monster[1].animationArray);
        //console.log(this.monster[2].animationArray);
        //console.log(this.monster[3].animationArray);        

        // DEBUG
        this.monster[2].update();

        //console.log(this.monster[0].animationArray);

        this.map.update(this.player);
        //console.log(this.player);
    };

    this.render = function (ctx, bgCtx) {
        ctx.clearRect(0,0,WIDTH,HEIGHT);
        //console.log(this.camera.cameraX);
        this.player.render(ctx);


        // render Monsters
        for (var i = 0; i < this.monster.length; i++) {
            this.monster[i].render(ctx);
        }




        //DEBUG
        //this.monster[2].render(ctx);



        //console.log(this.player.posnX);
        bgCtx.clearRect(0,0,WIDTH,HEIGHT);
        this.map.render(bgCtx, this.player);
        //console.log(this.map.tiles[0][0].posnY);
        //console.log(posnToTile(this.player.posnX + TILE_LEN + 1, this.player.posnY + 9 *TILE_LEN / 10), this.player);
        //console.log(mapAll.tiles[0][0], this.player);
    };


    this.debugging = function () {
        console.log("DEBUG");
        for (var i = 0; i < MAP_WIDTH; i++) {
            for (var j = 0; j < MAP_HEIGHT; j++) {
                //console.log(this.tiles[i][j].posnX);
                //s_homuraKuro[3][0].draw(bgCtx, this.tiles[i][j].posnX, this.tiles[i][j].posnY);
                debugCtx.rect(this.map.tiles[i][j].posnX, this.map.tiles[i][j].posnY, TILE_LEN, TILE_LEN);
                debugCtx.stroke();
            }
        }
    };
}

