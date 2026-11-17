import Link from "next/link";

/** 固定ページ（当サイトについて・プライバシーポリシー・お問い合わせ）の共通レイアウト */
export function StaticPage({ eyebrow, title, lead, children }: { eyebrow: string; title: string; lead?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-2xl px-4 pb-20 sm:px-6">
      <div className="py-6">
        <Link href="/" className="text-xs tracking-[0.2em] text-faint transition-colors hover:text-paper">
          ← トップへ戻る
        </Link>
      </div>
      <header className="border-b border-line pb-8 pt-4 text-center">
        <p className="text-[11px] tracking-[0.5em] text-blood-bright">{eyebrow}</p>
        <h1 className="mt-4 text-2xl font-extrabold leading-snug tracking-[0.14em] sm:text-3xl">{title}</h1>
        {lead && <p className="mx-auto mt-5 max-w-xl text-sm leading-loose text-dim">{lead}</p>}
      </header>
      <div className="mt-10 space-y-12">{children}</div>
    </div>
  );
}

/** 見出し付きの本文ブロック */
export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="flex items-center gap-3 text-lg font-semibold tracking-[0.1em]">
        <span aria-hidden className="h-4 w-[3px] bg-blood" />
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-[0.9375rem] leading-[2] text-paper/90 [&_a]:text-[#f1b4b4] [&_a]:underline [&_a]:decoration-blood/60 [&_a]:underline-offset-4 [&_a:hover]:text-blood-bright [&_li]:ml-5 [&_ul]:list-disc [&_ul]:space-y-1.5">
        {children}
      </div>
    </section>
  );
}

/** 記載例のまま公開しないための注意書き（運営者情報が未設定のときだけ表示） */
export function PlaceholderNotice() {
  return (
    <p className="border border-dashed border-blood/60 bg-clot/40 px-4 py-3 text-xs leading-relaxed text-[#f1b4b4]">
      ※ 運営者名・メールアドレスが記載例のままです。公開前に <code className="text-paper">src/data/site.ts</code> を書き換えてください。
    </p>
  );
}
