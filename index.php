<!--
/////////////////////////////////////////////////////////////////

            　 　 |＼　　 　 　 　 　／|
            　 　 |＼＼　　 　 　 ／／|
            　　　 :  ,>　｀´￣｀´　<　′　　契約の予感ッ・・・！！
             ＿＿＿Ｖ　 　 　 　 　 　Ｖ＿∧,､＿＿＿＿＿＿＿＿＿＿＿＿＿＿
             ￣￣￣i{　　 ●　　 　 ● }i￣'`'``￣￣￣￣￣￣￣￣￣￣￣￣￣
            　　　  八//// ､_,_,////八
            .　　 /　个 . ＿　＿ .个 ',
            　＿/ 　il 　 ,'　　　 '.　 li　 ',＿_


                   さぁ早く 僕と契約を！



Emoji from http://momokami.net/kotonoha/qb.html
////////////////////////////////////////////////////////////////////
-->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="mobile-web-app-capable" content="yes">
    <!-- build:css styles/mainTest.css -->
    <link rel="stylesheet" type="text/css" href="bower_components/normalize-css/normalize.css">
    <link rel="stylesheet" type="text/css" href="bower_components/font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="bower_components/bootstrap/dist/css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="styles/main.css">
    <!-- endbuild -->
    <title>Pacomura</title>

</head>
<body>
    <canvas id="bgCanvas"></canvas>
    <canvas id="enemyCanvas"></canvas>
    <canvas id="playerCanvas"></canvas>
    <canvas id="infoCanvas"></canvas>
    <form action="" method="post">
        <input type="text" name="username" size="30" value="Homura" />
        <input type="submit" name="submit" value="SUBMIT" />
    </form>
    <div class="high_score_btn" onclick="showHighScore()"><h4>High Score</h4></div>
    <div class="high_score_board">
        <p class="closeHighBrd" onclick="hideHighScore()">x</p>
        <table class="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Score</th>
                    <th class="timeStamp">TimeStamp</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>H2O2</td>
                    <td>0</td>
                    <td class="timeStamp">2017-01-01</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>CuSO4</td>
                    <td>0</td>
                    <td class="timeStamp">2017-01-01</td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td>NaOH</td>
                    <td>0</td>
                    <td class="timeStamp">2017-01-01</td>
                </tr>
                <tr>
                    <th scope="row">4</th>
                    <td>H2SO4</td>
                    <td>0</td>
                    <td class="timeStamp">2017-01-01</td>
                </tr>
                <tr>
                    <th scope="row">5</th>
                    <td>HCL</td>
                    <td>0</td>
                    <td class="timeStamp">2017-01-01</td>
                </tr>
                <tr>
                    <th scope="row">6</th>
                    <td>C6H6</td>
                    <td>0</td>
                    <td class="timeStamp">2017-01-01</td>
                </tr>
                <tr>
                    <th scope="row">7</th>
                    <td>CH4</td>
                    <td>0</td>
                    <td class="timeStamp">2017-01-01</td>
                </tr>
                <tr>
                    <th scope="row">8</th>
                    <td>HCHO</td>
                    <td>0</td>
                    <td class="timeStamp">2017-01-01</td>
                </tr>
                <tr>
                    <th scope="row">9</th>
                    <td>SiO4</td>
                    <td>0</td>
                    <td class="timeStamp">2017-01-01</td>
                </tr>
                <tr>
                    <th scope="row">10</th>
                    <td>CH3CH2OH</td>
                    <td>0</td>
                    <td class="timeStamp">2017-01-01</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="message"></div>
    <div class="wrapper jumbotron"></div>
    <div class="icons"><a href="https://github.com/H2O-2/Pacomura" target="_blank"><i class="fa fa-3x fa-github" aria-hidden="true"></i></a></div>
    <!-- build:js scripts/main.js -->
    <script src="bower_components/jquery/dist/jquery.min.js"></script>
    <script src="scripts/varAndConst.js"></script>
    <script src="scripts/global.js"></script>
    <script src="scripts/Sprite.js"></script>
    <script src="scripts/KeyEvt.js"></script>
    <script src="scripts/Tile.js"></script>
    <script src="scripts/Map.js"></script>
    <script src="scripts/Item.js"></script>
    <script src="scripts/Camera.js"></script>
    <script src="scripts/Animation.js"></script>
    <script src="scripts/Character.js"></script>
    <script src="scripts/Game.js"></script>
    <script src="scripts/main.js"></script>
    <script src="scripts/highScore.js"></script>
    <!-- endbuild -->
</body>
</html>