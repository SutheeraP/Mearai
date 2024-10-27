import { z } from "zod";

export const helloPayload = z.object({
    name: z.string(),
})
