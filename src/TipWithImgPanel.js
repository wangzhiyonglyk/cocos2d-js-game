/**提示Panel*/
var TipWithImgPanel = cc.Node.extend({
    _close: null,//关闭按钮
    _tipCnt: null,//提示滚动容器
    _tipLabel: null,//提示Label
    _title: null,//标题，回调正确或错误
    _cbTarget: null,//回调target
    _img: null,//场景图
    _answercb: null,//关闭回调
    ctor: function(answercb,  cbTarget){
        this._super();

        this._answercb = answercb;
        this._cbTarget = cbTarget;

        this.setVisible(false);

        var panel = new cc.Sprite("#s1_bg.png");
        panel.setPosition(cc.visibleRect.center);
        this.addChild(panel);

        var size = panel.getContentSize();

        this._close = new cc.MenuItemImage(
            "#a_close.png", null,
            function(){
                this._tipCnt.removeListner();
                this.setVisible(false);
                this._answercb && this._answercb.call(this._cbTarget, null);
            }, this
        );
        this._close.setPosition(size.width - 15, size.height - 15);

        var menu = new cc.Menu(this._close);
        menu.setPosition(0, 0);
        panel.addChild(menu);

        this._img = new cc.Sprite("#jc_p.png");
        this._img.setAnchorPoint(1, 0.5);
        this._img.setPosition(120, size.height / 2);
        panel.addChild(this._img);

        var width = size.width - 180;
        var height = size.height - 94;
        var color = cc.color(0, 0, 0, 0);

        this._tipCnt = new ScrollNode(cc.size(width, height), color);
        this._tipCnt.setPosition(110, 32);
        panel.addChild(this._tipCnt);

        this._tipLabel = new cc.LabelTTF("", "", 26, cc.size(width, 0));
        this._tipLabel.setAnchorPoint(0, 1);
        this._tipLabel.setColor(cc.color.BLACK);
        this._tipLabel.setPosition(0, 0);
        this._tipCnt.addChild(this._tipLabel);

        this._title = new cc.LabelTTF("", "", 26);
        this._title.setAnchorPoint(0.5, 1);
        this._title.setColor(cc.color.BLACK);
        this._title.setPosition(size.width / 2, size.height - 25);
        panel.addChild(this._title);
    },
	//设置关闭回调
    setAnswerCb: function(answerCb){
        this._answercb = answerCb;
    },
	//显示提示内容
    show: function(ques){
        this.setVisible(true);

        this._tipLabel.setPosition(0, 0);
        this._tipLabel.setString(ques['desc']);
        if(ques['title']){
            this._title.setString(ques['title']);
            this._title.setVisible(true);
        }
        else this._title.setVisible(false);

        this._img.setSpriteFrame(ques['img']);

        if(ques['pos'] == 0){
            this._img.setAnchorPoint(1, 0.5);
            if(this._img.width < 130)
                this._img.setPosition(95, 172);
            else if(ques['img'].indexOf("yabx") != -1)
                this._img.setPosition(195, 172);
            else
                this._img.setPosition(110, 172);
        }else if(ques['pos'] == 1){
            this._img.setAnchorPoint(0.5, 0.5);
            this._img.setPosition(270, 172);
        }else if(ques['pos'] == 2){
            this._img.setAnchorPoint(0, 0.5);
            this._img.setPosition(455, 172);
        }else if(ques['pos'] == 3){
            this._img.setAnchorPoint(1, 1);
            this._img.setPosition(110, 324);
        }else if(ques['pos'] == 4){
            this._img.setAnchorPoint(0, 0);
            this._img.setPosition(455, 24);
        }

        var height = this._tipCnt.height, _height = this._tipLabel.height;
        if(_height < height){
            if(this._title.isVisible())
                this._tipLabel.setPosition(0, - height / 2 + _height / 2);
            else
                this._tipLabel.setPosition(0, - height / 2 + _height / 2 + 12);
        }else{
            this._tipLabel.setPosition(0, 0);
        }
        this._tipCnt.setTotalHeight(this._tipLabel.height);
    }
});