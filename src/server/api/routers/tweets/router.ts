import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { deletePayload, tweetPayload, updatePayload, likePayload, filePayload } from "./interface";
import cuid2 from "@paralleldrive/cuid2";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand} from "@aws-sdk/client-s3";
import { s3Client } from "~/server/s3";

export const tweetRouter = createTRPCRouter({
    getAllTweets: publicProcedure.query(async ({ ctx }) => {
        if (!ctx.auth.userId) {
            throw new Error('Unauthorized');
        }
        const data = ctx.db.tweet.findMany({
            include: { user: true, tweetLikes: true }, // Include the related user object
            orderBy: { timestamp: "desc" },
        })
        const extendData = (await data).map(
            tweet => ({
                ...tweet,
                amountLike: tweet.tweetLikes.length,
                isLiked: tweet.tweetLikes.some((user) => user.userId == ctx.auth.userId)
            }))
        return extendData
    })
    ,
    createTweet: publicProcedure
        .input(tweetPayload)
        .mutation(async ({ ctx, input }) => {
            if (!ctx.auth.userId) {
                throw new Error('Unauthorized');
            }
            return ctx.db.tweet.create({
                data: {
                    text: input.text,
                    userId: ctx.auth.userId,
                    tweetImages: input.files
                },
            });
        }),
    updateTweet: publicProcedure
        .input(updatePayload)
        .mutation(async ({ ctx, input }) => {
            if (!ctx.auth.userId) {
                throw new Error('Unauthorized');
            }
            return ctx.db.tweet.update({
                where: { id: input.id },
                data: {
                    text: input.text,
                },
            });
        }),
    deleteTweet: publicProcedure
        .input(deletePayload)
        .mutation(async ({ ctx, input }) => {
            if (!ctx.auth.userId) {
                throw new Error('Unauthorized');
            }
            return ctx.db.tweet.delete({
                where: { id: input.id },
            })
        }),
    likeTweet: publicProcedure
        .input(likePayload)
        .mutation(async ({ ctx, input }) => {
            if (!ctx.auth.userId) {
                throw new Error('Unauthorized');
            }
            return ctx.db.tweet.update({
                where: {
                    id: input.tweetId
                },
                data: {
                    tweetLikes: { create: { user: { connect: { clerkId: ctx.auth.userId } } } }
                },
            })
        }),
    unLikeTweet: publicProcedure
        .input(likePayload)
        .mutation(async ({ ctx, input }) => {
            if (!ctx.auth.userId) {
                throw new Error('Unauthorized');
            }
            return ctx.db.tweet.update({
                where: {
                    id: input.tweetId
                },
                data: {
                    tweetLikes: { deleteMany: { userId: ctx.auth.userId } }
                },
                include: {
                    tweetLikes: true,
                }
            })
        }),
    createPresignedUrls: publicProcedure
        .input(filePayload)
        .query(async ({ input }) => {
            const urls = [];
            for (let i = 0; i < input.count; i++) {
                const key = 'images/'+cuid2.createId(); // file name in S3

                const url = await getSignedUrl(
                    s3Client,
                    new PutObjectCommand({
                        Bucket: process.env.AWS_S3_BUCKET_NAME,
                        Key: key,
                    })
                )
                urls.push({
                    url, key
                })
            }
            return urls;
        })
});
