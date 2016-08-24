/**
* Game
*/
class Game {
    //定义英雄（主战斗机）
    private hero: Role
    private gameInfo:GameInfo;
    constructor() {
        //初始化引擎，设置游戏设计宽高
        Laya.init(480, 852);

        //创建循环滚动的背景
        var bg: BackGround = new BackGround();
        //把背景添加到舞台上显示出来
        Laya.stage.addChild(bg);

        //加载图集资源
        Laya.loader.load("res/atlas/war.json", Laya.Handler.create(this, this.onLoaded), null, Laya.Loader.ATLAS);

        //设置适配模式

        Laya.stage.scaleMode = "showall";

        //设置剧中对齐
        Laya.stage.alignH = "center";

        //设置横竖屏

        Laya.stage.screenMode = "vertical";

        //显示FPS
        Laya.Stat.show();
    }

    onLoaded() {
        //创建一个主角（主战斗机）
        this.hero = new Role();
        //初始化角色
        this.hero.init("hero", 0, 5, 0, 30);
        //设置角色位置
        this.hero.pos(240, 700);
        //设置射击类型
        this.hero.shootType = 1;
        //把主角添加到舞台上
        Laya.stage.addChild(this.hero);

        // 界面
        this.gameInfo = new GameInfo();
        this.gameInfo.hp(this.hero.hp);
        Laya.stage.addChild(this.gameInfo);

        //监听舞台的鼠标移动事件
        Laya.stage.on("mousemove", this, this.onMouseMove);

        //创建主循环
        Laya.timer.frameLoop(1, this, this.onLoop);
    }

    onLoop(): void {
        //遍历所有飞机，更改飞机状态
        for (var i: number = Laya.stage.numChildren - 1; i > 0; i--) {
            var role: Role = Laya.stage.getChildAt(i) as Role;
            if (role && role.speed) {
                //根据飞机速度更改位置
                role.y += role.speed;

                //如果敌人移动到显示区域以外，则移除
                if (role.y > 1000 || !role.visible || (role.isBullet && role.y < -20)) {
                    //从舞台移除
                    role.removeSelf();
                    //回收之前，重置属性信息
                    role.isBullet = false;
                    role.visible = true;
                    //回收到对象池
                    Laya.Pool.recover("role", role);
                }
            }

            //处理发射子弹逻辑
            if (role.shootType > 0) {
                //获取当前时间
                var time: number = Laya.Browser.now();
                //如果当前时间大于下次射击时间
                if (time > role.shootTime) {
                    //更新下次射击时间
                    role.shootTime = time + role.shootInterval;
                    //从对象池里面创建一个子弹
                    var bullet: Role = Laya.Pool.getItemByClass("role", Role);
                    //初始化子弹信息
                    bullet.init("bullet1", role.camp, 1, -5, 1);
                    //设置角色类型为子弹类型
                    bullet.isBullet = true;
                    //设置子弹发射初始化位置
                    bullet.pos(role.x, role.y - role.hitRadius - 10);
                    //添加到舞台上
                    Laya.stage.addChild(bullet);
                }
            }
        }

        //检测碰撞，原理：获取角色对象，一一对比之间的位置，判断是否击中
        var n: number = Laya.stage.numChildren;
        for (var i: number = Laya.stage.numChildren - 1; i > 0; i--) {
            //获取角色对象1
            var role1: Role = Laya.stage.getChildAt(i) as Role;
            //如果角色已经死亡，则忽略
            if (role1.hp < 1) continue;
            for (var j: number = i - 1; j > 0; j--) {
                //如果角色已经死亡，则忽略
                if (!role1.visible) continue;
                //获取角色对象2
                var role2: Role = Laya.stage.getChildAt(j) as Role;
                //如果角色未死亡，并且阵营不同，才进行碰撞
                if (role2.hp > 0 && role1.camp != role2.camp) {
                    //计算碰撞区域
                    var hitRadius: number = role1.hitRadius + role2.hitRadius;
                    //根据距离判断是否碰撞
                    if (Math.abs(role1.x - role2.x) < hitRadius && Math.abs(role1.y - role2.y) < hitRadius) {
                        //碰撞后掉血
                        this.lostHp(role1, 1);
                        this.lostHp(role2, 1);

                        this.gameInfo.hp(this.hero.hp);

                    }
                }
            }
        }

        //如果主角死亡，则停止游戏循环
        if (this.hero.hp < 1) {
            Laya.timer.clear(this, this.onLoop);
        }

        //每间隔30帧创建新的敌机
        if (Laya.timer.currFrame % 60 === 0) {
            this.createEnemy(2);
        }
    }

    lostHp(role: Role, lostHp: number): void {
        //减血
        role.hp -= lostHp;
        if (role.hp > 0) {
            //如果未死亡，则播放受击动画
            role.playAction("hit");
        } else {
            //如果死亡，则播放爆炸动画
            if (role.isBullet) {
                //如果是子弹，则直接隐藏，下次回收
                role.visible = false;
            } else {
                role.playAction("down");
            }
        }
    }

    onMouseMove(e: Laya.Event): void {
        //始终保持影响和鼠标位置一致
        this.hero.pos(Laya.stage.mouseX, Laya.stage.mouseY);
    }

    //敌机血量表
    private hps: Array<number> = [1, 2, 10];
    //敌机速度表
    private speeds: Array<number> = [3, 2, 1];
    //敌机被击半径表
    private radius: Array<number> = [18, 33, 80];

    createEnemy(num: number): void {
        for (var i: number = 0; i < num; i++) {
            //随机出现敌人
            var r: number = Math.random();

            //根据随机数，随机敌人   
            var type: number = r < 0.7 ? 0 : r < 0.95 ? 1 : 2;

            //创建敌人，从对象池创建
            var enemy: Role = Laya.Pool.getItemByClass("role", Role);
            //初始化角色
            enemy.init("enemy" + (type + 1), 1, this.hps[type], this.speeds[type], this.radius[type]);
            //随机位置
            enemy.pos(Math.random() * 400 + 40, -Math.random() * 200 - 100);
            //添加到舞台上
            Laya.stage.addChild(enemy);
        }
    }
}

//启动游戏
new Game();