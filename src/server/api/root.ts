// import { postRouter } from "~/server/api/routers/post";
import { postRouter } from "~/server/api/routers/Posts/posts.router";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { tweetRouter } from "./routers/tweets/router";
// import {UserRouter} from "@modules/users";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  tweet: tweetRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
