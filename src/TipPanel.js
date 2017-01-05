/**提示Panel 可参考TipWithImage*/ 
var TipPanel = cc.Node.extend({
    _tipCnt: null,
    _tipLabel: null,
    _cbTarget: null,
    _close: null,
    _answercb: null,
    ctor: function(answercb, cbTarget, scale){
        this._super();

        this._answercb = answercb;
        this._cbTarget = cbTarget;

        this.setVisible(false);

        var panel = new cc.Sprite("#s1_bg.png");
        panel.setPosition(cc.visibleRect.center);
        if(scale) panel.setScale(0.7);
        this.addChild(panel);

        var size = cc.size(panel.width, panel.height);

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

        var width = size.width - 70;
        var height = size.height - 83;
        var color = cc.color(0, 0, 0, 0);

        this._tipCnt = new ScrollNode(cc.size(width, height), color);
        this._tipCnt.setPosition(35, 25);
        panel.addChild(this._tipCnt);

        this._tipLabel = new cc.LabelTTF("", "", 26, cc.size(width, 0));
        this._tipLabel.setAnchorPoint(0, 1);
        this._tipLabel.setColor(cc.color.BLACK);
        this._tipLabel.setPosition(0, 0);
        this._tipCnt.addChild(this._tipLabel);
    },
    setAnswerCb: function(answerCb){
        this._answercb = answerCb;
    },
    show: function(ques){
        this.setVisible(true);

        this._tipLabel.setPosition(0, 0);
        this._tipLabel.setString(ques['desc']);

        var height = this._tipCnt.height;
        var _height = this._tipLabel.height;
        if(_height < height){
            this._tipLabel.setPosition(0, - height / 2 + _height / 2 + 12);
        }else{
            this._tipLabel.setPosition(0, 0);
        }
        this._tipCnt.setTotalHeight(_height);
    }
});