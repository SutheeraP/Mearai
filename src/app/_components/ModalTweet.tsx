import React from "react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ModalTweetProps {
  onClose: () => void;
}

export default function ModalTweet({ onClose }: ModalTweetProps) {
  const { isLoaded, isSignedIn, user } = useUser();
  // console.log(user);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tweetText, setTweetText] = useState("");

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  const createTweet = api.tweet.createTweet.useMutation({
    onSuccess: async (data) => {
      console.log("Create tweet successfully:", data);
      router.push("/");
      router.refresh();
      setIsSubmitting(false);
      setTweetText("");
      onClose();
    },
    onError: (error) => {
      console.error("Error creating tweet:", error.message);
      alert(`Error creating tweet: ${String(error)}`);
      throw Error(String(error));
    },
  });

  const handleSubmit = (formData: FormData) => {
    setIsSubmitting(true);
    const tweetTextVal = formData.get("tweetText") as string;

    if (!tweetTextVal.length) {
      setIsSubmitting(false);
      return alert("Type something 🫵");
    }

    createTweet.mutate({
      text: tweetTextVal,
      user_id: user.id,
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <form
      action={handleSubmit}
      className="absolute top-0 z-10 h-full w-screen md:bg-main md:bg-opacity-10 md:backdrop-blur-sm"
    >
      <div className="mx-auto h-full bg-dark px-4 md:mt-12 md:h-fit md:w-[500px] md:rounded-md">
        {/* top */}
        <div className="flex items-baseline justify-between py-4">
          <div onClick={onClose} className="cursor-pointer">
            Cancle
          </div>
          <div className="flex items-baseline gap-4">
            {/* <div className="text-sm">0 / 240</div> */}
            <button
              // onClick={onClose}
              type="submit"
              disabled={isSubmitting}
              className={`${isSubmitting ? "animate-pulse" : ""} cursor-pointer rounded-md bg-main px-6 py-1 font-semibold text-dark`}
            >
              Post
            </button>
          </div>
        </div>
        {/* content */}
        <section className="flex gap-4 pb-6 text-sm md:text-base">
          <div className="relative aspect-square h-12 w-12">
            <Image
              src={user.imageUrl}
              alt="Profile Image"
              fill
              className="rounded-full object-cover"
            />
          </div>

          <textarea
            name="tweetText"
            placeholder="Me a rai?"
            onChange={(e) => {
              setTweetText(e.target.value);
            }}
            value={tweetText}
            className="h-[300px] w-full bg-transparent text-[16px] placeholder:text-slate-500 focus:outline-none"
          ></textarea>
        </section>
      </div>
    </form>
  );
}
