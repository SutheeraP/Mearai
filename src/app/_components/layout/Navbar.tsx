"use client";
import React, { useEffect } from "react";
import HomeIcon from "~/app/_components/svg/HomeIcon";
import NavItem from "~/app/_components/input/NavItem";
import ModalTweet from "~/app/_components/input/ModalTweet";
import SearchIcon from "~/app/_components/svg/SearchIcon";
import ProfileIcon from "~/app/_components/svg/ProfileIcon";
import { useState } from "react";
import { api } from "~/trpc/react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const {
    data: user,
    isLoading: userLoading,
    isError: userIsError,
    error: userError,
  } = api.tweet.getCurrentUser.useQuery();

  const [showModal, setShowModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState("home");

  const path = usePathname();
  useEffect(() => {
    // console.log(path);
    if (path == "/") {
      setSelectedTab("home");
    } else if (path == "/search") {
      setSelectedTab("search");
    } else {
      setSelectedTab("profile");
    }
  }, [path]);

  const tabs = [
    { label: "Home", path: "/", icon: HomeIcon, key: "home" },
    { label: "Search", path: "search", icon: SearchIcon, key: "search" },
    {
      label: "Profile",
      path: `/${user?.username}`,
      icon: ProfileIcon,
      key: "profile",
    },
  ];

  return (
    <>
      {showModal && (
        <ModalTweet
          onClose={() => {
            setShowModal(!showModal);
          }}
          mode="create"
        />
      )}
      {/* md */}
      <div className="hidden flex-col gap-2 px-3 text-sm md:flex md:pr-0 md:text-base">
        {tabs.map((tab) => (
          <div key={tab.key}>
            <NavItem
              icon={tab.icon}
              label={tab.label}
              path={tab.path}
              isSelect={selectedTab == tab.key}
            />
          </div>
        ))}
        <div
          className="mt-4 w-full cursor-pointer rounded-md bg-slate-100 py-2 text-center font-semibold uppercase text-dark hover:bg-main"
          onClick={() => {
            // console.log("click pc");
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
                // console.log("click");
                setShowModal(!showModal);
              }}
              className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-slate-100 text-2xl leading-tight text-gray-800 hover:bg-main"
            >
              +
            </div>
          </div>
          <div className="grid grid-cols-3 place-items-center border-t border-slate-500 bg-dark bg-opacity-80 py-5 backdrop-blur-sm">
            {tabs.map((tab) => (
              <div key={tab.key}>
                <NavItem
                  icon={tab.icon}
                  label={tab.label}
                  path={tab.path}
                  isSelect={selectedTab == tab.key}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
