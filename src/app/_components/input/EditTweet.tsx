"use client";
import React from "react";
import { useState } from "react";
import ModalTweet from "~/app/_components/input/ModalTweet";
import EditIcon from "~/app/_components/svg/EditIcon";

type Props = {
  tweetId: number;
  tweetText: string;
  tweetImage?: string[];
};

export default function EditTweet({ tweetId, tweetText, tweetImage }: Props) {
  const [showModal, setShowModal] = useState(false);
  // call modal with mode: edit
  return (
    <>
      {showModal && (
        <ModalTweet
          onClose={() => {
            setShowModal(!showModal);
          }}
          mode="edit"
          tweetId={tweetId}
          tweetOriginal={tweetText}
          imageOriginal={tweetImage}
        />
      )}
      <div
        onClick={() => {
          setShowModal(!showModal);
        }}
        className="cursor-pointer text-main"
      >
        <EditIcon />
      </div>
    </>
  );
}
