import { cacheLife } from "next/cache";
import type { TweetsResponse } from "@/types/tweet";

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
      <h1 className="text-2xl font-bold mb-4">Latest Tweets</h1>
      <ul className="space-y-3">
        {data.posts.map((tweet) => (
          <li key={tweet.id} className="border-b pb-3">
            {tweet.body}
          </li>
        ))}
      </ul>
    </main>
  );
}