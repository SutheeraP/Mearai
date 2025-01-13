"use client";
import React from "react";
import { useState } from "react";
import ModalTweet from "./ModalTweet";
import EditIcon from "./svg/EditIcon";

type Props = {
  tweetId: number;
  tweetText: number;
};

export default function EditTweet({ tweetId, tweetText }: Props) {
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
