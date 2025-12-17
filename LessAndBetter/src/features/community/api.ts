import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  doc,
  increment,
  runTransaction,
  getDoc,
  deleteDoc,
  where
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import type { SortType, Post, BoardType, BoardFilter } from "./types";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const storage = getStorage();

/* 게시글 작성 */
export async function createPost(title: string, content: string, boardType: BoardType, imageUrls: string[]=[]) {
  const user = auth.currentUser;
  if (!user) throw new Error("로그인 필요");

  await addDoc(collection(db, "posts"), {
    title,
    content,
    boardType,
    imageUrls,
    authorUid: user.uid,
    authorName: user.displayName ?? "익명",
    createdAt: serverTimestamp(),
    likeCount: 0,
    commentCount: 0,
  });
}

/* 게시글 삭제 */
export async function deletePost(postId: string) {
  const user = auth.currentUser;
  if (!user) throw new Error("로그인 필요");

  const postRef = doc(db, "posts", postId);
  const snap = await getDoc(postRef);

  if (!snap.exists()) throw new Error("게시글 없음");

  const data = snap.data();
  if (data.authorUid !== user.uid) {
    throw new Error("삭제 권한 없음");
  }

  await deleteDoc(postRef);
}

/* 이미지 업로드 */
export async function uploadImages(files: File[]) {
  const user = auth.currentUser;
  if (!user) throw new Error("로그인 필요");

  const urls: string[] = [];

  for (const file of files) {
    const imageRef = ref(
      storage,
      `posts/${user.uid}/${Date.now()}_${file.name}`
    );

    await uploadBytes(imageRef, file);
    const url = await getDownloadURL(imageRef);
    urls.push(url);
  }
  return urls;
}

/* 게시글 목록 불러오기 */
export async function fetchPosts(sort: SortType, board:BoardFilter): Promise<Post[]> {
  let q;
  const base = collection(db, "posts");

  if (board === "all") {
    // 전체
    q =
      sort === "latest"
        ? query(base, orderBy("createdAt", "desc"))
        : sort === "popular"
        ? query(base, orderBy("likeCount", "desc"))
        : query(base, orderBy("commentCount", "desc"));
  } else {
    // 게시판별
    q =
      sort === "latest"
        ? query(base, where("boardType", "==", board), orderBy("createdAt", "desc"))
        : sort === "popular"
        ? query(base, where("boardType", "==", board), orderBy("likeCount", "desc"))
        : query(base, where("boardType", "==", board), orderBy("commentCount", "desc"));
  }

  const snap = await getDocs(q);

  return snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<Post, "id">),
  }));
}

/* 단일 게시글 조회 */
export async function fetchPostById(postId: string): Promise<Post | null> {
  const ref = doc(db, "posts", postId);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return {
    id: snap.id,
    ...(snap.data() as Omit<Post, "id">),
  };
}

/* 좋아요 토글 (트랜잭션) */
export async function toggleLike(postId: string) {
  const user = auth.currentUser;
  if (!user) throw new Error("로그인 필요");

  const postRef = doc(db, "posts", postId);

  await runTransaction(db, async (tx) => {
    const snap = await tx.get(postRef);
    if (!snap.exists()) return;

    const data = snap.data();
    const likedBy = data.likedBy ?? {};
    const alreadyLiked = !!likedBy[user.uid];

    tx.update(postRef, {
      likeCount: increment(alreadyLiked ? -1 : 1),
      [`likedBy.${user.uid}`]: alreadyLiked ? false : true,
    });
  });
}

/* 댓글 목록 조회 */
export async function fetchComments(postId: string) {
  const q = query(
    collection(db, "posts", postId, "comments"),
    orderBy("createdAt", "desc")
  );

  const snap = await getDocs(q);

  return snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
}

/* 댓글 작성 */
export async function createComment(postId: string, content: string) {
  const user = auth.currentUser;
  if (!user) throw new Error("로그인 필요");

  const postRef = doc(db, "posts", postId);

  await addDoc(collection(db, "posts", postId, "comments"), {
    content,
    authorUid: user.uid,
    authorName: user.displayName ?? "익명",
    createdAt: serverTimestamp(),
  });

  await runTransaction(db, async (tx) => {
    tx.update(postRef, {
      commentCount: increment(1),
    });
  });
}