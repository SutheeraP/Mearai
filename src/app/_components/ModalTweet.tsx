import React from "react";
import { useUser } from '@clerk/nextjs'
import Image from "next/image";

interface ModalTweetProps {
  onClose: () => void;
}

export default function ModalTweet({ onClose }: ModalTweetProps) {
  const { isLoaded, isSignedIn, user } = useUser()
  if (!isLoaded || !isSignedIn) {
    return null
  }

  return (
    <div className="absolute top-0 z-10 h-screen w-screen md:bg-main md:bg-opacity-10 md:backdrop-blur-sm">
      <div className='md:w-[400px] bg-dark px-4'>
        {/* top */}
        <div className="flex items-baseline justify-between py-6">
          <div onClick={onClose} className="cursor-pointer">
            Cancle
          </div>
          <div className="flex items-baseline gap-4">
            <div className="text-sm">0 / 240</div>
            <div
              onClick={onClose}
              className="cursor-pointer rounded-full bg-main px-6 py-1 font-semibold text-dark"
            >
              Post
            </div>
          </div>
        </div>
        {/* content */}
        <div>
          <section className="flex gap-4 px-3 py-3 text-sm md:px-4 md:text-base">
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
              // onChange={(e) => {
              //   setTweetText(e.target.value);
              // }}
              // value={tweetText}
              className="h-[300px] w-full bg-transparent text-[16px] placeholder:text-slate-500 focus:outline-none"
            ></textarea>
          </section>
        </div>
      </div>
    </div>
  );
}
