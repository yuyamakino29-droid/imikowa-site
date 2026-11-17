import { existsSync } from "node:fs";
import path from "node:path";
import { stories, type Story } from "@/data/stories";

/** 本文・解説の文字列を段落の配列にする（前後の空行は無視） */
export function toParagraphs(text: string): string[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

/** 一覧カードのあらすじ：本文の冒頭2段落（カード側で3行に省略表示） */
export function excerptOf(story: Story): string {
  return toParagraphs(story.content).slice(0, 2).join("");
}

/** 段落を「通常の文字列」と「伏線箇所」に分割する */
export type Segment = { text: string; foreshadow: boolean };

export function splitByHighlights(paragraph: string, highlights: string[]): Segment[] {
  const segments: Segment[] = [];
  let rest = paragraph;
  while (rest.length > 0) {
    let best: { index: number; text: string } | null = null;
    for (const f of highlights) {
      if (!f) continue;
      const index = rest.indexOf(f);
      if (index !== -1 && (best === null || index < best.index || (index === best.index && f.length > best.text.length))) {
        best = { index, text: f };
      }
    }
    if (best === null) {
      segments.push({ text: rest, foreshadow: false });
      break;
    }
    if (best.index > 0) segments.push({ text: rest.slice(0, best.index), foreshadow: false });
    segments.push({ text: best.text, foreshadow: true });
    rest = rest.slice(best.index + best.text.length);
  }
  return segments;
}

/**
 * データの書き間違いをビルド時に検出する。
 * id の重複・恐怖度の範囲外・本文に見つからない伏線・存在しない画像があれば、どの話のどこが悪いかを示して止める。
 */
function validate(list: Story[]): Story[] {
  const problems: string[] = [];
  const seen = new Set<string>();
  for (const s of list) {
    const label = `「${s.title}」(id: ${s.id})`;
    if (!/^[a-z0-9-]+$/.test(s.id)) problems.push(`${label} id は半角英小文字・数字・ハイフンのみ使えます`);
    if (seen.has(s.id)) problems.push(`${label} id が他の話と重複しています`);
    seen.add(s.id);
    if (![1, 2, 3, 4, 5].includes(s.fearLevel)) problems.push(`${label} fearLevel は 1〜5 で指定してください`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(s.createdAt)) problems.push(`${label} createdAt は YYYY-MM-DD 形式で指定してください`);
    if (s.image !== undefined) {
      if (!s.image.startsWith("/")) problems.push(`${label} image は "/images/ファイル名.jpg" のように / から始めてください`);
      else if (!existsSync(path.join(process.cwd(), "public", s.image))) problems.push(`${label} 画像 public${s.image} が見つかりません`);
    }
    const paragraphs = toParagraphs(s.content);
    for (const f of s.highlights) {
      if (!paragraphs.some((p) => p.includes(f))) {
        problems.push(`${label} 伏線「${f}」が本文中に見つかりません（段落をまたがず、本文と一字一句同じにしてください）`);
      }
    }
  }
  if (problems.length > 0) {
    throw new Error(`src/data/stories.ts の内容に問題があります:\n- ${problems.join("\n- ")}`);
  }
  return list;
}

/** 公開日の新しい順（同じ日付なら、配列の後ろに追加した話ほど新しいとみなす） */
export const allStories: Story[] = validate([...stories])
  .map((story, index) => ({ story, index }))
  .sort((a, b) => b.story.createdAt.localeCompare(a.story.createdAt) || b.index - a.index)
  .map(({ story }) => story);

export const categories: string[] = Array.from(new Set(allStories.map((s) => s.category)));

export function getStory(id: string): Story | undefined {
  return allStories.find((s) => s.id === id);
}

/** クライアントへ渡す一覧用の軽いデータ（解説は含めない） */
export type StorySummary = {
  id: string;
  title: string;
  category: string;
  fearLevel: number;
  image?: string;
  createdAt: string;
  excerpt: string;
  /** 検索用（タイトル・あらすじ・本文・カテゴリ） */
  searchText: string;
};

export function toSummary(s: Story): StorySummary {
  const excerpt = excerptOf(s);
  return {
    id: s.id,
    title: s.title,
    category: s.category,
    fearLevel: s.fearLevel,
    image: s.image,
    createdAt: s.createdAt,
    excerpt,
    searchText: [s.title, s.category, s.content].join("\n").toLowerCase(),
  };
}
