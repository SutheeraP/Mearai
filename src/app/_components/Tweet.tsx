import React from 'react'
import { type Tweet } from '@prisma/client'
import Image from 'next/image';
import DeleteTweet from './DeleteTweet';

// time format
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en)

// get current user
import getCurrentUser from '../function/currentUser'

type Props = {
  tweet: Tweet;
};

export default async function Tweet({ tweet }: Props) {
  // console.log(tweet.user.username)
  const timeAgo = new TimeAgo('en-US')

  // check auth to show delete button
  const currentUser = await getCurrentUser()
  if (!currentUser) { return; }

  return (
    <section
      key={tweet.id}
      className="flex gap-4 px-3 md:px-4 py-3 text-sm md:text-base"
    >
      <div className="relative w-12 h-12 aspect-square">
        <Image
          src={tweet.user.photo}
          alt='Profile Image' fill className="rounded-full object-cover" />
      </div>

      <div className='flex flex-col gap-3 w-full'>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold">{tweet.user.username}</h2>
            <p>·</p>
            <p className="text-slate-500">
              {timeAgo.format(tweet.timestamp)}
            </p>
          </div>
          <div className='break-all'>{tweet.text}</div>
        </div>
        {currentUser.id == tweet.userId && <DeleteTweet tweetId={tweet.id} />}
      </div>
    </section>
  )
}
