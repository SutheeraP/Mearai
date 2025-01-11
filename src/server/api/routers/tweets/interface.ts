import { z } from "zod";

// for create tweet
export const tweetPayload = z.object({
    text: z.string(),
    user_id: z.string(),
    timestamp: z.string(),
})

export const deletePayload = z.object({
    id: z.number(),
})
