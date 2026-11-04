import Link from "next/link";
import { notFound } from "next/navigation";
import { cacheLife } from "next/cache";
import TweetCard from "@/components/TweetCard";
import type { Tweet } from "@/types/tweet";

async function getTweet(id: string): Promise<Tweet | null> {
  "use cache";
  cacheLife("minutes");

  const res = await fetch(`https://dummyjson.com/posts/${id}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export default async function TweetPage({ params }: PageProps<"/tweet/[id]">) {
  const { id } = await params;
  const tweet = await getTweet(id);

  if (!tweet) notFound();

  return (
    <main className="max-w-2xl mx-auto p-4">
      <Link href="/" className="text-sky-600 hover:underline">← Back</Link>
      <h1 className="text-xl font-bold my-4">Tweet</h1>
      <section className="border border-gray-200">
        <TweetCard tweet={tweet} />
      </section>
    </main>
  );
}