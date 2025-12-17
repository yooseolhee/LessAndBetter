import { BrowserRouter, Route, Routes } from "react-router-dom";
import Intro from "./components/intro";
import Home from "./pages/HomePage";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HomeTraining from "./pages/TrainingVideoPage";
import Settings from "./pages/Settings";
import Layout from "./components/layout/Layout";
import CommunityPage from "./features/community/CommunityPage";
import CommunityWritePage from "./features/community/CommunityWritePage";
import CommunityPostPage from "./features/community/CommunityPostPage";
import TimerPage from "./pages/TimerPage";

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/training" element={<HomeTraining />} />
          <Route path="/settings" element={<Settings/>} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/community/write" element={<CommunityWritePage />} />
          <Route path="/community/:id" element={<CommunityPostPage />} />
          <Route path="/timer" element={<TimerPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
