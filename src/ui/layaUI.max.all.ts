
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class GameSceneUI extends View {
		public HPLabel:Laya.Label;

        public static  uiView:any ={"type":"View","child":[{"props":{"text":"HP:1","width":79,"height":26,"align":"center","fontSize":20,"var":"HPLabel","right":0,"top":40},"type":"Label"}],"props":{"width":400,"height":852}};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GameSceneUI.uiView);
        }
    }
}
