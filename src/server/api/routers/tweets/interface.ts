import { z } from "zod";

// for create tweet
export const tweetPayload = z.object({
    text: z.string(),
    files: z.array(
        z.string(),
    ).max(4)
})

export const updatePayload = z.object({
    id: z.number(),
    text: z.string(),
    files: z.array(
        z.string(),
    ).max(4)
})

export const deletePayload = z.object({
    id: z.number(),
})

export const likePayload = z.object({
    tweetId: z.number(),
})

export const filePayload = z.object({
    count: z.number(),
})

export const getUserPayload = z.object({
    username: z.string(),
})

export const getUserTweetsPayload = z.object({
    username: z.string(),
})

export const getUserLikeTweetsPayload = z.object({
    username: z.string(),
})

export const getSearchPayload = z.object({
    text: z.string(),
})



