/**骰子*/
var SaiziSprite = cc.Sprite.extend({
    _animate: null,//动画
    _runningAction: null,//当前action
    _cb: null,//骰子停止时回调
    _cbTarget: null,//回调target
    ctor: function(cb, cbTarget){
        this._super("#saizi1.png");

        this._cb = cb;
        this._cbTarget = cbTarget;
        this._runningAction = null;
        this._initAnimate();
    },
	//初始化动画
    _initAnimate: function () {
        var animation = cc.animationCache.getAnimation("sezi");
        if (!animation) {
            var animations = [];
            for(var i = 1; i <= 12; i++)
                animations.push(cc.spriteFrameCache.getSpriteFrame("sezi" + i + ".png"));
            animation = new cc.Animation(animations, 0.01);
            cc.animationCache.addAnimation(animation, "sezi");
        }
        this._animate = cc.animate(animation);
    },
	//播动画
    runAnimation: function(reNum){
        if(this._runningAction)
            this.stopAction(this._runningAction);
        this._runningAction = cc.sequence(this._animate,
            cc.callFunc(function(){
                this.setSpriteFrame("saizi" + reNum + ".png");
                this._cb && this._cb.call(this._cbTarget, reNum);
            }, this)
        );
        this.runAction(this._runningAction);
    }
});