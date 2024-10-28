"use client"

import { api } from '~/trpc/react';
import { useRouter } from 'next/navigation'
import { useState } from 'react';

type Props = {
    userId: string;
};

export default function CreateTweet({ userId }: Props) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [tweetText, setTweetText] = useState('')

    const createTweet = api.tweet.createTweet.useMutation({
        onSuccess: async data => {
            console.log('Create tweet successfully:', data);
            router.push('/')
            router.refresh()
            setIsSubmitting(false)
            setTweetText('')
        },
        onError: error => {
            console.error('Error creating tweet:', error.message);
            alert(`Error creating tweet: ${String(error)}`);
            throw Error(String(error));
        },
    })

    const handleSubmit = (formData: FormData) => {
        setIsSubmitting(true)
        const tweetTextVal = formData.get("tweetText") as string;

        if (!tweetTextVal.length) {
            setIsSubmitting(false)
            return alert('Type something 🫵')
        }

        createTweet.mutate({
            text: tweetTextVal,
            user_id: userId,
            timestamp: new Date().toISOString(),
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
                    onChange={(e) => { setTweetText(e.target.value) }}
                    value={tweetText}
                    className="text-[16px] border rounded-md p-2 w-full min-h-28 border-slate-200 border-opacity-50 bg-transparent placeholder:text-slate-500 focus:outline-none"
                ></textarea>
                <div className="flex">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`${isSubmitting ? 'animate-pulse' : ''} w-full py-2 rounded-md bg-slate-100 text-gray-800 font-semibold`}
                    >
                        {isSubmitting ? 'Tweeting...' : 'Tweet'}
                    </button>
                </div>
            </form>
        </div>
    )
}
