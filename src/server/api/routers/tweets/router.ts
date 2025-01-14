import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { deletePayload, tweetPayload, updatePayload, likePayload } from "./interface";
import { PrismaClient, User } from "@prisma/client";

export const tweetRouter = createTRPCRouter({
    getAllTweets: publicProcedure.query(async ({ ctx }) => {
        // const data = ctx.db.tweet.findMany({
        //     include: { user: true, tweetLikes: true }, // Include the related user object
        //     orderBy: { timestamp: "desc" },
        // })

        // const prisma = new PrismaClient().$extends({
        //     result: {
        //         tweet: {
        //             amountLikes: {
        //                 // the dependencies
        //                 needs: { tweetLikes: true },
        //                 compute(tweet) {
        //                     // the computation logic
        //                     return tweet.tweetLikes.length
        //                 },
        //             },
        //         },
        //     },
        // })

        return ctx.db.tweet.findMany({
            include: { user: true, tweetLikes: true }, // Include the related user object
            orderBy: { timestamp: "desc" },
        })
    })
    ,
    createTweet: publicProcedure
        .input(tweetPayload)
        .mutation(async ({ ctx, input }) => {

            return ctx.db.tweet.create({
                data: {
                    text: input.text,
                    timestamp: input.timestamp,
                    userId: input.user_id,
                },
            });
        }),
    updateTweet: publicProcedure
        .input(updatePayload)
        .mutation(async ({ ctx, input }) => {
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
            return ctx.db.tweet.delete({
                where: { id: input.id },
            })
        }),
    likeTweet: publicProcedure
        .input(likePayload)
        .mutation(async ({ ctx, input }) => {
            return ctx.db.tweet.update({
                where: {
                    id: input.tweetId
                },
                data: {
                    tweetLikes: { create: { user: { connect: { clerkId: input.userId } } } }
                },
            })
        }),
    unLikeTweet: publicProcedure
        .input(likePayload)
        .mutation(async ({ ctx, input }) => {
            return ctx.db.tweet.update({
                where: {
                    id: input.tweetId
                },
                data: {
                    tweetLikes: { deleteMany: { userId: input.userId } }
                },
                include: {
                    tweetLikes: true,
                }
            })
        }),
});
