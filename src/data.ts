import avatarImg from './assets/cat_avatar.jpg';

export interface CategoryItem {
  number: string;
  titleCn: string;
  titleEn: string;
  url: string;
  key: string;
}

export interface ScenarioItem {
  number: string;
  styleName: string;
  tagEn: string;
  quote: string;
}

export interface NoticeSection {
  title: string;
  items: string[];
}

export interface BoardReview {
  id: string;
  clientName: string;
  date: string;
  tag: string;
  content: string;
  reply: string;
  likes: number;
}

export interface ScriptItem {
  id: string;
  category: string;
  title: string;
  quote: string;
  tone: string;
}

export interface ProfileData {
  siteTitle: string;
  siteSubtitle: string;
  welcomeGreeting: string;
  welcomeIntro: string;
  avatarUrl: string;
  bannerUrl: string;
  infoImageUrl: string;
  nickname: string;
  handle: string;
  badgeTitle: string;
  contactUid: string;
  contactWeChatOrQQ: string;
  contactNote: string;
  styleTags: string[];
  welcomeFooterQuote: string;
  ipLocation: string;
  ipSub: string;
  skyStats: {
    server: string;
    wings: string;
    height: string;
    usualOutfits: string;
    outfitsNote?: string;
    onlineTime: string;
    favoriteMaps: string[];
  };
  pricingNotice: string[];
  pricingRateText: string;
  experienceNotice: string[];
  styleDetail: {
    primary: string[];
    secondary: string[];
  };
  styleOverview: {
    primary: string;
    secondary: string;
    specialNote: string;
    warningNote: string;
    devNote: string;
    highlight: string;
  };
  availableHours: string[];
  compatibilityNotice: string;
  orderTerms: {
    availableTime: string;
    guarantee: string;
    pricingTitle: string;
    rates: string[];
  };
  step2Quote: string[];
  scenarios: ScenarioItem[];
  categories: CategoryItem[];
  step4Quote: string[];
  notices: NoticeSection[];
  boardReviews: BoardReview[];
  companionReviews: BoardReview[];
  scripts: ScriptItem[];
}

