import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "./api";
import type { BoardType } from "./types";

export default function CommunityWritePage() {
  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [boardType, setBoardType] = useState<BoardType>("free");
  const [open, setOpen] = useState(false);
  const BOARD_LABEL: Record<BoardType, string> = {
    home_training: "홈트레이닝 추천 게시판",
    diet_success: "다이어트 성공 후기 게시판",
    bulkup_success: "벌크업 성공 후기 게시판",
    diet_consult: "다이어트 고민 상담 게시판",
    free: "자유 게시판",
  };

  const onSubmit = async () => {
    if (!title.trim() || !content.trim()) return;

    try {
      setLoading(true);

      await createPost(title, content, boardType);
      nav("/community");
    } catch (e) {
      alert("게시글 작성 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-96px)] flex justify-center">
      <div className="w-full max-w-4xl px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">게시글 작성</h1>

      <label className="block mb-2 text-sm font-medium text-gray-600">
  게시판 선택
</label>

<div className="relative mb-4">
  {/* 선택 박스 */}
  <button
    type="button"
    onClick={() => setOpen((v) => !v)}
    className="
      w-full flex items-center justify-between
      px-4 py-3
      border border-gray-300 rounded-xl
      bg-white text-gray-800
      hover:bg-gray-50
      focus:outline-none focus:ring-2 focus:ring-green-500
    "
  >
    <span>{BOARD_LABEL[boardType]}</span>
    <svg
      className={`w-4 h-4 transition ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </button>

  {/* 옵션 리스트 */}
  {open && (
    <ul
      className="
        absolute z-10 mt-2 w-full
        bg-white border border-gray-200
        rounded-xl shadow-lg
        overflow-hidden
      "
    >
      {(Object.keys(BOARD_LABEL) as BoardType[]).map((key) => (
        <li
          key={key}
          onClick={() => {
            setBoardType(key);
            setOpen(false);
          }}
          className={`
            px-4 py-3 cursor-pointer text-sm
            hover:bg-green-50
            ${
              boardType === key
                ? "bg-green-100 text-green-700 font-medium"
                : "text-gray-700"
            }
          `}
        >
          {BOARD_LABEL[key]}
        </li>
      ))}
    </ul>
  )}
</div>


      <input
        className="w-full mb-4 px-4 py-2 border rounded-xl"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="w-full min-h-[240px] px-4 py-3 border rounded-xl"
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="flex justify-end mt-4 gap-8">
        <button className="cursor-pointer" onClick={() => nav("/community")}>취소</button>
        <button
        type="button"
          onClick={onSubmit}
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded-xl cursor-pointer"
        >
          등록
        </button>
      </div>
      </div>
    </div>
  );
}
