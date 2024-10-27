import { Tweets} from "~/app/_data/tweets";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const tweetRouter = createTRPCRouter({
	getAllTweets: publicProcedure.query(async()=> {
		return Tweets;
})
});