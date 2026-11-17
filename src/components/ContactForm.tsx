"use client";

import { useState } from "react";

const fieldCls =
  "mt-2 w-full border border-line bg-void px-3 py-2.5 text-sm text-paper placeholder:text-faint focus:border-blood focus:outline-none";
const labelCls = "block text-sm tracking-[0.1em]";

/**
 * お問い合わせフォーム。
 * サーバーを使わず、入力内容を件名・本文に入れた mailto: リンクでメールアプリを開く。
 */
export default function ContactForm({ email, siteName }: { email: string; siteName: string }) {
  const [opened, setOpened] = useState(false);

  return (
    <form
      className="space-y-5 border border-line bg-charcoal/80 p-5 sm:p-6"
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const name = String(data.get("name") ?? "").trim();
        const from = String(data.get("email") ?? "").trim();
        const message = String(data.get("message") ?? "").trim();
        const subject = `【${siteName}】お問い合わせ（${name} 様）`;
        const body = `お名前：${name}\nメールアドレス：${from}\n\nお問い合わせ内容：\n${message}\n`;
        window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setOpened(true);
      }}
    >
      <label className={labelCls}>
        お名前 <span className="text-xs text-blood-bright">必須</span>
        <input name="name" required maxLength={100} autoComplete="name" className={fieldCls} placeholder="山田 太郎" />
      </label>
      <label className={labelCls}>
        メールアドレス <span className="text-xs text-blood-bright">必須</span>
        <input name="email" type="email" required maxLength={200} autoComplete="email" className={fieldCls} placeholder="you@example.com" />
      </label>
      <label className={labelCls}>
        お問い合わせ内容 <span className="text-xs text-blood-bright">必須</span>
        <textarea name="message" required rows={7} maxLength={3000} className={`${fieldCls} resize-y leading-relaxed`} />
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="inline-flex h-11 items-center border border-blood bg-blood/90 px-6 text-sm tracking-[0.15em] text-white transition hover:bg-blood-bright"
        >
          メールアプリで送信する
        </button>
        {opened && (
          <p role="status" className="text-xs leading-relaxed text-dim">
            メールアプリが開かない場合は、下記のアドレスへ直接お送りください。
          </p>
        )}
      </div>
    </form>
  );
}
