import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdBanner from "@/components/AdBanner";
import StoryReader from "@/components/StoryReader";
import { AD_SLOTS } from "@/lib/ads";
import { CategoryTag, FearRating, FontSizeSwitcher, RandomStoryButton } from "@/components/ui";
import { allStories, excerptOf, getStory, splitByHighlights, toParagraphs } from "@/lib/stories";

export function generateStaticParams() {
  return allStories.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: PageProps<"/stories/[id]">): Promise<Metadata> {
  const { id } = await params;
  const story = getStory(id);
  if (!story) return {};
  return { title: story.title, description: excerptOf(story) };
}

export default async function StoryPage({ params }: PageProps<"/stories/[id]">) {
  const { id } = await params;
  const story = getStory(id);
  if (!story) notFound();

  const index = allStories.findIndex((s) => s.id === story.id);
  const newer = allStories[index - 1];
  const older = allStories[index + 1];

  return (
    <article className="mx-auto max-w-2xl px-4 pb-20 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3 py-6">
        <Link href="/" className="text-xs tracking-[0.2em] text-faint transition-colors hover:text-paper">
          ← 一覧へ戻る
        </Link>
        <FontSizeSwitcher />
      </div>

      {story.image && (
        <figure className="relative -mx-4 mt-2 aspect-[4/3] overflow-hidden sm:mx-0 sm:aspect-[16/10]">
          <Image src={story.image} alt="" fill priority sizes="(min-width: 672px) 624px, 100vw" className="object-cover opacity-85" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-void/10 via-transparent to-void" />
          <div aria-hidden className="absolute inset-0 shadow-[inset_0_0_80px_rgb(10_10_12/0.9)]" />
        </figure>
      )}

      <header className={`border-b border-line pb-8 text-center ${story.image ? "relative -mt-16 pt-0" : "pt-6"}`}>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <CategoryTag>{story.category}</CategoryTag>
          <FearRating level={story.fearLevel} className="text-sm" />
        </div>
        <h1 className="mt-6 text-2xl font-extrabold leading-snug tracking-[0.14em] text-paper sm:text-3xl">{story.title}</h1>
      </header>

      <div className="pt-10">
        <StoryReader
          id={story.id}
          paragraphs={toParagraphs(story.content).map((p) => splitByHighlights(p, story.highlights))}
          highlights={story.highlights}
          explanation={toParagraphs(story.explanation)}
        />
      </div>

      {/* 解説アコーディオンの下に、本文の邪魔にならない大きさの広告枠 */}
      <AdBanner slot={AD_SLOTS.story} minHeight={100} className="mt-10" />

      <nav className="mt-14 grid gap-3 text-sm sm:grid-cols-2" aria-label="ほかの話">
        {older ? (
          <Link href={`/stories/${older.id}`} className="border border-line p-4 transition-colors hover:border-blood/70">
            <span className="block text-[11px] tracking-[0.2em] text-faint">← 前の話</span>
            <span className="mt-1 block tracking-[0.08em]">{older.title}</span>
          </Link>
        ) : (
          <span className="hidden sm:block" />
        )}
        {newer && (
          <Link href={`/stories/${newer.id}`} className="border border-line p-4 text-right transition-colors hover:border-blood/70">
            <span className="block text-[11px] tracking-[0.2em] text-faint">次の話 →</span>
            <span className="mt-1 block tracking-[0.08em]">{newer.title}</span>
          </Link>
        )}
      </nav>
      <div className="mt-8 text-center">
        <RandomStoryButton ids={allStories.map((s) => s.id)} excludeId={story.id} label="別の話をランダムに読む" />
      </div>
    </article>
  );
}
