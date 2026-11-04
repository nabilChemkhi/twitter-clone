import { cacheLife } from "next/cache";
import type { TweetsResponse } from "@/types/tweet";
import TweetCard from "@/components/TweetCard";

async function getTweets(): Promise<TweetsResponse> {
  "use cache";
  cacheLife("minutes");

  const res = await fetch("https://dummyjson.com/posts");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export default async function Home() {
  const data = await getTweets();

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold p-4">Latest Tweets</h1>
      <section className="border-x border-t border-gray-200">
        {data.posts.map((tweet) => (
          <TweetCard key={tweet.id} tweet={tweet} />
        ))}
      </section>
    </main>
  );
}