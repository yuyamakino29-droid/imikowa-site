import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import { PlaceholderNotice, Section, StaticPage } from "@/components/StaticPage";
import { CONTACT_EMAIL, IS_PLACEHOLDER_CONTACT, SITE_NAME } from "@/data/site";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: `${SITE_NAME}へのお問い合わせ`,
};

export default function ContactPage() {
  return (
    <StaticPage eyebrow="CONTACT" title="お問い合わせ" lead="ご意見・ご感想、掲載内容に関するご連絡などはこちらからお送りください。">
      {IS_PLACEHOLDER_CONTACT && <PlaceholderNotice />}

      <Section title="お問い合わせフォーム">
        <p className="text-sm text-dim">
          「メールアプリで送信する」を押すと、ご利用のメールアプリが入力内容を記入した状態で開きます。内容を確認のうえ、そのまま送信してください（このページから直接データが送られることはありません）。
        </p>
        <ContactForm email={CONTACT_EMAIL} siteName={SITE_NAME} />
      </Section>

      <Section title="メールでのお問い合わせ">
        <p>
          フォームがうまく動かない場合は、下記のアドレスへ直接メールをお送りください。
          <br />
          <a href={`mailto:${CONTACT_EMAIL}`} className="break-all">
            {CONTACT_EMAIL}
          </a>
        </p>
        <p className="text-sm text-dim">
          いただいた個人情報は、お問い合わせへの回答のためにのみ利用します。詳しくは
          <Link href="/privacy">プライバシーポリシー</Link>をご覧ください。内容によってはお返事できない場合や、お時間をいただく場合があります。
        </p>
      </Section>
    </StaticPage>
  );
}
