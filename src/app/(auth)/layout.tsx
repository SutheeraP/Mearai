// import { Bird } from "lucide-react";
import { type PropsWithChildren } from "react";


export default function SignUpSignInLayout({ children }: PropsWithChildren) {
    return (
        <div className="grid h-screen grid-cols-2 bg-black">
            <div className="flex h-screen items-center justify-center text-white font-bold text-4xl">
                LOGO
                {/* <Bird size={300} strokeWidth={1} color="#fff" /> // Please refer to the Lucide docs for more info on icon styling. This can be any icon that you like. */}
            </div>
            <div className="ml-8 flex flex-col items-center justify-center gap-5">
                {children}
            </div>
        </div>
    );
}
