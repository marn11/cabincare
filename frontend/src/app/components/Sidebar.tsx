"use client";
import Link from "next/link";
import Image from "next/image";
import { Home, Plus } from "lucide-react";

export default function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"} 
        lg:hidden`}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 z-50 flex flex-col bg-cusgray border-r border-cusgreen/20 shadow-lg transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:block`}
      >
        {/* Header */}
        <div className="p-4 flex justify-between items-center">
          <Link href={"/"}>
            <div className="flex gap-2 items-center">
              <Image
                src={"/Logo.png"}
                width={36}
                height={36}
                alt="logo"
              ></Image>
              <span className="text-xl font-semibold text-cuspink">
                CabinCare
              </span>
            </div>
          </Link>

          {/* Close button (mobile only) */}
          <button
            onClick={onClose}
            className="lg:hidden text-cusgreen cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-2">
          <ul className="space-y-1">
            {/* Dashboard */}
            <li>
              <Link
                href="/"
                className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg text-cusgreen hover:bg-cusgreen/15 active:bg-cusgreen/20 focus:bg-cusgreen/15 focus:text-cusgreen transition"
              >
                <Home/>
                Home
              </Link>
            </li>

            {/* Docs */}
            <li>
              <Link
                href="/cabins/create  "
                className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg text-cusgreen hover:bg-cusgreen/15 active:bg-cusgreen/20 focus:bg-cusgreen/15 focus:text-cusgreen transition"
              >
                <Plus/>
                Create cabin
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
