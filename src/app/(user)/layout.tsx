import { type PropsWithChildren } from "react";
import Navbar from "../_components/Navbar";
import Header from "../_components/Header";

export default function Layout({ children }: PropsWithChildren) {
    return (
        <div className="bg-gray-800 text-white text-opacity-90">
            <Header />
            <div className="grid h-[100vh] grid-cols-[25%,45%,30%] gap-4 items-stretch">
                <div className="overflow-hidden">
                    <Navbar />
                </div>
                <div className="overflow-scroll">
                    {children}
                </div>
                <div className="">Trend</div>
            </div>
        </div>
    );
}
