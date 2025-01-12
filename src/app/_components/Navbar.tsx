import { UserButton } from "@clerk/nextjs";
import React from "react";
import CreateTweet from "./CreateTweet";
import ButtonTweet from "./ButtonTweet";
import getCurrentUser from "../function/currentUser";
import HomeIcon from "./svg/HomeIcon";
import NavItem from "./NavItem";
import SearchIcon from "./svg/SearchIcon";
import ProfileIcon from "./svg/ProfileIcon";

export default async function Navbar() {
  const user = await getCurrentUser();

  return (
    <>
      {/* md */}
      <div className="hidden flex-col gap-2 px-3 text-sm md:flex md:pr-0 md:text-base">
        <NavItem icon={HomeIcon} label="Home" />
        <NavItem icon={SearchIcon} label="Search" />
        <NavItem icon={ProfileIcon} label="Profile" />
        <div className="mt-4 w-full cursor-pointer rounded-md bg-slate-100 py-2 text-center font-semibold uppercase text-dark hover:bg-main">
          Post
        </div>
        {/* {user && <CreateTweet userId={user.id} />} */}
      </div>

      {/* mobile */}
      <div className="md:hidden">
        <div className="absolute bottom-0 w-full">
          <div className="flex w-full justify-end rounded-md p-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-2xl leading-tight text-gray-800">
              +
            </div>
          </div>

          <div className="grid grid-cols-3 place-items-center border-t border-slate-500 bg-dark bg-opacity-80 py-6 backdrop-blur-sm">
            <NavItem icon={HomeIcon} label="Home" />
            <NavItem icon={SearchIcon} label="Search" />
            <NavItem icon={ProfileIcon} label="Profile" />
          </div>
        </div>
      </div>
    </>
  );
}
