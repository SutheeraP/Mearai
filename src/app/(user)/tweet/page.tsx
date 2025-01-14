import Link from "next/link";
import React from "react";
import Navbar from "~/app/_components/layout/Navbar";

export default function page() {
  return (
    <div className="pt-3">
      <div className="hidden py-2 text-center text-slate-500 md:block">
        {" "}
        This page is only for mobile.{" "}
        <Link href={"/"} className="underline">
          back to homepage
        </Link>
      </div>
      <div className="md:hidden">
        <Navbar />
      </div>
    </div>
  );
}
