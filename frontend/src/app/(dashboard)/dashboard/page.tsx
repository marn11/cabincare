"use client";
// import { Metadata } from "next";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import Cabin from "@/app/components/Cabin";
import Link from "next/link";
// export const metadata: Metadata = {
//   title: "Dashboard",
// };

export interface CabinType {
  id: number;
  cabin_name: string;
  location: string;
  image: string;
}
// dir file dial types
export default function Dashboard() {
  const [cabins, setCabins] = useState<CabinType[]>([]);

  const fetchCabins = async () => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL! + `cabins`);
      const data = await res.json();
      if (!res.ok) {
        console.error("error fetching cabins", res.status);
        return;
      }
      setCabins(data);
    } catch (err) {
      console.error("error fetching cabins", err);
    }
  };

  useEffect(() => {
    const loadCabins = async () => {
      await fetchCabins();
    };
    loadCabins();
  }, []);

  return (
    <>
      <div className="text-black h-full flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-medium text-cuspink">
            Latest cabins added:{" "}
          </h1>
          <Link href={"/cabins/create"}>
          <button className="flex items-center px-4 py-2 rounded-xl bg-cuspink gap-2 cursor-pointer hover:bg-cuspink/80 transition ease-in-out">
            <Plus color="black" strokeWidth={3} />
            <span className="text-black font-semibold">New cabin</span>
          </button>
          </Link>
        </div>
        <div className="flex gap-2 flex-wrap overflow-auto min-h-0 border p-2 bg-cuspink rounded-lg flex-1">
          {cabins.map((cabin, i) => {
            return (
              <Cabin
                key={i}
                cabin={cabin}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
