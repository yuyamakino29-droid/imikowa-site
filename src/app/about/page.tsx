import type { Metadata } from "next";
import Link from "next/link";
import { PlaceholderNotice, Section, StaticPage } from "@/components/StaticPage";
import { CONTACT_EMAIL, IS_PLACEHOLDER_CONTACT, OPERATOR_NAME, SITE_NAME } from "@/data/site";

export const metadata: Metadata = {
  title: "当サイトについて",
  description: `${SITE_NAME}は、オリジナルの「意味がわかると怖い話」を集めた短編ミステリーのアーカイブサイトです。`,
};

export default function AboutPage() {
  return (
    <StaticPage
      eyebrow="ABOUT"
      title="当サイトについて"
      lead="一度目は、なんでもない話。二度目に読んだとき、あなたは違和感の正体に気づく。"
    >
      {IS_PLACEHOLDER_CONTACT && <PlaceholderNotice />}

      <Section title={`${SITE_NAME}とは`}>
        <p>
          {SITE_NAME}は、オリジナルの「意味がわかると怖い話（意味怖）」を集めた、短編ミステリーのアーカイブサイトです。
        </p>
        <p>
          一見なんでもない日常の話の中に、恐ろしい真相へとつながる小さな違和感がひそんでいます。読み終えたら、もう一度本文を読み返してみてください。それでも真相がわからないときは、各話の下にある「解説（意味）を見る」を開くと、真相とともに本文中の伏線が赤く浮かび上がります。
        </p>
        <p>掲載しているストーリーはすべて当サイトのオリジナル作品であり、フィクションです。</p>
      </Section>

      <Section title="サイトの楽しみ方">
        <ul>
          <li>カテゴリやキーワードで、読みたい話を探せます。</li>
          <li>「ランダムに1話読む」で、まだ知らない話に出会えます。</li>
          <li>気に入った話には「しおり」を挟んで、あとから一覧で読み返せます。</li>
          <li>文字サイズ（小・中・大）は、読みやすい大きさに切り替えられます。</li>
        </ul>
      </Section>

      <Section title="運営者情報">
        <dl className="divide-y divide-line border-y border-line text-sm">
          {[
            ["サイト名", SITE_NAME],
            ["運営者", OPERATOR_NAME],
            ["連絡先", CONTACT_EMAIL],
          ].map(([k, v]) => (
            <div key={k} className="grid grid-cols-[6rem_1fr] gap-4 py-3 sm:grid-cols-[8rem_1fr]">
              <dt className="tracking-[0.15em] text-faint">{k}</dt>
              <dd className="break-all">{v}</dd>
            </div>
          ))}
        </dl>
        <p>
          ご意見・ご感想・お問い合わせは、<Link href="/contact">お問い合わせページ</Link>からお送りください。個人情報の取り扱いについては
          <Link href="/privacy">プライバシーポリシー・免責事項</Link>をご覧ください。
        </p>
      </Section>
    </StaticPage>
  );
}
