import type { Timestamp } from "firebase/firestore";

export type SortType = "latest" | "popular" | "comment";

export type Post = {
  id: string;
  title: string;
  content: string;
  authorUid: string;
  authorName: string;
  createdAt: Timestamp;
  boardType: BoardType;
  likeCount: number;
  commentCount: number;
};

export type BoardType =
  | "home_training"
  | "diet_success"
  | "bulkup_success"
  | "diet_consult"
  | "free";

export const BOARD_LABEL: Record<BoardType, string> = {
  home_training: "홈트레이닝 추천 게시판",
  diet_success: "다이어트 성공 후기 게시판",
  bulkup_success: "벌크업 성공 후기 게시판",
  diet_consult: "다이어트 고민 상담 게시판",
  free: "자유 게시판",
};

export type BoardFilter = BoardType | "all";

