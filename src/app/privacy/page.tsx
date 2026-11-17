import type { Metadata } from "next";
import Link from "next/link";
import { PlaceholderNotice, Section, StaticPage } from "@/components/StaticPage";
import { IS_PLACEHOLDER_CONTACT, OPERATOR_NAME, POLICY_ESTABLISHED, SITE_NAME } from "@/data/site";

export const metadata: Metadata = {
  title: "プライバシーポリシー・免責事項",
  description: `${SITE_NAME}のプライバシーポリシー（広告配信・アクセス解析・Cookie について）と免責事項。`,
};

export default function PrivacyPage() {
  return (
    <StaticPage
      eyebrow="PRIVACY POLICY"
      title="プライバシーポリシー・免責事項"
      lead={`${SITE_NAME}（以下「当サイト」）における個人情報の取り扱い、広告配信、アクセス解析、および免責事項について定めます。`}
    >
      {IS_PLACEHOLDER_CONTACT && <PlaceholderNotice />}

      <Section title="広告の配信について">
        <p>
          当サイトでは、第三者配信の広告サービス「Google アドセンス（Google AdSense）」を利用しています。
        </p>
        <p>
          Google などの第三者配信事業者は、Cookie を使用して、ユーザーが当サイトや他のウェブサイトに過去にアクセスした際の情報に基づいて広告を配信します。Google が広告 Cookie を使用することにより、Google やそのパートナーは、当サイトや他のサイトへのアクセス情報に基づいて、ユーザーに適切な広告を表示できます。
        </p>
        <p>
          ユーザーは、
          <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer">
            Google の広告設定
          </a>
          でパーソナライズ広告を無効にできます。また、
          <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">
            www.aboutads.info
          </a>
          にアクセスすれば、パーソナライズ広告に使われる第三者配信事業者の Cookie を無効にできます。
        </p>
        <p>
          Google による広告での Cookie の取り扱いについては、
          <a href="https://policies.google.com/technologies/ads?hl=ja" target="_blank" rel="noopener noreferrer">
            Google のポリシーと規約（広告）
          </a>
          をご確認ください。
        </p>
      </Section>

      <Section title="アクセス解析ツールについて">
        <p>
          当サイトでは、サイトの利用状況を把握し内容の改善に役立てるため、Google によるアクセス解析ツール「Google アナリティクス」などのアクセス解析ツールを利用することがあります。
        </p>
        <p>
          これらのツールはトラフィックデータの収集のために Cookie を使用することがあります。トラフィックデータは匿名で収集されており、個人を特定するものではありません。Cookie を無効にすることで収集を拒否できますので、お使いのブラウザの設定をご確認ください。Google アナリティクスによるデータの取り扱いについては、
          <a href="https://policies.google.com/technologies/partner-sites?hl=ja" target="_blank" rel="noopener noreferrer">
            Google のサービスを使用するサイトやアプリから収集した情報の Google による使用
          </a>
          をご覧ください。
        </p>
      </Section>

      <Section title="ブラウザ内に保存する情報について">
        <p>
          当サイトの「しおり」「ゾッとした」「文字サイズ」の設定は、ご利用のブラウザ内（localStorage）にのみ保存されます。これらの情報が当サイトのサーバーや第三者に送信されることはありません。ブラウザのサイトデータを削除すると、保存した設定も消去されます。
        </p>
      </Section>

      <Section title="個人情報の利用目的">
        <p>
          お問い合わせの際にお送りいただいたお名前・メールアドレス等の個人情報は、お問い合わせへの回答や必要な連絡のためにのみ利用し、それ以外の目的では利用いたしません。
        </p>
        <p>法令に基づく場合を除き、ご本人の同意なく第三者に個人情報を提供することはありません。</p>
      </Section>

      <Section title="免責事項">
        <p>
          <strong className="text-blood-bright">当サイトに掲載しているストーリーは、すべて創作（フィクション）です。</strong>
          実在の人物・団体・事件・地名等とは一切関係ありません。
        </p>
        <p>
          作中には犯罪や事故、暴力などの描写が含まれる場合がありますが、それらの行為を推奨・助長する意図は一切ありません。怖い話が苦手な方、気分が優れないときの閲覧はお控えください。
        </p>
        <p>
          当サイトの情報の正確性には注意を払っておりますが、その内容を保証するものではありません。当サイトの利用によって生じたいかなる損害についても、運営者は責任を負いかねます。また、当サイトからリンクしている外部サイトの内容について、当サイトは責任を負いません。
        </p>
      </Section>

      <Section title="著作権について">
        <p>
          当サイトに掲載している文章・画像の著作権は、運営者または正当な権利者に帰属します。無断での転載・複製・改変はご遠慮ください。引用の際は、出典として当サイト名とページの URL を明記してください。
        </p>
      </Section>

      <Section title="プライバシーポリシーの変更">
        <p>
          当サイトは、法令の変更や運営方針の見直しに応じて、本ポリシーの内容を予告なく変更することがあります。変更後のポリシーは、本ページに掲載した時点から効力を生じます。
        </p>
        <p>
          本ポリシーに関するお問い合わせは、<Link href="/contact">お問い合わせページ</Link>からお願いいたします。
        </p>
      </Section>

      <p className="border-t border-line pt-6 text-right text-xs leading-loose tracking-[0.1em] text-faint">
        制定日：{POLICY_ESTABLISHED}
        <br />
        運営者：{OPERATOR_NAME}
      </p>
    </StaticPage>
  );
}
