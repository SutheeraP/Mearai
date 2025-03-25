"use client";

import React, { type FormEvent } from "react";
import Navbar from "~/app/_components/layout/Navbar";
import SearchIcon from "~/app/_components/svg/SearchIcon";
import { useState } from "react";
import { api } from "~/trpc/react";
import Tweet from "~/app/_components/layout/Tweet";
import TweetSkeleton from "~/app/_components/skeleton/TweetSkeleton";

export default function Search() {
  const [search, setSearch] = useState("");
  const {
    data: result,
    isLoading: resultLoading,
    isError: resultIsError,
    error: resultError,
  } = api.tweet.getSearch.useQuery({ text: search });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const text = (formData.get("search") as string) ?? ""; // Get the value of the input field.
    setSearch(text);
    console.log("submit", text);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="sticky top-0 z-10 border-b border-slate-500 bg-dark bg-opacity-80 p-4 backdrop-blur-sm"
      >
        <div className="flex items-center rounded-full border border-slate-500 pl-3 outline-1 -outline-offset-1 outline-main has-[input:focus-within]:border-main has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2">
          <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6">
            <SearchIcon />
          </div>
          <input
            type="text"
            name="search"
            className="block min-w-0 grow bg-transparent py-2 pl-1 pr-3 text-[16px] text-base text-slate-100 placeholder:text-slate-500 focus-within:relative focus:outline-none sm:text-sm/6"
            placeholder="Search"
          />
        </div>
      </form>
      {resultLoading ? (
        <div className="px-4">
          <TweetSkeleton />
        </div>
      ) : result?.length ? (
        <div className="flex flex-col divide-y divide-slate-500 border-gray-800 pb-20">
          {result.map((tweet) => (
            <Tweet
              id={tweet.id}
              text={tweet.text}
              timestamp={tweet.timestamp}
              userId={tweet.user.clerkId}
              username={tweet.user.username}
              userPhoto={tweet.user.photo}
              likes={tweet.amountLike}
              isLiked={tweet.isLiked}
              images={tweet.tweetImages}
              key={tweet.id}
              isCurrentUserPost={tweet.isCurrentUserPost}
            />
          ))}
        </div>
      ) : (
        <div className="pt-24 text-center font-semibold">No Result.</div>
      )}

      <div className="md:hidden">
        <Navbar />
      </div>
    </div>
  );
}
