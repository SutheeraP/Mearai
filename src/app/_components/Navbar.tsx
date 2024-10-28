
import { UserButton } from '@clerk/nextjs'
import React from 'react'
import CreateTweet from './CreateTweet'
import getCurrentUser from '../function/currentUser'

export default async function Navbar() {
    const user = await getCurrentUser()
    const userButtonAppearance = {
        elements: {
            userButtonAvatarBox: "w-10 h-10", // Custom width and height
            // userButtonPopoverCard: "bg-blue-100", // Custom background for the popover card
            // userButtonPopoverActionButton: "text-red-600", // Custom text color for action buttons
        },
    }
    return (
        <div className='flex flex-col gap-4 pl-3'>
            <div className='flex gap-4 items-center'>
                <span><UserButton appearance={userButtonAppearance} /></span>
                <span className='font-semibold leading-tight'> {user?.username}</span>
            </div>
            {user && <CreateTweet userId={user.id} />}
            <div className='text-sm text-slate-500'>
                <div>Refresh page to see latest tweet</div>
            </div>
        </div >
    )
}
