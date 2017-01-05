/**游戏角色*/
var Player = cc.Sprite.extend({
    _sex: 1,//性别1男2女
    _age: 0,//年龄
    _player: null,
    _prefix: "",//图片资源前缀
    _posIndex: 0,//位置索引
    _translated: false,//是否已经切换过场景
    _cbTarget: null,//回调target
    _cb: null,//回调
    _posList: [],//地图位置
    ctor: function(sex, cb, cbTaget){
        this._sex = sex || 1;
        this._age = game.INIT_AGE;
        this._posIndex = 0;
        this._cbTarget = cbTaget;
        this._translated = false;
        this._cb = cb;

        this._super("#dikuai.png");

        this._player = new cc.Sprite();
        this._player.setAnchorPoint(0.5, 0);
        this._player.setPosition(this.width / 2, 20);
        this.addChild(this._player);

        this.getPreFix();
        this._posList = game.POS['1'];
        this._updateFrame(false);
        this.setPosition(this._posList[this._posIndex]);
    },
	//获取是否切换过场景
    isTranslated: function(){
        return this._translated;
    },
	//获取图片资源前缀
    getPreFix: function(){
        this._prefix = "p_" + this._sex + "_" +
            (this._age < 30 ? 1 :
                (this._age < 40 ? 2 : (this._age < 50 ? 3 : 4))) + "_";
        return this._prefix;
    },
	//获取年龄
    getAge: function(){
        return this._age;
    },
	//获取性别
    getSex: function(){
        return this._sex;
    },
	//是否退休
    isRetire: function(){
        var sex = (this._sex == 0 ? 2 : this._sex);
        return this._age >= game.MAX_AGE[sex];
    },
	//变更方向
    _updateFrame: function(flag){
        var next = this._posIndex + 1, direct;
        if(next >= this._posList.length){
            if(this._translated) next %= this._posList.length;
            direct = "r";
        }else{
            if(this._posList[next].x > this._posList[this._posIndex].x)
                direct = "r";
            else
                direct = "l";
        }
        this._player.setSpriteFrame(this._prefix + direct + ".png");
        flag && (this._posIndex = next);
    },
	//移动
    move: function(stepCnt) {
        if(stepCnt > 0){
            this.runAction(cc.sequence(
                this._step(),
                cc.callFunc(
                    function(){
                        this.move(stepCnt - 1);
                    }, this)
            ));
        }else{
            this._age += game.AGE_DELT;
            this.getPreFix();
            this._updateFrame(false);
            this._cb && this._cb.call(this._cbTarget);
        }
    },
	//单步移动
    _step: function(){
        this._updateFrame(true);
        return cc.moveTo(0.3, this._posList[this._posIndex]);
    },
	//切换场景
    translate: function(){
        this._translated = true;
        this._posList = game.POS['2'];
        this._updateFrame(false);
        this._posIndex = 0;
        this.setPosition(this._posList[this._posIndex]);
    }
});