"use client"

import { api } from '~/trpc/react';
import React from 'react'

type Props = {
    tweetId: number;
};

export default function DeleteTweet({ tweetId }: Props) {
    const deleteTweet = api.tweet.deleteTweet.useMutation({})

    const handleDelete = () => {
        if (confirm('Are you sure?')) {
            deleteTweet.mutate({
                id: tweetId
            });
        }
    };

    return (
        <div onClick={handleDelete} className='cursor-pointer text-slate-500 text-xs'>Delete</div>
    )
}
