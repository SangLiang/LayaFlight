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
        this.init();
    }
    Role.prototype.init = function () {
        this.body = new Laya.Animation();
        this.body.loadImages(['war/hero_fly1.png', 'war/hero_fly2.png']);
        this.body.play();
        this.addChild(this.body);
    };
    return Role;
}(Laya.Sprite));
//# sourceMappingURL=Role.js.map