import { type PropsWithChildren } from "react";

export default function SignUpSignInLayout({ children }: PropsWithChildren) {
    return (
        <>
            <div className="flex lg:grid lg:grid-cols-2 min-h-screen bg-black">
                <div className="hidden lg:flex h-screen items-center justify-end text-white font-bold text-4xl">
                    Twitraii 😗
                </div>
                <div className="flex items-center justify-center gap-5 w-full py-3">
                    {children}
                </div>
            </div>
        </>
    );
}
