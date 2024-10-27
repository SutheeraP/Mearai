import React from 'react'
import { api } from "~/trpc/server";
import Tweet from '~/app/_components/Tweet';
import { currentUser } from '@clerk/nextjs/server'

export default async function Home() {
    const tweets = await api.tweet.getAllTweets()
    const user = await currentUser()

    return (
        <div className='flex flex-col gap-4 border-x border-slate-500 divide-y divide-slate-500 min-h-screen'>
            {
                tweets.map((tweet) => (
                    <>
                        <Tweet tweet={tweet} key={tweet.id} />
                    </>
                ))
            }
        </div>
    )
}
