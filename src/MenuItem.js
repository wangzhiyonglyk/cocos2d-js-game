/**单选MenuItem*/
var LabelItem = cc.MenuItemLabel.extend({
    _startPy: NaN,
    _topParent: null,
    _itemData: null,
    ctor: function(label, tp, itemData){
        this._itemData = itemData;
        this._topParent = tp;
        this._super(label, function(){
            if(!isNaN(this._startPy)){
                var py = this._topParent.getContainerY();
                if(Math.abs(py - this._startPy) > 1)
                    return;
            }
            this.click();
        }, this);
    },
    selected: function(){
        if(this._topParent &&
            this._topParent instanceof ScrollNode)
            this._startPy = this._topParent.getContainerY();
        else this._startPy = NaN;
    },
    getItemData: function(){
        return this._itemData;
    },
    unselected: function(){
    },
    click: function(){
        this.setColor(cc.color.BLUE);
        if(this.parent instanceof NMenu){
            this.parent.itemSelect(this);
        }
    },
    unClick: function(){
        this.setColor(cc.color.BLACK);
    }
});
var ImageItem = cc.MenuItemImage.extend({
    _startPy: NaN,
    _topParent: null,
    _labelItem: null,
    ctor: function(spName, tp, labelItem){
        this._labelItem = labelItem;
        this._super(spName, null, function(){
            if(!isNaN(this._startPy)){
                var py = this._topParent.getContainerY();
                if(Math.abs(py - this._startPy) > 1)
                    return;
            }
            this._labelItem.click();
        }, this);
        this._topParent = tp;
    },
    selected: function(){
        if(this._topParent &&
            this._topParent instanceof ScrollNode)
            this._startPy = this._topParent.getContainerY();
        else this._startPy = NaN;
    }
});
/**不吞没事件Menu*/
var NMenu = cc.Menu.extend({
    _userData: null,
    _item: null,
    ctor: function(){
        this._super();
        this._item = null;
        this._userData = null;
        this._touchListener.setSwallowTouches(false);
    },
    isSelect: function(){
        return this._userData != null || this.getChildrenCount() == 0;
    },
    reset: function(){
        this.removeAllChildren();
        this._userData = null;
        this._item = null;
        this.setEnabled(true);
    },
    itemSelect: function(item){
        if(this._item && this._item != item){
            this._item.unClick();
        }
        this._item = item;
        this._userData = item.getItemData();
    },
    getUserData: function(){
        return this._userData;
    }
});