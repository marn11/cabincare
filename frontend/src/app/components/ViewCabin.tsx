import { Eye } from "lucide-react";
import Link from "next/link";

export default function ViewCabin({cabinId} : {cabinId: number}) {
  return (
    <>
      <Link href={`/cabins/${cabinId}`}>
      <button className="absolute left-5 top-5 flex items-center px-4 py-2 rounded-xl bg-cusgreen text-main gap-2 cursor-pointer hover:-translate-y-0.5 transition ease-in-out shadow-sm border border-cusgreen/40">
        <Eye color="#0b1610" strokeWidth={2} />
        <span className="font-semibold hidden lg:block">
          View cabin
        </span>
      </button>
      </Link>
    </>
  );
}
