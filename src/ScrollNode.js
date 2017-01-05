/**Scroll Panel*/
var ScrollNode = cc.Node.extend({
    _container: null,//����
    _listner: null,//�¼�����
    _touchPoint: null,//touchstart�����λ��
    _totalHeight: 0,//����������������ʵ����Ҫ�ĸ߶�
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
	//����ӽڵ�
    addChild: function(child, localZOrder, tag){
        this._container.addChild(child, localZOrder, tag);
    },
	//����ʵ�ʸ߶�
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
	//�����¼�����
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
	//ȡ������
    removeListner: function(){
        if(this._listner)
            this._listner.setEnabled(false);
    },
	//�˳�
    onExit: function(){
        if(this._listner)
            cc.eventManager.removeListener(this._listner);

        this._super();
    }
});