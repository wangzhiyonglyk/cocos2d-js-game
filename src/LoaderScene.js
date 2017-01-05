/**加载Scene*/
var LoaderScene = cc.Scene.extend({
    _label : null,
    _loadBar: null,
    init : function(){
        var rect = cc.visibleRect;

        var texture = new cc.Texture2D();
        texture.initWithElement(document.getElementById("loading"));
        texture.handleLoadedTexture();

        var bg = new cc.Sprite(texture, cc.rect(0, 0, 800, 480));
        bg.setPosition(rect.center);
        this.addChild(bg);

        this._loadBar = new cc.Sprite(texture, cc.rect(0, 481, 473, 33));
        this._loadBar.setAnchorPoint(0, 0.5);
        this._loadBar.setPosition(cc.p(165, 132));
        this.addChild(this._loadBar);

        var loadSp = new cc.Sprite(texture, cc.rect(474, 481, 129, 23));
        loadSp.setAnchorPoint(1, 0.5);
        loadSp.setPosition(cc.p(400, 132));
        this.addChild(loadSp);

        this._label = new cc.LabelTTF("0 %", "Arial", 24);
        this._label.setAnchorPoint(0, 0.5);
        this._label.setColor(cc.color(250, 247, 242, 255));
        this._label.enableStroke(cc.color(166, 108, 15, 255), 2);
        this._label.setPosition(cc.p(410, 132));
        this.addChild(this._label);

        return true;
    },
    initWithResources: function (resources, cb) {
        if(typeof resources == "string")
            resources = [resources];
        this.resources = resources || [];
        this.cb = cb;
    },
    onEnter: function () {
        this._super();
        this._loadBar.setTextureRect(cc.rect(0, 481, 0, 33));
        this._label.setString("0 %");
        this.schedule(this._startLoading, 0.3);
    },
    _startLoading: function () {
        this.unschedule(this._startLoading);
        var _this = this;
        cc.loader.load(_this.resources,
            function (result, count, loadedCount) {
                var percent = (loadedCount / count * 100) | 0;
                percent = Math.min(percent, 100);
                _this._label.setString("" + percent + " %");
                _this._loadBar.setTextureRect(cc.rect(0, 481, Math.floor(percent * 4.73), 33));
            },
            function () {
                _this.cb && _this.cb();
            }
        );
    }
});
/**加载Scene单例*/
var loaderScene = null;
/**预加载*/
LoaderScene.preload = function(res, cb){
    if(!loaderScene) {
        loaderScene = new LoaderScene();
        loaderScene.init();
    }
    loaderScene.initWithResources(res, cb);

    cc.director.runScene(loaderScene);
    return loaderScene;
};