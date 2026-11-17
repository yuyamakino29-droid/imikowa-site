/**
 * サイト・運営者の基本情報
 * 「当サイトについて」「プライバシーポリシー」「お問い合わせ」ページで使われます。
 * 公開前に OPERATOR_NAME と CONTACT_EMAIL をご自身の情報に書き換えてください。
 */

export const SITE_NAME = "意味怖アーカイブ";

/** 運営者名（ハンドルネーム可） */
export const OPERATOR_NAME = "（運営者名）";

/** 連絡先メールアドレス（お問い合わせフォームの送信先にもなります） */
export const CONTACT_EMAIL = "solbed97@gmail.com";

/** 各ポリシーの制定日 */
export const POLICY_ESTABLISHED = "2026年11月17日";

/** 上の値がまだ記載例のままかどうか（ページ上に注意書きを出すのに使う） */
export const IS_PLACEHOLDER_CONTACT = CONTACT_EMAIL.endsWith("@example.com");

/**
 * フッターのアクセスカウンター（無料サービス hits.sh の SVG バッジ）。
 * キーを変えるとカウントは 0 からやり直しになります。空文字にすると非表示。
 */
export const COUNTER_KEY = "my-web-app-ym29.vercel.app/imikowa";
