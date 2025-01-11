import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { deletePayload, tweetPayload } from "./interface";


export const tweetRouter = createTRPCRouter({
    getAllTweets: publicProcedure.query(async ({ ctx }) => {
        return ctx.db.tweet.findMany({
            include: { user: true }, // Include the related user object
            orderBy: { timestamp: "desc" },
        })
    })
    ,
    createTweet: publicProcedure
        .input(tweetPayload)
        .mutation(async ({ ctx, input }) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));

            return ctx.db.tweet.create({
                data: {
                    text: input.text,
                    timestamp: input.timestamp,
                    userId: input.user_id,
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
});
