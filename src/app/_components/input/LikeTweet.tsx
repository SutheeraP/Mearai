"use client";
import React, { useState } from "react";
import HeartFillIcon from "~/app/_components/svg/HeartFillIcon";
import HeartIcon from "~/app/_components/svg/HeartIcon";
import { api } from "~/trpc/react";

type likeProps = {
  tweetId: number;
  userId: string;
  isLiked: boolean;
  likes: number;
};

export default function LikeTweet({
  tweetId,
  userId,
  isLiked,
  likes,
}: likeProps) {
  const [isLike, setIsLike] = useState(isLiked);
  const [amount, setAmount] = useState(likes);

  const like = api.tweet.likeTweet.useMutation({
    onSuccess: async (data) => {
      console.log("like tweet successfully", data);
    },
    onError: (error) => {
      setIsLike(false);
      console.error("Error like tweet", error.message);
      alert(`Error like tweet: ${String(error)}`);
      throw Error(String(error));
    },
  });

  return (
    <div className="flex items-center gap-2">
      <div className="cursor-pointer">
        {isLike ? (
          <div
            onClick={() => {
              setIsLike(false);
              setAmount((prevAmount) => prevAmount - 1);
              console.log("unlike");
            }}
          >
            <HeartFillIcon />
          </div>
        ) : (
          <div
            onClick={() => {
              setIsLike(true);
              setAmount((prevAmount) => prevAmount + 1);
              like.mutate({
                tweetId: tweetId,
                userId: userId,
              });
            }}
          >
            <HeartIcon />
          </div>
        )}
      </div>
      {amount}
    </div>
  );
}
