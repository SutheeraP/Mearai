import React from "react";
import { api } from "~/trpc/server";
import Tweet from "~/app/_components/Tweet";
import Navbar from "../_components/Navbar";

export default async function Home() {
  const tweets = await api.tweet.getAllTweets();

  return (
    <>
      <div className="flex flex-col divide-y divide-slate-500 border-x border-gray-800 pb-20 md:border-slate-500">
        {tweets.map((tweet) => (
          <Tweet
            id={tweet.id}
            text={tweet.text}
            timestamp={tweet.timestamp}
            userId={tweet.user.clerkId}
            username={tweet.user.username}
            userPhoto={tweet.user.photo}
            key={tweet.id}
          />
        ))}
      </div>
      <div className="md:hidden">
        <Navbar />
      </div>
    </>
  );
}
