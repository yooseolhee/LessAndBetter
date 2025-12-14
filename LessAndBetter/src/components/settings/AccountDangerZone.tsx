import { auth } from "../../firebase";
import { deleteUser } from "firebase/auth";
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
      await deleteUser(user);
      alert("회원 탈퇴가 완료되었습니다.");
      navigate("/");
    } catch {
      alert("보안을 위해 다시 로그인 후 탈퇴해주세요.");
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow border border-red-300">

      <button
        onClick={handleDelete}
        className="px-6 py-3 rounded-lg bg-red-500 text-white hover:bg-red-600"
      >
        회원 탈퇴
      </button>
    </div>
  );
}
