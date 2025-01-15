import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { deletePayload, tweetPayload, updatePayload, likePayload } from "./interface";
import { PrismaClient, User } from "@prisma/client";

export const tweetRouter = createTRPCRouter({
    getAllTweets: publicProcedure.query(async ({ ctx }) => {
        return ctx.db.tweet.findMany({
            include: { user: true, tweetLikes: true }, // Include the related user object
            orderBy: { timestamp: "desc" },
        })
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
});
