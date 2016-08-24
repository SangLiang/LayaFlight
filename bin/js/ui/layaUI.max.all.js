var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var GameSceneUI = (function (_super) {
        __extends(GameSceneUI, _super);
        function GameSceneUI() {
            _super.call(this);
        }
        GameSceneUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.GameSceneUI.uiView);
        };
        GameSceneUI.uiView = { "type": "View", "child": [{ "props": { "text": "HP:1", "width": 79, "height": 26, "align": "center", "fontSize": 20, "var": "HPLabel", "right": 0, "top": 40 }, "type": "Label" }], "props": { "width": 400, "height": 852 } };
        return GameSceneUI;
    }(View));
    ui.GameSceneUI = GameSceneUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map