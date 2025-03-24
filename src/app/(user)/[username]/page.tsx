"use client";
import { useParams } from "next/navigation";
// import { api } from "~/trpc/server";
import { api } from "~/trpc/react";
import Tweet from "~/app/_components/layout/Tweet";
import Image from "next/image";

export default function Page() {
  const { username } = useParams();

  if (typeof username === "string") {
    const {
      data: user,
      isLoading: userLoading,
      isError: userIsError,
      error: userError,
    } = api.tweet.getUser.useQuery({ username: username });

    const {
      data: tweets,
      isLoading: tweetLoading,
      isError: tweetIsError,
      error: tweetError,
    } = api.tweet.getTweetbyUser.useQuery({ username: username });

    if (userLoading) {
      return <div>user loading</div>;
    }
    if (!user) {
      return <div>not found user</div>;
    }
    if (tweetLoading) {
      return <div>tweetLoading</div>;
    }
    if (!tweets) {
      return <div>not found tweet</div>;
    }

    // const test = tweets[0];
    // if (!test) {
    //   return <div>not found test</div>;
    // }

    // console.log(test)

    // console.log(tweets);
    // fetch user tweets
    // fetch user likes

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
        <section className="sticky top-0 z-10 grid grid-cols-2 bg-dark bg-opacity-80 font-medium backdrop-blur-sm  text-center text-sm">
          <div className="border-b-2 border-main px-4 py-4">Posts</div>
          <div className="border-b-2 border-slate-500 border-opacity-50 px-4 py-4">Likes</div>
        </section>
        <div className="flex flex-col divide-y divide-slate-500 border-x border-gray-800 pb-20 md:border-slate-500">
          {tweets.map((tweet, index) => (
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
