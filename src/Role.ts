class Role extends Laya.Sprite {
    private body:Laya.Animation;
    constructor(){
        super();
        this.init();
    }

    init():void{
        this.body = new Laya.Animation();
        this.body.loadImages(['war/hero_fly1.png','war/hero_fly2.png']);
        this.body.play();
        this.addChild(this.body);
    }
}