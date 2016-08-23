/**
 * Role:玩家角色类
 */
class Role extends Laya.Sprite {
    private body: Laya.Animation;
    constructor() {
        super();
        this.init();
    }

    init(): void {
        Laya.Animation.createFrames(['war/hero_fly1.png', 'war/hero_fly2.png'], 'hero_fly');
        Laya.Animation.createFrames(["war/hero_down1.png", "war/hero_down2.png", "war/hero_down3.png", "war/hero_down4.png"], "hero_down");

        this.body = new Laya.Animation();
        this.addChild(this.body);

        this.playAction('hero_fly');


    }

    playAction(action: string): void {
        // this.body.loadImages(['war/hero_fly1.png', 'war/hero_fly2.png']);
        this.body.play(0, true, action);
        //获取动画大小区域
        var bound: Laya.Rectangle = this.body.getBounds();

        //设置机身剧中
        this.body.pos(-bound.width / 2, -bound.height / 2);
    }
}