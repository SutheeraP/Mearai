import React, { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ImageIcon from "~/app/_components/svg/ImageIcon";
import ImageTweet from "~/app/_components/layout/ImageTweet";
import { flushSync } from "react-dom";

interface ModalTweetProps {
  onClose: () => void;
  mode: "create" | "edit";
  tweetId?: number;
  tweetOriginal?: string;
  imageOriginal?: string[];
}

export default function ModalTweet({
  onClose,
  mode,
  tweetId,
  tweetOriginal,
  imageOriginal,
}: ModalTweetProps) {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tweetText, setTweetText] = useState(tweetOriginal);
  const [file, setFile] = useState<FileList | null>();
  const [preview, setPreview] = useState<string[]>([]);
  const [existImage, setExistImage] = useState<string[]>(
    imageOriginal ? imageOriginal : [],
  );

  useEffect(() => {
    console.log("pre", preview);
  }, [preview]);

  useEffect(() => {
    console.log("ex", existImage);
  }, [existImage]);

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  const onFileChange = (e: React.FormEvent<HTMLInputElement>) => {
    // add new file to old list
    const newFiles = e.currentTarget.files;
    const oldFile = file;
    const maxFileSize = 4 * 1024 * 1024; // 2 MB in bytes
    const mergedFiles = new DataTransfer();

    if (newFiles) {
      // old file
      if (oldFile) {
        for (let i = 0; i < oldFile.length; i++) {
          if (mergedFiles.files.length + existImage.length >= 4) {
            break;
          }
          mergedFiles.items.add(oldFile.item(i)!);
        }
      }
      // new file
      for (let i = 0; i < newFiles.length; i++) {
        if (mergedFiles.files.length + existImage.length >= 4) {
          break;
        }
        const f = newFiles.item(i);
        if (f?.size && f?.size > maxFileSize) {
          alert(`File "${f?.name}" exceeds the maximum size of 4MB.`);
          return;
        }
        mergedFiles.items.add(f!);
      }
    }

    updatePreview(mergedFiles.files);
    setFile(mergedFiles.files);
  };

  const updatePreview = (files: FileList) => {
    if (files) {
      const previews: string[] = [];
      for (const f of files) {
        const objectUrl = URL.createObjectURL(f);
        previews.push(objectUrl);
      }
      setPreview(previews);
    } else {
      setPreview([]);
    }
  };

  const handleDeleteImage = (i: number) => {
    setPreview((prevPreviews) => {
      const newPreviews = [...prevPreviews];
      const deletedUrl = newPreviews[i];
      if (deletedUrl) {
        URL.revokeObjectURL(deletedUrl);
      }
      newPreviews.splice(i, 1);
      return newPreviews;
    });

    setFile((prevFiles) => {
      if (!prevFiles) return null;
      const newFiles = new DataTransfer();
      for (let j = 0; j < prevFiles.length; j++) {
        if (j !== i) {
          newFiles.items.add(prevFiles.item(j)!);
        }
      }
      return newFiles.files;
    });
  };

  const updateTweet = api.tweet.updateTweet.useMutation({
    onSuccess: async (data) => {
      // console.log("Update tweet successfully:", data);
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
      // console.log("Create tweet successfully:", data);
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

  const presignedUrl = api.tweet.createPresignedUrls.useMutation({
    onSuccess: async (data) => {
      return data;
    },
    onError: (error) => {
      console.error("Error get presigned URL:", error.message);
      alert(`Error get presigned URL: ${String(error)}`);
      throw Error(String(error));
    },
  });

  const handleSubmit = async (formData: FormData) => {
    flushSync(() => {
      // Force immediate update
      setIsSubmitting(true);
    });

    const tweetTextVal = formData.get("tweetText") as string;
    const uploads: string[] = existImage; // list of uploaded

    // collect image path in upload[]
    if (file) {
      // presigned url
      const urls = await presignedUrl.mutateAsync({
        count: file ? file.length : 0,
      });

      for (let i = 0; i < file.length; i++) {
        const f = file[i];
        const data = urls[i]; // data.key = name / data.url = presigned

        if (f && data?.key && data?.url) {
          // put to S3
          await fetch(data.url, {
            method: "PUT",
            body: f,
          });
          // keep path
          uploads.push(data.key);
        }
      }
    }

    // check mode then mutate
    if (mode == "create") {
      createTweet.mutate({
        text: tweetTextVal,
        files: uploads,
      });
    } else if (mode == "edit" && tweetId) {
      updateTweet.mutate({
        id: tweetId,
        text: tweetTextVal,
        files: uploads,
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
        <div className="flex items-center justify-between py-4">
          <div onClick={onClose} className="cursor-pointer">
            Cancel
          </div>

          <div className="flex items-center gap-4">
            {/* letter count */}
            <div className="text-sm">
              <span
                className={
                  tweetText && tweetText?.length > 240 ? "text-red-400" : ""
                }
              >
                {tweetText?.length ?? 0}
              </span>{" "}
              / 240
            </div>
            {/* image upload icon*/}
            <div className="">
              <label
                htmlFor="upload-image"
                className={`${preview.length + existImage.length >= 4 ? "text-gray-500" : "cursor-pointer text-main"}`}
              >
                <ImageIcon />
              </label>
              <input
                id="upload-image"
                type="file"
                onChange={onFileChange}
                multiple
                className="hidden"
                accept="image/png, image/jpeg, image/heic, image/heif"
                disabled={preview.length + existImage.length >= 4}
              ></input>
            </div>

            <button
              type="submit"
              disabled={
                isSubmitting ||
                tweetText == undefined ||
                tweetText.length == 0 ||
                tweetText.length > 240
              }
              className={`${isSubmitting ? "animate-pulse" : ""} cursor-pointer rounded-md bg-main px-6 py-1 font-semibold text-dark disabled:cursor-default disabled:bg-slate-400`}
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
              className="h-fit min-h-[150px] w-full bg-transparent text-[16px] placeholder:text-slate-500 focus:outline-none"
            ></textarea>

            {/* images section */}
            {preview.length + existImage.length != 0 && (
              <div className="grid aspect-video grid-cols-2 gap-2">
                {existImage.map((image, i) => (
                  <ImageTweet
                    key={i}
                    index={i}
                    length={existImage.length + preview.length}
                    mode="edit"
                    path={"https://d2buncfwqfqaws.cloudfront.net/" + image}
                    onRemove={() => {
                      setExistImage((pre) => {
                        const copy = [...pre];
                        copy.splice(i, 1);
                        return copy;
                      });
                    }}
                  />
                ))}
                {preview.map((image, i) => (
                  <ImageTweet
                    key={i}
                    index={existImage.length + i}
                    length={existImage.length + preview.length}
                    mode="edit"
                    path={image}
                    onRemove={() => {
                      handleDeleteImage(i);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </form>
  );
}
