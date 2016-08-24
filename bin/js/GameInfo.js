var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameInfo = (function (_super) {
    __extends(GameInfo, _super);
    function GameInfo() {
        _super.call(this);
        this.hp(1);
    }
    //显示血量
    GameInfo.prototype.hp = function (value) {
        this.HPLabel.text = "HP:" + value;
    };
    return GameInfo;
}(ui.GameSceneUI));
//# sourceMappingURL=GameInfo.js.map