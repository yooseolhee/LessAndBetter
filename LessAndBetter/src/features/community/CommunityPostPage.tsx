import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchPostById,
  toggleLike,
  fetchComments,
  createComment,
  deletePost
} from "./api";
import { BOARD_LABEL, type Post } from "./types";
import { auth } from "../../firebase";
import { ChevronLeft } from "lucide-react";

type Comment = {
  id: string;
  content: string;
  authorName: string;
  createdAt: any;
};

export default function CommunityPostPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentInput, setCommentInput] = useState("");
  const [loading, setLoading] = useState(true);
  
  const nav = useNavigate();

  const user = auth.currentUser;
  
  useEffect(() => {
    if (!id) return;

    setLoading(true);
    Promise.all([fetchPostById(id), fetchComments(id)])
      .then(([p, c]) => {
        setPost(p);
        setComments(c as Comment[]);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const onLike = async () => {
    if (!id) return;
    await toggleLike(id);
    const updated = await fetchPostById(id);
    setPost(updated);
  };

  const onSubmitComment = async () => {
    if (!id || !commentInput.trim()) return;

    await createComment(id, commentInput);
    setCommentInput("");
    const c = await fetchComments(id);
    setComments(c as Comment[]);
    const p = await fetchPostById(id);
    setPost(p);
  };

  if (loading) return <p className="px-10 py-8">로딩 중...</p>;
  if (!post) return <p className="px-10 py-8">게시글 없음</p>;

  const liked = user && (post as any).likedBy?.[user.uid];
  const isAuthor = user && post.authorUid === user.uid;


  const onDelete = async () => {
  if (!id) return;

  const ok = confirm("정말 이 게시글을 삭제할까요?");
  if (!ok) return;

  try {
    await deletePost(id);
    alert("삭제되었습니다.");
    nav("/community");
  } catch (e: any) {
    alert(e.message ?? "삭제 실패");
  }
};
  return (
    <div className="px-10 py-8 max-w-4xl mx-auto">
      <div className="mb-10 cursor-pointer" onClick={()=>nav("/community")}><ChevronLeft /></div>
      <div className="mb-2 text-sm text-green-600 font-medium">
        {BOARD_LABEL[post.boardType]}
      </div>
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <div className="text-sm text-gray-500 mt-1">
        {post.authorName}
      </div>



      <p className="mt-6 whitespace-pre-wrap">{post.content}</p>

      <div className="flex gap-4 mt-6">
        <button
          onClick={onLike}
          className={`px-4 py-2 rounded-full border hover:bg-rose-100 ${
            liked ? "border-rose-500 text-rose-600" : ""
          }`}
        >
          ❤️ {post.likeCount}
        </button>
        <span className="px-4 py-2 rounded-full border">
          💬 {post.commentCount}
        </span>
      </div>

       {isAuthor && (
          <button
            onClick={onDelete}
            className="ml-auto mt-3 px-4 py-2 rounded-full border border-red-300 text-red-600 hover:bg-red-50"
          >
            삭제
          </button>
        )}

      <div className="mt-10">
        <h2 className="font-semibold mb-3">댓글</h2>

        <div className="flex gap-2 mb-4">
          <input
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-xl"
            placeholder="댓글을 입력하세요"
          />
          <button
            onClick={onSubmitComment}
            className="px-4 py-2 rounded-xl bg-black text-white"
          >
            등록
          </button>
        </div>

        <div className="space-y-3">
          {comments.map((c) => (
            <div key={c.id} className="border rounded-xl p-3">
              <div className="text-sm text-gray-500">{c.authorName}</div>
              <div className="mt-1">{c.content}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
