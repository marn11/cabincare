import { Eye } from "lucide-react";
import Link from "next/link";

export default function ViewCabin({cabinId} : {cabinId: number}) {
  return (
    <>
      <Link href={`/cabins/${cabinId}`}>
      <button className="absolute left-5 top-5 flex items-center px-4 py-2 rounded-xl bg-cuspink gap-2 cursor-pointer hover:bg-cuspink/80 transition ease-in-out">
        <Eye color="black" strokeWidth={2} />
        <span className="text-black font-semibold hidden lg:block">
          View cabin
        </span>
      </button>
      </Link>
    </>
  );
}
