import React from 'react'
import { api } from "~/trpc/server";
import Tweet from '~/app/_components/Tweet';
import ButtonTweet from '../_components/ButtonTweet';

export default async function Home() {
    const tweets = await api.tweet.getAllTweets()

    return (
        <>
            <div className='flex flex-col border-x border-gray-800 md:border-slate-500 divide-y divide-slate-500'>
                {
                    tweets.map((tweet) => (
                        <Tweet tweet={tweet} key={tweet.id} />
                    ))
                }
            </div>
            <div className="md:hidden">
                <ButtonTweet />
                <div className='h-16'></div>
            </div>
        </>
    )
}
