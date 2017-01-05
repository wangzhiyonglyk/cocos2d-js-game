//活动介绍
var JieShaoNode = cc.Sprite.extend({
    _text: null,
    _bar: null,
    _listner: null,
    _touchPoint: null,
    _clipNode: null,
    _isInBar: false,
    _cb: null,//回调
    ctor: function(cb){
        this._super("#adv.png");

        this._touchPoint = null;
        this._isInBar = false;
        this._cb = cb;

        var border = new cc.Sprite("#border.png");
        border.setPosition(this.width - 47, this.height / 2 - 20);
        this.addChild(border);

        this._bar = new cc.Sprite("#bar.png");
        this._bar.setAnchorPoint(0.5, 1);
        this._bar.setPosition(border.width / 2, border.height - 1);
        border.addChild(this._bar);

        var closeItem = new cc.MenuItemImage(
            "#a_close.png", null,
            function(){
                if(this._listner){
                    cc.eventManager.removeListener(this._listner);
                    this._listner = null;
                }
                this.removeFromParent();
                this._cb && this._cb();
            },
            this
        );
        closeItem.setPosition(this.width - 20, this.height - 50);
        var menu = new cc.Menu(closeItem);
        menu.setPosition(0, 0);
        this.addChild(menu);

        this._text = new cc.Sprite(res.text);

        var color = cc.color(0, 0, 0, 0);
        var size = cc.size(this._text.width, this.height - 135);
        var drawNode = new cc.DrawNode();
        drawNode.drawRect(cc.p(0, 0), cc.p(size.width, size.height), color, 1, color);

        this._clipNode = new cc.ClippingNode(drawNode);
        this._clipNode.setContentSize(size);
        this._clipNode.setPosition(35, 40);
        this.addChild(this._clipNode);

        this._text.setAnchorPoint(0, 1);
        this._text.setPosition(0, size.height);
        this._clipNode.addChild(this._text);

        this._bar.setScaleY(((size.height / this._text.height) * border.height + 11) / this._bar.height);
    },
    onEnter: function(){
        this._super();

        this._listner = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true, onTouchBegan: this._onTouchBegan,
            onTouchMoved: this._onTouchMoved, onTouchEnded: this._onTouchEnded
        });
        cc.eventManager.addListener(this._listner, this);
    },
    _onTouchBegan: function(touch, event){
        var target = event.getCurrentTarget();
        if(target){
            var rect = cc.rect(0, 0, target._bar.width, target._bar.height);
            var pt = target._bar.convertTouchToNodeSpace(touch);
            if(cc.rectContainsPoint(rect, pt)){
                target._touchPoint = touch.getLocation();
                target._isInBar = true;
                return true;
            }else{
                rect = cc.rect(0, 0, target._clipNode.width, target._clipNode.height);
                pt = target._clipNode.convertTouchToNodeSpace(touch);
                if(cc.rectContainsPoint(rect, pt)){
                    target._touchPoint = touch.getLocation();
                    return true;
                }
            }
        }
        return false;
    },
    _onTouchMoved: function(touch, event){
        var target = event.getCurrentTarget();
        if(target){
            var pt = touch.getLocation();
            var deltY = pt.y - target._touchPoint.y;
            if(target._isInBar) {
                deltY *= (-target._text.height / target._clipNode.height);
            }
            var tmpY = target._text.y + deltY;
            if(tmpY > target._text.height){
                tmpY = target._text.height;
            }else if(tmpY < target._clipNode.height){
                tmpY = target._clipNode.height;
            }
            deltY = tmpY - target._text.y;
            target._bar.y -= (deltY * (target._clipNode.height / target._text.height));
            target._text.y = tmpY;
            target._touchPoint = pt;
        }
    },
    _onTouchEnded: function(touch, event){
        var target = event.getCurrentTarget();
        if(target){
            target._touchPoint = null;
        }
    }
});