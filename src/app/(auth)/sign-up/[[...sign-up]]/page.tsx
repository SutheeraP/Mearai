
import React from 'react'
import { SignUp } from "@clerk/nextjs";

export default function page() {
    return (
        <div className="">
            <SignUp fallbackRedirectUrl={"/"} signInUrl='/sign-in' />
        </div>
    );
}
