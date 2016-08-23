/**
* Game:游戏入口
*/
class Game {
    constructor() {
        //初始化引擎，设置游戏设计宽高
        Laya.init(480, 852);
        //创建一个容器
        var box: BackGround = new BackGround();
        //把容器添加到舞台
        Laya.stage.addChild(box);

        Laya.loader.load("res/atlas/war.json", Laya.Handler.create(this, this.onLoaded), null, Laya.Loader.ATLAS);
    }

    onLoaded():void{
        var hero: Role = new Role();
        hero.pos(50,200);
        //把主角添加到舞台上
        Laya.stage.addChild(hero);
        console.log(Laya);
    }
}

//启动游戏
new Game();