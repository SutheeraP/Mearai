import React from 'react'
import { api } from "~/trpc/server";

export default async function Home() {
    const tweets = await api.tweet.getAllTweets()

    return (
        <div className='flex flex-col gap-4'>
            {
                tweets.map((tweet, index) => (
                    <section
                        key={tweet.tweet_id}
                        className="grid grid-cols-[15%,85%] bg-white px-2 py-12 shadow-md dark:bg-gray-800"
                    >
                        <div className="flex items-center justify-center">
                            IMG
                            {/* <UserAvatar image_url={""} user_name={""} /> */}
                        </div>
                        <div key={index} className="grid grid-rows-3">
                            <div className="mb-2 grid grid-cols-2">
                                <h2 className="text-xl font-semibold">{tweet.tweet_id}</h2>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {/* {formatTimestamp(tweet.timestamp)} */}
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
                ))
            }
        </div>
    )
}
