import { auth } from "../../firebase";
import { deleteUser, signOut } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";

export default function AccountDangerZone() {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const ok = confirm(
      "정말로 탈퇴하시겠습니까?\n모든 데이터가 영구 삭제됩니다."
    );
    if (!ok) return;

    const user = auth.currentUser;
    if (!user) return;

    try {
      // 1. Firestore 유저 데이터 삭제
      await deleteDoc(doc(db, "users", user.uid));

      // 2. Auth 계정 삭제
      await deleteUser(user);

      // 3. 세션 정리
      await signOut(auth);

      alert("회원 탈퇴가 완료되었습니다.");
      navigate("/");
    } catch (err) {
      alert("보안을 위해 다시 로그인 후 탈퇴해주세요.");
    }
  };

  return (
    <div className="w-full bg-white rounded-xl p-6 shadow border border-red-300 flex flex-col items-center">
      <button
        onClick={handleDelete}
        className="px-3 py-1 md:px-6 py-3 rounded-lg bg-red-500 text-white hover:bg-red-600"
      >
        회원 탈퇴
      </button>
    </div>
  );
}
