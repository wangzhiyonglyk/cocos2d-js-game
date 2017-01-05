var game = {};
/**初始年龄*/
game.INIT_AGE = 22;
/**退休年龄*/
game.MAX_AGE = {'1': 60, '2': 55};
/**每次扔骰子年龄增量*/
game.AGE_DELT = 3;
/**地图点坐标
 * @type {Array}
 */
game.POS = {
    '1': [
        cc.p(701, 193), cc.p(655, 214),
        cc.p(612, 233), cc.p(652, 255),
        cc.p(697, 277), cc.p(740, 300),
        cc.p(698, 320), cc.p(655, 340),
        cc.p(613, 361), cc.p(567, 383),
        cc.p(525, 403), cc.p(482, 381),
        cc.p(440, 360), cc.p(397, 340),
        cc.p(354, 361), cc.p(313, 383),
        cc.p(268, 402), cc.p(223, 382),
        cc.p(180, 360), cc.p(139, 338),
        cc.p(96, 318), cc.p(55, 298),
        cc.p(97, 278), cc.p(138, 256),
        cc.p(181, 234), cc.p(140, 212),
        cc.p(97, 192), cc.p(55, 171),
        cc.p(96, 150), cc.p(137, 129),
        cc.p(179, 107), cc.p(222, 85),
        cc.p(264, 64), cc.p(307, 86),
        cc.p(350, 107), cc.p(395, 129),
        cc.p(438, 108), cc.p(479, 87),
        cc.p(520, 67), cc.p(562, 87),
        cc.p(604, 108), cc.p(649, 129),
        cc.p(694, 151), cc.p(740, 172)
    ],
    '2': [
        cc.p(52, 211), cc.p(95, 190),
        cc.p(140, 168), cc.p(180, 147),
        cc.p(222, 126), cc.p(264, 105),
        cc.p(307, 84), cc.p(349, 62),
        cc.p(391, 41), cc.p(436, 62),
        cc.p(477, 84), cc.p(521, 105),
        cc.p(563, 126), cc.p(606, 148),
        cc.p(650, 169), cc.p(695, 190),
        cc.p(736, 211), cc.p(696, 232),
        cc.p(651, 253), cc.p(608, 275),
        cc.p(566, 294), cc.p(524, 316),
        cc.p(482, 337), cc.p(436, 358),
        cc.p(393, 379), cc.p(352, 358),
        cc.p(308, 336), cc.p(263, 315),
        cc.p(222, 295), cc.p(180, 275),
        cc.p(140, 254), cc.p(96, 232)
    ]
};
//题库 pos：0左，1中，2右，3左上，4右下，type2：无选项，3有选项, img:场景图，tipImg:知识点图片
game.QUES = {
    'START':{
        'type': 2,
        'desc': "　从大学光荣毕业，走向社会，开始我崭新的人生之旅。",
        'img': "zs_p.png",
        'pos': 1,
        'award': 0
    },
    'ST1':{
        'type': 3,
        'prefix': 'qj',
        'img': "bd_p.png",
        'pos': 0,
        'desc': "　满怀憧憬地到公司报到，入职后要不要参加社保？",
        'opts': [
            {'desc': "必须参加", 'award': 50, 'isRight': 1},
            {'desc': "不参加", 'award': 0, 'isRight': 0}
        ],
        'tips': "知识点：根据《社会保险法》规定，用人单位和个人均应参加社会保险。养老保险、医疗保险和失业保险由用人单位和个人共同缴费，工伤保险和生育保险由企业缴费，个人不缴费。",
        'tipImg': "shbx_t.png"
    },
    'ST2':{
        'type': 3,
        'prefix': 'qj',
        'img': "lb_p.png",
        'pos': 2,
        'desc': "　老板说为了省点银子，就别缴社保费了，每月多发200块吧。怎么办？",
        'opts': [
            {'desc': "未雨绸缪，我要足额参保", 'award': 50, 'isRight': 1},
            {'desc': "先拿到手的好处，从了吧", 'award': 0, 'isRight': 0, 'next': 'SC4'}
        ],
        'tips': "知识点：根据《中华人民共和国社会保险法》规定，用人单位和个人均应参加社会保险，按时足额缴交社保费。亲，可不要为了眼前的蝇头小利损害了自己的社保权益啊。",
        'tipImg': "shbx_t.png"
    },
    'ST3':{
        'type': 3,
        'prefix': 'qj',
        'img': "jf_p.png",
        'pos': 0,
        'desc': "　工作了一段时间，发现公司居然没按实际收入给我缴社保费。怎么办？",
        'opts': [
            {'desc': "维护权益，要求老板补缴", 'award': 50, 'isRight': 1},
            {'desc': "还要在这里干活呢，算了吧", 'award': 0, 'isRight': 0}
        ],
        'tips': "知识点：根据《社会保险法》规定，用人单位和个人均应按时足额缴纳社会保险费。个人与所在用人单位发生社会保险争议的，可以依法申请调解、仲裁，提起诉讼。用人单位侵害个人社会保险权益的，个人也可以要求社会保险行政部门或者社会保险费征收机构依法处理。",
        'tipImg': "shbx_t.png"
    },
    'SC1':{
        'type': 3,
        'prefix': 'qj',
        'desc': "　考考你，你知道个人要按本人工资的什么比例缴社保费么？",
        'img': 'jf_p.png',
        'pos': 0,
        'opts': [
            {'desc': "8%", 'award': 50, 'isRight': 1},
            {'desc': "12%", 'award': 0, 'isRight': 0}
        ],
        'tips': "知识点：根据《社会保险法》规定，职工应当按照国家规定的本人工资的比例缴纳基本养老保险费，记入个人账户。从2006年7月1日起，广东省统一将企业职工基本养老保险个人账户规模从本人缴费工资的11%调整为8%。",
        'tipImg': "shbx_t.png"
    },
    'SC2':{
        'type': 3,
        'prefix': 'qj',
        'desc': "　交社保这么久，我真想知道自己缴了多少钱，该上哪儿查询呢？",
        'img': 'cx_p.png',
        'pos': 0,
        'opts': [
            {'desc': "社保经办机构", 'award': 50, 'isRight': 1},
            {'desc': "派出所", 'award': 0, 'isRight': 0}
        ],
        'tips': "知识点：根据《社会保险法》规定，用人单位和个人可以免费向社会保险经办机构查询、核对其缴费和享受社会保险待遇记录，要求社会保险经办机构提供社会保险咨询等相关服务。",
        'tipImg': "shbx_t.png"
    },
    'SC3':{
        'type': 3,
        'prefix': 'qj',
        'desc': "　作为参保人，真心想知道应该由哪个部门公布社保基金情况？",
        'img': 'gb_p.png',
        'pos': 3,
        'opts': [
            {'desc': "社保经办机构", 'award': 50, 'isRight': 1},
            {'desc': "地税部门", 'award': 0, 'isRight': 0}
        ],
        'tips': "知识点：根据《社会保险法》规定，社会保险经办机构应当定期向社会公布参加社会保险情况以及社会保险基金的收入、支出、结余和收益情况。",
        'tipImg': "shbx_t.png"
    },
    'SC4':{
        'type': 2,
        'desc': "　不依法参保缴费，被劳动监察部门处罚，公司和个人都被要求补齐社保欠费，单位被罚款。",
        'img': 'jc_p.png',
        'pos': 0,
        'tips': "知识点：根据《中华人民共和国社会保险法》规定，“用人单位未按时足额缴纳社会保险费的，由社会保险费征收机构责令限期缴纳或者补足，并自欠缴之日起，按日加收万分之五的滞纳金；逾期仍不缴纳的，由有关行政部门处欠缴数额一倍以上三倍以下的罚款。",
        'award': -50,
        'tipImg': "shbx_t.png"
    },
    'BT1':{
        'type': 3,
        'prefix': 'sy',
        'desc': "　（老婆）要实行计划生育手术，可以报销医疗费用么？",
        'img': 'ss_p.png',
        'pos': 0,
        'opts': [
            {'desc': "能", 'award': 50, 'isRight': 1},
            {'desc': "不能", 'award': 0, 'isRight': 0}
        ],
        'tips': "知识点：根据《广东省职工生育保险规定》，职工实行计划生育手术，包括职工放置或者取出宫内节育器，施行输卵管结扎或者复通手术、人工流产、引产术等发生的医疗费用，可以按规定报销医疗费用。",
        'tipImg': "sybx_t.png"
    },
    'BT2':{
        'type': 3,
        'prefix': 'sy',
        'desc': "　成家立业了,虽然单位五险齐全,可老婆没工作,生孩子可以报销么?",
        'img': 'ye_p.png',
        'pos': 2,
        'opts': [
            {'desc': "可以", 'award': 50, 'isRight': 1},
            {'desc': "不可以", 'award': 0, 'isRight': 0}
        ],
        'tips': "知识点:根据《中华人民共和国社会保险法》规定，用人单位已经缴纳生育保险费的，其职工享受生育保险待遇，职工未就业配偶按照国家规定享受生育医疗费用待遇。所需资金从生育保险基金中支付。",
        'tipImg': "sybx_t.png"
    },
    'BT3':{
        'type': 3,
        'prefix': 'sy',
        'desc': "　成家立业了，生了个大胖儿子，可以享受哪些生育待遇？",
        'img': 'ye_p.png',
        'pos': 2,
        'opts': [
            {'desc': "生育医疗费和生育津贴", 'award': 50, 'isRight': 1},
            {'desc': "生育医疗费", 'award': 0, 'isRight': 0}
        ],
        'tips': "知识点：根据《广东省职工生育保险规定》，生育保险待遇包括生育医疗费用和生育津贴。生育医疗费用包括生育的医疗费用、计划生育的医疗费用。",
        'tipImg': "sybx_t.png"
    },
    'BC1':{
        'type': 3,
        'prefix': 'sy',
        'desc': "　亲，你知道低保对象、农村“五保户”参加城乡居民基本医疗保险该如何缴费么？",
        'img': 'cj_p.png',
        'pos': 2,
        'opts': [
            {'desc': "完全由个人或家庭缴费", 'award': 0, 'isRight': 0},
            {'desc': "和普通居民缴费一样，个人缴费，政府补贴", 'award': 0, 'isRight': 0},
            {'desc': "不需要缴费", 'award': 50, 'isRight': 1}
        ],
        'tips': "政府全额资助低保对象、丧失劳动能力的残疾人，低收入家庭中60周岁以上的老年人和未成年人、农村“五保户”以及低收入重病患者参加城乡居民医保。",
        'tipImg': "cj_p.png"
    },
    'BC2':{
        'type': 3,
        'prefix': 'sy',
        'desc': "　考考你，城镇未就业居民和农民是否参加同样的医疗保险？",
        'img': 'nm_p.png',
        'pos': 2,
        'opts': [
            {'desc': "是", 'award': 50, 'isRight': 1},
            {'desc': "不是", 'award': 0, 'isRight': 0}
        ],
        'tips': "小知识：目前我省居民基本医疗保险已实现城乡一体化，城镇未就业居民和农民均参加统一的城乡居民基本医疗保险，享受同等的财政补助和待遇。",
        'tipImg': "nm_p.png"
    },
    'BC3':{
        'type': 3,
        'prefix': 'sy',
        'desc': "　考考你，男职工要参加生育保险吗？",
        'img': 'nx_p.png',
        'pos': 0,
        'opts': [
            {'desc': "要", 'award': 50, 'isRight': 1},
            {'desc': "不要", 'award': 0, 'isRight': 0}
        ],
        'tips': "知识点：根据《广东省职工生育保险规定》，无论男女或者生育与否，职工均应当参加生育保险。男职工未就业配偶按照国家规定享受生育医疗费用待遇。",
        'tipImg': "nx_p.png"
    },
    'LT1':{
        'type': 3,
        'prefix': 'sb',
        'desc': "　唉，被老板炒了鱿鱼，我该怎么办呢？",
        'img': 'cy_p.png',
        'pos': 0,
        'opts': [
            {'desc': "去办失业登记，申领失业保险金", 'award': 50, 'isRight': 1},
            {'desc': "自认倒霉吧", 'award': 0, 'isRight': 0}
        ],
        'tips': "知识点：根据《中华人民共和国社会保险法》规定，失业人员符合下列条件的，可申领失业保险金：（一）失业前用人单位和本人已经缴纳失业保险费满一年的；（二）非因本人意愿中断就业的；（三）已经进行失业登记，并有求职要求的。",
        'tipImg': "sbbx_t.png"
    },
    'LT2':{
        'type': 3,
        'prefix': 'sb',
        'desc': "　辛苦工作5年，被老板炒了鱿鱼，最长可以领多久的失业保险金？",
        'img': 'cy_p.png',
        'pos': 0,
        'opts': [
            {'desc': "1个月", 'award': 0, 'isRight': 0},
            {'desc': "6个月", 'award': 50, 'isRight': 1},
            {'desc': "24个月", 'award': 0, 'isRight': 0}
        ],
        'tips': "知识点:根据《广东省失业保险条例》规定，失业人员缴费时间一至四年的，每满一年，失业保险金领取期限为一个月；四年以上的，超过四年的部分，每满半年，失业保险金领取期限增加一个月。失业保险金领取期限最长为24个月。",
        'tipImg': "sbbx_t.png"
    },
    'LT3':{
        'type': 3,
        'prefix': 'sb',
        'desc': "　被老板炒鱿鱼了,该去哪儿领失业保险金呢？",
        'img': 'cy_p.png',
        'pos': 0,
        'opts': [
            {'desc': "去社保经办机构", 'award': 50, 'isRight': 1},
            {'desc': "民政局", 'award': 0, 'isRight': 0}
        ],
        'tips': "知识点:根据《广东省失业保险条例》规定，失业保险金由社会保险经办机构按照失业保险关系所在地级以上市最低工资标准的80%按月计发, 标准不得低于当地城市居民最低生活保障标准。",
        'tipImg': "sbbx_t.png"
    },
    'LC1':{
        'type': 3,
        'prefix': 'sb',
        'desc': "　哎，生活真心不容易，正失业的我要生宝宝了，失业保险金能加发点么？",
        'img': 'ye_p.png',
        'pos': 2,
        'opts': [
            {'desc': "能", 'award': 50, 'isRight': 1},
            {'desc': "不能", 'award': 0, 'isRight': 0}
        ],
        'tips': "知识点：根据《广东省失业保险条例》规定，女性失业人员在领取失业保险金期间生育的，可以向失业保险关系所在地社会保险经办机构申请一次性加发失业保险金，标准为生育当月本人失业保险金的三倍。",
        'tipImg': "ye_p.png"
    },
    'LC2':{
        'type': 2,
        'desc': "　涨姿势喽！失业保险待遇包括失业保险金、求职补贴等。失业保险金按照失业保险关系所在地最低工资标准的80%按月计发, 求职补贴标准为本人失业前十二个月平均缴费工资的15%。",
        'img': 'jb_p.png',
        'pos': 0,
        'award': 50,
        'tipImg': "jb_p.png"
    },
    'LC3':{
        'type': 3,
        'prefix': 'sb',
        'desc': "　失业了，在家人的支持下，考了国家职业资格证，有补贴么？",
        'img': 'sb_p.png',
        'pos': 4,
        'opts': [
            {'desc': "好样的，有补贴", 'award': 50, 'isRight': 1},
            {'desc': "木有哦", 'award': 0, 'isRight': 0}
        ],
        'tips': "知识点:根据《广东省失业保险条例》规定，失业人员领取失业保险金期间在本省参加职业技能鉴定的，在取得相应国家职业资格证书后可以领取职业技能鉴定补贴。",
        'tipImg': "sb_p.png"
    },
    'GT1':{
        'type': 3,
        'prefix': 'gs',
        'img': 'sy_p.png',
        'pos': 0,
        'desc': "  参加工伤保险很重要,我自己要缴费么?",
        'opts': [
            {'desc': "当然要啊", 'award': 0, 'isRight': 0},
            {'desc': "由单位缴费,个人不缴费", 'award': 50, 'isRight': 1}
        ],
        'tips': " 知识点:根据《中华人民共和国社会保险法》规定，职工应当参加工伤保险，由用人单位缴纳工伤保险费，职工不缴纳工伤保险费。",
        'tipImg': "gxbx_t.png"
    },
    'GT2':{
        'type': 3,
        'prefix': 'gs',
        'img': 'sy_p.png',
        'pos': 0,
        'desc': "  工作时太粗心了,不慎误操作导致自己受伤，能认定为工伤么？",
        'opts': [
            {'desc': "当然能喽", 'award': 50, 'isRight': 1},
            {'desc': "不能认哦", 'award': 0, 'isRight': 0}
        ],
        'tips': "知识点：根据《广东省工伤保险条例》规定，在工作时间和工作场所内，因工作原因受到事故伤害的，应当认定为工伤。",
        'tipImg': "gxbx_t.png"
    },
    'GT3':{
        'type': 3,
        'prefix': 'gs',
        'img': 'sy_p.png',
        'pos': 0,
        'desc': "　工作时受伤，但公司忘给我申报工伤了。我自己能去申报吗？",
        'opts': [
            {'desc': "可以", 'award': 50, 'isRight': 1},
            {'desc': "不可以", 'award': 0, 'isRight': 0}
        ],
        'tips': "知识点：根据《广东省工伤保险条例》规定，工伤事故发生30日内，用人单位要向当地人社局申报工伤。用人单位未按规定提出工伤认定申请的，该职工或者其近亲属可以自伤害事故或者被诊断、鉴定职业病之日起一年内直接向社会保险行政部门提出工伤认定申请。",
        'tipImg': "gxbx_t.png"
    },
    'GC1':{
        'type': 3,
        'prefix': 'gs',
        'desc': "　停工留薪期内，工伤职工原工资福利待遇由谁支付？",
        'img': 'sy_p.png',
        'pos': 0,
        'opts': [
            {'desc': "由所在单位按月支付", 'award': 50, 'isRight': 1},
            {'desc': "由工伤保险基金支付", 'award': 0, 'isRight': 0}
        ],
        'tips': " 知识点：根据《广东省工伤保险条例》规定，职工因工伤需要暂停工作接受工伤医疗的，在停工留薪期内，原工资福利待遇不变，由所在单位按月支付。",
        'tipImg': "sy_p.png"
    },
    'GC2':{
        'type': 3,
        'prefix': 'gs',
        'desc': "　工作中长期接触有毒化学品,小王被诊断为职业病,该怎么办?",
        'img': 'sy_p.png',
        'pos': 0,
        'opts': [
            {'desc': "直接到法院起诉单位", 'award': 0, 'isRight': 0},
            {'desc': "向社会保险行政部门提出工伤认定申请", 'award': 50, 'isRight': 1}
        ],
        'tips': "知识点:根据《广东省工伤保险条例》规定，用人单位应当在职工发生事故伤害或者按照职业病防治法规定被诊断、鉴定为职业病后，向统筹地区社会保险行政部门提出工伤认定申请。",
        'tipImg': "sy_p.png"
    },
    'GC3':{
        'type': 3,
        'prefix': 'gs',
        'desc': "　小陈因工伤残四级，每月领伤残津贴，下个月就可以改领养老金了，还可以同时领伤残津贴吗?",
        'img': 'sy_p.png',
        'pos': 0,
        'opts': [
            {'desc': "能", 'award': 0, 'isRight': 0},
            {'desc': "不能", 'award': 50, 'isRight': 1}
        ],
        'tips': "知识点:根据《广东省工伤保险条例》规定，工伤职工符合领取基本养老金条件的，停发伤残津贴，享受基本养老保险待遇。基本养老保险待遇低于伤残津贴的，从工伤保险基金中补足差额。",
        'tipImg': "sy_p.png"
    },
    'YT1':{
        'type': 3,
        'prefix': 'yb',
        'img': 'lg_p.png',
        'pos': 2,
        'desc': "　近日流感横行,不幸中招了。看病的费用可以全部报销吗？",
        'opts': [
            {'desc': "可以", 'award': 0, 'isRight': 0},
            {'desc': "不可以", 'award': 50, 'isRight': 1}
        ],
        'tips': "小知识：对符合基本医保“三大目录”（药品目录、诊疗项目范围、医疗服务设施标准）以及急诊、抢救的医疗费用，基金起付标准以上、最高支付限额以下部分，医保基金按一定比例支付。",
        'tipImg': "ylbx_t.png"
    },
    'YT2':{
        'type': 3,
        'prefix': 'yb',
        'img': 'hs_p.png',
        'pos': 0,
        'desc': "　升职了，被派到外地工作。在外地生病时的医疗费能报销吗？",
        'opts': [
            {'desc': "能", 'award': 50, 'isRight': 1},
            {'desc': "不能", 'award': 0, 'isRight': 0}
        ],
        'tips': "小知识：长期异地居住（工作、学习）人员、异地转诊人员按规定办理相关手续后，异地就医医疗费用按规定报销，同时，异地急诊的医疗费用按规定报销。",
        'tipImg': "ylbx_t.png"
    },
    'YT3':{
        'type': 3,
        'prefix': 'yb',
        'img': 'hs_p.png',
        'pos': 0,
        'desc': "　同事的孩子从外地转学过来读高中，孩子可以参加广东省城乡居民基本医疗保险吗？",
        'opts': [
            {'desc': "可以", 'award': 50, 'isRight': 1},
            {'desc': "不可以", 'award': 0, 'isRight': 0}
        ],
        'tips': "小知识：我省城乡居民基本医保实施范围是职工医保制度覆盖范围以外的本省各统筹地区户籍的城乡居民，包括：未成年人（未满18周岁的居民以及18周岁以上的中学生），18周岁以上无业居民，大中专及技工学校全日制在校生，在本省中小学就读的异地务工人员子女。",
        'tipImg': "ylbx_t.png"
    },
    'YC1':{
        'type': 3,
        'prefix': 'yb',
        'desc': "　下列哪种人应当参加职工基本医疗保险？",
        'img': 'hs_p.png',
        'pos': 0,
        'opts': [
            {'desc': "企业及其职工", 'award': 50, 'isRight': 1},
            {'desc': "非从业居民", 'award': 0, 'isRight': 0}
        ],
        'tips': "小知识：所有企业、事业单位、国家机关、社会团体、民办非企业单位和城镇个体经济组织及其职工应当参加职工医保，由用人单位和职工按照规定共同缴费；无雇工的个体工商户、未在用人单位参加职工医保的非全日制从业人员以及其他灵活就业人员可以参加职工医保，由个人按规定缴费。",
        'tipImg': "hs_p.png"
    },
    'YC2':{
        'type': 3,
        'prefix': 'yb',
        'desc': "　城乡居民参加大病保险需要另行缴费吗？",
        'img': 'hs_p.png',
        'pos': 0,
        'opts': [
            {'desc': "需要", 'award': 0, 'isRight': 0},
            {'desc': "不需要", 'award': 50, 'isRight': 1}
        ],
        'tips': "小知识：城乡居民基本医疗保险参保人直接纳入大病保险覆盖范围，不需要另行缴费即可享受大病保障。",
        'tipImg': "hs_p.png"
    },
    'YC3':{
        'type': 3,
        'prefix': 'yb',
        'desc': "　参加城乡居民基本医疗保险如何缴费？",
        'img': 'jf_p.png',
        'pos': 0,
        'opts': [
            {'desc': "完全由个人缴费", 'award': 0, 'isRight': 0},
            {'desc': "完全由政府补助", 'award': 0, 'isRight': 0},
            {'desc': "个人缴费和政府补贴相结合", 'award': 50, 'isRight': 1}
        ],
        'tips': "小知识：城乡居民医保实行个人缴费和政府补贴相结合。我省财政补助逐年增加，2014年提高到每人每年不低于320元，2015年提高到每人每年不低于360元。个人缴费标准由所在统筹地区政府确定。符合参保条件的城乡居民以家庭为单位全员缴费，大中专学校以及技校协助做好在校生的参保缴费工作。",
        'tipImg': "jf_p.png"
    },
    'YC4':{
        'type': 3,
        'prefix': 'yb',
        'desc': "　生病了，要到医保定点医疗机构就医才能报销吗？",
        'img': 'jf_p.png',
        'pos': 0,
        'opts': [
            {'desc': "是", 'award': 50, 'isRight': 1},
            {'desc': "否", 'award': 0, 'isRight': 0}
        ],
        'tips': "小知识：医保实行定点医疗机构管理，除急诊、急救外，参保人员只有在定点医疗机构就医的医疗费用，医保基金才予以支付。",
        'tipImg': "jf_p.png"
    },
    'OT1':{
        'type': 3,
        'prefix': 'yl',
        'desc': "　时间过的真快，转眼参加企业职工养老保险近30年了，退休时可以申领养老金么？",
        'img': 'jb_p.png',
        'pos': 0,
        'opts': [
            {'desc': "可以", 'award': 50, 'isRight': 1},
            {'desc': "不可以", 'award': 0, 'isRight': 0}
        ],
        'tips': "知识点: 《社会保险法》第十五条规定，参加基本养老保险的个人，达到法定退休年龄时累计缴费满15年的，按月领取基本养老金。",
        'tipImg': "yabx_t.png"
    },
    'OT2':{
        'type': 3,
        'prefix': 'yl',
        'desc': "　时间过的真快，转眼达到退休年龄了，可参加企业养老保险累计缴费年限还不够15年，能延缴么？",
        'img': 'jb_p.png',
        'pos': 0,
        'opts': [
            {'desc': "可以", 'award': 50, 'isRight': 1},
            {'desc': "不可以", 'award': 0, 'isRight': 0}
        ],
        'tips': "知识点: 《社会保险法》第十五条规定，参加基本养老保险的个人，达到法定退休年龄时累计缴费不足15年的，可以缴费至满15年，按月领取基本养老金；也可以转入新型农村社会养老保险或者城镇居民社会养老保险，按照国务院规定享受相应的养老保险待遇。",
        'tipImg': "yabx_t.png"
    },
    'OT3':{
        'type': 3,
        'prefix': 'yl',
        'desc': "　该退休了，年轻时为了追随最爱的TA，去外地工作了几年，社保要转到一起么？",
        'img': 'lx_p.png',
        'pos': 0,
        'opts': [
            {'desc': "要", 'award': 50, 'isRight': 1},
            {'desc': "不要", 'award': 0, 'isRight': 0}
        ],
        'tips': "知识点: 《社会保险法》第十九条规定，个人跨统筹地区就业的，其基本养老保险关系随本人转移，缴费年限累计计算。个人达到法定退休年龄时，基本养老金分段计算、统一支付。",
        'tipImg': "yabx_t.png"
    },
    'OC1':{
        'type': 3,
        'prefix': 'yl',
        'desc': "　辛苦工作几十年，该退休享福啦。到哪儿申领养老金呢？",
        'img': 'jb_p.png',
        'pos': 0,
        'opts': [
            {'desc': "社保经办机构", 'award': 50, 'isRight': 1},
            {'desc': "原单位", 'award': 0, 'isRight': 0}
        ],
        'tips': "知识点:根据《广东省社会养老保险实施细则》规定，养老保险待遇由被保险人退休前最后缴费单位所在地的社会保险经办机构负责给付。被保险人达到法定退休年龄，由所在缴费单位（失业期间达到法定退休年龄由本人）向所在地的社会保险经办机构办理养老待遇申报手续。",
        'tipImg': "jb_p.png"
    },
    'OC2':{
        'type': 3,
        'prefix': 'yl',
        'desc': "　考考你，你知道基本养老金包括哪几部分么？",
        'img': 'jb_p.png',
        'pos': 0,
        'opts': [
            {'desc': "统筹养老金", 'award': 0, 'isRight': 0},
            {'desc': "个人账户养老金", 'award': 0, 'isRight': 0},
            {'desc': "基础养老金，个人账户养老金，具有视同缴费权益的加发过渡性养老金", 'award': 50, 'isRight': 1}
        ],
        'tips': "知识点: 《广东省人民政府关于贯彻国务院完善企业职工基本养老保险制度决定的通知》（粤府【2006】96号）规定，参保人基本养老金由基础养老金和个人账户养老金组成，在此基础上，为具有视同缴费权益的参保人计发过渡性养老金。",
        'tipImg': "jb_p.png"
    },
    'OC3':{
        'type': 2,
        'desc': "　涨姿势啦！城乡居保养老金由基础养老金和个人账户养老金组成。2016年1月起，我省基础养老金最低标准为每人每月110元（中央确定的基础养老金最低标准为每人每月70元，我省在此基础上增加了40元。",
        'img': 'jb_p.png',
        'pos': 0,
        'award': 50,
        'tipImg': "jb_p.png"
    }
};
//题目列表
game.TM_LIST = [
    [game.QUES['START']],
    [game.QUES['ST1'], game.QUES['ST2'], game.QUES['ST3'], game.QUES['ST1'], game.QUES['ST2'], game.QUES['ST3']],
    [game.QUES['SC1'], game.QUES['SC2'], game.QUES['SC3'], game.QUES['SC1'], game.QUES['SC2'], game.QUES['SC3']],
    [game.QUES['BT1'], game.QUES['BT2'], game.QUES['BT3'], game.QUES['BT1'], game.QUES['BT2'], game.QUES['BT3']],
    [game.QUES['BC1'], game.QUES['BC2'], game.QUES['BC3'], game.QUES['BC1'], game.QUES['BC2'], game.QUES['BC3']],
    [game.QUES['LT1'], game.QUES['LT2'], game.QUES['LT3'], game.QUES['LT1'], game.QUES['LT2'], game.QUES['LT3']],
    [game.QUES['LC1'], game.QUES['LC2'], game.QUES['LC3'], game.QUES['LC1'], game.QUES['LC2'], game.QUES['LC3']],
    [game.QUES['GT1'], game.QUES['GT2'], game.QUES['GT3'], game.QUES['GT1'], game.QUES['GT2'], game.QUES['GT3']],
    [game.QUES['GC1'], game.QUES['GC2'], game.QUES['GC3'], game.QUES['GC1'], game.QUES['GC2'], game.QUES['GC3']],
    [game.QUES['YT1'], game.QUES['YT2'], game.QUES['YT3'], game.QUES['YT1'], game.QUES['YT2'], game.QUES['YT3']],
    [game.QUES['YC1'], game.QUES['YC2'], game.QUES['YC3'], game.QUES['YC4'], game.QUES['YC1'], game.QUES['YC2']],
    [game.QUES['OT1'], game.QUES['OT2'], game.QUES['OT3'], game.QUES['OT1'], game.QUES['OT2'], game.QUES['OT3']],
    [game.QUES['OC1'], game.QUES['OC2'], game.QUES['OC3'], game.QUES['OC1'], game.QUES['OC2'], game.QUES['OC3']]
];