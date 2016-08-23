class BackGround extends Laya.Sprite {
    //定义背景1
    private bg1: Laya.Sprite;
    //定义背景2
    private bg2: Laya.Sprite;

    constructor() {
        super();
        this.init();
    }
    init(): void {
        this.bg1 = new Laya.Sprite();
        this.bg1.loadImage('res/background.png');
        this.addChild(this.bg1);

        this.bg2 = new Laya.Sprite();
        this.bg2.loadImage('res/background.png');
        this.bg2.pos(0, 852);
        this.addChild(this.bg2);

        //创建一个帧循环，更新容器位置
        Laya.timer.frameLoop(1, this, this.onLoop)

    }

    onLoop(): void {
        //背景容器每帧向下移动1像素
        this.y += 1;

        //如果背景图到了下面不可见，立即调整位置到上面循环显示
        if (this.bg1.y + this.y >= 852) {
            this.bg1.y -= 852 * 2;
        }
        if (this.bg2.y + this.y >= 852) {
            this.bg2.y -= 852 * 2;
        }
    }
}