"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { AD_SLOTS } from "@/lib/ads";
import type { StorySummary } from "@/lib/stories";
import { toggleBookmark, useBookmarks, useZotto } from "@/lib/storage";
import AdBanner from "./AdBanner";
import { CategoryTag, FearRating, FontSizeSwitcher, RandomStoryButton } from "./ui";

const ALL = "すべて";
const BOOKMARKED = "しおり済み";
/** 一覧グリッドに広告を差し込む間隔（この件数ごと。件数が足りなければ一覧の末尾に1つ） */
const AD_EVERY = 4;

/** Fisher-Yates シャッフル（元の配列は変更しない） */
function shuffle<T>(items: readonly T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function StoryBrowser({ stories, categories }: { stories: StorySummary[]; categories: string[] }) {
  const [category, setCategory] = useState<string>(ALL);
  const [query, setQuery] = useState("");
  // サーバー描画と初回のクライアント描画は元の順番のまま（Hydration エラー防止）。
  // マウント後にだけシャッフルするので、ページを開くたびに並び順が変わる。
  const [ordered, setOrdered] = useState<StorySummary[] | null>(null);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- 乱数はサーバーと一致しないため、マウント後に一度だけ並べ替える必要がある
    setOrdered(shuffle(stories));
  }, [stories]);
  const bookmarks = useBookmarks();
  const zotto = useZotto();

  const keywords = query.trim().toLowerCase().split(/[\s　]+/).filter(Boolean);
  const visible = (ordered ?? stories).filter((s) => {
    if (category === BOOKMARKED && !bookmarks.includes(s.id)) return false;
    if (category !== ALL && category !== BOOKMARKED && s.category !== category) return false;
    return keywords.every((k) => s.searchText.includes(k));
  });

  const filters = [ALL, BOOKMARKED, ...categories];

  return (
    <div>
      {/* 操作パネル */}
      <div className="flex flex-col gap-4 border border-line bg-charcoal/80 p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative flex-1">
            <span className="sr-only">キーワード検索</span>
            <svg aria-hidden viewBox="0 0 24 24" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="11" cy="11" r="6.5" />
              <path d="m16 16 4.5 4.5" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="キーワードで探す（タイトル・本文）"
              className="h-11 w-full border border-line bg-void pl-9 pr-3 text-sm text-paper placeholder:text-faint focus:border-blood focus:outline-none"
            />
          </label>
          <RandomStoryButton ids={stories.map((s) => s.id)} className="h-11" />
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div role="group" aria-label="カテゴリで絞り込む" className="flex flex-wrap gap-2">
            {filters.map((c) => {
              const active = c === category;
              const count =
                c === ALL ? stories.length : c === BOOKMARKED ? stories.filter((s) => bookmarks.includes(s.id)).length : stories.filter((s) => s.category === c).length;
              return (
                <button
                  key={c}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setCategory(c)}
                  className={`border px-3 py-1.5 text-xs tracking-[0.1em] transition-colors ${
                    active ? "border-blood bg-blood/25 text-paper" : "border-line text-dim hover:border-faint hover:text-paper"
                  }`}
                >
                  {c === BOOKMARKED && <span aria-hidden className="mr-1">🔖</span>}
                  {c}
                  <span className="ml-1.5 text-faint">{count}</span>
                </button>
              );
            })}
          </div>
          <FontSizeSwitcher />
        </div>
      </div>

      {/* 一覧 */}
      <p className="mt-8 text-xs tracking-[0.2em] text-faint" aria-live="polite">
        {visible.length} 話
      </p>
      {visible.length === 0 ? (
        <p className="mt-6 border border-dashed border-line px-6 py-16 text-center text-sm leading-loose text-dim">
          {category === BOOKMARKED && keywords.length === 0
            ? "しおりを挟んだ話はまだありません。気になる話の「しおり」ボタンを押すと、ここに集まります。"
            : "該当する話は見つかりませんでした。"}
        </p>
      ) : (
        <ul key={ordered ? "shuffled" : "initial"} className={`mt-4 grid gap-5 md:grid-cols-2 ${ordered ? "animate-[fade-in_400ms_ease-out]" : ""}`}>
          {visible.map((s, i) => (
            <Fragment key={s.id}>
              <li>
                <StoryCard story={s} bookmarked={bookmarks.includes(s.id)} zotto={zotto.includes(s.id)} />
              </li>
              {/* インフィード広告：AD_EVERY 件ごと。件数が足りないときは末尾に1つ */}
              {((i + 1) % AD_EVERY === 0 || (visible.length < AD_EVERY && i === visible.length - 1)) && (
                <li className="md:col-span-2">
                  <AdBanner slot={AD_SLOTS.infeed} minHeight={110} />
                </li>
              )}
            </Fragment>
          ))}
        </ul>
      )}
    </div>
  );
}

function StoryCard({ story, bookmarked, zotto }: { story: StorySummary; bookmarked: boolean; zotto: boolean }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden border border-line bg-charcoal/90 transition hover:border-blood/70 hover:shadow-[0_0_30px_rgb(153_27_27/0.18)]">
      <span aria-hidden className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-blood to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <Link href={`/stories/${story.id}`} className="flex flex-1 flex-col">
        {story.image && (
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={story.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 480px, (min-width: 768px) 50vw, 100vw"
              className="object-cover opacity-75 transition duration-700 group-hover:scale-[1.03] group-hover:opacity-90"
            />
            {/* 下端をカードの背景色へ溶かす */}
            <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-transparent via-charcoal/20 to-charcoal" />
          </div>
        )}
        <div className={`flex flex-1 flex-col p-5 sm:p-6 ${story.image ? "-mt-10 relative" : ""}`}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CategoryTag>{story.category}</CategoryTag>
          <FearRating level={story.fearLevel} className="text-sm" />
        </div>
        <h2 className="mt-4 text-xl font-semibold tracking-[0.08em] text-paper transition-colors group-hover:text-white">
          {story.title}
        </h2>
        <p className="mt-3 line-clamp-3 leading-[1.95] text-dim" style={{ fontSize: "var(--card-size)" }}>
          {story.excerpt}
        </p>
        <span className="mt-auto pt-5 text-xs tracking-[0.2em] text-faint transition-colors group-hover:text-blood-bright">
          読む →
        </span>
        </div>
      </Link>
      <div className="flex items-center justify-between border-t border-line/70 px-5 py-2.5 text-xs text-faint sm:px-6">
        <span>{zotto ? <span className="text-blood-bright">ゾッとした済み</span> : " "}</span>
        <button
          type="button"
          aria-pressed={bookmarked}
          onClick={() => toggleBookmark(story.id)}
          className={`tracking-[0.1em] transition-colors ${bookmarked ? "text-blood-bright" : "hover:text-paper"}`}
        >
          {bookmarked ? "🔖 しおり済み" : "しおりを挟む"}
        </button>
      </div>
    </article>
  );
}
