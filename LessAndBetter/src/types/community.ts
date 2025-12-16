export type CommunitySort = "latest" | "popular" | "comment";

export type CommunityPost = {
  id: string;
  title: string;
  content: string;
  authorName: string;
  createdAt: string; // ISO string
  likeCount: number;
  commentCount: number;
  likedByMe?: boolean;
};
