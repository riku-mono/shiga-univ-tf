/**
 * ============================================================================
 * 滋賀大学陸上競技部 ウェブサイト データ・設定ファイル (data.js)
 * ============================================================================
 * ※ お知らせの日程、最新の部員・役職情報、送信先メールアドレス等は確定後にここを編集してください。
 */

const SITE_DATA = {
  // --------------------------------------------------------------------------
  // Googleスプレッドシート管理（CSV公開URL設定）
  // --------------------------------------------------------------------------
  // スプレッドシートの「ファイル」→「共有」→「ウェブに公開」→「カンマ区切り形式 (.csv)」で
  // 発行されたURLを下に貼るだけで、スプレッドシートの編集が自動でHPに反映されます。
  // （空欄の場合は、このファイル内の初期データがそのまま表示されます）
  googleSheetConfig: {
    // 年度自動計算の基準年度（空欄の場合はアクセス時の日付から自動判定：4月〜翌3月を1年度とする）
    currentAcademicYear: null,
    // ① お知らせシートのCSV公開URL
    newsCsvUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRnfIevurRQAjpgaRg7kt2so2zhy3FwCNb0Ag8agkq8d5OmFETuzormmEOkwrCfB7SQGFV8JJwTUueO/pub?gid=0&single=true&output=csv",
    // ② 部員紹介シートのCSV公開URL（入学年度から1〜4回生を自動計算、卒業生は自動非表示）
    membersCsvUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRnfIevurRQAjpgaRg7kt2so2zhy3FwCNb0Ag8agkq8d5OmFETuzormmEOkwrCfB7SQGFV8JJwTUueO/pub?gid=1677528011&single=true&output=csv",
    // ③ 滋賀大記録シートのCSV公開URL
    recordsCsvUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRnfIevurRQAjpgaRg7kt2so2zhy3FwCNb0Ag8agkq8d5OmFETuzormmEOkwrCfB7SQGFV8JJwTUueO/pub?gid=72760411&single=true&output=csv"
  },

  // --------------------------------------------------------------------------
  // お問い合わせ受信設定（部のYahoo!メール受信用）
  // --------------------------------------------------------------------------
  contactConfig: {
    // 部のYahoo!メールアドレス（確定後に設定）
    yahooEmail: "shiga_univ_tf@yahoo.co.jp",
    // Formspree または Google Apps Script (GAS) のWebアプリURLを設定すると、
    // サイト上から直接部のYahoo!メール宛に自動転送されます（未設定時は接続前案内を表示）
    endpointUrl: ""
  },

  // --------------------------------------------------------------------------
  // トップページ：お知らせ（掲載例）
  // --------------------------------------------------------------------------
  topNews: [
    {
      category: "新歓",
      title: "新入生向け 練習見学・体験のご案内",
      statusText: "詳細は順次公開  →",
      href: "recruit.html"
    },
    {
      category: "大会",
      title: "五大戦の開催・参加について",
      statusText: "詳細は順次公開  →",
      href: "recruit.html"
    },
    {
      category: "競技情報",
      title: "主要大会への出場情報",
      statusText: "詳細は順次公開  →",
      href: "records.html"
    }
  ],

  // --------------------------------------------------------------------------
  // 部員紹介データ（すべて架空の掲載例：1回生〜4回生・大学院生）
  // Figma 19:82 (PC) / 19:102 (スマホ) 準拠
  // --------------------------------------------------------------------------
  membersByGrade: {
    "1回生": [
      {
        num: "01",
        eventTag: "100m",
        kana: "ヤマダ ショウタ",
        name: "山田 翔太",
        facultyGrade: "経済学部  /  1回生",
        highSchool: "彦根東高校",
        specialty: "100m",
        pb: "11秒20",
        comment: "「一本一本の練習を大切に。」"
      },
      {
        num: "02",
        eventTag: "800m",
        kana: "タナカ ミサキ",
        name: "田中 美咲",
        facultyGrade: "教育学部  /  1回生",
        highSchool: "膳所高校",
        specialty: "800m",
        pb: "2分24秒50",
        comment: "「昨日の自分を超えたいです。」"
      },
      {
        num: "03",
        eventTag: "5000m",
        kana: "サトウ ユウマ",
        name: "佐藤 悠真",
        facultyGrade: "データサイエンス学部  /  1回生",
        highSchool: "石山高校",
        specialty: "5000m",
        pb: "15分40秒00",
        comment: "「仲間と一緒に強くなる。」"
      },
      {
        num: "04",
        eventTag: "やり投",
        kana: "スズキ アオイ",
        name: "鈴木 葵",
        facultyGrade: "経済学部  /  1回生",
        highSchool: "草津東高校",
        specialty: "やり投",
        pb: "35m20",
        comment: "「自分らしく、全力で！」"
      }
    ],
    "2回生": [
      {
        num: "01",
        eventTag: "200m",
        kana: "タカハシ レン",
        name: "高橋 蓮",
        facultyGrade: "経済学部  /  2回生",
        highSchool: "米原高校",
        specialty: "200m",
        pb: "22秒45",
        comment: "「後半の伸びを磨いて自己ベスト更新を目指します。」"
      },
      {
        num: "02",
        eventTag: "1500m",
        kana: "イトウ ハルカ",
        name: "伊藤 遥",
        facultyGrade: "教育学部  /  2回生",
        highSchool: "守山高校",
        specialty: "1500m",
        pb: "4分58秒10",
        comment: "「楽しみながら粘り強い走りをしたいです。」"
      },
      {
        num: "03",
        eventTag: "走幅跳",
        kana: "ワタナベ ソウタ",
        name: "渡辺 颯太",
        facultyGrade: "データサイエンス学部  /  2回生",
        highSchool: "八日市高校",
        specialty: "走幅跳",
        pb: "6m65",
        comment: "「助走のスピードと踏切の精度を高めます。」"
      },
      {
        num: "04",
        eventTag: "マネージャー",
        kana: "コバヤシ ユイ",
        name: "小林 結衣",
        facultyGrade: "経済学部  /  2回生",
        highSchool: "東大津高校",
        specialty: "サポート・計測",
        pb: "—",
        comment: "「選手が全力で挑める環境づくりを支えます。」"
      }
    ],
    "3回生": [
      {
        num: "01",
        eventTag: "400m",
        kana: "ナカムラ カイト",
        name: "中村 海斗",
        facultyGrade: "経済学部  /  3回生",
        highSchool: "彦根東高校",
        specialty: "400m・マイルリレー",
        pb: "49秒30",
        comment: "「チームを引っ張る走りで対校戦に貢献します。」"
      },
      {
        num: "02",
        eventTag: "100mH",
        kana: "カトウ ナツミ",
        name: "加藤 菜摘",
        facultyGrade: "教育学部  /  3回生",
        highSchool: "石山高校",
        specialty: "100mH",
        pb: "15秒90",
        comment: "「一台一台のリズムを大切に走り抜けます。」"
      },
      {
        num: "03",
        eventTag: "5000m",
        kana: "ヨシダ リク",
        name: "吉田 陸",
        facultyGrade: "データサイエンス学部  /  3回生",
        highSchool: "膳所高校",
        specialty: "5000m・10000m",
        pb: "15分12秒40",
        comment: "「丹後駅伝に向けてチーム一丸で走り込みます。」"
      },
      {
        num: "04",
        eventTag: "円盤投",
        kana: "マツモト タクマ",
        name: "松本 拓真",
        facultyGrade: "経済学部  /  3回生",
        highSchool: "虎姫高校",
        specialty: "円盤投・砲丸投",
        pb: "33m50",
        comment: "「日々のウエイトと技術練習を積み重ねます。」"
      }
    ],
    "4回生": [
      {
        num: "01",
        eventTag: "110mH",
        kana: "イノウエ ダイキ",
        name: "井上 大輝",
        facultyGrade: "経済学部  /  4回生",
        highSchool: "草津東高校",
        specialty: "110mH",
        pb: "15秒10",
        comment: "「4年間の集大成として悔いのないシーズンに。」"
      },
      {
        num: "02",
        eventTag: "400m",
        kana: "キムラ サクラ",
        name: "木村 さくら",
        facultyGrade: "教育学部  /  4回生",
        highSchool: "守山高校",
        specialty: "400m",
        pb: "61秒40",
        comment: "「後輩たちと走れる一本一本を楽しみたいです。」"
      }
    ],
    "院生": [
      {
        num: "01",
        eventTag: "3000mSC",
        kana: "ハヤシ ケンタロウ",
        name: "林 健太郎",
        facultyGrade: "経済学研究科  /  大学院生",
        highSchool: "彦根東高校",
        specialty: "3000mSC・5000m",
        pb: "9分28秒00",
        comment: "「研究と競技を両立し、自己記録更新に挑みます。」"
      },
      {
        num: "02",
        eventTag: "三段跳",
        kana: "シミズ リョウ",
        name: "清水 亮",
        facultyGrade: "データサイエンス研究科  /  大学院生",
        highSchool: "膳所高校",
        specialty: "三段跳・走幅跳",
        pb: "14m10",
        comment: "「データ分析も活かして跳躍技術を追求しています。」"
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 滋賀大記録データ（カテゴリ別：トラック / フィールド / ロード・競歩 / 混成）
  // Figma 19:118 (PC) / 19:138 (スマホ) 準拠
  // --------------------------------------------------------------------------
  recordsByCategory: {
    track: {
      label: "トラック種目",
      men: [
        { event: "100m（電動）", record: "10秒80", holder: "太田 成宣", date: "2009年10月20日", tournament: "学年別", place: "長居第二" },
        { event: "200m（電動）", record: "22秒08", holder: "出雲 滉己", date: "2024年9月28日", tournament: "滋賀陸協", place: "彦根" },
        { event: "400m（電動）", record: "48秒05", holder: "前田 賢吾", date: "1993年4月2日", tournament: "国体予選", place: "皇子山" },
        { event: "800m", record: "1分53秒56", holder: "内田 純也", date: "2016年5月3日", tournament: "高校記録会", place: "皇子山" },
        { event: "1500m", record: "3分54秒93", holder: "熊木 篤", date: "1995年6月25日", tournament: "滋賀県選", place: "皇子山" },
        { event: "3000m", record: "8分37秒05", holder: "谷本 貴久", date: "2015年11月28日", tournament: "京産大記録会", place: "京都産業大学" },
        { event: "5000m", record: "14分48秒20", holder: "後藤 駿弥", date: "2014年11月8日", tournament: "京都陸協", place: "西京極補助" },
        { event: "10000m", record: "30分42秒69", holder: "小西 雄大", date: "2012年10月7日", tournament: "びわ湖駅伝", place: "皇子山" },
        { event: "110mH", record: "14秒62", holder: "中川 誠治", date: "2018年5月10日", tournament: "関西インカレ", place: "西京極" },
        { event: "400mH", record: "52秒61", holder: "川端 健太", date: "2001年5月17日", tournament: "関西インカレ", place: "長居第一" },
        { event: "3000mSC", record: "8分59秒16", holder: "小西 雄大", date: "2012年5月12日", tournament: "西日本インカレ", place: "長居第一" },
        { event: "4×100m", record: "41秒29", holder: "大久保・吉原・田中・出雲", date: "2024年7月13日", tournament: "滋賀県選", place: "彦根" },
        { event: "4×400m", record: "3分16秒00", holder: "宮田・竹川・中村・前田", date: "2000年4月2日", tournament: "関西インカレ", place: "西京極" }
      ],
      women: [
        { event: "100m", record: "12秒66", holder: "三坂 和希", date: "2017年5月10日", tournament: "関西インカレ", place: "長居第一" },
        { event: "200m", record: "26秒82", holder: "三坂 和希", date: "2018年8月11日", tournament: "近畿国立", place: "鴻ノ池" },
        { event: "400m", record: "60秒57", holder: "森 満里子", date: "1991年5月19日", tournament: "関西インカレ", place: "鴻ノ池" },
        { event: "800m", record: "2分18秒31", holder: "仁賀 志織", date: "2016年5月14日", tournament: "関西インカレ", place: "長居第一" },
        { event: "1500m", record: "4分54秒45", holder: "奥平 晴香", date: "2009年10月20日", tournament: "学年別", place: "長居第二" },
        { event: "3000m", record: "10分35秒96", holder: "奥平 晴香", date: "2009年9月12日", tournament: "高校記録会", place: "彦根" },
        { event: "5000m", record: "18分48秒03", holder: "角田 菜々花", date: "2009年7月11日", tournament: "京都陸協", place: "西京極" },
        { event: "400mH", record: "1分06秒51", holder: "三坂 和希", date: "2017年5月12日", tournament: "関西インカレ", place: "長居第一" },
        { event: "4×100m", record: "50秒03", holder: "池本・三坂・新谷・高橋", date: "2017年5月5日", tournament: "高校記録会", place: "皇子山" },
        { event: "4×400m", record: "4分00秒40", holder: "森・寺澤・島田・小島", date: "1992年5月31日", tournament: "関西インカレ", place: "皇子山" }
      ]
    },
    field: {
      label: "フィールド種目",
      men: [
        { event: "走高跳", record: "1m94", holder: "高橋 一生", date: "1981年10月18日", tournament: "七大学", place: "山口" },
        { event: "棒高跳", record: "4m45", holder: "竜野 寿男", date: "1981年10月18日", tournament: "七大学", place: "山口" },
        { event: "走幅跳", record: "7m09", holder: "高橋 一生", date: "1980年6月29日", tournament: "滋賀県選", place: "皇子山" },
        { event: "三段跳", record: "14m83", holder: "三方 怜", date: "2019年4月7日", tournament: "京都インカレ", place: "西京極" },
        { event: "砲丸投", record: "10m30", holder: "樋口 徹", date: "1987年4月26日", tournament: "リレーカーニバル", place: "皇子山" },
        { event: "円盤投", record: "35m21", holder: "倉地 洋輔", date: "2019年4月7日", tournament: "京都インカレ", place: "西京極" },
        { event: "ハンマー投", record: "37m00", holder: "樋口 匠", date: "2003年8月7日", tournament: "七大学", place: "万博" },
        { event: "やり投", record: "56m05", holder: "井上 貴文", date: "2009年7月11日", tournament: "滋賀県選", place: "皇子山" }
      ],
      women: [
        { event: "走高跳", record: "1m55", holder: "奥谷 朱里", date: "2015年8月29日", tournament: "近畿選手権", place: "鴻ノ池" },
        { event: "棒高跳", record: "3m80", holder: "岡城 有紀", date: "2013年4月28日", tournament: "奈良陸協", place: "奈良" },
        { event: "走幅跳", record: "4m86", holder: "竹辺 このみ", date: "2016年5月12日", tournament: "関西インカレ", place: "長居第一" },
        { event: "三段跳", record: "10m77", holder: "木田 直歩", date: "2022年7月17日", tournament: "滋賀県選", place: "皇子山" },
        { event: "砲丸投", record: "10m26", holder: "木村 黎美", date: "2018年4月10日", tournament: "京都インカレ", place: "西京極" },
        { event: "円盤投", record: "31m86", holder: "丸山 侑里子", date: "2015年9月12日", tournament: "高校記録会", place: "皇子山" },
        { event: "やり投", record: "37m44", holder: "木村 黎美", date: "2017年7月8日", tournament: "滋賀県選", place: "皇子山" }
      ]
    },
    road: {
      label: "ロード・競歩種目",
      men: [
        { event: "10kmロード", record: "31分49秒", holder: "小嶋 郁男", date: "1985年11月3日", tournament: "県ロードレース", place: "近江八幡" },
        { event: "20kmロード", record: "1時間04分15秒", holder: "小嶋 郁男", date: "1985年11月3日", tournament: "県ロードレース", place: "近江八幡" },
        { event: "30kmロード", record: "1時間41分16秒", holder: "後藤 駿弥", date: "2014年3月2日", tournament: "びわ湖マラソン", place: "大津" },
        { event: "ハーフマラソン", record: "1時間06分52秒", holder: "中島 弘貴", date: "2011年2月12日", tournament: "学連ロード", place: "長居" },
        { event: "マラソン", record: "2時間24分21秒", holder: "中島 弘貴", date: "2011年3月6日", tournament: "びわ湖マラソン", place: "大津" },
        { event: "5000mW", record: "22分23秒41", holder: "山本 唯登", date: "2018年9月8日", tournament: "高校記録会", place: "皇子山" },
        { event: "10000mW", record: "45分46秒80", holder: "山本 唯登", date: "2018年5月13日", tournament: "関西インカレ", place: "西京極" },
        { event: "10kmロードW", record: "49分53秒", holder: "山本 唯登", date: "2018年4月14日", tournament: "輪島競歩", place: "輪島" },
        { event: "20kmロードW", record: "1時間33分20秒", holder: "山本 唯登", date: "2019年2月17日", tournament: "日本選手権", place: "六甲" },
        { event: "50kmロードW", record: "4時間37分28秒", holder: "山本 唯登", date: "2019年4月14日", tournament: "日本選手権", place: "輪島" }
      ],
      women: []
    },
    combined: {
      label: "混成・その他種目",
      men: [
        { event: "十種競技", record: "4655点", holder: "山本 良英", date: "1973年9月15日", tournament: "秋季インカレ", place: "尼崎" },
        { event: "スウェーデンR", record: "1分56秒75", holder: "丸・中村・前田・竹川", date: "1992年8月23日", tournament: "近畿国立", place: "西京極" }
      ],
      women: [
        { event: "七種競技", record: "2608点", holder: "北村 茉璃彩", date: "2022年7月16日", tournament: "滋賀県選", place: "皇子山" },
        { event: "100mH", record: "15秒82", holder: "池本 愛", date: "2017年5月12日", tournament: "京都インカレ", place: "西京極" }
      ]
    }
  }
};
