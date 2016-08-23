var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * BackGround : 游戏背景移动控制
 */
var BackGround = (function (_super) {
    __extends(BackGround, _super);
    function BackGround() {
        _super.call(this);
        this.init();
    }
    BackGround.prototype.init = function () {
        this.bg1 = new Laya.Sprite();
        this.bg1.loadImage('res/background.png');
        this.addChild(this.bg1);
        this.bg2 = new Laya.Sprite();
        this.bg2.loadImage('res/background.png');
        this.bg2.pos(0, 852);
        this.addChild(this.bg2);
        //创建一个帧循环，更新容器位置
        Laya.timer.frameLoop(1, this, this.onLoop);
    };
    BackGround.prototype.onLoop = function () {
        //背景容器每帧向下移动1像素
        this.y += 1;
        //如果背景图到了下面不可见，立即调整位置到上面循环显示
        if (this.bg1.y + this.y >= 852) {
            this.bg1.y -= 852 * 2;
        }
        if (this.bg2.y + this.y >= 852) {
            this.bg2.y -= 852 * 2;
        }
    };
    return BackGround;
}(Laya.Sprite));
//# sourceMappingURL=BackGround.js.map