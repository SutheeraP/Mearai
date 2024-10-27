import { Tweets } from "~/app/_data/tweets";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { tweetPayload } from "./interface";


export const tweetRouter = createTRPCRouter({
    getAllTweets: publicProcedure.query(async ({ ctx }) => {
        return ctx.db.tweet.findMany({
            orderBy: { timestamp: "desc" }
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
                    likes: input.likes,
                    retweets: input.retweets,
                    is_retweet: input.is_retweet,
                    is_reply: input.is_reply,
                    userId: input.user_id,
                },
            });
        }),
});
