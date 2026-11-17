"use client";

import { useEffect, useRef } from "react";
import { ADSENSE_CLIENT_ID } from "@/lib/ads";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type Props = {
  /** 広告ユニットID（data-ad-slot）。空ならプレースホルダーを表示 */
  slot?: string;
  /** data-ad-format（既定: auto） */
  format?: string;
  /** プレースホルダーの高さ（px）。本番の広告枠の目安 */
  minHeight?: number;
  className?: string;
};

/**
 * 再利用できる AdSense 広告枠。
 * パブリッシャーID（環境変数）と slot の両方が設定されているときだけ実広告を出し、
 * どちらかが未設定（開発中・審査前）のときはレイアウト確認用の控えめな枠を出す。
 */
export default function AdBanner({ slot = "", format = "auto", minHeight = 120, className = "" }: Props) {
  const enabled = ADSENSE_CLIENT_ID !== "" && slot !== "";
  const insRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    const ins = insRef.current;
    if (!enabled || !ins) return;
    // 開発時の StrictMode の二重実行などで同じ枠に二度 push すると AdSense がエラーを出すため、処理済みの枠は飛ばす
    if (ins.dataset.adsbygoogleStatus || ins.dataset.pushed) return;
    ins.dataset.pushed = "true";
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // 広告ブロッカー等でスクリプトが動かなくても、ページの表示は止めない
    }
  }, [enabled, slot]);

  return (
    <aside aria-label="広告" className={`border border-line/70 bg-charcoal ${className}`}>
      <p className="border-b border-line/50 px-3 py-1 text-[10px] tracking-[0.3em] text-faint">スポンサーリンク</p>
      {enabled ? (
        <div className="p-2">
          <ins
            ref={insRef}
            className="adsbygoogle block"
            style={{ display: "block", minHeight }}
            data-ad-client={ADSENSE_CLIENT_ID}
            data-ad-slot={slot}
            data-ad-format={format}
            data-full-width-responsive="true"
          />
        </div>
      ) : (
        <div
          className="flex items-center justify-center bg-[repeating-linear-gradient(135deg,transparent_0_10px,rgb(255_255_255/0.015)_10px_20px)] text-xs tracking-[0.3em] text-faint/70"
          style={{ minHeight }}
        >
          広告スペース
        </div>
      )}
    </aside>
  );
}
