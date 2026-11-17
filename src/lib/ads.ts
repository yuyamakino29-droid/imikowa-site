/**
 * Google AdSense の設定（すべて環境変数から読む。未設定でもエラーにはならない）
 *
 *   NEXT_PUBLIC_ADSENSE_CLIENT_ID     … パブリッシャーID（例: ca-pub-xxxxxxxxxxxxxxxx）
 *   NEXT_PUBLIC_ADSENSE_SLOT_INFEED   … 一覧グリッドに入れるインフィード広告のユニットID
 *   NEXT_PUBLIC_ADSENSE_SLOT_STORY    … 記事の解説アコーディオン下の広告ユニットID
 *
 * NEXT_PUBLIC_ の値はビルド時に埋め込まれるため、変更したら再ビルドが必要。
 */

const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim() ?? "";

/** "ca-pub-" で始まる値だけを有効なIDとみなす（記載例のままの値や空文字は無効扱い） */
export const ADSENSE_CLIENT_ID = /^ca-pub-\d{10,}$/.test(clientId) ? clientId : "";

export const AD_SLOTS = {
  infeed: process.env.NEXT_PUBLIC_ADSENSE_SLOT_INFEED?.trim() ?? "",
  story: process.env.NEXT_PUBLIC_ADSENSE_SLOT_STORY?.trim() ?? "",
} as const;
