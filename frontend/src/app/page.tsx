import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <header>
          <nav></nav>
        </header>
        <main className="flex items-center justify-center">
          <h1 className="text-main">Welcome to CabinCare, where we <span className="text-green-light">care</span> about your logistics ❤️</h1>
        </main>
        <footer className="text-main">this project is part of ...</footer>
      </div>
    </>
  );
}
