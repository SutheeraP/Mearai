import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { helloPayload } from "./posts.interface";

export const postRouter = createTRPCRouter({
    // we create a procedure called 'hello' that takes in an input of type 'helloPayload'
    // this input is validated by zod and contains a single field called 'name'
    hello: publicProcedure.input(helloPayload).query(({ input }) => {
        const { name } = input;
        // we destructure the name field from the input object
        return `Hello ${name}`;
        // we return a string that says hello to the name that was input
    })

});
