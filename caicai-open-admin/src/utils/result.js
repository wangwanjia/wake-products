
const sxArr = [
    {
        "id":1,  
        "sx":"蛇",   //生肖
        "hm":["01","13","25","37","49"],  //码数
        "bose":["red","red","blue","blue","green"],  //波色
        "mswux":["火","水","金","木","土"],    //五行
        "sxwux":"火",  //生肖五行
        "jy":"野兽",  //家野
        "yy":"阴",    //阴阳
        "mc":"美",    //美丑
        "jx":"吉",    //吉凶
        "td":"天",   //天地
        "qh":"前",   //前后
        "lr":"左",   //左右
        "duhe":"合", //独合
        "xc":"猪",   //相冲
        "sanh":"牛蛇鸡",  //三合
        "liuh":"蛇猴",   //六合
        "siji":"夏",    //四季
        "sxdh":"四大美女",  //生肖代号
        "tmdh":"宫女、才人、美女、太子、竹花",  //特码代号
        "qqsh":"琴"  //琴棋书画
    },
    {
        "id":2,
        "sx":"龙",    //生肖
        "hm":["02","14","26","38"],   //码数
        "bose":["red","blue","blue","green"], //波色
        "mswux":["火","水","金","木"],  //五行
        "sxwux":"土",  //生肖五行
        "jy":"野兽",   //家野
        "yy":"阴",   //阴阳
        "mc":"美",   //美丑
        "jx":"吉",   //吉凶
        "td":"天",   //天地
        "qh":"前",   //前后
        "lr":"左",   //左右
        "duhe":"合", //独合
        "xc":"狗",   //相冲
        "sanh":"鼠龙猴",  //三合
        "liuh":"龙鸡",   //六合
        "siji":"春",    //四季
        "sxdh":"两大君王",  //生肖代号
        "tmdh":"皇帝、状元、皇帝、上帝、梨花",   //特码代号
        "qqsh":"书"    //琴棋书画
    },
    {
        "id":3,
        "sx":"兔",    //生肖
        "hm":["03","15","27","39"],   //码数
        "bose":["blue","blue","green","green"], //波色
        "mswux":["金","木","土","火"],  //五行
        "sxwux":"木",  //生肖五行
        "jy":"野兽",   //家野
        "yy":"阳",   //阴阳
        "mc":"美",   //美丑
        "jx":"吉",   //吉凶
        "td":"天",   //天地
        "qh":"前",   //前后
        "lr":"右",   //左右
        "duhe":"独", //独合
        "xc":"鸡",   //相冲
        "sanh":"兔羊猪",  //三合
        "liuh":"兔狗",   //六合
        "siji":"春",    //四季
        "sxdh":"四大美女",  //生肖代号
        "tmdh":"玉帝、东宫、小姐、东宫、兰花",   //特码代号
        "qqsh":"琴"    //琴棋书画
    },
    {
        "id":4,
        "sx":"虎",    //生肖
        "hm":["04","16","28","40"],   //码数
        "bose":["blue","green","green","red"], //波色
        "mswux":["金","木","土","火"],  //五行
        "sxwux":"木",  //生肖五行
        "jy":"野兽",   //家野
        "yy":"阳",   //阴阳
        "mc":"丑",   //美丑
        "jx":"凶",   //吉凶
        "td":"地",   //天地
        "qh":"前",   //前后
        "lr":"右",   //左右
        "duhe":"独", //独合
        "xc":"猴",   //相冲
        "sanh":"虎马狗",  //三合
        "liuh":"虎猪",   //六合
        "siji":"春",    //四季
        "sxdh":"两大君王",  //生肖代号
        "tmdh":"大将、大王、武士、都督、桃花",   //特码代号
        "qqsh":"书"    //琴棋书画
    },
    {
        "id":5,
        "sx":"牛",    //生肖
        "hm":["05","17","29","41"],   //码数
        "bose":["green","green","red","blue"], //波色
        "mswux":["土","火","水","金"],  //五行
        "sxwux":"土",  //生肖五行
        "jy":"家禽",   //家野
        "yy":"阳",   //阴阳
        "mc":"丑",   //美丑
        "jx":"凶",   //吉凶
        "td":"天",   //天地
        "qh":"前",   //前后
        "lr":"左",   //左右
        "duhe":"独", //独合
        "xc":"羊",   //相冲
        "sanh":"牛蛇鸡",  //三合
        "liuh":"鼠牛",   //六合
        "siji":"冬",    //四季
        "sxdh":"四大家臣",  //生肖代号
        "tmdh":"无帅、大将、员外、大将、荷花",   //特码代号
        "qqsh":"棋"    //琴棋书画
    },
    {
        "id":6,
        "sx":"鼠",    //生肖
        "hm":["06","18","30","42"],   //码数
        "bose":["green","red","red","blue"], //波色
        "mswux":["土","火","水","金"],  //五行
        "sxwux":"水",  //生肖五行
        "jy":"野兽",   //家野
        "yy":"阴",   //阴阳
        "mc":"丑",   //美丑
        "jx":"凶",   //吉凶
        "td":"地",   //天地
        "qh":"前",   //前后
        "lr":"左",   //左右
        "duhe":"独", //独合
        "xc":"马",   //相冲
        "sanh":"鼠龙猴",  //三合
        "liuh":"鼠牛",   //六合
        "siji":"冬",    //四季
        "sxdh":"两大恶人",  //生肖代号
        "tmdh":"国师、叛贼、神偷、叛贼、梅花",   //特码代号
        "qqsh":"棋"    //琴棋书画
    },
    {
        "id":7,
        "sx":"猪",    //生肖
        "hm":["07","19","31","43"],   //码数
        "bose":["red","red","blue","green"], //波色
        "mswux":["木","土","火","水"],  //五行
        "sxwux":"水",  //生肖五行
        "jy":"家禽",   //家野
        "yy":"阴",   //阴阳
        "mc":"丑",   //美丑
        "jx":"凶",   //吉凶
        "td":"天",   //天地
        "qh":"后",   //前后
        "lr":"右",   //左右
        "duhe":"合", //独合
        "xc":"蛇",   //相冲
        "sanh":"兔羊猪",  //三合
        "liuh":"虎猪",   //六合
        "siji":"冬",    //四季
        "sxdh":"四大家臣",  //生肖代号
        "tmdh":"西宫、太监、商贾、太监、桂花",   //特码代号
        "qqsh":"画"    //琴棋书画
    },
    {
        "id":8,
        "sx":"狗",    //生肖
        "hm":["08","20","32","44"],   //码数
        "bose":["red","blue","green","green"], //波色
        "mswux":["木","土","火","水"],  //五行
        "sxwux":"土",  //生肖五行
        "jy":"家禽",   //家野
        "yy":"阴",   //阴阳
        "mc":"丑",   //美丑
        "jx":"凶",   //吉凶
        "td":"地",   //天地
        "qh":"后",   //前后
        "lr":"右",   //左右
        "duhe":"合", //独合
        "xc":"龙",   //相冲
        "sanh":"虎马狗",  //三合
        "liuh":"兔狗",   //六合
        "siji":"秋",    //四季
        "sxdh":"四大家臣",  //生肖代号
        "tmdh":"文官、先锋、管家、先锋、菊花",   //特码代号
        "qqsh":"棋"    //琴棋书画
    },
    {
        "id":9,
        "sx":"鸡",    //生肖
        "hm":["09","21","33","45"],   //码数
        "bose":["blue","green","green","red"], //波色
        "mswux":["火","水","金","木"],  //五行
        "sxwux":"金",  //生肖五行
        "jy":"家禽",   //家野
        "yy":"阳",   //阴阳
        "mc":"美",   //美丑
        "jx":"吉",   //吉凶
        "td":"地",   //天地
        "qh":"后",   //前后
        "lr":"左",   //左右
        "duhe":"合", //独合
        "xc":"兔",   //相冲
        "sanh":"牛蛇鸡",  //三合
        "liuh":"龙鸡",   //六合
        "siji":"秋",    //四季
        "sxdh":"四大美女",  //生肖代号
        "tmdh":"东宫、贵妃、歌女、贵妃、苓花",   //特码代号
        "qqsh":"琴"    //琴棋书画
    },
    {
        "id":10,
        "sx":"猴",    //生肖
        "hm":["10","22","34","46"],   //码数
        "bose":["blue","green","red","red"], //波色
        "mswux":["火","水","金","木"],  //五行
        "sxwux":"金",  //生肖五行
        "jy":"野兽",   //家野
        "yy":"阳",   //阴阳
        "mc":"丑",   //美丑
        "jx":"凶",   //吉凶
        "td":"天",   //天地
        "qh":"后",   //前后
        "lr":"左",   //左右
        "duhe":"合", //独合
        "xc":"虎",   //相冲
        "sanh":"鼠龙猴",  //三合
        "liuh":"蛇猴",   //六合
        "siji":"秋",    //四季
        "sxdh":"两大恶人",  //生肖代号
        "tmdh":"太监、寇王、游侠、寇王、松树",   //特码代号
        "qqsh":"画"    //琴棋书画
    },
    {
        "id":11,
        "sx":"羊",    //生肖
        "hm":["11","23","35","47"],   //码数
        "bose":["green","red","red","blue"], //波色
        "mswux":["金","木","土","火"],  //五行
        "sxwux":"土",  //生肖五行
        "jy":"家禽",   //家野
        "yy":"阳",   //阴阳
        "mc":"美",   //美丑
        "jx":"吉",   //吉凶
        "td":"地",   //天地
        "qh":"后",   //前后
        "lr":"右",   //左右
        "duhe":"独", //独合
        "xc":"牛",   //相冲
        "sanh":"兔羊猪",  //三合
        "liuh":"马羊",   //六合
        "siji":"夏",    //四季
        "sxdh":"四大美女",  //生肖代号
        "tmdh":"相将、西宫、夫人、西宫、樱花",   //特码代号
        "qqsh":"画"    //琴棋书画
    },
    {
        "id":12,
        "sx":"马",    //生肖
        "hm":["12","24","36","48"],   //码数
        "bose":["red","red","blue","blue"], //波色
        "mswux":["金","木","土","火"],  //五行
        "sxwux":"火",  //生肖五行
        "jy":"家禽",   //家野
        "yy":"阴",   //阴阳
        "mc":"美",   //美丑
        "jx":"吉",   //吉凶
        "td":"天",   //天地
        "qh":"后",   //前后
        "lr":"右",   //左右
        "duhe":"独", //独合
        "xc":"牛",   //相冲
        "sanh":"虎马狗",  //三合
        "liuh":"马羊",   //六合
        "siji":"夏",    //四季
        "sxdh":"四大家臣",  //生肖代号
        "tmdh":"太子、元帅、秀才、太子、杏花",   //特码代号
        "qqsh":"书"    //琴棋书画
    }
]

