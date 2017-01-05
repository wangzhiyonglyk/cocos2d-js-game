/*奥特曼小游戏场景*/
(function(){
	//游戏配置
    var config = {
        time: 10,
        type: 5
    };
	//游戏状态
    var GameState = {
        START: 1,
        READY: 0
    };
    var gameState = GameState.READY;
	//游戏奥特曼切图DrawNode
    var PDrawNode = cc.DrawNode.extend({
        drawPRect: function(a, b, h){
            var segments = Math.max(a, b);
            var coef = Math.PI / segments;
            var vertices = [];
            for (var i = 0; i <= segments; i++) {
                var rads = i * coef;
                var j = a * Math.cos(rads);
                var k = -b * Math.sin(rads);
                vertices.push(cc.p(j, k));
            }
            vertices.push(cc.p(-a, h));
            vertices.push(cc.p(a, h));
            this.drawPoly(vertices, cc.color(0, 0, 0, 0), 1, cc.color(0, 0, 0, 0));
        }
    });
	//切图区域
    var PClipNode = cc.ClippingNode.extend({
        _canAddPerson: true,
        _person: null,
        _isPersonEnabled: false,
        ctor: function(){
            var drawNode = new PDrawNode();
            drawNode.drawPRect(81, 40, 124);

            this._super(drawNode);
            this._canAddPerson = true;
            this._isPersonEnabled = false;
        },
        addPerson: function(){
            var person = new Person(this);
            person.setPosition(0, -36);
            this.addChild(person);
            this._person = person;
            this._isPersonEnabled = true;
            this._canAddPerson = false;
        },
        onClicked: function(){
            this._isPersonEnabled = false;
            this._person && this._person.onHit && this._person.onHit();
        },
        isPersonEnabled: function(){
            return this._isPersonEnabled;
        },
        personRemoved: function(){
            this._canAddPerson = true;
            this._isPersonEnabled = false;
        },
        canAddPcerson: function(){
            return this._canAddPerson;
        },
        getTouchRect: function(){
            return cc.rect(-81, -40, 162, 164);
        }
    });
	//奥特曼
    var Person = cc.Sprite.extend({
        _action: null,
        _pTarget: null,
        _type: 1,
        clipNode: null,
        _animate: null,
        ctor: function(clipNode){
            this._type = Math.ceil(Math.random() * config.type);
            this._super("#per_" + this._type + "_2.png");

            this.clipNode = clipNode;
            this._action = cc.moveBy(0.4, cc.p(0, 175)).easing(cc.easeIn(1.5));

            this.setAnchorPoint(0.5, 1);
            this._initAnimate();
        },
        onEnter: function(){
            this._super();

            this.runAction(cc.sequence(this._action,
                cc.delayTime(0.5), this._action.reverse(),
                cc.callFunc(function(){
                    this.removeFromParent();
                    this.clipNode && this.clipNode.personRemoved
                    && this.clipNode.personRemoved();
                }, this)));
        },
        _initAnimate: function(){
            var name = "per_" + this._type + "_";
            var animation = cc.animationCache.getAnimation("per_" + this._type + "_");
            if(!animation){
                var frames = [
                    cc.spriteFrameCache.getSpriteFrame(name + "1.png"),
                    cc.spriteFrameCache.getSpriteFrame(name + "2.png")
                ];
                animation = new cc.Animation(frames, 0.05);
                cc.animationCache.addAnimation(animation, name);
            }
            this._animate = cc.animate(animation);
        },
        onHit: function(){
            this.stopAllActions();
            this.runAction(
                cc.sequence(cc.fadeOut(1), cc.callFunc(
                        function(){
                            this.stopAllActions();
                            this.removeFromParent();
                            this.clipNode && this.clipNode.personRemoved
                            && this.clipNode.personRemoved();
                        }, this
                    )
                ));
            this.runAction(this._animate.repeatForever());
        }
    });
	//锤子
    var ChuiZi = cc.Sprite.extend({
        ctor: function(){
            this._super(res.chui);
            this.setVisible(false);

            this.setAnchorPoint(1, 0);
        },
        knock: function(pos){
            this.stopAllActions();

            this.setPosition(pos.x + this.width / 2, pos.y + 50 + this.height);
            this.setVisible(true);

            this.runAction(cc.sequence(cc.rotateBy(0.1, -100),
                cc.rotateBy(0.1, 100), cc.callFunc(
                    function(){
                        this.setVisible(false);
                    }, this
                )
            ));
        }
    });
	//游戏界面
    var GameLayer = cc.Layer.extend({
        _pLabel: null,
        _pNumber: 0,
        _tNumber: 30,
        _tLabel: null,
        _clipList: [],
        _chuizi: null,
        _isStart: false,
        _getGoldLbl: null,
        _winGoldLbl: null,
        _tipPanel: null,
        ctor: function(){
            this._super();

            var rect = cc.visibleRect;

            var bg = new cc.Sprite(res.bg);
            bg.setAnchorPoint(0.5, 1);
            bg.setPosition(rect.top);
            this.addChild(bg);

            var ge = new cc.Sprite(res.ge);
            ge.setAnchorPoint(1, 1);
            ge.setPosition(cc.pSub(rect.topRight, cc.p(50, 90)));
            this.addChild(ge);

            this._pLabel = new cc.LabelAtlas("" + this._pNumber, res.aoNumber, 29, 30, "0");
            this._pLabel.setAnchorPoint(1, 1);
            this._pLabel.setPosition(ge.x - ge.width - 10, ge.y);
            this.addChild(this._pLabel);

            var time = new cc.Sprite(res.aotime);
            time.setAnchorPoint(0, 1);
            time.setPosition(cc.pAdd(rect.topLeft, cc.p(40, -70)));
            bg.addChild(time);

            this._tLabel = new cc.LabelAtlas("" + this._tNumber, res.aoNumber, 29, 30, "0");
            this._tLabel.setAnchorPoint(1, 0.5);
            this._tLabel.setPosition(124, time.height / 2);
            time.addChild(this._tLabel);

            this._chuizi = new ChuiZi();
            this.addChild(this._chuizi, 10);

            this._clipList = [];
            this.initClipNode();
            cc.spriteFrameCache.addSpriteFrames(res.person_plist);

            this._tipPanel = new TipPanel(this.init, this);
            this.addChild(this._tipPanel, 100);
			//游戏介绍
            this._tipPanel.show({"desc": "奥特曼一旦冒出头，就点击那个坑将奥特曼消灭，消灭的奥特曼越多，得分越高。"});
        },
		//初始化
        init: function(){
            this._pNumber = 0;
            this._pLabel.setString(this._pNumber);
            this._tNumber = config.time;
            this._tLabel.setString(this._tNumber);
            this._isStart = false;
            this._winGoldLbl = null;
            this._getGoldLbl = null;

            gameState = GameState.START;
            this.unschedule(this._timer);
            this.unschedule(this.addPerson);
            this.schedule(this.addPerson, 0.7);
        },
        initClipNode: function(){
            var scale = 1, dt = 30, rect = cc.visibleRect;
            if(rect.width < 609 || rect > 649){
                scale = rect.width / 609;
                dt = Math.floor(dt * scale);
            }
            var clipNode, dong;
            var width = 2 * dt + 3 * 163 * scale;
            var padLeft = (cc.visibleRect.width - width) / 2;
            var padBottom = 40, row, col, x, y;
            var left = rect.topLeft.x, bottom = rect.bottom.y;
            for(var i = 0; i < 9; i ++){
                col = i % 3;
                row = Math.floor(i / 3);
                x = left + padLeft + col * dt + (col + 0.5) * 163 * scale;
                y = bottom + padBottom + row * dt + (row + 0.5) * 163 * scale;

                dong = new cc.Sprite(res.dong);
                dong.setScale(scale);
                dong.setPosition(x, y);
                this.addChild(dong);

                clipNode = new PClipNode();
                clipNode.setPosition(x, y + 10);
                clipNode.setScale(scale);
                this.addChild(clipNode);

                this._clipList.push(clipNode);
            }
        },
		//添加奥特曼
        addPerson: function(){
            var index = Math.random() * this._clipList.length | 0;
            while(!this._clipList[index].canAddPcerson()){
                index = Math.random() * this._clipList.length | 0;
            }
            this._clipList[index].addPerson();
        },
        onEnter: function(){
            this._super();

            cc.eventManager.addListener({event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true, onTouchBegan: this._onTouchBegan
            }, this);
        },
        _onTouchBegan: function(touch, event){
            var target = event.getCurrentTarget();
            if(target && gameState == GameState.START){
                var list = target._clipList;
                if(list && list.length > 0){
                    var len = list.length;
                    var rect, pt, clipNode;
                    for(var i = 0; i < len; i ++){
                        clipNode = list[i];
                        if(clipNode && clipNode.isPersonEnabled()){
                            pt = clipNode.convertTouchToNodeSpace(touch);
                            rect = clipNode.getTouchRect();
                            if(cc.rectContainsPoint(rect, pt)){
                                clipNode.onClicked();
                                target._chuizi && target._chuizi.knock(clipNode.getPosition());
                                target._pNumber ++;
                                target._pLabel.setString(target._pNumber);
                                if(!target._isStart){
                                    target.unschedule(target._timer);
                                    target.schedule(target._timer, 1);
                                    target._isStart = true;
                                }
                                return false;
                            }
                        }
                    }
                }
            }
            return false;
        },
		//游戏结束逻辑
        _gameOver: function(){
            this.unschedule(this._timer);
            this._isStart = false;
            this.unschedule(this.addPerson);
            gameState = GameState.READY;

            this._tipPanel.setAnswerCb(function(){
                var score = Math.floor(this._pNumber);
                var scene = cc.director.getRunningScene();
                scene && scene.onTranslate && scene.onTranslate(score);
            });
            this._tipPanel.show({"desc": "您共消灭了" + this._pNumber + "个奥特曼，获得" + this._pNumber + "积分，接下来将进入主游戏场景。" });
        },
		//定时器
        _timer: function(dt){
            this._tNumber = Math.round(this._tNumber - dt);
            if(this._tNumber <= 0){
                this._tNumber = 0;
                this._tLabel.setString(this._tNumber);
                this._gameOver();
            }else{
                if(this._tNumber < 10 && this._tNumber +dt >= 10){
                    this.unschedule(this.addPerson);
                    this.schedule(this.addPerson, 0.5);
                }else if(this._tNumber < 20 && this._tNumber +dt >= 20){
                    this.unschedule(this.addPerson);
                    this.schedule(this.addPerson, 0.6);
                }
                this._tLabel.setString(this._tNumber);
            }
        },
        onExit: function(){
            this._super();
            cc.spriteFrameCache.removeSpriteFrameByName(res.person_plist);
        }
    });
    game.AotemanLayer = GameLayer;
})();