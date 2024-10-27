import React from 'react'
import { type Tweet } from '@prisma/client'
import Image from 'next/image';

import { createClerkClient } from '@clerk/backend'
const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })

type Props = {
  tweet: Tweet;
};

export default async function Tweet({ tweet }: Props) {
  // const userID = tweet.userId
  const postUser = await clerkClient.users.getUser(tweet.userId)
  const options = {
    // year: "numeric",
    month: "long",
    day: "numeric",
  };
  return (
    <div>
      <section
        key={tweet.id}
        className="flex gap-2 px-4 py-3"
      >
        <div className="flex items-start justify-center">
          <Image src={postUser.imageUrl} alt='Profile Image' width={40} height={40} className="rounded-full aspect-square object-cover" />
        </div>

        <div className='flex flex-col gap-3'>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h2 className="font-semibold">{postUser.username}</h2>
              <p>·</p>
              <p className="text-slate-500">
                {tweet.timestamp.toLocaleDateString("en-US")}
              </p>
              <p className="text-slate-500">
                {tweet.timestamp.toLocaleTimeString("en-US")}
              </p>
            </div>
            <div>{tweet.text}</div>
          </div>
          <div className='text-slate-500 text-xs'>delete</div>
          {/* <div className="grid grid-cols-4 justify-center">
            <div className="flex items-center">
              Like
              <div>{tweet.likes}</div>
            </div>
          </div> */}
        </div>
      </section>
    </div>
  )
}
