"use client";
import { useParams } from "next/navigation";
// import { api } from "~/trpc/server";
import { api } from "~/trpc/react";
import Tweet from "~/app/_components/layout/Tweet";
import Image from "next/image";
import { useState } from "react";

export default function Page() {
  const { username } = useParams();
  const [selectedTab, setSelectedTab] = useState<"post" | "like">("post");

  if (typeof username === "string") {
    const {
      data: user,
      isLoading: userLoading,
      isError: userIsError,
      error: userError,
    } = api.tweet.getUser.useQuery();

    const {
      data: userPost,
      isLoading: postLoading,
      isError: postIsError,
      error: postError,
    } = api.tweet.getTweetbyUser.useQuery();

    const {
      data: userLiked,
      isLoading: likedLoading,
      isError: likedIsError,
      error: likedError,
    } = api.tweet.getUserLikeTweet.useQuery();

    if (userLoading) {
      return <div>user loading</div>;
    }
    if (!user) {
      return <div>not found user</div>;
    }
    if (postLoading) {
      return <div>tweetLoading</div>;
    }
    if (!userPost) {
      return <div>not found tweet</div>;
    }

    if (!userLiked) {
      return <div>not found like</div>;
    }

    return (
      <div className="relative">
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
        <div className="flex flex-col divide-y divide-slate-500 border-x border-gray-800 pb-20 md:border-slate-500">
          {selectedTab == "post"
            ? userPost.map((tweet) => (
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
            : userLiked.map((tweet) => (
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
              ))}
        </div>
      </div>
    );
  } else {
    return <div>not found ja</div>;
  }
}
