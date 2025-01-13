import { type PropsWithChildren } from "react";
import Navbar from "../_components/Navbar";
import Header from "../_components/Header";
import Trend from "../_components/Trend";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="relative">
      <Header />
      <div className="relative mx-auto h-dvh w-full max-w-[1200px] justify-center gap-4 overflow-hidden md:grid md:grid-cols-12">
        <div className="hidden pt-[60px] md:col-span-3 md:grid">
          <Navbar />
        </div>
        <div className="no-scrollbar h-dvh overflow-scroll pt-12 md:col-span-6 md:grid">
          {children}
        </div>
        <div className="hidden pt-[60px] md:col-span-3 md:grid">
          <Trend />
        </div>
      </div>
    </div>
  );
}
