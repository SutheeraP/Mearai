'use client'
import React from "react";
import Image from "next/image";
import { type Tweet } from "~/app/type";

// time format
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addDefaultLocale(en);

// component
import EditTweet from "~/app/_components/input/EditTweet";
import LikeTweet from "~/app/_components/input/LikeTweet";
import ImageTweet from "~/app/_components/layout/ImageTweet";
import DeleteTweet from "~/app/_components/input/DeleteTweet";
import Link from "next/link";

export default function Tweet({
  id,
  text,
  timestamp,
  userId,
  username,
  userPhoto,
  likes,
  images,
  isLiked,
  isCurrentUserPost,
}: Tweet) {
  // console.log(tweet.user.username)
  const timeAgo = new TimeAgo("en-US");

  return (
    <section
      // key={id}
      className="flex gap-4 px-3 py-3 text-sm md:px-4 md:text-base"
    >
      <Link
        className="relative aspect-square h-12 w-12 cursor-pointer"
        href={'/'+username}
      >
        <Image
          src={userPhoto}
          alt="Profile Image"
          fill
          className="rounded-full object-cover"
        />
      </Link>

      {/* col content */}
      <div className="flex w-full flex-col gap-3">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold">{username}</h2>
            <p>·</p>
            <p className="text-slate-500">{timeAgo.format(timestamp)}</p>
          </div>
          <div className="break-all">{text}</div>
        </div>

        {/* images section */}
        {images.length != 0 && (
          <div className="grid aspect-video grid-cols-2 gap-2">
            {images.map((image, i) => (
              <ImageTweet
                key={i}
                index={i}
                length={images.length}
                mode="show"
                path={process.env.NEXT_PUBLIC_AWS_CLOUDFRONT + image}
              />
            ))}
          </div>
        )}

        {/* like and edit */}
        <div className="flex justify-between">
          <LikeTweet tweetId={id} isLiked={isLiked} likes={likes} />
          <div className="flex items-center gap-4">
            {isCurrentUserPost && (
              <>
                <EditTweet tweetId={id} tweetText={text} tweetImage={images} />
                <DeleteTweet tweetId={id} />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
