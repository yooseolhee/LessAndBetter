import { BrowserRouter, Route, Routes } from "react-router-dom";
import Intro from "./components/intro";
import Home from "./pages/HomePage";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HomeTraining from "./pages/TrainingVideoPage";
import Settings from "./pages/Settings";

function App() {
  const [user, setUser] = useState<any>(null);

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home-training" element={<HomeTraining />} />
        <Route path="/settings" element={<Settings/>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App;