let codeArr = Array.from({ length: 49 }).map(() => ({}));
codeArr = [
  {
    id: 1,
    sx: '蛇',
    hm: '01',
    bose: 'red',
    mswux: '火',
    sxwux: '火',
    jy: '野兽',
    yy: '阴',
    mc: '美',
    jx: '吉',
    td: '天',
    qh: '前',
    lr: '左',
    duhe: '合',
    xc: '猪',
    sanh: '牛蛇鸡',
    liuh: '蛇猴',
    siji: '夏',
    sxdh: '四大美女',
    tmdh: '宫女、才人、美女、太子、竹花',
    qqsh: '琴'
  },
  {
    id: 2,
    sx: '龙',
    hm: '02',
    bose: 'red',
    mswux: '火',
    sxwux: '土',
    jy: '野兽',
    yy: '阴',
    mc: '美',
    jx: '吉',
    td: '天',
    qh: '前',
    lr: '左',
    duhe: '合',
    xc: '狗',
    sanh: '鼠龙猴',
    liuh: '龙鸡',
    siji: '春',
    sxdh: '两大君王',
    tmdh: '皇帝、状元、皇帝、上帝、梨花',
    qqsh: '书'
  },
  {
    id: 3,
    sx: '兔',
    hm: '03',
    bose: 'blue',
    mswux: '金',
    sxwux: '木',
    jy: '野兽',
    yy: '阳',
    mc: '美',
    jx: '吉',
    td: '天',
    qh: '前',
    lr: '右',
    duhe: '独',
    xc: '鸡',
    sanh: '兔羊猪',
    liuh: '兔狗',
    siji: '春',
    sxdh: '四大美女',
    tmdh: '玉帝、东宫、小姐、东宫、兰花',
    qqsh: '琴'
  },
  {
    id: 4,
    sx: '虎',
    hm: '04',
    bose: 'blue',
    mswux: '金',
    sxwux: '木',
    jy: '野兽',
    yy: '阳',
    mc: '丑',
    jx: '凶',
    td: '地',
    qh: '前',
    lr: '右',
    duhe: '独',
    xc: '猴',
    sanh: '虎马狗',
    liuh: '虎猪',
    siji: '春',
    sxdh: '两大君王',
    tmdh: '大将、大王、武士、都督、桃花',
    qqsh: '书'
  },
  {
    id: 5,
    sx: '牛',
    hm: '05',
    bose: 'green',
    mswux: '土',
    sxwux: '土',
    jy: '家禽',
    yy: '阳',
    mc: '丑',
    jx: '凶',
    td: '天',
    qh: '前',
    lr: '左',
    duhe: '独',
    xc: '羊',
    sanh: '牛蛇鸡',
    liuh: '鼠牛',
    siji: '冬',
    sxdh: '四大家臣',
    tmdh: '无帅、大将、员外、大将、荷花',
    qqsh: '棋'
  },
  {
    id: 6,
    sx: '鼠',
    hm: '06',
    bose: 'green',
    mswux: '土',
    sxwux: '水',
    jy: '野兽',
    yy: '阴',
    mc: '丑',
    jx: '凶',
    td: '地',
    qh: '前',
    lr: '左',
    duhe: '独',
    xc: '马',
    sanh: '鼠龙猴',
    liuh: '鼠牛',
    siji: '冬',
    sxdh: '两大恶人',
    tmdh: '国师、叛贼、神偷、叛贼、梅花',
    qqsh: '棋'
  },
  {
    id: 7,
    sx: '猪',
    hm: '07',
    bose: 'red',
    mswux: '木',
    sxwux: '水',
    jy: '家禽',
    yy: '阴',
    mc: '丑',
    jx: '凶',
    td: '天',
    qh: '后',
    lr: '右',
    duhe: '合',
    xc: '蛇',
    sanh: '兔羊猪',
    liuh: '虎猪',
    siji: '冬',
    sxdh: '四大家臣',
    tmdh: '西宫、太监、商贾、太监、桂花',
    qqsh: '画'
  },
  {
    id: 8,
    sx: '狗',
    hm: '08',
    bose: 'red',
    mswux: '木',
    sxwux: '土',
    jy: '家禽',
    yy: '阴',
    mc: '丑',
    jx: '凶',
    td: '地',
    qh: '后',
    lr: '右',
    duhe: '合',
    xc: '龙',
    sanh: '虎马狗',
    liuh: '兔狗',
    siji: '秋',
    sxdh: '四大家臣',
    tmdh: '文官、先锋、管家、先锋、菊花',
    qqsh: '棋'
  },
  {
    id: 9,
    sx: '鸡',
    hm: '09',
    bose: 'blue',
    mswux: '火',
    sxwux: '金',
    jy: '家禽',
    yy: '阳',
    mc: '美',
    jx: '吉',
    td: '地',
    qh: '后',
    lr: '左',
    duhe: '合',
    xc: '兔',
    sanh: '牛蛇鸡',
    liuh: '龙鸡',
    siji: '秋',
    sxdh: '四大美女',
    tmdh: '东宫、贵妃、歌女、贵妃、苓花',
    qqsh: '琴'
  },
  {
    id: 10,
    sx: '猴',
    hm: '10',
    bose: 'blue',
    mswux: '火',
    sxwux: '金',
    jy: '野兽',
    yy: '阳',
    mc: '丑',
    jx: '凶',
    td: '天',
    qh: '后',
    lr: '左',
    duhe: '合',
    xc: '虎',
    sanh: '鼠龙猴',
    liuh: '蛇猴',
    siji: '秋',
    sxdh: '两大恶人',
    tmdh: '太监、寇王、游侠、寇王、松树',
    qqsh: '画'
  },
  {
    id: 11,
    sx: '羊',
    hm: '11',
    bose: 'green',
    mswux: '金',
    sxwux: '土',
    jy: '家禽',
    yy: '阳',
    mc: '美',
    jx: '吉',
    td: '地',
    qh: '后',
    lr: '右',
    duhe: '独',
    xc: '牛',
    sanh: '兔羊猪',
    liuh: '马羊',
    siji: '夏',
    sxdh: '四大美女',
    tmdh: '相将、西宫、夫人、西宫、樱花',
    qqsh: '画'
  },
  {
    id: 12,
    sx: '马',
    hm: '12',
    bose: 'red',
    mswux: '金',
    sxwux: '火',
    jy: '家禽',
    yy: '阴',
    mc: '美',
    jx: '吉',
    td: '天',
    qh: '后',
    lr: '右',
    duhe: '独',
    xc: '牛',
    sanh: '虎马狗',
    liuh: '马羊',
    siji: '夏',
    sxdh: '四大家臣',
    tmdh: '太子、元帅、秀才、太子、杏花',
    qqsh: '书'
  },
  {
    id: 1,
    sx: '蛇',
    hm: '13',
    bose: 'red',
    mswux: '水',
    sxwux: '火',
    jy: '野兽',
    yy: '阴',
    mc: '美',
    jx: '吉',
    td: '天',
    qh: '前',
    lr: '左',
    duhe: '合',
    xc: '猪',
    sanh: '牛蛇鸡',
    liuh: '蛇猴',
    siji: '夏',
    sxdh: '四大美女',
    tmdh: '宫女、才人、美女、太子、竹花',
    qqsh: '琴'
  },
  {
    id: 2,
    sx: '龙',
    hm: '14',
    bose: 'blue',
    mswux: '水',
    sxwux: '土',
    jy: '野兽',
    yy: '阴',
    mc: '美',
    jx: '吉',
    td: '天',
    qh: '前',
    lr: '左',
    duhe: '合',
    xc: '狗',
    sanh: '鼠龙猴',
    liuh: '龙鸡',
    siji: '春',
    sxdh: '两大君王',
    tmdh: '皇帝、状元、皇帝、上帝、梨花',
    qqsh: '书'
  },
  {
    id: 3,
    sx: '兔',
    hm: '15',
    bose: 'blue',
    mswux: '木',
    sxwux: '木',
    jy: '野兽',
    yy: '阳',
    mc: '美',
    jx: '吉',
    td: '天',
    qh: '前',
    lr: '右',
    duhe: '独',
    xc: '鸡',
    sanh: '兔羊猪',
    liuh: '兔狗',
    siji: '春',
    sxdh: '四大美女',
    tmdh: '玉帝、东宫、小姐、东宫、兰花',
    qqsh: '琴'
  },
  {
    id: 4,
    sx: '虎',
    hm: '16',
    bose: 'green',
    mswux: '木',
    sxwux: '木',
    jy: '野兽',
    yy: '阳',
    mc: '丑',
    jx: '凶',
    td: '地',
    qh: '前',
    lr: '右',
    duhe: '独',
    xc: '猴',
    sanh: '虎马狗',
    liuh: '虎猪',
    siji: '春',
    sxdh: '两大君王',
    tmdh: '大将、大王、武士、都督、桃花',
    qqsh: '书'
  },
  {
    id: 5,
    sx: '牛',
    hm: '17',
    bose: 'green',
    mswux: '火',
    sxwux: '土',
    jy: '家禽',
    yy: '阳',
    mc: '丑',
    jx: '凶',
    td: '天',
    qh: '前',
    lr: '左',
    duhe: '独',
    xc: '羊',
    sanh: '牛蛇鸡',
    liuh: '鼠牛',
    siji: '冬',
    sxdh: '四大家臣',
    tmdh: '无帅、大将、员外、大将、荷花',
    qqsh: '棋'
  },
  {
    id: 6,
    sx: '鼠',
    hm: '18',
    bose: 'red',
    mswux: '火',
    sxwux: '水',
    jy: '野兽',
    yy: '阴',
    mc: '丑',
    jx: '凶',
    td: '地',
    qh: '前',
    lr: '左',
    duhe: '独',
    xc: '马',
    sanh: '鼠龙猴',
    liuh: '鼠牛',
    siji: '冬',
    sxdh: '两大恶人',
    tmdh: '国师、叛贼、神偷、叛贼、梅花',
    qqsh: '棋'
  },
  {
    id: 7,
    sx: '猪',
    hm: '19',
    bose: 'red',
    mswux: '土',
    sxwux: '水',
    jy: '家禽',
    yy: '阴',
    mc: '丑',
    jx: '凶',
    td: '天',
    qh: '后',
    lr: '右',
    duhe: '合',
    xc: '蛇',
    sanh: '兔羊猪',
    liuh: '虎猪',
    siji: '冬',
    sxdh: '四大家臣',
    tmdh: '西宫、太监、商贾、太监、桂花',
    qqsh: '画'
  },
  {
    id: 8,
    sx: '狗',
    hm: '20',
    bose: 'blue',
    mswux: '土',
    sxwux: '土',
    jy: '家禽',
    yy: '阴',
    mc: '丑',
    jx: '凶',
    td: '地',
    qh: '后',
    lr: '右',
    duhe: '合',
    xc: '龙',
    sanh: '虎马狗',
    liuh: '兔狗',
    siji: '秋',
    sxdh: '四大家臣',
    tmdh: '文官、先锋、管家、先锋、菊花',
    qqsh: '棋'
  },
  {
    id: 9,
    sx: '鸡',
    hm: '21',
    bose: 'green',
    mswux: '水',
    sxwux: '金',
    jy: '家禽',
    yy: '阳',
    mc: '美',
    jx: '吉',
    td: '地',
    qh: '后',
    lr: '左',
    duhe: '合',
    xc: '兔',
    sanh: '牛蛇鸡',
    liuh: '龙鸡',
    siji: '秋',
    sxdh: '四大美女',
    tmdh: '东宫、贵妃、歌女、贵妃、苓花',
    qqsh: '琴'
  },
  {
    id: 10,
    sx: '猴',
    hm: '22',
    bose: 'green',
    mswux: '水',
    sxwux: '金',
    jy: '野兽',
    yy: '阳',
    mc: '丑',
    jx: '凶',
    td: '天',
    qh: '后',
    lr: '左',
    duhe: '合',
    xc: '虎',
    sanh: '鼠龙猴',
    liuh: '蛇猴',
    siji: '秋',
    sxdh: '两大恶人',
    tmdh: '太监、寇王、游侠、寇王、松树',
    qqsh: '画'
  },
  {
    id: 11,
    sx: '羊',
    hm: '23',
    bose: 'red',
    mswux: '木',
    sxwux: '土',
    jy: '家禽',
    yy: '阳',
    mc: '美',
    jx: '吉',
    td: '地',
    qh: '后',
    lr: '右',
    duhe: '独',
    xc: '牛',
    sanh: '兔羊猪',
    liuh: '马羊',
    siji: '夏',
    sxdh: '四大美女',
    tmdh: '相将、西宫、夫人、西宫、樱花',
    qqsh: '画'
  },
  {
    id: 12,
    sx: '马',
    hm: '24',
    bose: 'red',
    mswux: '木',
    sxwux: '火',
    jy: '家禽',
    yy: '阴',
    mc: '美',
    jx: '吉',
    td: '天',
    qh: '后',
    lr: '右',
    duhe: '独',
    xc: '牛',
    sanh: '虎马狗',
    liuh: '马羊',
    siji: '夏',
    sxdh: '四大家臣',
    tmdh: '太子、元帅、秀才、太子、杏花',
    qqsh: '书'
  },
  {
    id: 1,
    sx: '蛇',
    hm: '25',
    bose: 'blue',
    mswux: '金',
    sxwux: '火',
    jy: '野兽',
    yy: '阴',
    mc: '美',
    jx: '吉',
    td: '天',
    qh: '前',
    lr: '左',
    duhe: '合',
    xc: '猪',
    sanh: '牛蛇鸡',
    liuh: '蛇猴',
    siji: '夏',
    sxdh: '四大美女',
    tmdh: '宫女、才人、美女、太子、竹花',
    qqsh: '琴'
  },
  {
    id: 2,
    sx: '龙',
    hm: '26',
    bose: 'blue',
    mswux: '金',
    sxwux: '土',
    jy: '野兽',
    yy: '阴',
    mc: '美',
    jx: '吉',
    td: '天',
    qh: '前',
    lr: '左',
    duhe: '合',
    xc: '狗',
    sanh: '鼠龙猴',
    liuh: '龙鸡',
    siji: '春',
    sxdh: '两大君王',
    tmdh: '皇帝、状元、皇帝、上帝、梨花',
    qqsh: '书'
  },
  {
    id: 3,
    sx: '兔',
    hm: '27',
    bose: 'green',
    mswux: '土',
    sxwux: '木',
    jy: '野兽',
    yy: '阳',
    mc: '美',
    jx: '吉',
    td: '天',
    qh: '前',
    lr: '右',
    duhe: '独',
    xc: '鸡',
    sanh: '兔羊猪',
    liuh: '兔狗',
    siji: '春',
    sxdh: '四大美女',
    tmdh: '玉帝、东宫、小姐、东宫、兰花',
    qqsh: '琴'
  },
  {
    id: 4,
    sx: '虎',
    hm: '28',
    bose: 'green',
    mswux: '土',
    sxwux: '木',
    jy: '野兽',
    yy: '阳',
    mc: '丑',
    jx: '凶',
    td: '地',
    qh: '前',
    lr: '右',
    duhe: '独',
    xc: '猴',
    sanh: '虎马狗',
    liuh: '虎猪',
    siji: '春',
    sxdh: '两大君王',
    tmdh: '大将、大王、武士、都督、桃花',
    qqsh: '书'
  },
  {
    id: 5,
    sx: '牛',
    hm: '29',
    bose: 'red',
    mswux: '水',
    sxwux: '土',
    jy: '家禽',
    yy: '阳',
    mc: '丑',
    jx: '凶',
    td: '天',
    qh: '前',
    lr: '左',
    duhe: '独',
    xc: '羊',
    sanh: '牛蛇鸡',
    liuh: '鼠牛',
    siji: '冬',
    sxdh: '四大家臣',
    tmdh: '无帅、大将、员外、大将、荷花',
    qqsh: '棋'
  },
  {
    id: 6,
    sx: '鼠',
    hm: '30',
    bose: 'red',
    mswux: '水',
    sxwux: '水',
    jy: '野兽',
    yy: '阴',
    mc: '丑',
    jx: '凶',
    td: '地',
    qh: '前',
    lr: '左',
    duhe: '独',
    xc: '马',
    sanh: '鼠龙猴',
    liuh: '鼠牛',
    siji: '冬',
    sxdh: '两大恶人',
    tmdh: '国师、叛贼、神偷、叛贼、梅花',
    qqsh: '棋'
  },
  {
    id: 7,
    sx: '猪',
    hm: '31',
    bose: 'blue',
    mswux: '火',
    sxwux: '水',
    jy: '家禽',
    yy: '阴',
    mc: '丑',
    jx: '凶',
    td: '天',
    qh: '后',
    lr: '右',
    duhe: '合',
    xc: '蛇',
    sanh: '兔羊猪',
    liuh: '虎猪',
    siji: '冬',
    sxdh: '四大家臣',
    tmdh: '西宫、太监、商贾、太监、桂花',
    qqsh: '画'
  },
  {
    id: 8,
    sx: '狗',
    hm: '32',
    bose: 'green',
    mswux: '火',
    sxwux: '土',
    jy: '家禽',
    yy: '阴',
    mc: '丑',
    jx: '凶',
    td: '地',
    qh: '后',
    lr: '右',
    duhe: '合',
    xc: '龙',
    sanh: '虎马狗',
    liuh: '兔狗',
    siji: '秋',
    sxdh: '四大家臣',
    tmdh: '文官、先锋、管家、先锋、菊花',
    qqsh: '棋'
  },
  {
    id: 9,
    sx: '鸡',
    hm: '33',
    bose: 'green',
    mswux: '金',
    sxwux: '金',
    jy: '家禽',
    yy: '阳',
    mc: '美',
    jx: '吉',
    td: '地',
    qh: '后',
    lr: '左',
    duhe: '合',
    xc: '兔',
    sanh: '牛蛇鸡',
    liuh: '龙鸡',
    siji: '秋',
    sxdh: '四大美女',
    tmdh: '东宫、贵妃、歌女、贵妃、苓花',
    qqsh: '琴'
  },
  {
    id: 10,
    sx: '猴',
    hm: '34',
    bose: 'red',
    mswux: '金',
    sxwux: '金',
    jy: '野兽',
    yy: '阳',
    mc: '丑',
    jx: '凶',
    td: '天',
    qh: '后',
    lr: '左',
    duhe: '合',
    xc: '虎',
    sanh: '鼠龙猴',
    liuh: '蛇猴',
    siji: '秋',
    sxdh: '两大恶人',
    tmdh: '太监、寇王、游侠、寇王、松树',
    qqsh: '画'
  },
  {
    id: 11,
    sx: '羊',
    hm: '35',
    bose: 'red',
    mswux: '土',
    sxwux: '土',
    jy: '家禽',
    yy: '阳',
    mc: '美',
    jx: '吉',
    td: '地',
    qh: '后',
    lr: '右',
    duhe: '独',
    xc: '牛',
    sanh: '兔羊猪',
    liuh: '马羊',
    siji: '夏',
    sxdh: '四大美女',
    tmdh: '相将、西宫、夫人、西宫、樱花',
    qqsh: '画'
  },
  {
    id: 12,
    sx: '马',
    hm: '36',
    bose: 'blue',
    mswux: '土',
    sxwux: '火',
    jy: '家禽',
    yy: '阴',
    mc: '美',
    jx: '吉',
    td: '天',
    qh: '后',
    lr: '右',
    duhe: '独',
    xc: '牛',
    sanh: '虎马狗',
    liuh: '马羊',
    siji: '夏',
    sxdh: '四大家臣',
    tmdh: '太子、元帅、秀才、太子、杏花',
    qqsh: '书'
  },
  {
    id: 1,
    sx: '蛇',
    hm: '37',
    bose: 'blue',
    mswux: '木',
    sxwux: '火',
    jy: '野兽',
    yy: '阴',
    mc: '美',
    jx: '吉',
    td: '天',
    qh: '前',
    lr: '左',
    duhe: '合',
    xc: '猪',
    sanh: '牛蛇鸡',
    liuh: '蛇猴',
    siji: '夏',
    sxdh: '四大美女',
    tmdh: '宫女、才人、美女、太子、竹花',
    qqsh: '琴'
  },
  {
    id: 2,
    sx: '龙',
    hm: '38',
    bose: 'green',
    mswux: '木',
    sxwux: '土',
    jy: '野兽',
    yy: '阴',
    mc: '美',
    jx: '吉',
    td: '天',
    qh: '前',
    lr: '左',
    duhe: '合',
    xc: '狗',
    sanh: '鼠龙猴',
    liuh: '龙鸡',
    siji: '春',
    sxdh: '两大君王',
    tmdh: '皇帝、状元、皇帝、上帝、梨花',
    qqsh: '书'
  },
  {
    id: 3,
    sx: '兔',
    hm: '39',
    bose: 'green',
    mswux: '火',
    sxwux: '木',
    jy: '野兽',
    yy: '阳',
    mc: '美',
    jx: '吉',
    td: '天',
    qh: '前',
    lr: '右',
    duhe: '独',
    xc: '鸡',
    sanh: '兔羊猪',
    liuh: '兔狗',
    siji: '春',
    sxdh: '四大美女',
    tmdh: '玉帝、东宫、小姐、东宫、兰花',
    qqsh: '琴'
  },
  {
    id: 4,
    sx: '虎',
    hm: '40',
    bose: 'red',
    mswux: '火',
    sxwux: '木',
    jy: '野兽',
    yy: '阳',
    mc: '丑',
    jx: '凶',
    td: '地',
    qh: '前',
    lr: '右',
    duhe: '独',
    xc: '猴',
    sanh: '虎马狗',
    liuh: '虎猪',
    siji: '春',
    sxdh: '两大君王',
    tmdh: '大将、大王、武士、都督、桃花',
    qqsh: '书'
  },
  {
    id: 5,
    sx: '牛',
    hm: '41',
    bose: 'blue',
    mswux: '金',
    sxwux: '土',
    jy: '家禽',
    yy: '阳',
    mc: '丑',
    jx: '凶',
    td: '天',
    qh: '前',
    lr: '左',
    duhe: '独',
    xc: '羊',
    sanh: '牛蛇鸡',
    liuh: '鼠牛',
    siji: '冬',
    sxdh: '四大家臣',
    tmdh: '无帅、大将、员外、大将、荷花',
    qqsh: '棋'
  },
  {
    id: 6,
    sx: '鼠',
    hm: '42',
    bose: 'blue',
    mswux: '金',
    sxwux: '水',
    jy: '野兽',
    yy: '阴',
    mc: '丑',
    jx: '凶',
    td: '地',
    qh: '前',
    lr: '左',
    duhe: '独',
    xc: '马',
    sanh: '鼠龙猴',
    liuh: '鼠牛',
    siji: '冬',
    sxdh: '两大恶人',
    tmdh: '国师、叛贼、神偷、叛贼、梅花',
    qqsh: '棋'
  },
  {
    id: 7,
    sx: '猪',
    hm: '43',
    bose: 'green',
    mswux: '水',
    sxwux: '水',
    jy: '家禽',
    yy: '阴',
    mc: '丑',
    jx: '凶',
    td: '天',
    qh: '后',
    lr: '右',
    duhe: '合',
    xc: '蛇',
    sanh: '兔羊猪',
    liuh: '虎猪',
    siji: '冬',
    sxdh: '四大家臣',
    tmdh: '西宫、太监、商贾、太监、桂花',
    qqsh: '画'
  },
  {
    id: 8,
    sx: '狗',
    hm: '44',
    bose: 'green',
    mswux: '水',
    sxwux: '土',
    jy: '家禽',
    yy: '阴',
    mc: '丑',
    jx: '凶',
    td: '地',
    qh: '后',
    lr: '右',
    duhe: '合',
    xc: '龙',
    sanh: '虎马狗',
    liuh: '兔狗',
    siji: '秋',
    sxdh: '四大家臣',
    tmdh: '文官、先锋、管家、先锋、菊花',
    qqsh: '棋'
  },
  {
    id: 9,
    sx: '鸡',
    hm: '45',
    bose: 'red',
    mswux: '木',
    sxwux: '金',
    jy: '家禽',
    yy: '阳',
    mc: '美',
    jx: '吉',
    td: '地',
    qh: '后',
    lr: '左',
    duhe: '合',
    xc: '兔',
    sanh: '牛蛇鸡',
    liuh: '龙鸡',
    siji: '秋',
    sxdh: '四大美女',
    tmdh: '东宫、贵妃、歌女、贵妃、苓花',
    qqsh: '琴'
  },
  {
    id: 10,
    sx: '猴',
    hm: '46',
    bose: 'red',
    mswux: '木',
    sxwux: '金',
    jy: '野兽',
    yy: '阳',
    mc: '丑',
    jx: '凶',
    td: '天',
    qh: '后',
    lr: '左',
    duhe: '合',
    xc: '虎',
    sanh: '鼠龙猴',
    liuh: '蛇猴',
    siji: '秋',
    sxdh: '两大恶人',
    tmdh: '太监、寇王、游侠、寇王、松树',
    qqsh: '画'
  },
  {
    id: 11,
    sx: '羊',
    hm: '47',
    bose: 'blue',
    mswux: '火',
    sxwux: '土',
    jy: '家禽',
    yy: '阳',
    mc: '美',
    jx: '吉',
    td: '地',
    qh: '后',
    lr: '右',
    duhe: '独',
    xc: '牛',
    sanh: '兔羊猪',
    liuh: '马羊',
    siji: '夏',
    sxdh: '四大美女',
    tmdh: '相将、西宫、夫人、西宫、樱花',
    qqsh: '画'
  },
  {
    id: 12,
    sx: '马',
    hm: '48',
    bose: 'blue',
    mswux: '火',
    sxwux: '火',
    jy: '家禽',
    yy: '阴',
    mc: '美',
    jx: '吉',
    td: '天',
    qh: '后',
    lr: '右',
    duhe: '独',
    xc: '牛',
    sanh: '虎马狗',
    liuh: '马羊',
    siji: '夏',
    sxdh: '四大家臣',
    tmdh: '太子、元帅、秀才、太子、杏花',
    qqsh: '书'
  },
  {
    id: 1,
    sx: '蛇',
    hm: '49',
    bose: 'green',
    mswux: '土',
    sxwux: '火',
    jy: '野兽',
    yy: '阴',
    mc: '美',
    jx: '吉',
    td: '天',
    qh: '前',
    lr: '左',
    duhe: '合',
    xc: '猪',
    sanh: '牛蛇鸡',
    liuh: '蛇猴',
    siji: '夏',
    sxdh: '四大美女',
    tmdh: '宫女、才人、美女、太子、竹花',
    qqsh: '琴'
  }
];

// 生成码数数组
// sxArr.forEach(item => {
//     item.hm.forEach((hm,index) => {
//         let num = Number(hm) - 1;
//         codeArr[num] = {
//             ...item,
//             "hm":item.hm[index],   //码数
//             "bose":item.bose[index], //波色
//             "mswux":item.mswux[index],  //五行
//         }
//     })
// })
// console.log(codeArr);
/**
 * 根据传入的数字数组，返回 codeArr 中对应数字的对象数组
 * @param {number[]} numbers - 数字数组，如 [12, 25, 30, 42, 5, 18, 33]
 * @returns {Object[]} 对应数字的对象数组
 */
function getCodeObjByNumbers(numbers) {
    return numbers.map(num => {
        const numStr = num.toString().padStart(2, '0');
        return codeArr.find(item => item.hm === numStr);
    }).filter(item => item !== undefined);
}

export { 
  sxArr,
  codeArr,
  getCodeObjByNumbers
 };


