import { z } from "zod";

export const tweetPayload = z.object({
    text: z.string(),
    timestamp: z.string(),
    likes: z.number(),
    retweets: z.number(),
    is_retweet: z.boolean(),
    is_reply: z.boolean(),
})
