import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
     try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (error: any) {
      alert(getErrorMessage(error.code));
    }
  };

  const handleGoogleLogin = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);

        const user = result.user;

        // Firestore에 유저 없으면 생성
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
        await setDoc(userRef, {
            email: user.email,
            createdAt: new Date(),
            provider: "google",
        });
        }

        navigate("/home");
    } catch (error: any) {
       console.error("Google login error:", error);
       alert(error.code || error.message);
    }
    };


  function getErrorMessage(code: string) {
    switch (code) {
        case "auth/invalid-login-credentials":
        return "이메일 또는 비밀번호가 올바르지 않습니다.";
        case "auth/user-not-found":
        return "존재하지 않는 이메일입니다.";
        case "auth/wrong-password":
        return "비밀번호가 올바르지 않습니다.";
        case "auth/invalid-email":
        return "이메일 형식이 올바르지 않습니다.";
        case "auth/too-many-requests":
        return "로그인 시도가 너무 많습니다. 잠시 후 다시 시도해주세요.";
        default:
        return "로그인에 실패했습니다.";
        }
    }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-96 p-8 bg-white shadow rounded-xl space-y-4">
        <h1 className="text-lg font-bold">로그인</h1>

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
          onClick={handleLogin}
          className="w-full py-3 bg-green-500 text-white rounded"
        >
          로그인
        </button>
        <button
        onClick={handleGoogleLogin}
        className="
            w-full py-3 border border-gray-300 rounded
            flex items-center justify-center gap-3
            hover:bg-gray-50 transition
        "
        >
        <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="google"
            className="w-5 h-5"
        />
        Google로 로그인
        </button>
      </div>
    </div>
  );
}
