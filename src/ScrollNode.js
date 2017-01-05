/**Scroll Panel*/
var ScrollNode = cc.Node.extend({
    _container: null,//容器
    _listner: null,//事件监听
    _touchPoint: null,//touchstart点击的位置
    _totalHeight: 0,//容器放下所有内容实际需要的高度
    ctor: function(size, color){
        this._listner = null;

        this._super();
        this.setContentSize(size);

        var drawNode = new cc.DrawNode();
        drawNode.drawRect(cc.p(0, 0), cc.p(size.width, size.height), color, 1, color);

        var clipNode = new cc.ClippingNode(drawNode);
        cc.Node.prototype.addChild.call(this, clipNode);

        this._container = new cc.Node();
        clipNode.addChild(this._container);
    },
	//添加子节点
    addChild: function(child, localZOrder, tag){
        this._container.addChild(child, localZOrder, tag);
    },
	//设置实际高度
    setTotalHeight: function(height){
        this.removeListner();
        this._totalHeight = height;
        this._container.y = this.height;
        if(this.height < height - 5){
            this._addListner();
        }
    },
    getContainerY: function(){
        return this._container.y;
    },
    onEnter: function(){
        this._super();

        this._listner = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true, onTouchBegan: this._onTouchBegan,
            onTouchMoved: this._onTouchMoved, onTouchEnded: this._onTouchEnded
        });
        cc.eventManager.addListener(this._listner, this);
        this._listner.setEnabled(false);
    },
	//激活事件监听
    _addListner: function(){
        this._listner.setEnabled(true);
    },
	//touchstart
    _onTouchBegan: function(touch, event){
        var target = event.getCurrentTarget();
        if(target){
            var rect = cc.rect(0, 0, target.width, target.height);
            var pt = target.convertTouchToNodeSpace(touch);
            if(cc.rectContainsPoint(rect, pt)){
                target._touchPoint = pt;
                return true;
            }
        }
        return false;
    },
	//touchmove
    _onTouchMoved: function(touch, event){
        var target = event.getCurrentTarget();
        if(target){
            var pt = target.convertTouchToNodeSpace(touch);
            var deltY = pt.y - target._touchPoint.y;
            var tmpY = target._container.y + deltY;
            if(tmpY > target._totalHeight){
                tmpY = target._totalHeight;
            }else if(tmpY < target.height){
                tmpY = target.height;
            }
            target._container.y = tmpY;
            target._touchPoint = pt;
        }
    },
	//touchend
    _onTouchEnded: function(touch, event){
        var target = event.getCurrentTarget();
        if(target){
            target._touchPoint = null;
        }
    },
	//取消监听
    removeListner: function(){
        if(this._listner)
            this._listner.setEnabled(false);
    },
	//退出
    onExit: function(){
        if(this._listner)
            cc.eventManager.removeListener(this._listner);

        this._super();
    }
});