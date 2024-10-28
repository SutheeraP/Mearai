import React from 'react'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

export default function Header() {
    return (
        <>
            <div className='fixed z-10 w-full flex justify-center text-slate-400 font-medium border-b border-slate-500 bg-gray-800 bg-opacity-80 backdrop-blur-sm'>
                <div className='h-12 max-w-[1200px] w-full flex items-center justify-between px-3'>
                    <Link href={'/'} className='tracking-wide font-medium'>Twitraii</Link>
                    <UserButton />
                </div>
            </div>
        </>
    )
}
