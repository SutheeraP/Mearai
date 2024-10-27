export const Tweets = Array.from({ length: 10 }, (_, i) => ({
    tweet_id: 1234567 * i,
    user: {
        user_id: 987654321,
        username: "example_user",
        display_name: "Example User",
    },
    text: "Check out this amazing view! #nature #beautiful",
    timestamp: "2023-11-22T12:34:56Z",
    likes: 100,
    retweets: 50,
    hashtags: ["nature", "beautiful"],
    mentions: ["friend1", "friend2"],
    is_retweet: false,
    is_reply: false,
    reply_to_tweet_id: null,
    media: [
        {
            media_type: "photo",
            media_url: "https://example.com/photo.jpg",
        },
        {
            media_type: "video",
            media_url: "https://example.com/video.mp4",
        },
    ],
}));
