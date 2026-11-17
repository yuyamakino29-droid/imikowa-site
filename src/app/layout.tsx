import type { Metadata } from "next";
import { Shippori_Mincho } from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import { ADSENSE_CLIENT_ID } from "@/lib/ads";
import { STORAGE_KEYS } from "@/lib/prefs";
import "./globals.css";

const shippori = Shippori_Mincho({
  weight: ["400", "600", "800"],
  subsets: ["latin"],
  // 日本語グリフは unicode-range で必要な分だけ読み込まれるため、プリロードはしない
  preload: false,
  display: "swap",
  variable: "--font-shippori",
});

export const metadata: Metadata = {
  title: {
    default: "意味怖アーカイブ｜意味がわかると怖い話",
    template: "%s｜意味怖アーカイブ",
  },
  description: "読み終えたあと、もう一度読み返したくなる。意味がわかると怖い話の短編アーカイブ。",
};

// 保存済みの文字サイズを描画前に反映し、切り替え時のちらつきを防ぐ
const fontSizeScript = `try{var s=localStorage.getItem(${JSON.stringify(STORAGE_KEYS.fontSize)});if(s==="sm"||s==="md"||s==="lg")document.documentElement.dataset.fontSize=s}catch(e){}`;

const FOOTER_LINKS = [
  ["/", "トップへ戻る"],
  ["/about", "当サイトについて"],
  ["/privacy", "プライバシーポリシー・免責事項"],
  ["/contact", "お問い合わせ"],
] as const;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja" data-font-size="md" className={`${shippori.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: fontSizeScript }} />
      </head>
      {/* パブリッシャーIDが設定されているときだけ AdSense を読み込む */}
      {ADSENSE_CLIENT_ID && (
        <Script
          id="adsbygoogle-init"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      )}
      <body className="bg-haze flex min-h-full flex-col">
        <header className="border-b border-line/70 bg-void/80 backdrop-blur">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
            <Link href="/" className="group flex items-baseline gap-3">
              <span className="text-xl font-extrabold tracking-[0.2em] text-paper sm:text-2xl">
                意味<span className="text-blood-bright">怖</span>
              </span>
              <span className="text-[11px] tracking-[0.3em] text-faint group-hover:text-dim">ARCHIVE</span>
            </Link>
            <p className="hidden text-xs tracking-[0.2em] text-faint sm:block">意味がわかると、怖い。</p>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-line/70 px-4 py-10 text-center text-xs tracking-[0.2em] text-faint">
          <nav aria-label="サイト情報">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[13px] tracking-[0.12em] text-dim">
              {FOOTER_LINKS.map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="transition-colors hover:text-blood-bright">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className="mt-8">© 2026 意味怖アーカイブ</p>
          <p className="mt-2 text-[11px] tracking-normal">しおり・ゾッとした・文字サイズは、このブラウザ内にのみ保存されます。</p>
        </footer>
      </body>
    </html>
  );
}
