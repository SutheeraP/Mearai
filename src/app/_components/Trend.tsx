import React from 'react'
import TweetSkeleton from './TweetSkeleton'

export default function Trend() {
    return (
        <div className='pr-3'>
            <div className='font-semibold'>Trends</div>
            <TweetSkeleton />
            <TweetSkeleton />
            <TweetSkeleton />
        </div>
    )
}
