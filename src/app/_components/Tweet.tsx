import React from "react";
import Image from "next/image";
import DeleteTweet from "./DeleteTweet";
import { type Tweet } from "../type";

// time format
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addDefaultLocale(en);

// get current user
import getCurrentUser from "../function/currentUser";

export default async function Tweet({
  id,
  text,
  timestamp,
  userId,
  username,
  userPhoto,
}: Tweet) {
  // console.log(tweet.user.username)
  const timeAgo = new TimeAgo("en-US");

  // check auth to show delete button
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return;
  }

  return (
    <section
      key={id}
      className="flex gap-4 px-3 py-3 text-sm md:px-4 md:text-base"
    >
      <div className="relative aspect-square h-12 w-12">
        <Image
          src={userPhoto}
          alt="Profile Image"
          fill
          className="rounded-full object-cover"
        />
      </div>

      <div className="flex w-full flex-col gap-3">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold">{username}</h2>
            <p>·</p>
            <p className="text-slate-500">{timeAgo.format(timestamp)}</p>
          </div>
          <div className="break-all">{text}</div>
        </div>
        {currentUser.id == userId && <DeleteTweet tweetId={id} />}
      </div>
    </section>
  );
}
