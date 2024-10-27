"use client"
import React from 'react'
import { api } from '~/trpc/react';

export default function CreateTweet() {
    const createTweet = api.tweet.createTweet.useMutation({})

    const handleSubmit = (formData: FormData) => {
        const tweetTextVal = formData.get("tweetText") as string;
        createTweet.mutate({
            text: tweetTextVal,
            likes: 10,
            retweets: 5,
            timestamp: new Date().toISOString(),
            is_retweet: false,
            is_reply: false,
        });
        // if (!(user?.id)) return;
        // createTweet.mutate({
        //     text: tweetTextVal,
        //     likes: 10,
        //     retweets: 5,
        //     timestamp: new Date().toISOString(),
        //     is_retweet: false,
        //     is_reply: false,
        //     user_id: 1,
        // });
    };

    return (
        <div>
            <form
                action={handleSubmit}
                className="grid h-48 grid-cols-[15%,85%] bg-gray-800 pl-2 pr-2 text-white"
            >
                <input
                    name="tweetText"
                    type="text"
                    placeholder="What's happening!?"
                    // onChange={handleInputChange}
                    // value={tweetText}
                    className="border-bottom m-2 border-black bg-transparent placeholder:text-gray-400 focus:outline-none"
                ></input>
                <div className="flex flex-row items-center justify-end border-t border-blue-300">
                    <button
                        type="submit"
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
