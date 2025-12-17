import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col">
      <Header onOpenSidebar={() => setSidebarOpen(true)} />

      <div className="flex flex-1 relative">
        {/* Sidebar는 가장 위 */}
        <Sidebar forceOpen={sidebarOpen} />

        {/* 메인 컨텐츠 */}
        <main className="flex-1 p-6 relative">
          <Outlet />
        </main>

        {/* overlay는 main 뒤, sidebar 앞에 두지 않음 */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-transparent"
            style={{ zIndex: 20 }}
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
