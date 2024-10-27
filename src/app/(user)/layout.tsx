import { type PropsWithChildren } from "react";
import Navbar from "../_components/Navbar";
import Header from "../_components/Header";

export default function Layout({ children }: PropsWithChildren) {
    return (
        <div className="bg-gray-800 text-white text-opacity-90">
            <Header />
            <div className="hidden md:grid max-w-[1200px] mx-auto grid-cols-[25%,45%,30%] gap-4 items-stretch">
                <div className="overflow-hidden pt-3">
                    <Navbar />
                </div>
                <div className="overflow-scroll">
                    {children}
                </div>
                <div className="pt-3">Trend</div>
            </div>
            <div className="md:hidden">
                {children}
            </div>
        </div>
    );
}
