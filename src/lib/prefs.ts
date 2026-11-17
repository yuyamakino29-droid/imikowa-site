/** localStorage のキーと文字サイズの選択肢（サーバー・クライアント共通） */
export const STORAGE_KEYS = {
  bookmarks: "imikowa:bookmarks",
  zotto: "imikowa:zotto",
  fontSize: "imikowa:font-size",
} as const;

export const FONT_SIZES = ["sm", "md", "lg"] as const;
export type FontSize = (typeof FONT_SIZES)[number];
