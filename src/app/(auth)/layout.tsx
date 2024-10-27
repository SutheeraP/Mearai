import { type PropsWithChildren } from "react";

export default function SignUpSignInLayout({ children }: PropsWithChildren) {
    return (
        <>
            <div className="flex md:grid md:grid-cols-2 min-h-screen bg-black">
                <div className="hidden md:flex h-screen items-center justify-center text-white font-bold text-4xl">
                    LOGO
                </div>
                <div className="flex items-center justify-center gap-5 w-full py-3">
                    {children}
                </div>
            </div>
        </>
    );
}
