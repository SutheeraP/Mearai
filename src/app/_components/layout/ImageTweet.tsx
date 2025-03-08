import Image from "next/image";
import React from "react";
import CloseIcon from "~/app/_components/svg/CloseIcon";

interface ImageTweetProps {
  onRemove?: () => void;
  mode: "edit" | "show";
  path: string;
  index: number;
  length: number;
}

export default function ImageTweet({
  onRemove,
  mode,
  path,
  index,
  length,
}: ImageTweetProps) {
  console.log("img", path);
  return (
    <div
      className={`${length == 3 && index == 0 ? `row-span-2` : ``} ${length == 1 && index == 0 ? `col-span-2` : ``} relative overflow-hidden rounded-md`}
    >
      {mode == "edit" && (
        <div
          className="absolute right-0 z-10 m-2 cursor-pointer rounded-full bg-black bg-opacity-50 p-1"
          onClick={onRemove}
        >
          <CloseIcon size={18} />
        </div>
      )}

      <Image src={path} alt="image" layout="fill" objectFit="cover" />
    </div>
  );
}