export const profileData: ProfileData = {
  siteTitle: 'Eva',
  siteSubtitle: 'Eva',
  welcomeGreeting: '恶魔要纠缠你 而我正是',
  welcomeIntro: '20 LeH 土象金牛 ENTJ/ENFP 中御/青御',
  avatarUrl: avatarImg,
  bannerUrl: avatarImg,
  infoImageUrl: avatarImg,
  nickname: 'Eva',
  handle: '@eva',
  badgeTitle: 'VERIFIED',
  contactUid: '8829-4102-991',
  contactWeChatOrQQ: 'sky_hen_07',
  contactNote: '请备注预约',
  styleTags: ['失色律'],
  welcomeFooterQuote: '要和你相称 骨骼脉搏心神',
  ipLocation: '失色律',
  ipSub: '谢谢你来见我',
  skyStats: {
    server: 'ios',
    wings: '您抬爱。',
    height: '您抬爱。',
    usualOutfits: '二级白斗/蝙蝠斗 公主/正太',
    outfitsNote: '指定其他装扮如果衣柜里有则不额外收取费用',
    onlineTime: '固定可取时段20:00-23:00',
    favoriteMaps: ['暮土荒原', '千鸟城星空', '暴风眼落石区', '雨林深处'],
  },
  pricingNotice: [
    '41r/h 23r/0.5h 凌晨非我原因默认+5r 旁观10r/人 如若我没有你指定的装扮则+8r 高擦+10r',
  ],
  pricingRateText:
    '41r/h 23r/0.5h 凌晨非我原因默认+5r 旁观10r/人 如若我没有你指定的装扮则+8r 高擦+10r',
  experienceNotice: ['圈龄两年，恋感可选', 'le拒男板'],
  styleDetail: {
    primary: [
      '中高恋 高攻低防 引导诱哄 掠夺索取',
      '轻剖析 强控制 高占有 微暴力 软色情',
      'SM 恶趣味',
    ],
    secondary: ['轻浮系 重力系 恨海情天 低无逻温'],
  },
  styleOverview: {
    primary: '中高恋 高攻低防 引导诱哄 掠夺索取',
    secondary: '轻浮系 重力系 恨海情天 低无逻温',
    specialNote: '',
    warningNote: '',
    devNote: '',
    highlight: '',
  },
  availableHours: [
    '固定可取时段20:00-23:00',
    '节假日偶尔可至次日凌晨',
    '其他时间随机出现 烦请提前约取',
  ],
  compatibilityNotice:
    '稳定四无 大部分情况下脾气非常好且很好说话 可放心与我相处',
  orderTerms: {
    availableTime: '可取单时间：工作日20:00-1:00 周末睡醒全.',
    guarantee: '*稳定无暖味无心选无特殊关系 入圈无瓜 无纠纷',
    pricingTitle: '* 自带价：（黑羊跟团）',
    rates: [
      '虚病50r/h 28r/半 指定费、凌晨价、头牌费按团',
      '单口 96r/h 半单口 66r/h（出现态度让我不适的话少回应，按照单口补费）',
      '特殊要求需额外加价 比如高擦+10 当然我比较随心，除了固定价格和凌晨价之外，别的额外加价我看心情和看人可免or减',
      '*1h单分两次取需补加价',
    ],
  },
  step2Quote: ['我想让妳自愿的，把自己交给我'],
  scenarios: [
    {
      number: '01',
      styleName: '疯狗僭越',
      tagEn: 'OVERSTEP & DOMINANCE',
      quote: '这种程度就让您觉得被冒犯了吗，主人？',
    },
    {
      number: '02',
      styleName: '媚骨勾引',
      tagEn: 'SEDUCTION & TEASE',
      quote:
        '眼泪不小心打湿了衣服，想要挡住却弄巧成拙，不小心将衣领又扯开了些…',
    },
    {
      number: '03',
      styleName: '暧昧缱绻',
      tagEn: 'INTIMACY & AMBIGUITY',
      quote: '吃独食可不是什么好习惯，劳烦您张张口啊？',
    },
    {
      number: '04',
      styleName: '轻浮牛郎',
      tagEn: 'FLIRTATION & ROMANEE',
      quote: '您还是别打趣我了。真的很喜欢我吗？那就为我开一瓶罗曼尼康帝吧',
    },
    {
      number: '05',
      styleName: '阴湿艳鬼',
      tagEn: 'OBSESSION & ENTWINED',
      quote: '从背后环住你的感觉真好啊，你该被我的痴缠扰一辈子的',
    },
  ],
  categories: [
    {
      number: '01',
      titleCn: '完整须知',
      titleEn: 'NOTICE & GUIDELINES',
      url: 'https://www.kdocs.cn/l/cvMwYSC7vI1r',
      key: 'rules',
    },
    {
      number: '02',
      titleCn: '话术记录',
      titleEn: 'SCRIPTS & RECORDS',
      url: 'https://www.kdocs.cn/l/cl8mwzDPXmWf?f=301',
      key: 'letters',
    },
    {
      number: '03',
      titleCn: '板评存档',
      titleEn: 'BOARD ARCHIVES',
      url: 'https://www.kdocs.cn/l/ccJPX6Dm1W1k?f=301',
      key: 'board',
    },
    {
      number: '04',
      titleCn: '过往回忆',
      titleEn: 'PAST MEMORIES',
      url: 'https://www.kdocs.cn/l/cbONkCpVqZzO?f=301',
      key: 'memories',
    },
  ],
  step4Quote: [
    '我们看不清彼此的面目，不知道对方的来历',
    '我们会暂时忘却了羞耻顾忌，将我们那颗赤裸裸的心挖出来',
    '捧在手上互相观看片刻',
  ],
  notices: [
    {
      title: '预约与相处守则',
      items: [
        '请提前至少半天告知预约时段，方便留出完整时间专注于你。',
        '临时若有变动，提前1小时告知可友好改期，相互尊重时间成本。',
        '单次可先体验，满意后再商议是否续约或长期包周/包月。',
      ],
    },
    {
      title: '界限与隐私规范',
      items: [
        '恪守职业操守，不探听、不索要三次元现实个人隐私（真名、住址、工作等）。',
        '仅限于游戏内虚拟陪伴与文字/语音三恋氛围，杜绝低俗违法与金钱借贷。',
        '风格可根据偏好微调节奏，任何不适随时暂停叫停。',
      ],
    },
    {
      title: '跑图与设备建议',
      items: [
        '如需带跑，建议提前点亮牵手/背背，挂机时请确保设备电量充足。',
        '支持官服全端互通，若遇串线第一时间在后台同步位置。',
      ],
    },
  ],
  boardReviews: [
    {
      id: 'br-1',
      clientName: 'Anonymous_01',
      date: '2026-03-28',
      tag: '张力拉满',
      content:
        '被狠狠拿捏住了……说话语气又痞又慢，但跑图又特别稳。逻辑分析直接戳中我心底最纠结的事，那种亦正亦邪的反差感绝了，体验感满分。',
      reply: '痕回复：算你识货，下次别再自己一个人瞎琢磨了。',
      likes: 54,
    },
    {
      id: 'br-2',
      clientName: 'Ghost_Valley',
      date: '2026-03-24',
      tag: '车技与拉扯',
      content:
        '暮土直飞帅到没朋友，而且对话完全不落俗套。不油腻，没有公式化的甜言蜜语，每句话都在挑拨神经，后劲极大。',
      reply: '痕回复：跟紧我，掉队了可不捞你。',
      likes: 38,
    },
    {
      id: 'br-3',
      clientName: 'K_Nocturne',
      date: '2026-03-15',
      tag: '长期复购',
      content:
        '续了整整两周。ENTP的思维真的太性感了，清醒沉着，又带着一股谁也驯服不了的疯劲。很奇妙的安全感。',
      reply: '痕回复：承蒙厚爱，迷局已开，概不退票。',
      likes: 82,
    },
  ],
  companionReviews: [
    {
      id: 'cr-1',
      clientName: '星海信徒 (长期包月)',
      date: '2026-03-30',
      tag: '深度结契',
      content:
        '和痕结契一个月。他不是那种只会说多喝热水的人，他的每一句话都像经过精密手术刀剖析过一样，精准刺穿你所有的不安。那种‘只对你露出犬牙和柔软腹部’的反差，杀伤力无人能挡。',
      reply: '痕：有些领地一旦圈进来了，就别妄想再走出去。',
      likes: 96,
    },
    {
      id: 'cr-2',
      clientName: 'Black_Cat',
      date: '2026-03-21',
      tag: '高级分寸',
      content:
        '最难得的是他的尺度感。哪怕话语再具有侵略性，但只要你表现出一丝不适，他会瞬间敛起所有锋芒，只剩克制的保护。高级的性冷淡与热烈并存。',
      reply: '痕：分寸是给你的特权。',
      likes: 67,
    },
    {
      id: 'cr-3',
      clientName: 'Echo_Valley',
      date: '2026-03-11',
      tag: '极具吸引力',
      content:
        '19岁金牛ENTP的含金量还在上升……思维敏捷、嘴毒心软、执行力强到离谱。在他面前你可以卸下所有伪装，完全不需要讨好任何人。',
      reply: '痕：做你自己就好，其他交给我收拾。',
      likes: 89,
    },
  ],
  scripts: [
    {
      id: 'sc-1',
      category: '日常问候',
      title: '晨昏苏醒',
      quote: '醒了就吱声。别装看不见，我可没那么多耐心等别人，但你除外。',
      tone: '低缓微哑 · 漫不经心',
    },
    {
      id: 'sc-2',
      category: '跑图护航',
      title: '僭越掌控',
      quote:
        '手放上来抓紧了。红光扫过来也别怕，天塌下来有我顶着，你只要看着我。',
      tone: '霸道笃定 · 掌控全场',
    },
    {
      id: 'sc-3',
      category: '治愈安慰',
      title: '逻辑解构',
      quote:
        '哭完了吗？哭完听我说：这件事蠢在别人，不在你。收起你那没必要的自责，有我在，谁也别想挑你的刺。',
      tone: '冷冽笃定 · 偏袒护短',
    },
    {
      id: 'sc-4',
      category: '树屋夜聊',
      title: '诱哄入局',
      quote:
        '这么晚还不睡，是在等我给你讲故事，还是故意想多听听我的声音？过来，闭上眼。',
      tone: '轻慢缱绻 · 蛊惑入骨',
    },
  ],
};

