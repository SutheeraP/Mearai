import React from 'react'

export default function TweetSkeleton() {
    return (
        <section className="flex gap-2 py-3 animate-pulse">
            <div className="flex items-start justify-center">
                <div className="rounded-full w-10 h-10 bg-gray-500"></div>
            </div>

            <div className='flex flex-col gap-3 w-full'>
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <div className="h-4 bg-gray-500 rounded w-1/4"></div>
                        <div className="h-4 bg-gray-500 rounded w-1/16"></div>
                    </div>
                    <div>
                        <div className="h-4 bg-gray-500 rounded w-full"></div>
                    </div>
                </div>
                {/* <div>
                    <div className="h-4 bg-gray-500 rounded w-1/4"></div>
                </div> */}
            </div>
        </section>
    )
}
