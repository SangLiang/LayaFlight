


class GameInfo extends ui.GameSceneUI {
    constructor() {
        super();
        this.hp(1);
    }

    //显示血量
    public hp(value: number): void {
        this.HPLabel.text = "HP:" + value;
    }
}