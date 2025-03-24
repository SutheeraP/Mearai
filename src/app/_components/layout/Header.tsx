import React from "react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Brand from "~/app/_components/svg/Brand";

export default function Header() {
  return (
    <>
      <div className="text-primary fixed z-20 flex w-full justify-center border-b border-slate-500 bg-dark bg-opacity-80 font-medium backdrop-blur-sm">
        <div className="flex h-12 w-full max-w-[1200px] items-center justify-between px-3">
          <Link href={"/"} className="font-medium tracking-wide">
            <Brand />
          </Link>
          <UserButton />
        </div>
      </div>
    </>
  );
}
