var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Role:玩家角色类
 */
var Role = (function (_super) {
    __extends(Role, _super);
    function Role() {
        _super.call(this);
        //射击类型
        this.shootType = 0;
        //射击间隔
        this.shootInterval = 500;
        //下次射击时间
        this.shootTime = Laya.Browser.now() + 2000;
        //是否是子弹
        this.isBullet = false;
        // this.init();
    }
    Role.prototype.init = function (type, camp, hp, speed, hitRadius) {
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
    };
    Role.prototype.playAction = function (action) {
        //根据类型播放动画
        this.body.play(0, true, this.type + "_" + action);
        //获取动画大小区域
        var bound = this.body.getBounds();
        //设置机身剧中
        this.body.pos(-bound.width / 2, -bound.height / 2);
        if (action == "down") {
            this.visible = false;
        }
    };
    Role.prototype.onPlayComplete = function () {
        //如果是击毁动画，则隐藏对象
        if (this.action === "down") {
            //停止动画播放
            this.body.stop();
            //隐藏显示，通过此标记，在下帧进行回收
            this.visible = false;
        }
        else if (this.action === "hit") {
            //如果是被击动画播放完毕，则接着播放飞行动画
            this.playAction("fly");
        }
    };
    //是否缓存了动画
    Role.cached = false;
    return Role;
}(Laya.Sprite));
//# sourceMappingURL=Role.js.map