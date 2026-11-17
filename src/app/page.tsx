import StoryBrowser from "@/components/StoryBrowser";
import { allStories, categories, toSummary } from "@/lib/stories";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
      <section className="py-14 text-center sm:py-20">
        <p className="text-[11px] tracking-[0.5em] text-blood-bright">IMIKOWA ARCHIVE</p>
        <h1 className="mt-5 text-3xl font-extrabold leading-snug tracking-[0.18em] text-paper sm:text-5xl">
          意味がわかると
          <br className="sm:hidden" />
          <span className="text-blood-bright">怖い</span>話
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-sm leading-loose tracking-[0.08em] text-dim">
          一度目は、なんでもない話。
          <br />
          二度目に読んだとき、あなたは違和感の正体に気づく。
        </p>
      </section>
      <StoryBrowser stories={allStories.map(toSummary)} categories={categories} />
    </div>
  );
}
