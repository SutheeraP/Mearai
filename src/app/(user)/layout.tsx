import { UserButton } from "@clerk/nextjs";
import { type PropsWithChildren, type ReactNode } from "react";

// type LayoutProps = PropsWithChildren<{
//     trends: ReactNode;
// }>;

export default function Layout({ children }: PropsWithChildren) {
    return (
        <div className="grid h-[100vh] grid-cols-[25%,45%,30%] items-stretch dark:bg-gray-800">
            <div className="overflow-hidden border-r border-slate-500">
                {/* <NavBar /> */}
                Nav bar
                <UserButton />
            </div>
            <div className="overflow-scroll border-r border-slate-500 bg-gray-900">
                {children}
            </div>
            <div className="">Trend</div>
        </div>
    );
}
