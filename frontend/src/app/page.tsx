import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-main text-cusgreen">
        <header className="w-11/12 max-w-6xl mx-auto py-6">
          <nav className="flex items-center justify-between">
            <Link href={"/"}>
              <div className="flex gap-2 items-center">
                <Image src={"/Logo.png"} width={42} height={42} alt="logo" />
                <span className="text-2xl font-semibold text-cuspink">
                  CabinCare
                </span>
              </div>
            </Link>
            <Link href={"/dashboard"}>
              <button className="bg-cusgreen cursor-pointer text-black font-semibold px-5 py-3 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all border border-cusgreen/40">
                Go to dashboard
              </button>
            </Link>
          </nav>
        </header>

        <main className="flex flex-col items-center flex-1 w-full bg-gradient-to-b from-main via-cusgray/40 to-main">
          <h1 className="mt-28 mb-8 text-cuspink text-6xl text-center font-semibold max-w-4xl leading-tight">
            Welcome to CabinCare, where we
            <span className="text-cusgreen font-bold"> Care </span>
            about your logistics ❤️
          </h1>
          <p className="text-lg text-white max-w-2xl text-center mb-12">
            Track cabins, log issues, and keep maintenance moving with a focused, modern dashboard.
          </p>
          <Link href={"/dashboard"}>
            <button className="bg-cuspink text-black cursor-pointer font-semibold px-10 py-4 rounded-2xl border border-cusgreen/40 shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all">
              Try it now
            </button>
          </Link>
          <Image
            src={"/hero.png"}
            width={760}
            height={420}
            className="mt-10 rounded-3xl shadow-2xl border border-cusgreen/10"
            alt="CabinCare preview"
          />
        </main>

        <footer className="w-full border-t border-cusgreen/15 bg-cusgray/40 backdrop-blur py-6">
          <div className="w-11/12 max-w-6xl mx-auto flex items-center justify-between text-cusgreen/80 text-sm">
            <span>CabinCare — Technical assessment project.</span>
            <span>Made by Marin Benchellal</span>
          </div>
        </footer>
      </div>
    </>
  );
}
