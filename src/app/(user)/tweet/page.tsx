import Link from 'next/link'
import React from 'react'
import Sidebar from '~/app/_components/Sidebar'

export default function page() {
    return (
        <div className='pt-3'>
            <div className='hidden md:block text-center py-2 text-slate-500'> This page is only for mobile. <Link href={'/'} className='underline'>back to homepage</Link></div>
            <div className='md:hidden'><Sidebar /></div>
        </div>
    )
}
