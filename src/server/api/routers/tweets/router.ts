import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
    deletePayload, tweetPayload, updatePayload, likePayload, filePayload,
    getUserPayload, getUserTweetsPayload, getUserLikeTweetsPayload
} from "./interface";
import cuid2 from "@paralleldrive/cuid2";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "~/server/s3";
import { TRPCError } from "@trpc/server";

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
                isLiked: tweet.tweetLikes.some((user) => user.userId == ctx.auth.userId),
                isCurrentUserPost:  tweet.userId == ctx.auth.userId
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
            const tweet = await ctx.db.tweet.findUnique({
                where: { id: input.id },
            })
            if (!tweet) {
                throw new Error('Tweet not found');
            }

            // Retrieve existing image keys
            const existingImageKeys = tweet.tweetImages

            // Determine images to delete
            const deleteImageKeys = existingImageKeys.filter(
                (key) => !input.files?.includes(key)
            );

            // Delete images from AWS S3
            if (deleteImageKeys.length > 0) {
                for (const key of deleteImageKeys) {
                    await s3Client.send(
                        new DeleteObjectCommand({
                            Bucket: process.env.AWS_S3_BUCKET_NAME,
                            Key: key,
                        })
                    );
                }
            }

            return ctx.db.tweet.update({
                where: { id: input.id },
                data: {
                    text: input.text,
                    tweetImages: input.files
                },
            });
        }),
    deleteTweet: publicProcedure
        .input(deletePayload)
        .mutation(async ({ ctx, input }) => {
            if (!ctx.auth.userId) {
                throw new Error('Unauthorized');
            }
            const tweet = await ctx.db.tweet.findUnique({
                where: { id: input.id },
            })
            if (!tweet) {
                throw new Error('Tweet not found');
            }

            // Retrieve existing image keys
            const images = tweet.tweetImages

            // Delete images from AWS S3
            if (images.length > 0) {
                for (const key of images) {
                    await s3Client.send(
                        new DeleteObjectCommand({
                            Bucket: process.env.AWS_S3_BUCKET_NAME,
                            Key: key,
                        })
                    );
                }
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
        .mutation(async ({ ctx, input }) => {
            if (!ctx.auth.userId) {
                throw new Error('Unauthorized');
            }

            const urls = [];
            for (let i = 0; i < input.count; i++) {
                const key = 'images/' + cuid2.createId(); // file name in S3

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
        }),
    getUser: publicProcedure.input(getUserPayload).query(async ({ ctx, input }) => {
        if (!ctx.auth.userId) {
            throw new Error('Unauthorized');
        }
        const user = await ctx.db.user.findUnique({
            where: { username: input.username }
        })

        if (!user) {
            throw new TRPCError({
                code: 'NOT_FOUND',
                message: `User with username '${input.username}' not found.`,
            });
        }
        return user;
    }),
    getTweetbyUser: publicProcedure.input(getUserTweetsPayload).query(async ({ ctx, input }) => {
        if (!ctx.auth.userId) {
            throw new Error('Unauthorized');
        }

        const user = await ctx.db.user.findUnique({
            where: { username: input.username },
            include: {
                tweets: {
                    include: {
                        user: true,
                        tweetLikes: true,
                    }
                }
            }
        })

        const extendTweet = user?.tweets.map(
            tweet => ({
                ...tweet,
                amountLike: tweet.tweetLikes.length,
                isLiked: tweet.tweetLikes.some((user) => user.userId == ctx.auth.userId),
                isCurrentUserPost:  tweet.userId == ctx.auth.userId
            }))

        if (!extendTweet) {
            throw new TRPCError({
                code: 'NOT_FOUND',
                message: `User with username '${input.username}' have 0 post.`,
            });
        }
        return extendTweet;
    }),
});