export const guidelinesList: string[] = [
  '有雷点必须提前告知，如若未提前告知则踩到暗雷的情况下概不负责',
  '如下指定单我会尽可能的让你不虚此行，但单内单后不满意仅接受退款不接受差评客诉，感谢理解',
  '请不要将单外的负面情绪带入单内，如果非要我做受气包的话烦请单价*10',
  '如果你在单内出现任何恶搞行为即默认我下线你送单，后续将不提供售后并永拒',
  '不会讲话没关系，请在我引导的情况下努力尝试回复，婉拒单口半单口',
  '打字速度适中，微文白话互助，如需很快的打字速度、极致的白话或文艺，请寻找其他的老师',
  '既不是绝对上位也不做绝对下位，彼此怎么舒服怎么来\n除自带硬性要求外，下单默认接受恋感、位次和风格走向由你带给我的感受来决定',
  '于我而言，恋为主，逻辑为辅\n婉拒任何以辩论争执为目的或抱有攻击、审视意味的人',
  '回合制交流，不打断彼此讲话是一种相互的尊重，打断三次默认送单',
  'SM恶趣味等风格的施展程度因人而异，无论接受与否，我都会在单前额外为你准备一份表格，请如实填写',
  '如果你自身代入感很低，那么我给出的方案是单内走低无恋聊聊天谈谈心，也许我们会在某个方面很投缘',
];

export const highlightGuidelines: string[] = [
  '无要求默认会微涉三/微擦',
  '1h前十分不喜可退全款 拒卡点',
];
