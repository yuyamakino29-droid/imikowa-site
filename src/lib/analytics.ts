/**
 * Microsoft Clarity（アクセス解析）の設定
 *
 *   NEXT_PUBLIC_CLARITY_PROJECT_ID … Clarity のプロジェクトID（例: abcd1234ef）
 *
 * 未設定のあいだはタグを読み込まない。NEXT_PUBLIC_ の値はビルド時に埋め込まれるため、変更したら再ビルドが必要。
 */

const raw = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID?.trim() ?? "";

/** 英数字だけの値を有効なIDとみなす（スクリプトに埋め込むため、それ以外の文字は受け付けない） */
export const CLARITY_PROJECT_ID = /^[a-z0-9]{6,20}$/i.test(raw) ? raw : "";

/** Clarity 公式のトラッキングコード（プロジェクトIDだけ差し込む） */
export function clarityScript(projectId: string): string {
  return `(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", ${JSON.stringify(projectId)});`;
}
