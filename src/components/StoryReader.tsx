"use client";

import { useId, useState } from "react";
import type { Segment } from "@/lib/stories";
import { toggleBookmark, toggleZotto, useBookmarks, useZotto } from "@/lib/storage";

/**
 * 本文＋解説アコーディオン。
 * 解説を開くと、本文中の伏線箇所（<mark class="foreshadow">）が赤黒く浮かび上がる。
 */
export default function StoryReader({
  id,
  paragraphs,
  highlights,
  explanation,
}: {
  id: string;
  /** 伏線ごとに分割済みの段落（サーバー側で分割して渡す） */
  paragraphs: Segment[][];
  highlights: string[];
  explanation: string[];
}) {
  const [revealed, setRevealed] = useState(false);
  const panelId = useId();

  return (
    <>
      <div className="space-y-[1.15em] leading-[2.15] tracking-[0.04em] text-paper" style={{ fontSize: "var(--story-size)" }}>
        {paragraphs.map((p, i) => (
          <p key={i}>
            {p.map((seg, j) =>
              seg.foreshadow ? (
                <mark key={j} className="foreshadow" data-revealed={revealed}>
                  {seg.text}
                </mark>
              ) : (
                <span key={j}>{seg.text}</span>
              ),
            )}
          </p>
        ))}
      </div>

      <StoryActions id={id} />

      <section className="mt-12 border border-line bg-charcoal/90">
        <h2>
          <button
            type="button"
            aria-expanded={revealed}
            aria-controls={panelId}
            onClick={() => setRevealed((v) => !v)}
            className={`flex w-full items-center justify-between gap-4 px-5 py-4 text-left tracking-[0.15em] transition-colors sm:px-6 ${
              revealed ? "text-blood-bright" : "text-paper hover:bg-charcoal-2"
            }`}
          >
            <span>
              <span aria-hidden className={`mr-2 inline-block transition-transform ${revealed ? "" : "-rotate-90"}`}>
                ▼
              </span>
              {revealed ? "解説（意味）を閉じる" : "解説（意味）を見る"}
            </span>
            {highlights.length > 0 && !revealed && (
              <span className="hidden text-[11px] tracking-[0.1em] text-faint sm:inline">開くと伏線が浮かび上がります</span>
            )}
          </button>
        </h2>
        <div
          id={panelId}
          className={`reveal-panel grid transition-[grid-template-rows] duration-500 ease-out ${revealed ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
          inert={!revealed}
          aria-hidden={!revealed}
        >
          <div className="overflow-hidden">
            <div className="border-t border-blood/40 bg-clot/30 px-5 py-6 sm:px-6">
              <p className="text-xs tracking-[0.3em] text-blood-bright">真相</p>
              <div className="mt-3 space-y-[1em] leading-[2.05] text-paper" style={{ fontSize: "var(--story-size)" }}>
                {explanation.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              {highlights.length > 0 && (
                <p className="mt-6 text-xs leading-relaxed text-dim">
                  <mark className="foreshadow mr-1 px-1" data-revealed="true">
                    赤黒い箇所
                  </mark>
                  が、本文に仕込まれていた違和感の伏線です。もう一度読み返してみてください。
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function StoryActions({ id }: { id: string }) {
  const zotto = useZotto().includes(id);
  const bookmarked = useBookmarks().includes(id);
  const base = "inline-flex h-11 items-center gap-2 border px-5 text-sm tracking-[0.12em] transition";
  return (
    <div className="mt-12 flex flex-wrap items-center justify-center gap-3 border-y border-line/70 py-6">
      <button
        type="button"
        aria-pressed={zotto}
        onClick={() => toggleZotto(id)}
        className={`${base} ${zotto ? "border-blood bg-blood text-white shadow-[0_0_24px_rgb(220_38_38/0.35)]" : "border-line text-paper hover:border-blood hover:text-blood-bright"}`}
      >
        <span aria-hidden>{zotto ? "🩸" : "😱"}</span>
        {zotto ? "ゾッとした！" : "ゾッとした"}
      </button>
      <button
        type="button"
        aria-pressed={bookmarked}
        onClick={() => toggleBookmark(id)}
        className={`${base} ${bookmarked ? "border-blood/70 bg-clot text-[#fecaca]" : "border-line text-paper hover:border-faint"}`}
      >
        <span aria-hidden>🔖</span>
        {bookmarked ? "しおり済み" : "しおりを挟む"}
      </button>
    </div>
  );
}
