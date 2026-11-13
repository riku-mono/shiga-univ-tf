/**
 * ============================================================================
 * 滋賀大学陸上競技部 ウェブサイト 設定ファイル (data.js)
 * ============================================================================
 * ※ お知らせ・部員紹介・滋賀大記録のデータはすべてGoogleスプレッドシートから自動取得されます。
 */

const SITE_DATA = {
  // --------------------------------------------------------------------------
  // 1. Googleスプレッドシート管理（CSV公開URL設定）
  // --------------------------------------------------------------------------
  googleSheetConfig: {
    // 年度自動計算の基準年度（null の場合はアクセス時の日付から自動判定：4月〜翌3月を1年度とする）
    currentAcademicYear: null,
    // ① お知らせシートのCSV公開URL
    newsCsvUrl:
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vRnfIevurRQAjpgaRg7kt2so2zhy3FwCNb0Ag8agkq8d5OmFETuzormmEOkwrCfB7SQGFV8JJwTUueO/pub?gid=0&single=true&output=csv",
    // ② 部員紹介シートのCSV公開URL（入学年度から1〜4回生を自動計算、卒業生は自動非表示）
    membersCsvUrl:
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vRnfIevurRQAjpgaRg7kt2so2zhy3FwCNb0Ag8agkq8d5OmFETuzormmEOkwrCfB7SQGFV8JJwTUueO/pub?gid=1677528011&single=true&output=csv",
    // ③ 滋賀大記録シートのCSV公開URL
    recordsCsvUrl:
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vRnfIevurRQAjpgaRg7kt2so2zhy3FwCNb0Ag8agkq8d5OmFETuzormmEOkwrCfB7SQGFV8JJwTUueO/pub?gid=72760411&single=true&output=csv"
  },

  // --------------------------------------------------------------------------
  // 2. お問い合わせ受信設定（部のYahoo!メール受信用）
  // --------------------------------------------------------------------------
  contactConfig: {
    // 部のYahoo!メールアドレス
    yahooEmail: "shiga_univ_tf@yahoo.co.jp",
    // Formspree または Google Apps Script (GAS) のWebアプリURLを設定すると、
    // サイト上から直接部のYahoo!メール宛に自動転送されます
    endpointUrl: ""
  }
};
