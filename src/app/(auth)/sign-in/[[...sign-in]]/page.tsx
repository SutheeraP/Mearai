
import React from 'react'
import { SignIn } from "@clerk/nextjs";

export default function page() {
    console.log('CLERK_SIGN_IN_FALLBACK_REDIRECT_URL:', process.env.CLERK_SIGN_IN_FALLBACK_REDIRECT_URL); 
    return (
        <div className="">
            <SignIn fallbackRedirectUrl={process.env.CLERK_SIGN_IN_FALLBACK_REDIRECT_URL} 
            signUpUrl={process.env.CLERK_SIGN_UP_URL} />
        </div>
    );
}
