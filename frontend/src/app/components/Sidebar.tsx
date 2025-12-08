"use client";
import Link from "next/link";
import Image from "next/image";

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
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity 
        ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"} 
        lg:hidden`}
      />

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen w-64 z-50 flex flex-col
          bg-white border-r border-gray-200
          dark:bg-neutral-800 dark:border-neutral-700
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:block
        `}
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
            className="lg:hidden text-gray-600 dark:text-neutral-300
            cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-2">
          <ul className="space-y-1">

            {/* Dashboard */}
            <li>
              <a
                href="#"
                className="
                  flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg
                  text-gray-800 dark:text-neutral-200
                  hover:bg-gray-100 dark:hover:bg-neutral-700
                  active:bg-gray-200 dark:active:bg-neutral-700
                  focus:bg-gray-200 dark:focus:bg-neutral-700
                  focus:text-gray-900 dark:focus:text-white
                "
              >
                <svg className="size-4 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                Dashboard
              </a>
            </li>

            {/* Calendar */}
            <li>
              <a
                href="#"
                className="
                  flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg
                  text-gray-800 dark:text-neutral-200
                  hover:bg-gray-100 dark:hover:bg-neutral-700
                  active:bg-gray-200 dark:active:bg-neutral-700
                  focus:bg-gray-200 dark:focus:bg-neutral-700
                  focus:text-gray-900 dark:focus:text-white
                "
              >
                <svg className="size-4 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <rect width="18" height="18" x="3" y="4" rx="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>

                All cabins
                <span className="ms-auto px-1.5 py-0.5 text-xs rounded-full bg-gray-200 text-gray-800 dark:bg-neutral-600 dark:text-neutral-200">
                  New
                </span>
              </a>
            </li>

            {/* Docs */}
            <li>
              <a
                href="#"
                className="
                  flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg
                  text-gray-800 dark:text-neutral-200
                  hover:bg-gray-100 dark:hover:bg-neutral-700
                  active:bg-gray-200 dark:active:bg-neutral-700
                  focus:bg-gray-200 dark:focus:bg-neutral-700
                  focus:text-gray-900 dark:focus:text-white
                "
              >
                <svg className="size-4 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                </svg>
                Create cabin
              </a>
            </li>

          </ul>
        </nav>
      </div>
    </>
  );
}
