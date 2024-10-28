import React from 'react'
import { UserButton } from '@clerk/nextjs'

export default function Header() {
    return (
        <>
            <div className='fixed z-10 tracking-wide w-full flex items-center justify-center text-slate-400 font-medium border-b border-slate-500 bg-gray-800 bg-opacity-80 backdrop-blur-sm'>
                <div className='max-w-[1200px] flex justify-between w-full px-3 h-12 items-center'>
                    <div>T3-Learning</div>
                    <div><UserButton /></div>
                </div>
            </div>
            <div className='h-12'></div>
        </>
    )
}
