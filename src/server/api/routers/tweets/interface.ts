import { z } from "zod";

export const tweetPayload = z.object({
    text: z.string(),
    user_id: z.string(),
    timestamp: z.string(),
    likes: z.number().optional(),
    retweets: z.number().optional(),
    is_retweet: z.boolean().optional(),
    is_reply: z.boolean().optional(),
    id: z.number().optional()
})

export const deletePayload = z.object({
    id: z.number(),
})
