import { z } from "zod";

// for create tweet
export const tweetPayload = z.object({
    text: z.string(),
})

export const updatePayload = z.object({
    id: z.number(),
    text: z.string(),
})

export const deletePayload = z.object({
    id: z.number(),
})

export const likePayload = z.object({
    tweetId: z.number(),
})