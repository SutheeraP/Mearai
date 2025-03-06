import React from "react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ImageIcon from "~/app/_components/svg/ImageIcon";

interface ModalTweetProps {
  onClose: () => void;
  mode: "create" | "edit";
  tweetId?: number;
  tweetOriginal?: string;
}

export default function ModalTweet({
  onClose,
  mode,
  tweetId,
  tweetOriginal,
}: ModalTweetProps) {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tweetText, setTweetText] = useState(tweetOriginal);
  const [file, setFile] = useState<FileList | null>();
  const [preview, setPreview] = useState<string[]>([]);

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  const onFileChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFile(e.currentTarget.files);
    if (e.currentTarget.files) {
      const previews: string[] = [];
      for (const file of e.currentTarget.files) {
        const objectUrl = URL.createObjectURL(file);
        previews.push(objectUrl);
      }
      // console.log("pre", previews);
      setPreview(previews);
    } else {
      setPreview([]);
    }
  };

  const updateTweet = api.tweet.updateTweet.useMutation({
    onSuccess: async (data) => {
      console.log("Update tweet successfully:", data);
      router.push("/");
      router.refresh();
      setIsSubmitting(false);
      setTweetText("");
      onClose();
    },
    onError: (error) => {
      console.error("Error update tweet:", error.message);
      alert(`Error update tweet: ${String(error)}`);
      throw Error(String(error));
    },
  });

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
  const presignedUrl = api.tweet.createPresignedUrls.useQuery({
    count: file ? file.length : 0,
  });

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    const tweetTextVal = formData.get("tweetText") as string;

    // console.log(presignedUrl);

    const uploads: string[] = []; // list of uploaded
    if (file && presignedUrl.data) {
      for (let i = 0; i < file.length; i++) {
        const f = file[i];
        const data = presignedUrl.data[i]; // data.key = name / data.url = presign

        if (f && data?.key && data?.url) {
          // go in s3 laew
          await fetch(data.url, {
            method: "PUT",
            body: f,
          });

          uploads.push(data.key);
        }
      }
    }

    if (!tweetTextVal.length) {
      setIsSubmitting(false);
      return alert("Type something 🫵");
    }

    // check mode then mutate
    if (mode == "create") {
      createTweet.mutate({
        text: tweetTextVal,
        files: uploads,
      });
    } else if (mode == "edit" && tweetId) {
      updateTweet.mutate({
        text: tweetTextVal,
        id: tweetId,
      });
    }
  };

  return (
    <form
      action={handleSubmit}
      className="absolute left-0 top-0 z-10 h-full w-screen md:bg-main md:bg-opacity-10 md:backdrop-blur-sm"
    >
      <div className="mx-auto h-full bg-dark px-4 md:mt-12 md:h-fit md:w-[500px] md:rounded-md">
        {/* top */}
        <div className="flex items-baseline justify-between py-4">
          <div onClick={onClose} className="cursor-pointer">
            Cancel
          </div>

          <div className="flex items-baseline gap-4">
            {/* image upload */}
            <div className="justify-end">
              <label
                htmlFor="upload-image"
                className="cursor-pointer text-main"
              >
                <ImageIcon size={20} />
              </label>
              <input
                id="upload-image"
                type="file"
                onChange={onFileChange}
                multiple
                className="hidden"
              ></input>
            </div>
            {/* <div className="text-sm">0 / 240</div> */}
            <button
              // onClick={onClose}
              type="submit"
              disabled={isSubmitting}
              className={`${isSubmitting ? "animate-pulse" : ""} cursor-pointer rounded-md bg-main px-6 py-1 font-semibold text-dark`}
            >
              {mode == "create" ? "Post" : "Save"}
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

          <div className="w-full">
            <textarea
              name="tweetText"
              placeholder="Me a rai?"
              onChange={(e) => {
                setTweetText(e.target.value);
              }}
              value={tweetText}
              className="h-[200px] w-full bg-transparent text-[16px] placeholder:text-slate-500 focus:outline-none"
            ></textarea>

            {/* images section */}
            {preview.length != 0 ? (
              <div className="grid aspect-video grid-cols-2 gap-2">
                {preview.map((image, i) => (
                  <div
                    className={`${preview.length == 3 && i == 0 ? `row-span-2` : ``} ${preview.length == 1 && i == 0 ? `col-span-2` : ``} relative overflow-hidden rounded-md`}
                    key={i}
                  >
                    <Image
                      src={image}
                      alt="image"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </form>
  );
}
