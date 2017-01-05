//获取答题时选中项的数据
game.getItemData = function(ques, opt) {
    var obj = {};
    if(opt['award'] != undefined){
        obj['award'] = opt['award'];
        obj['isRight'] = opt['isRight'];
    }else{
        obj['award'] = ques['award'];
    }
    if(isNaN(obj['award'])) obj['award'] = 0;
    obj['tips'] = ques['tips'];
    obj['pos'] = ques['tipPos'];
    obj['img'] = ques['tipImg'];
    obj['next'] = opt['next'];
    return obj;
};
//游戏资源
var res = {
    login_plist: "res/login.plist",
    login_png: "res/login.png",
    mainBg_1: "res/mainBg_1.png",
    mainBg_2: "res/mainBg_2.png",
    mainUi: "res/mainUi.png",
    gameUi_plist: "res/gameUi.plist",
    gameUi: "res/gameUi.png",
    panel_1: "res/panel_1.png",
    panel_1_plist: "res/panel_1.plist",
    number: "res/number.png",
    panel_2_plist: "res/panel_2.plist",
    panel_2: "res/panel_2.png",
    overUi: "res/overUi.png",
    overUi_plist: "res/overUi.plist",
    adv_plist: "res/adv.plist",
    adv: "res/adv.png",
    gperson_plist: "res/person.plist",
    gperson: "res/person.png",

    //活动介绍文字图
    text: "res/text.png",

    bg: "res/aoteman/bg.png",
    chui: "res/aoteman/chui.png",
    aoNumber: "res/aoteman/number.png",
    person_png: "res/aoteman/person.png",
    person_plist: "res/aoteman/person.plist",
    aotime: "res/aoteman/time.png",
    dong: "res/aoteman/dong.png",
    ge: "res/aoteman/ge.png"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}