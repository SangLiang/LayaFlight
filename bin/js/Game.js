/**
* Game:游戏入口
*/
var Game = (function () {
    function Game() {
        //初始化引擎，设置游戏设计宽高
        Laya.init(480, 852);
        //创建一个容器
        var box = new BackGround();
        //把容器添加到舞台
        Laya.stage.addChild(box);
        Laya.loader.load("res/atlas/war.json", Laya.Handler.create(this, this.onLoaded), null, Laya.Loader.ATLAS);
    }
    Game.prototype.onLoaded = function () {
        var hero = new Role();
        hero.pos(50, 200);
        //把主角添加到舞台上
        Laya.stage.addChild(hero);
        console.log(Laya);
    };
    return Game;
}());
//启动游戏
new Game();
//# sourceMappingURL=Game.js.map