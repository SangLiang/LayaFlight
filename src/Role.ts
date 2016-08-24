/**
 * Role:玩家角色类
 */
class Role extends Laya.Sprite {
    //是否缓存了动画
    private static cached: boolean = false;

    private body: Laya.Animation;

    private type: string;
    // 阵营
    public camp: number;
    // 血量
    public hp: number;

    public speed: number;

    //攻击半径
    public hitRadius: number;

    //射击类型

    public shootType: number = 0;

    //射击间隔

    public shootInterval: number = 500;

    //下次射击时间

    public shootTime: number = Laya.Browser.now() + 2000;

    //当前动作

    public action: string;

    //是否是子弹

    public isBullet: boolean = false;

    constructor() {
        super();
        // this.init();
    }

    init(type: string, camp: number, hp: number, speed: number, hitRadius: number): void {

        //初始化角色属性
        this.type = type;
        this.camp = camp;
        this.hp = hp;
        this.speed = speed;
        this.hitRadius = hitRadius;

        if (Role.cached == false) {
            Role.cached = true;
            //缓存hero_fly动画
            Laya.Animation.createFrames(["war/hero_fly1.png", "war/hero_fly2.png"], "hero_fly");
            //缓存hero_down动画
            Laya.Animation.createFrames(["war/hero_down1.png", "war/hero_down2.png", "war/hero_down3.png", "war/hero_down4.png"], "hero_down");

            //缓存enemy1_fly动画
            Laya.Animation.createFrames(["war/enemy1_fly1.png"], "enemy1_fly");
            //缓存enemy1_down动画
            Laya.Animation.createFrames(["war/enemy1_down1.png", "war/enemy1_down2.png", "war/enemy1_down3.png", "war/enemy1_down4.png"], "enemy1_down");

            //缓存enemy2_fly动画
            Laya.Animation.createFrames(["war/enemy2_fly1.png"], "enemy2_fly");
            //缓存enemy2_down动画
            Laya.Animation.createFrames(["war/enemy2_down1.png", "war/enemy2_down2.png", "war/enemy2_down3.png", "war/enemy2_down4.png"], "enemy2_down");
            //缓存enemy2_hit动画
            Laya.Animation.createFrames(["war/enemy2_hit.png"], "enemy2_hit");

            //缓存enemy3_fly动画
            Laya.Animation.createFrames(["war/enemy3_fly1.png", "war/enemy3_fly2.png"], "enemy3_fly");
            //缓存enemy3_down动画
            Laya.Animation.createFrames(["war/enemy3_down1.png", "war/enemy3_down2.png", "war/enemy3_down3.png", "war/enemy3_down4.png", "war/enemy3_down5.png", "war/enemy3_down6.png"], "enemy3_down");
            //缓存enemy3_hit动画
            Laya.Animation.createFrames(["war/enemy3_hit.png"], "enemy3_hit");

            //缓存子弹动画
            Laya.Animation.createFrames(["war/bullet1.png"], "bullet1_fly");

        }

        if (!this.body) {
            this.body = new Laya.Animation();
            this.addChild(this.body);

            //增加动画播放完成监听
            this.body.on("complete", this, this.onPlayComplete);
        }

        // 播放帧动画
        this.playAction('fly');

    }

    playAction(action: string): void {
        //根据类型播放动画
        this.body.play(0, true, this.type + "_" + action);
        //获取动画大小区域
        var bound: Laya.Rectangle = this.body.getBounds();
        //设置机身剧中
        this.body.pos(-bound.width / 2, -bound.height / 2);

        if(action =="down"){
            this.visible = false;
        }
    }

    onPlayComplete(): void {
        //如果是击毁动画，则隐藏对象
        if (this.action === "down") {
            //停止动画播放
            this.body.stop();
            //隐藏显示，通过此标记，在下帧进行回收
            this.visible = false;
        } else if (this.action === "hit") {
            //如果是被击动画播放完毕，则接着播放飞行动画
            this.playAction("fly");
        }
    }

    
}