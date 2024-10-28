import { type PropsWithChildren } from "react";
import Navbar from "../_components/Navbar";
import Header from "../_components/Header";
import Trend from "../_components/Trend";

export default function Layout({ children }: PropsWithChildren) {
    return (
        <div className="bg-gray-800 text-white text-opacity-90">
            <Header />
            <div className="flex gap-4 max-w-[1200px] mx-auto items-stretch">
                <div className="overflow-hidden pt-3 hidden md:block w-[25%]">
                    <Navbar />
                </div>
                <div className="overflow-scroll w-full md:w-[45%]">
                    {children}
                </div>
                <div className="pt-3 hidden w-full md:block md:w-[30%]">
                    <Trend />
                </div>
            </div>
        </div>
    );
}
