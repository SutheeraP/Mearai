"use client"
import React from 'react'
import { api } from '~/trpc/react';

type Props = {
    userId: string;
};

export default function CreateTweet({ userId }: Props) {
    const createTweet = api.tweet.createTweet.useMutation({})

    const handleSubmit = (formData: FormData) => {
        const tweetTextVal = formData.get("tweetText") as string;
        createTweet.mutate({
            text: tweetTextVal,
            user_id: userId,
            likes: 0,
            retweets: 0,
            timestamp: new Date().toISOString(),
            is_retweet: false,
            is_reply: false,
        });
    };

    return (
        <div>
            <form
                action={handleSubmit}
                className="grid gap-4"
            >
                <textarea
                    name="tweetText"
                    placeholder="What's happening!?"
                    // onChange={handleInputChange}
                    // value={tweetText}
                    className="border rounded-md p-2 w-full min-h-20 border-slate-100 border-opacity-50 bg-transparent placeholder:text-gray-400 focus:outline-none"
                ></textarea>
                <div className="flex">
                    <button
                        type="submit"
                        className='w-full py-2 rounded-md bg-slate-100 text-gray-800 font-semibold'
                    // disabled={!submitEnabled}
                    // className={`h-max w-max rounded ${submitEnabled
                    //     ? "cursor-pointer bg-blue-400"
                    //     : "cursor-not-allowed bg-gray-400"
                    //     } px-4 py-2 font-bold text-white`}
                    >
                        Tweet
                    </button>
                </div>
            </form>

        </div>
    )
}
