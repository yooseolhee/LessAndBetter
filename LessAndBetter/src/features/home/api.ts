import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import type { Post } from "../../features/community/types";

export async function fetchTodayTopPost(): Promise<Post | null> {
  // 좋아요 많은 글 여러 개 가져오기
  const q = query(
    collection(db, "posts"),
    orderBy("likeCount", "desc"),
    limit(10)
  );

  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;

  const now = new Date();
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    0, 0, 0
  );

  for (const docSnap of snapshot.docs) {
    const data = docSnap.data();
    const createdAt = data.createdAt;

    // createdAt 아직 없는 글은 스킵
    if (!createdAt) continue;

    const createdDate = createdAt.toDate();

    if (createdDate >= startOfToday) {
      return {
        id: docSnap.id,
        ...(data as Omit<Post, "id">),
      };
    }
  }

  return null;
}
