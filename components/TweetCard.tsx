import type { Tweet } from "@/types/tweet";

interface TweetCardProps {
  tweet: Tweet;
}

export default function TweetCard({ tweet }: TweetCardProps) {
  return (
    <article className="flex gap-3 p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <div className="w-10 h-10 shrink-0 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold">
        {tweet.userId}
      </div>

      <div className="flex-1">
        <p className="font-bold">
          User {tweet.userId}{" "}
          <span className="font-normal text-gray-500">@user{tweet.userId}</span>
        </p>

        <p className="font-semibold mt-1">{tweet.title}</p>
        <p className="text-gray-800">{tweet.body}</p>

        <div className="flex flex-wrap gap-2 mt-2">
          {tweet.tags.map((tag) => (
            <span key={tag} className="text-sky-600 text-sm">
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex gap-6 mt-3 text-sm text-gray-500">
          <span>❤️ {tweet.reactions.likes}</span>
          <span>👎 {tweet.reactions.dislikes}</span>
          <span>👁️ {tweet.views}</span>
        </div>
      </div>
    </article>
  );
}