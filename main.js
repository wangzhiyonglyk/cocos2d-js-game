cc.game.onStart = function(){
    cc.view.adjustViewPort(false);
    cc.view.enableAutoFullScreen(false);
    cc.view.setDesignResolutionSize(800, 480, cc.ResolutionPolicy.SHOW_ALL);
    cc.view.resizeWithBrowserSize(true);

    //load resources
    LoaderScene.preload(g_resources, function () {
        cc.director.runScene(new GameScene());
    }, this);
};
cc.game.run();