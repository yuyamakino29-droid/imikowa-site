"use client";

import { useRouter } from "next/navigation";
import { FONT_SIZES, setFontSize, useFontSize, type FontSize } from "@/lib/storage";

/** 恐怖度 ★1〜5 */
export function FearRating({ level, className = "" }: { level: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`} aria-label={`恐怖度 ${level} / 5`}>
      <span className="text-[10px] tracking-[0.2em] text-faint">恐怖度</span>
      <span aria-hidden className="tracking-[0.05em]">
        {[1, 2, 3, 4, 5].map((n) => (
          <span key={n} className={n <= level ? "text-blood-bright" : "text-line"}>
            ★
          </span>
        ))}
      </span>
    </span>
  );
}

export function CategoryTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block border border-blood/60 bg-clot/60 px-2 py-0.5 text-[11px] tracking-[0.12em] text-[#f1b4b4]">
      {children}
    </span>
  );
}

const SIZE_LABEL: Record<FontSize, string> = { sm: "小", md: "中", lg: "大" };

/** 文字サイズ切り替え（小・中・大）。選択は localStorage に保存され、全ページに反映される */
export function FontSizeSwitcher() {
  const current = useFontSize();
  return (
    <div role="group" aria-label="文字サイズ" className="inline-flex items-center gap-2">
      <span className="text-xs tracking-[0.15em] text-faint">文字</span>
      <div className="inline-flex border border-line">
        {FONT_SIZES.map((size) => (
          <button
            key={size}
            type="button"
            aria-pressed={current === size}
            onClick={() => setFontSize(size)}
            className={`h-8 w-9 text-sm transition-colors ${
              current === size ? "bg-blood text-white" : "text-dim hover:bg-charcoal-2 hover:text-paper"
            } ${size !== "sm" ? "border-l border-line" : ""}`}
          >
            {SIZE_LABEL[size]}
          </button>
        ))}
      </div>
    </div>
  );
}

/** ランダムに1話へ移動する（excludeId の話は候補から除く。ほかに話がなければそのまま選ぶ） */
export function RandomStoryButton({
  ids,
  excludeId,
  label = "ランダムに1話読む",
  className = "",
}: {
  ids: string[];
  excludeId?: string;
  label?: string;
  className?: string;
}) {
  const router = useRouter();
  const candidates = ids.filter((id) => id !== excludeId);
  const pool = candidates.length > 0 ? candidates : ids;
  return (
    <button
      type="button"
      disabled={pool.length === 0}
      onClick={() => {
        const id = pool[Math.floor(Math.random() * pool.length)];
        router.push(`/stories/${id}`);
      }}
      className={`group inline-flex items-center justify-center gap-2 border border-blood bg-blood/90 px-5 py-2.5 text-sm tracking-[0.15em] text-white transition hover:bg-blood-bright disabled:opacity-40 ${className}`}
    >
      <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:rotate-90" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3.5" y="3.5" width="17" height="17" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="15.5" cy="15.5" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
      </svg>
      {label}
    </button>
  );
}
