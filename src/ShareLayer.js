/**分享Layer*/
var ShareLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
		//透明蒙版
        var layer = new cc.LayerColor(cc.color(0, 0, 0, 210));
        layer.setPosition(cc.visibleRect.bottomLeft);
        this.addChild(layer);
		//分享引导图片
        var share = new cc.Sprite("#share.png");
        share.setAnchorPoint(1, 1);
        share.setPosition(cc.visibleRect.topRight);
        this.addChild(share);
		//蒙版点击逻辑
        var menuItem = new cc.MenuItem(
            function(){
                this.removeFromParent();
            },
            this
        );
        menuItem.setContentSize(cc.winSize);
        menuItem.setPosition(0, 0);

        this.addChild(new cc.Menu(menuItem));
    }
});