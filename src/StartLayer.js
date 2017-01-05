/**创建角色Layer*/
var StartLayer = cc.Layer.extend({
    _menu: null,
    ctor:function () {
        this._super();

        cc.spriteFrameCache.addSpriteFrames(res.login_plist);
        cc.spriteFrameCache.addSpriteFrames(res.adv_plist);
		//背景
        var bg = new cc.Sprite("#login.png");
        bg.setPosition(cc.visibleRect.center);
        this.addChild(bg);
		//男性性别图标
        var male = new cc.MenuItemImage(
            "#male_1.png",
            "#male_2.png",
            function(){
                var scene = cc.director.getRunningScene();
                scene && scene.onGameStart && scene && scene.onGameStart(1);
            },
            this
        );
        male.setPosition(213, 85);
		//女性性别图标
        var female = new cc.MenuItemImage(
            "#female_1.png",
            "#female_2.png",
            function(){
                var scene = cc.director.getRunningScene();
                scene && scene.onGameStart && scene && scene.onGameStart(2);
            },
            this
        );
        female.setPosition(587, 85);
		//男性人物图片
        var manItem = new cc.MenuItem(
            function(){
                var scene = cc.director.getRunningScene();
                scene && scene.onGameStart && scene && scene.onGameStart(1);
            },
            this
        );
        manItem.setContentSize(236, 250);
        manItem.setPosition(213, 264);
		//女性人物图片
        var femaleItem = new cc.MenuItem(
            function(){
                var scene = cc.director.getRunningScene();
                scene && scene.onGameStart && scene && scene.onGameStart(2);
            },
            this
        );
        femaleItem.setContentSize(236, 250);
        femaleItem.setPosition(587, 264);

        this._menu = new cc.Menu(male, female, manItem, femaleItem);
        this._menu.setPosition(0, 0);
        this._menu.setEnabled(false);
        this.addChild(this._menu);
		
		//选项设置类实例
        var advNode = new JieShaoNode(this.start.bind(this));
        advNode.setPosition(cc.visibleRect.center);
        this.addChild(advNode);
    },
	//选项设置关闭回调
    start: function(){
        this._menu.setEnabled(true);
    },
	//退出该界面逻辑
    onExit: function(){
        this._super();
        cc.spriteFrameCache.removeSpriteFramesFromFile(res.login_plist);
        cc.spriteFrameCache.removeSpriteFramesFromFile(res.adv_plist);
    }
});