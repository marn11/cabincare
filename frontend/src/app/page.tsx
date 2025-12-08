import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <header className="w-2/3 m-2">
          <nav className="flex items-center justify-between">
            <Link href={"/"}>
              <div className="flex gap-2 items-center">
                <Image
                  src={"/Logo.png"}
                  width={42}
                  height={42}
                  alt="logo"
                ></Image>
                <span className="text-2xl font-semibold text-cuspink">
                  CabinCare
                </span>
              </div>
            </Link>
            <Link href={"/dashboard"}>
              <button
                className="bg-cuspink hover:bg-cuspink/80
            p-4 cursor-pointer rounded-xl border-white/10
            font-semibold transition ease-in-out text-black"
              >
                Go to dashboard
              </button>
            </Link>
          </nav>
        </header>
        <main className="flex flex-col items-center flex-1 h-full w-full">
          <h1 className="mt-40 mb-20 text-cuspink text-6xl text-center font-medium w-240 ">
            Welcome to CabinCare, where we{" "}
            <span className="text-main font-bold">Care</span> about your
            logistics ❤️
          </h1>
          <Link href={"/dashboard"}>
            <button
              className="bg-cuspink px-10 py-4 rounded-xl cursor-pointer hover:bg-main/80 
          text-2xl font-semibold border border-black/80
          transition-all ease-in-out scale text-black"
            >
              Try it now
            </button>
          </Link>
        </main>
        <footer className="text-main border h-20">
          this project is part of ...
        </footer>
      </div>
    </>
  );
}
