/// <reference path="_reference.ts"/>
var core;
(function (core) {
    //export let pgImg: createjs.SpriteStage;
    var canvas = document.getElementById("canvas");
    //score and lives variables
    core.score = 0;
    core.lives = 5;
    //scene variables
    var currentScene;
    var menu;
    var over;
    var play;
    //asset manifest
    var assetData = [
        { id: "galaxy", src: "../../Assets/images/galaxy.png" },
        { id: "sheet", src: "../../Assets/images/spritesheet1.png" },
        { id: "mainPage", src: "../../Assets/images/mainMenu.png" },
        { id: "gameOver", src: "../../Assets/images/gameOver.png" },
        { id: "enemy", src: "../../Assets/images/enemy.png" },
        { id: "bullet", src: "../../Assets/images/bullet.png" }
    ];
    function preload() {
        core.assets = new createjs.LoadQueue();
        core.assets.on("complete", init, this);
        core.assets.loadManifest(assetData);
    }
    function init() {
        core.stage = new createjs.Stage(canvas);
        core.stage.enableMouseOver(20);
        createjs.Ticker.framerate = 60;
        createjs.Ticker.on("tick", gameLoop);
        var atlasData = {
            "images": [
                core.assets.getResult("sheet")
            ],
            "frames": [
                [1, 1, 145, 150, 0, 70, 75],
                [1, 153, 80, 99, 0, 40, 50],
                [83, 153, 78, 99, 0, 38, 50],
                [148, 1, 142, 150, 0, 67, 75],
                [163, 153, 78, 99, 0, 38, 50],
                [243, 153, 150, 78, 0, 75, 44],
                [292, 1, 150, 78, 0, 75, 44],
                [292, 81, 250, 34, 0, 125, 35],
                [444, 1, 150, 78, 0, 75, 44],
                [292, 117, 250, 34, 0, 125, 35],
                [395, 153, 250, 34, 0, 125, 35],
                [395, 189, 250, 34, 0, 125, 35]
            ],
            "animations": {
                "asteroid": [1],
                "player": [5],
                "againButton": [7],
                "backButton": [9],
                "menuButton": [10],
                "playButton": [11]
            }
        };
        core.textureAtlas = new createjs.SpriteSheet(atlasData);
        core.scene = config.Scene.MENU;
        changeScene();
    }
    function gameLoop(event) {
        currentScene.Update();
        core.stage.update();
    }
    function changeScene() {
        //launch the scenes
        switch (core.scene) {
            case config.Scene.MENU:
                core.stage.removeAllChildren();
                menu = new scenes.Menu();
                currentScene = menu;
                break;
            // Show the PLAY Scene
            case config.Scene.PLAY:
                core.stage.removeAllChildren();
                play = new scenes.Play();
                currentScene = play;
                break;
            // Show the GAME OVER Scene
            case config.Scene.OVER:
                core.stage.removeAllChildren();
                over = new scenes.Over();
                currentScene = over;
                break;
        }
    }
    core.changeScene = changeScene;
    window.addEventListener("load", preload);
})(core || (core = {}));
//# sourceMappingURL=game.js.map