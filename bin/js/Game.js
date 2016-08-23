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
        //设置适配模式
        Laya.stage.scaleMode = "showall";
        //设置剧中对齐
        Laya.stage.alignH = "center";
        //设置横竖屏
        Laya.stage.screenMode = "vertical";
        //显示FPS
        Laya.Stat.show(0, 0);
    }
    Game.prototype.onLoaded = function () {
        this.hero = new Role();
        this.hero.pos(50, 200);
        //把主角添加到舞台上
        Laya.stage.addChild(this.hero);
        Laya.stage.on('mousemove', this, this.mouseMove);
    };
    Game.prototype.mouseMove = function (e) {
        this.hero.pos(Laya.stage.mouseX, Laya.stage.mouseY);
    };
    return Game;
}());
//启动游戏
new Game();
//# sourceMappingURL=Game.js.map