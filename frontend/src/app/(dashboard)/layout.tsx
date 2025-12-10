"use client";
import { ReactNode, useState } from "react";
import { Menu, Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <div className="h-screen flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col">
          <header className="flex items-center justify-between mx-6 px-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden z rounded-lg bg-cuspink hover:bg-cuspink/80 cursor-pointer trasnsition ease-in-out"
              >
                <Menu className="text-gray-700" />
              </button>
            </div>
          </header>
          <main className="h-full flex-1 p-4">{children}</main>
        </div>
      </div>
    </>
  );
}
