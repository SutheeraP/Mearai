"use client";
import { useParams } from "next/navigation";
// import { api } from "~/trpc/server";
import { api } from "~/trpc/react";
import Tweet from "~/app/_components/layout/Tweet";
import Image from "next/image";
import { useState } from "react";
import Navbar from "~/app/_components/layout/Navbar";

export default function Page() {
  const { username } = useParams();
  const [selectedTab, setSelectedTab] = useState<"post" | "like">("post");

  if (typeof username !== "string") {
    return <div>Username not correct</div>;
  }

  const {
    data: user,
    isLoading: userLoading,
    isError: userIsError,
    error: userError,
  } = api.tweet.getUser.useQuery({ username: username });

  const {
    data: userPost,
    isLoading: postLoading,
    isError: postIsError,
    error: postError,
  } = api.tweet.getTweetbyUser.useQuery({ username: username });

  const {
    data: userLiked,
    isLoading: likedLoading,
    isError: likedIsError,
    error: likedError,
  } = api.tweet.getUserLikeTweet.useQuery({ username: username });

  if (userIsError) {
    return (
      <section className="my-6 flex flex-col gap-3 text-center">
        <div className="relative mx-auto aspect-square h-24 rounded-full bg-slate-500"></div>
        <div className="text-base font-semibold">{username}</div>
        <div className="pt-12 font-semibold">
          This account does&apos;t exist
        </div>
      </section>
    );
  }

  if (userLoading || postLoading || likedLoading) {
    return (
      <section className="my-6 flex animate-pulse flex-col gap-3">
        <div className="relative mx-auto aspect-square h-24 rounded-full bg-slate-500"></div>
        <div className="mx-auto h-4 w-20 rounded bg-slate-500"></div>
      </section>
    );
  }

  return (
    <div>
      {user ? (
        <section className="my-6 flex flex-col gap-3 text-center">
          <div className="relative mx-auto aspect-square h-24">
            <Image
              src={user?.photo}
              alt="Profile Image"
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div className="text-base font-semibold">{username}</div>
        </section>
      ) : null}

      <section className="sticky top-0 z-10 grid grid-cols-2 bg-dark bg-opacity-80 text-center text-sm font-medium backdrop-blur-sm">
        <div
          className={`cursor-pointer border-b-2 px-4 py-4 ${selectedTab == "post" ? "border-main" : "border-slate-500 border-opacity-50"}`}
          onClick={() => {
            setSelectedTab("post");
          }}
        >
          Posts
        </div>
        <div
          className={`cursor-pointer border-b-2 px-4 py-4 ${selectedTab == "like" ? "border-main" : "border-slate-500 border-opacity-50"}`}
          onClick={() => {
            setSelectedTab("like");
          }}
        >
          Likes
        </div>
      </section>
      <div className="flex flex-col divide-y divide-slate-500 border-x border-gray-800 pb-20">
        {selectedTab == "post" ? (
          userPost?.length ? (
            userPost.map((tweet) => (
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
                isCurrentUserPost={tweet.isCurrentUserPost}
                key={tweet.id}
              />
            ))
          ) : (
            <div className="pt-12 text-center font-semibold">No posts yet.</div>
          )
        ) : userLiked?.length ? (
          userLiked.map((tweet) => (
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
              isCurrentUserPost={tweet.isCurrentUserPost}
              key={tweet.id}
            />
          ))
        ) : (
          <div className="pt-12 text-center font-semibold">
            Nothing liked yet.
          </div>
        )}
      </div>
      <div className="md:hidden">
        <Navbar />
      </div>
    </div>
  );
}
