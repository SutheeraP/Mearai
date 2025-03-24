import React from "react";
import { api } from "~/trpc/server";
import Tweet from "~/app/_components/layout/Tweet";
import Navbar from "~/app/_components/layout/Navbar";

export default async function Home() {
  const tweets = await api.tweet.getAllTweets();

  return (
    <>
      <div className="flex flex-col divide-y divide-slate-500 border-gray-800 pb-20">
        {tweets.map((tweet) => (
          <Tweet
            id={tweet.id}
            text={tweet.text}
            timestamp={tweet.timestamp}
            userId={tweet.user.clerkId}
            username={tweet.user.username}
            userPhoto={tweet.user.photo}
            likes={tweet.amountLike}
            isLiked={tweet.isLiked}
            images={tweet.tweetImages}
            key={tweet.id}
            isCurrentUserPost={tweet.isCurrentUserPost}
          />
        ))}
      </div>
      <div className="md:hidden">
        <Navbar />
      </div>
    </>
  );
}
