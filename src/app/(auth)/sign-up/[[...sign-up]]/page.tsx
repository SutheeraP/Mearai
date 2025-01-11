
import React from 'react'
import { SignUp } from "@clerk/nextjs";

export default function page() {
    return (
        <div>
            <SignUp fallbackRedirectUrl={process.env.CLERK_SIGN_UP_FALLBACK_REDIRECT_URL} 
            signInUrl={process.env.CLERK_SIGN_IN_URL} />
        </div>
    );
}
