/**
 * ============================================================================
 * 滋賀大学陸上競技部 ウェブサイト データ・設定ファイル (data.js)
 * ============================================================================
 * ※ お知らせの日程、最新の部員・役職情報、送信先メールアドレス等は確定後にここを編集してください。
 */

const SITE_DATA = {
  // お問い合わせ受信設定（部のYahoo!メール受信用）
  contactConfig: {
    // 部のYahoo!メールアドレス（確定後に設定）
    yahooEmail: "",
    // Formspree または Google Apps Script (GAS) のWebアプリURLを設定すると、
    // サイト上から直接部のYahoo!メール宛に自動転送されます（未設定時は接続前案内を表示）
    endpointUrl: ""
  },

  // トップページ：お知らせ（掲載例）
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
  ]
};
