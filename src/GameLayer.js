game.layer = null;//游戏界面实例引用
game.sex = 1;//性别
/**主游戏Layer*/
var GameLayer = cc.Layer.extend({
    _bg: null,//背景
    _player: null,//玩家
    _head: null,
    _saizi: null,
    _isSaiziEnabled: true,
    _score: 0,
    _scoreLabel: null,
    _tipPanel: null,
    _wdImgPanel: null,
    _tipImgPanel: null,
    _timeLabel: null,
    _year: 0,
    _month: 0,
    _ageLabel: null,
    _tkList: {},
    _animateLabel: null,
    _result: null,
    _cLayer: null,
    _shouzhi: null,
    _currentStep: 0,
    _sTipPanel: null,
    ctor: function(sex){
        this._super();
        this.initVariable();

        var rect = cc.visibleRect;

        this._bg = new cc.Sprite(res.mainBg_1);
        this._bg.setPosition(rect.center);
        this.addChild(this._bg);

        cc.spriteFrameCache.addSpriteFrames(res.gameUi_plist);
        cc.spriteFrameCache.addSpriteFrames(res.panel_1_plist);
        cc.spriteFrameCache.addSpriteFrames(res.panel_2_plist);
        cc.spriteFrameCache.addSpriteFrames(res.overUi_plist);
        cc.spriteFrameCache.addSpriteFrames(res.adv_plist);
        cc.spriteFrameCache.addSpriteFrames(res.gperson_plist);

        this.initPlayer(sex);
        game.sex = sex;
        this.initUI();

        this._cLayer = new cc.LayerColor(cc.color(0, 0, 0, 200));
        this.addChild(this._cLayer);
        this._cLayer.setVisible(false);
        this._cLayer.setPosition(cc.visibleRect.bottomLeft);

        this._wdImgPanel = new WdWithImgPanel(this.onAnswer, this);
        this.addChild(this._wdImgPanel);

        this._tipPanel = new TipPanel(this.onAnswer, this);
        this.addChild(this._tipPanel);

        this._sTipPanel = new TipPanel(this.onAnswer, this, true);
        this.addChild(this._sTipPanel);

        this._tipImgPanel = new TipWithImgPanel(this.onAnswer, this);
        this.addChild(this._tipImgPanel);

        var tm = this._tkList.shift();
        this._cLayer.setVisible(true);
        this._tipImgPanel.setAnswerCb(function(){
            this._tipImgPanel.setAnswerCb(this.onAnswer);

            this._cLayer.setVisible(false);
            this._isSaiziEnabled = true;
            this._shouzhi.setVisible(true);

            this._player._age += game.AGE_DELT;
            this._ageLabel.setString("" + this._player.getAge());
            this._year += game.AGE_DELT;

            this._head.setSpriteFrame(this._player.getPreFix() + "h.png");
            this._timeLabel.setString(this._year + "年" + this._month + "月");
        }.bind(this));
        this._tipImgPanel.show(tm[0]);
        this._isSaiziEnabled = false;
        this._shouzhi.setVisible(false);

        this._animateLabel = new cc.LabelTTF("", "", 40);
        this._animateLabel.enableStroke(cc.color.RED, 2);
        this.addChild(this._animateLabel, 100);
    },
	//初始化变量
    initVariable: function(){
        this._isSaiziEnabled = true;
        this._score = 0;

        this._tkList = game.TM_LIST.slice();
    },
	//初始化玩家
    initPlayer: function(sex){
        this._player = new Player(sex, this.onPlayerStop, this);
        this.addChild(this._player);
    },
	//初始化UI
    initUI: function(){
        var uiBg = new cc.Sprite(res.mainUi);
        uiBg.setPosition(cc.visibleRect.center);
        this.addChild(uiBg);

        var prefix = this._player.getPreFix();
        this._head = new cc.Sprite("#" + prefix + "h.png");
        this._head.setPosition(57, 82);
        uiBg.addChild(this._head);

        this._ageLabel = new cc.LabelAtlas("" + this._player.getAge(), res.number, 18, 18, "0");
        this._ageLabel.setPosition(325, 20);
        uiBg.addChild(this._ageLabel);

        var date = new Date();
        this._year = date.getFullYear();
        this._month = (1 + date.getMonth());
        this._timeLabel = new cc.LabelTTF(this._year + "年" + this._month + "月", "", 30);
        this._timeLabel.enableStroke(cc.color(29, 69, 144, 255), 2);
        this._timeLabel.setPosition(680, 435);
        uiBg.addChild(this._timeLabel);

        this._scoreLabel = new cc.LabelAtlas("" + this._score, res.number, 18, 18, "0");
        this._scoreLabel.setAnchorPoint(1, 0);
        this._scoreLabel.setPosition(585, 19);
        uiBg.addChild(this._scoreLabel);

        this._saizi = new SaiziSprite(this.onSaizeStop, this);
        this._saizi.setPosition(740, 61);
        uiBg.addChild(this._saizi);

        var saiziItem = new cc.MenuItem(
            function(){
                if(this._isSaiziEnabled){
                    this._isSaiziEnabled = false;
                    this._shouzhi.setVisible(false);
                    this._saizi.runAnimation(Math.ceil(Math.random() * 6));
                }
            }, this
        );
        saiziItem.setContentSize(103, 103);
        saiziItem.setPosition(738, 61);

        var menu = new cc.Menu(saiziItem);
        menu.setPosition(0, 0);
        uiBg.addChild(menu);

        this._shouzhi = new cc.Sprite("#ts_hand.png");
        this._shouzhi.setPosition(770, 41);
        this._shouzhi.runAction(cc.sequence(cc.moveBy(0.2, cc.p(-10, 10)), cc.delayTime(0.2), cc.moveBy(0.2, cc.p(10, -10))).repeatForever());
        this.addChild(this._shouzhi);
    },
	//骰子停止时回调
    onSaizeStop: function(stepCnt){
        this._player.move(stepCnt);
        this._currentStep = stepCnt;
    },
	//玩家停止移动时回调
    onPlayerStop: function(){
        this._ageLabel.setString("" + this._player.getAge());
        this._year += game.AGE_DELT;
        this._head.setSpriteFrame(this._player.getPreFix() + "h.png");
        this._timeLabel.setString(this._year + "年" + this._month + "月");

        var tm = this._tkList.shift();
        if(tm && tm[this._currentStep - 1])
            this.show(tm[this._currentStep - 1]);
        else{

        }
    },
	//显示提示框和问题框
    show: function(ques){
        this._cLayer.setVisible(true);
        if(ques['type'] == 2){
            this._tipImgPanel.show(ques);
        }else if(ques['type'] == 3)
            this._wdImgPanel.show(ques);
    },
	//答题后逻辑
    onAnswer: function(data){
        if(data){
            if(data['award']){
                this._score += data['award'];
                if(data['award'] != 0){
                    if(data['award'] > 0)
                        this._animateLabel.setString("+" + data['award']);
                    else
                        this._animateLabel.setString("" + data['award']);
                    this._animateLabel.setOpacity(255);
                    this._animateLabel.setPosition(600, 50);
                    this._animateLabel.runAction(cc.spawn(cc.moveBy(1, cc.p(0, 50)), cc.fadeOut(1)));
                }
                if(this._score < 0) this._score = 0;
                this._scoreLabel.setString("" + this._score);
            }
            if(data['next'] != undefined){
                this._tkList.shift();
                this._tkList.unshift([game.QUES[data['next']], game.QUES[data['next']], game.QUES[data['next']], game.QUES[data['next']], game.QUES[data['next']], game.QUES[data['next']]]);
            }
            if(!data['tips'])
                this.onPanelClose();
            else{
                var tip = "";
                if(data['isRight'] != undefined){
                    tip = (data['isRight'] ? "回答正确" : "回答错误");
                    this._tipImgPanel.show({'desc': data['tips'], 'title':tip, 'img': data['img'], 'pos': 0});
                }else
                    this._tipImgPanel.show({'desc': data['tips'], 'img': data['img'], 'pos': 0});
            }
        }else{
            this.onPanelClose();
        }
    },
	//提示框关闭时逻辑
    onPanelClose: function(){
        this._cLayer.setVisible(false);
        if(this._player.isRetire()){
            this.onGameOver();
        }else {
            this._isSaiziEnabled = true;
            this._shouzhi.setVisible(true);
            if(this._player.getAge() >= 43 && !this._player.isTranslated()){
                this.translate();
            }
        }
    },
	//切换场景
    translate: function(){
        this._shouzhi.stopAllActions();
        this._shouzhi.setVisible(false);
        this._isSaiziEnabled = false;

        this._sTipPanel.setAnswerCb(function(){
            game.layer = this;
            this.removeFromParent();
            var scene = new GameScene();
            scene.enterSGame();
            cc.director.runScene(new cc.TransitionFade(1.2, scene));
        });
		//进入小游戏场景提示
        this._sTipPanel.show({"desc": "接下来将进入休闲游戏场景，请竖直手机获得更佳游戏体验。" });
    },
	//切换后更新变量值
    reInit: function(score){
        this._sTipPanel.setAnswerCb(this.onAnswer);
        this._bg.setTexture(res.mainBg_2);
        this._score += score;
        this._scoreLabel.setString("" + this._score);

        var scene = new GameScene();
        scene.removeAllChildren();
        this.removeFromParent();
        scene.addChild(this);
        cc.director.runScene(new cc.TransitionFade(1.2, scene));

        this._isSaiziEnabled = true;
        this._shouzhi.runAction(cc.sequence(cc.moveBy(0.2, cc.p(-10, 10)), cc.delayTime(0.2), cc.moveBy(0.2, cc.p(10, -10))).repeatForever());
        this._player.translate(1.2);
        this._shouzhi.setVisible(true);
    },
	//游戏结束逻辑
    onGameOver: function(){
        this._sTipPanel.setAnswerCb(this.initOverPanel);
        this._result = this._calAward();
        if(this._score < 400)
            this._sTipPanel.show({"desc": "你获得" + this._result.a + "称号，去社保知识学堂重新进行回炉再造吧！" });
        else
            this._sTipPanel.show({"desc": "恭喜你，获得" + this._result.a + "称号，再接再厉哦！" });
    },
	//获得称号
    _calAward: function(){
        var award = "", res = "";
        if(this._score < 300){
            award = "社保知识菜鸟";
            res = "#award_1.png";
        }else if(this._score < 400){
            award = "社保知识初学者";
            res = "#award_2.png";
        }else if(this._score < 500){
            award = "社保知识入门者";
            res = "#award_3.png";
        }else if(this._score < 600){
            award = "社保知识资深达人";
            res = "#award_4.png";
        }else{
            award = "社保知识荣耀达人";
            res = "#award_5.png";
        }
        return {a: award, r: res};
    },
	//初始化结果页面UI
    initOverPanel: function(){
        var overPanel = new cc.Sprite("#dj_bg.png");
        overPanel.setPosition(cc.visibleRect.center);
        this.addChild(overPanel);

        var size = overPanel.getContentSize();
        var pos = cc.p(size.width / 2, size.height / 2 + 80);

        var result = new cc.Sprite("#win.png");
        result.setPosition(pos);
        overPanel.addChild(result);

        var guang = new cc.Sprite("#guang.png");
        guang.setPosition(pos);
        overPanel.addChild(guang);

        var action = cc.rotateBy(0.1, 1);
        guang.runAction(action.repeatForever());

        guang = new cc.Sprite("#guang.png");
        guang.setPosition(pos);
        overPanel.addChild(guang);
        guang.runAction(action.reverse().repeatForever());

        var head = new cc.Sprite("#end_" + this._player.getSex() + ".png");
        head.setPosition(pos);
        overPanel.addChild(head);

        var award = new cc.Sprite(this._result.r);
        award.setPosition(overPanel.width / 2, overPanel.height / 2 - 27);
        overPanel.addChild(award);
		//重新开始按钮
        var reStartItem = new cc.MenuItemImage(
            "#dj_reload.png",
            null,
            function(){
                var scene = new cc.TransitionFade(1.5, new GameScene());
                cc.director.runScene(scene);
            }, this
        );
		//分享按钮
        var shareItem = new cc.MenuItemImage(
            "#dj_foward.png",
            null,
            function(){
                var shareLayer = new ShareLayer();
                shareToWeixin(this._score, this._result.a);
                this.addChild(shareLayer);
            }, this
        );
		//视频按钮
        var videoItem = new cc.MenuItemImage(
            "#sp.png",
            null,
            function(){
                linkToVideo();
            }, this
        );
        var overMenu = new cc.Menu(reStartItem, shareItem, videoItem);
        overMenu.alignItemsHorizontallyWithPadding(40);
        overMenu.setPosition(overPanel.width / 2, 50);
        overPanel.addChild(overMenu);
    },
	//退出
    onExit: function(){
        this._super();

        cc.spriteFrameCache.removeSpriteFrameByName(res.gameUi_plist);
        cc.spriteFrameCache.removeSpriteFrameByName(res.panel_1_plist);
        cc.spriteFrameCache.removeSpriteFrameByName(res.panel_2_plist);
        cc.spriteFrameCache.removeSpriteFrameByName(res.overUi_plist);
        cc.spriteFrameCache.removeSpriteFrameByName(res.adv_plist);
        cc.spriteFrameCache.removeSpriteFrameByName(res.gperson_plist);
    }
});