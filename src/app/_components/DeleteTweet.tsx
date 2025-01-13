"use client";

import { api } from "~/trpc/react";
import React from "react";
import { useRouter } from "next/navigation";
import BinIcon from "./svg/BinIcon";

type Props = {
  tweetId: number;
};

export default function DeleteTweet({ tweetId }: Props) {
  const router = useRouter();

  const deleteTweet = api.tweet.deleteTweet.useMutation({
    onSuccess: async (data) => {
      router.refresh();
      console.log("Delete tweet successfully:", data);
    },
    onError: (error) => {
      console.error("Error delete tweet:", error.message);
      alert(`Error delelte tweet: ${String(error)}`);
      throw Error(String(error));
    },
  });

  const handleDelete = () => {
    if (confirm("Delete jing na?")) {
      deleteTweet.mutate({
        id: tweetId,
      });
    }
  };

  return (
    <div
      onClick={handleDelete}
      className="w-fit cursor-pointer text-xs text-main"
    >
      <BinIcon />
    </div>
  );
}
