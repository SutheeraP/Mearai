import React from 'react'
import { type Tweet } from '@prisma/client'
import Image from 'next/image';

type Props = {
  tweet: Tweet;
};

export default async function Tweet({ tweet }: Props) {
  const options = {
    // year: "numeric",
    month: "long",
    day: "numeric",
  };
  return (
    <div>
      <section
        key={tweet.id}
        className="grid grid-cols-[15%,85%] px-2 py-2"
      >
        <div className="flex items-center justify-center">
          <Image src={''} width={10} height={10} alt='Profile Image' />
        </div>
        <div className="grid grid-rows-3">
          <div className="mb-2 flex items-center gap-2">
            <h2 className="font-semibold">username</h2>
            <p>·</p>
            <p className="text-slate-500">
              {tweet.timestamp.toLocaleDateString("en-US")}
            </p>
            <p className="text-slate-500">
              {tweet.timestamp.toLocaleTimeString("en-US")}
            </p>
          </div>
          <div>{tweet.text}</div>
          <div className="grid grid-cols-4 justify-center">
            <div className="flex items-center">
              {/* <HeartHandshake className={iconGap} /> */}
              Like
              <div>{tweet.likes}</div>
            </div>
            <div className="flex items-center">
              {/* <Repeat2 className={iconGap} /> */}
              Retweet
              <div>{tweet.retweets}</div>
            </div>
            <div className="flex items-center">
              Share
              {/* <Share className={iconGap} /> */}
              {/* <div>{tweet.shares}</div> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
