import React from "react";
import Navbar from "~/app/_components/layout/Navbar";
import SearchIcon from "~/app/_components/svg/SearchIcon";

export default function search() {
  return (
    <div>
      <div className="p-4">
        <div className="flex items-center rounded-full border border-slate-500 bg-dark pl-3 outline-1 -outline-offset-1 outline-main has-[input:focus-within]:border-main has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2">
          <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6">
            <SearchIcon/>
          </div>
          <input
            type="text"
            className="block min-w-0 grow bg-transparent py-2 pl-1 pr-3 text-[16px] text-base text-slate-100 placeholder:text-slate-500 focus-within:relative focus:outline-none sm:text-sm/6"
            placeholder="Search"
          />
        </div>
      </div>
      <div className="md:hidden">
        <Navbar />
      </div>
    </div>
  );
}
