/**问答Panel*/
var WdWithImgPanel = cc.Node.extend({
    _bg: null,//背景
    _img: null,//场景图
    _questionCnt: null,//问题滚动容器
    _quesLabel: null,//问题显示Label
    _menu: null,//菜单
    _answercb: null,//答题后回调
    _cbTarget: null,//回调target
    _confirm: null,//确定按钮
    ctor: function(answercb, cbTarget){
        this._super();

        this._answercb = answercb;
        this._cbTarget = cbTarget;

        this.setVisible(false);

        this._bg = new cc.Sprite("#qj_bg.png");
        this._bg.setPosition(cc.visibleRect.center);
        this.addChild(this._bg);

        var size = this._bg.getContentSize();

        this._confirm = new cc.MenuItemImage(
            "#qj_btn.png", null,
            function(){
                if(!this._menu.isSelect()) return;
                this._confirm.setEnabled(false);
                this._questionCnt.removeListner();
                this.setVisible(false);
                this._answercb && this._answercb.call(this._cbTarget, this._menu.getUserData());
            }, this
        );
        this._confirm.setPosition(size.width / 2, 65);

        var menu = new cc.Menu(this._confirm);
        menu.setPosition(0, 0);
        this._bg.addChild(menu);

        this._img = new cc.Sprite("#jc_p.png");
        this._img.setAnchorPoint(1, 0.5);
        this._img.setPosition(115, size.height / 2);
        this._bg.addChild(this._img);

        var width = size.width - 160;
        var height = 230;
        var color = cc.color(0, 0, 0, 0);

        this._questionCnt = new ScrollNode(cc.size(width, height), color);
        this._questionCnt.setPosition(95, 100);
        this._bg.addChild(this._questionCnt);

        this._quesLabel = new cc.LabelTTF("", "", 26, cc.size(width, 0));
        this._quesLabel.setAnchorPoint(0, 1);
        this._quesLabel.setColor(cc.color.BLACK);
        this._quesLabel.setPosition(0, 0);
        this._questionCnt.addChild(this._quesLabel);

        this._menu = new NMenu();
        this._menu.setPosition(0, 0);
        this._questionCnt.addChild(this._menu);
    },
	//显示问题
    show: function(ques){
        this.setVisible(true);
        this._confirm.setEnabled(true);

        this._quesLabel.setPosition(0, 0);
		//修正性别相关字
        var str = ques['desc'];
        if(str.indexOf("（老婆）") != -1){
            if(game.sex == 1)
                str = str.replace("（老婆）", "老婆");
            else
                str = str.replace("（老婆）", "我");
        }
        else if(str.indexOf("老婆") != -1 && game.sex == 2){
            str = str.replace("老婆", "我");
        }
        this._quesLabel.setString(str);

        var prefix = ques['prefix'];
        this._bg.setSpriteFrame(prefix + "_bg.png");
        this._confirm.setNormalSpriteFrame("#" + prefix + "_btn.png");
        this._img.setSpriteFrame(ques['img']);
		//设置场景图位置
        if(ques['pos'] == 0){
            this._img.setAnchorPoint(1, 0.5);
            if(this._img.width < 130)
                this._img.setPosition(95, 200);
            else if(ques['img'].indexOf("ss_p.png") != -1)
                this._img.setPosition(145, 200);
            else
                this._img.setPosition(115, 200);
        }else if(ques['pos'] == 1){
            this._img.setAnchorPoint(0.5, 0.5);
            this._img.setPosition(250, 200);
        }else if(ques['pos'] == 2){
            this._img.setAnchorPoint(0, 0.5);
            this._img.setPosition(415, 200);
        }else if(ques['pos'] == 3){
            this._img.setAnchorPoint(1, 1);
            this._img.setPosition(115, 384);
        }else if(ques['pos'] == 4){
            this._img.setAnchorPoint(0, 0);
            if(ques['img'].indexOf("sb_p.png") != -1)
                this._img.setPosition(355, 24);
            else if(ques['img'].indexOf("lg_p.png") != -1)
                this._img.setPosition(355, 200);
            else
                this._img.setPosition(415, 24);
        }

        this._menu.reset();

        var size = this._questionCnt.getContentSize();

        var height;
        if(!ques['opts']){
            this._menu.setUserData(game.getItemData(ques, {}));
            height = this._questionCnt.height;
            var _height = this._quesLabel.height;
            if(_height < height){
                this._quesLabel.setPosition(0, - height / 2 + _height / 2);
            }else{
                this._quesLabel.setPosition(0, 0);
            }
            this._questionCnt.setTotalHeight(_height);
            return;
        };
        height = -this._quesLabel.y + this._quesLabel.height + 5;
		//设置选项按钮
        var answer, answerLbl, imgItem;
        var len = ques['opts'].length;
        for(var i = 0; i < len; i ++){
            answerLbl = new cc.LabelTTF(ques['opts'][i]['desc'], "", 24, cc.size(size.width - 60, 0));
            answer = new LabelItem(answerLbl, this._questionCnt, game.getItemData(ques, ques['opts'][i]));
            answer.setColor(cc.color.BLACK);
            this._menu.addChild(answer);
            imgItem = new ImageItem("#" + prefix + "_" + (i+1) + ".png", this._questionCnt, answer);
            this._menu.addChild(imgItem);
            if(imgItem.height > answer.height){
                imgItem.setAnchorPoint(0, 1);
                answer.setAnchorPoint(0, 0.5);
                imgItem.setPosition(10, -height);
                answer.setPosition(60, - height - imgItem.height / 2 - 2);
                height += (imgItem.height + 5);
            }else{
                imgItem.setAnchorPoint(0, 0.5);
                answer.setAnchorPoint(0, 1);
                answer.setPosition(60, -height);
                imgItem.setPosition(10, - height - answer.height / 2 + 2);
                height += (answer.height + 5);
            }
        }
        var delt = this._questionCnt.height - height;
        if(delt > 0){
            this._quesLabel.y -= (delt / 2);
            var item, list = this._menu.getChildren();
            len = list.length;
            for(i = 0; i < len; i ++){
                item = list[i];
                item.y -= (delt / 2);
            }
        }
		//设置容器需要的高度，影响滚动效果
        this._questionCnt.setTotalHeight(height);
    }
});