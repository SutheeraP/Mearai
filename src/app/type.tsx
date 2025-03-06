export type Tweet = {
  id: number;
  text: string;
  timestamp: Date;
  userId: string;
  username: string;
  userPhoto: string;
  likes: number;
  isLiked: boolean;
  images: string[];
};
