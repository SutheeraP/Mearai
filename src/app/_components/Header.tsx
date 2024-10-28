import React from 'react'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

export default function Header() {
    return (
        <>
            <div className='fixed z-10 tracking-wide w-full flex items-center justify-center text-slate-400 font-medium border-b border-slate-500 bg-gray-800 bg-opacity-80 backdrop-blur-sm'>
                <div className='h-12 max-w-[1200px] w-full flex justify-between items-center px-3'>
                    <Link href={'/'}>T3-Learning</Link>
                    <div><UserButton /></div>
                </div>
            </div>
            <div className='h-12'></div>
        </>
    )
}
