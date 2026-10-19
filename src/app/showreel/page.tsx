import type { Metadata } from "next";
import { Suspense } from "react";
import { Showreel } from "./Showreel";

export const metadata: Metadata = {
  title: "Showreel",
  robots: { index: false, follow: false },
};

// A self-playing brand film built from the site's own assets, for screen recording.
//   /showreel                  16:9, loops
//   /showreel?format=vertical  9:16 for Reels / Shorts / TikTok
//   /showreel?once=1           plays once and sets window.__showreelDone (used by scripts/record-showreel.mjs)
async function Reel({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const q = await searchParams;
  return <Showreel vertical={q.format === "vertical"} loop={q.once !== "1"} />;
}

export default function ShowreelPage(props: PageProps<"/showreel">) {
  return (
    <Suspense fallback={<div className="h-[100dvh] bg-black" />}>
      <Reel searchParams={props.searchParams} />
    </Suspense>
  );
}
