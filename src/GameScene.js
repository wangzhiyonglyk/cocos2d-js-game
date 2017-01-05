/**游戏Scene*/
var GameScene = cc.Scene.extend({
    ctor:function () {
        this._super();

        var layer = new StartLayer();
        this.addChild(layer);
    },
    /*开始游戏*/
    onGameStart: function(sex){
        this.removeAllChildren();

        var layer = new GameLayer(sex);
        this.addChild(layer);
    },
    /*进入小游戏场景*/
    enterSGame: function(){
        this.removeAllChildren();
        cc.view.setDesignResolutionSize(640, 960, cc.ResolutionPolicy.SHOW_ALL);
        var layer;//, v = Math.random();
        //if(v < 0.5){
            //layer = new game.ShuQianLayer();
        //}else{
            layer = new game.AotemanLayer();
        //}/*else
        //    layer = new game.XiaojuhuaLayer();*/
        this.addChild(layer);
    },
    /*切换背景图*/
    onTranslate: function(score){
        cc.view.setDesignResolutionSize(800, 480, cc.ResolutionPolicy.SHOW_ALL);
        //document.getElementById("gameCanvas").style.backgroundColor = "#000";
        if(game.layer){
            this.removeAllChildren();
            this.addChild(game.layer);

            game.layer.reInit(score);
            game.layer = null;
        }
    }
});