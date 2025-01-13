"use client";
import React from "react";
import HomeIcon from "./svg/HomeIcon";
import NavItem from "./NavItem";
import ModalTweet from "./ModalTweet";
import SearchIcon from "./svg/SearchIcon";
import ProfileIcon from "./svg/ProfileIcon";
import { useState } from "react";

export default function Navbar() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && (
        <ModalTweet
          onClose={() => {
            setShowModal(!showModal);
          }}
        />
      )}
      {/* md */}
      <div className="hidden flex-col gap-2 px-3 text-sm md:flex md:pr-0 md:text-base">
        <NavItem icon={HomeIcon} label="Home" />
        <NavItem icon={SearchIcon} label="Search" />
        <NavItem icon={ProfileIcon} label="Profile" />
        <div
          className="mt-4 w-full cursor-pointer rounded-md bg-slate-100 py-2 text-center font-semibold uppercase text-dark hover:bg-main"
          onClick={() => {
            console.log("click pc");
            setShowModal(!showModal);
          }}
        >
          Post
        </div>
      </div>

      {/* mobile */}
      <div className="md:hidden">
        <div className="absolute bottom-0 w-full">
          <div className="flex w-full justify-end rounded-md p-4">
            <div
              onClick={() => {
                console.log("click");
                setShowModal(!showModal);
              }}
              className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-slate-100 text-2xl leading-tight text-gray-800 hover:bg-main"
            >
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
