
import React from 'react'
import { SignUp } from "@clerk/nextjs";

export default function page() {
    return (
        <div className="">
            {/* <h1 className="text-6xl">Happening now</h1>
            <h2 className="text-4xl">Join today.</h2> */}
            <SignUp fallbackRedirectUrl={"/"} signInUrl='/sign-in' />
        </div>
    );
}
