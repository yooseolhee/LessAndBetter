import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    const result = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await setDoc(doc(db, "users", result.user.uid), {
      email,
      createdAt: new Date(),
    });

    navigate("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-96 p-8 bg-white shadow rounded-xl space-y-4">
        <h1 className="text-2xl font-bold">회원가입</h1>

        <input
          className="w-full border p-3 rounded"
          placeholder="이메일"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-3 rounded"
          placeholder="비밀번호"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="w-full py-3 bg-green-500 text-white rounded"
        >
          가입하기
        </button>
      </div>
    </div>
  );
}
