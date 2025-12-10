"use client";

import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import Cabin from "@/app/components/Cabin";
import Link from "next/link";

export interface CabinType {
  id: number;
  cabin_name: string;
  location: string;
  image: string;
}
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
      <div className="text-cusgreen h-full flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Latest cabins added</h1>
          <Link href={"/cabins/create"}>
            <button className="flex items-center px-4 py-2 rounded-xl bg-cusgreen text-main gap-2 cursor-pointer hover:-translate-y-0.5 transition ease-in-out shadow-sm border border-cusgreen/40">
              <Plus color="#0b1610" strokeWidth={3} />
              <span className="font-semibold">New cabin</span>
            </button>
          </Link>
        </div>
        <div className="flex gap-3 flex-wrap overflow-auto min-h-0 border border-cusgreen/20 p-4 bg-cusgray rounded-2xl flex-1 shadow-inner">
          {cabins.map((cabin, i) => {
            return <Cabin key={i} cabin={cabin} />;
          })}
        </div>
      </div>
    </>
  );
}
