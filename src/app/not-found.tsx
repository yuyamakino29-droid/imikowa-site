import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-28 text-center">
      <p className="text-[11px] tracking-[0.5em] text-blood-bright">404</p>
      <h1 className="mt-5 text-2xl font-extrabold tracking-[0.16em]">その話は、ここにはありません</h1>
      <p className="mt-5 text-sm leading-loose text-dim">……あるいは、最初から存在しなかったのかもしれません。</p>
      <Link href="/" className="mt-10 inline-block border border-line px-6 py-2.5 text-sm tracking-[0.15em] transition-colors hover:border-blood hover:text-blood-bright">
        一覧へ戻る
      </Link>
    </div>
  );
}
