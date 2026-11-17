# 意味怖アーカイブ

「意味がわかると怖い話」の短編アーカイブ（Next.js App Router + Tailwind CSS）。

## 開発

```bash
npm run dev     # http://localhost:3000
npm run build   # 本番ビルド（ストーリーデータの書き間違いもここで検出）
```

## 話を追加する

`src/data/stories.ts` の `stories` 配列に1話ぶんのオブジェクトを追加するだけです。
各項目の意味はファイル冒頭のコメントを参照してください。

- `highlights`（伏線）は本文と一字一句同じ文字列で書きます。本文に見つからない場合や `id` が重複している場合は、`npm run build` がどの話のどこが悪いかを表示して止まります。
- 挿絵を付けるときは画像を `public/images/` に置き、`image: "/images/ファイル名.jpg"` と指定します（省略すると画像なしのレイアウトになります）。ファイルが見つからない場合もビルド時に知らせます。
- カテゴリは `category` の文字列から自動で絞り込みボタンが作られます。

## 広告（Google AdSense）

`.env.local.example` を `.env.local` にコピーし、パブリッシャーIDと広告ユニットIDを設定してから `npm run build` し直してください（Vercel などで公開する場合は、同じ名前の環境変数をホスティング側に設定します）。

| 環境変数 | 内容 |
|---|---|
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | パブリッシャーID（`ca-pub-` から始まる値） |
| `NEXT_PUBLIC_ADSENSE_SLOT_INFEED` | 一覧グリッドの広告（4話ごと、話が少ないときは一覧の末尾） |
| `NEXT_PUBLIC_ADSENSE_SLOT_STORY` | 記事ページの「解説（意味）を見る」の下の広告 |

未設定のあいだは、広告の位置に「広告スペース」の枠だけが表示され、Google のスクリプトも読み込みません。パブリッシャーIDと各ユニットIDが揃った枠から、自動で実広告に切り替わります。

## アクセス解析（Microsoft Clarity）

環境変数 `NEXT_PUBLIC_CLARITY_PROJECT_ID` に Clarity のプロジェクトIDを設定して再ビルドすると、全ページの `<head>` に Clarity のトラッキングコードが入ります（未設定のあいだは読み込みません）。

## 並び順

トップページの一覧は、ページを開くたびにランダムな順番で表示されます（サーバー描画は元の順番、表示後にブラウザ側でシャッフル）。

## 保存について

しおり・ゾッとした・文字サイズは、閲覧者のブラウザ（localStorage）にのみ保存されます。サーバーには送信されず、他の閲覧者とは共有されません。
