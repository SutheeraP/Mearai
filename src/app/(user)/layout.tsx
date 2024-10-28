import { type PropsWithChildren } from "react";
import Sidebar from "../_components/Sidebar";
import Header from "../_components/Header";
import Trend from "../_components/Trend";

export default function Layout({ children }: PropsWithChildren) {
    return (
        <div className="bg-gray-800 text-white text-opacity-90 relative">
            <Header />
            <div className="md:grid md:grid-cols-12 justify-center gap-4 max-w-[1200px] w-full mx-auto overflow-hidden  h-screen">
                <div className="hidden md:grid md:col-span-3 pt-[60px]">
                    <Sidebar />
                </div>
                <div className="h-screen overflow-scroll md:grid md:col-span-6 pt-12">
                    {children}
                </div>
                <div className="hidden md:grid md:col-span-3 pt-[60px]">
                    <Trend />
                </div>
            </div>
        </div>
    );
}
