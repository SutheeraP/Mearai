import { type PropsWithChildren } from "react";
import Navbar from "~/app/_components/layout/Navbar";
import Header from "~/app/_components/layout/Header";
import Trend from "~/app/_components/layout/Trend";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="relative h-dvh">
      <Header />
      <div className="mx-auto w-full max-w-[1200px] justify-center overflow-hidden md:grid md:grid-cols-12 md:divide-slate-500 md:divide-x">
        <div className="hidden pt-[60px] md:col-span-3 md:grid pr-4">
          <Navbar />
        </div>
        <div className="no-scrollbar h-dvh overflow-scroll pt-12 md:col-span-6 md:grid w-full">
          {children}
        </div>
        <div className="hidden pt-[60px] md:col-span-3 md:grid pl-4">
          <Trend />
        </div>
      </div>
    </div>
  );
}
