import { Pencil } from "lucide-react";
import Link from "next/link";

export default function EditDetails({cabinId} : {cabinId: number}) {
  return (
    <>
      <Link href={`cabins/edit/${cabinId}`}>
      <button className="absolute right-5 top-5 flex items-center px-4 py-2 rounded-xl bg-cuspink gap-2 cursor-pointer hover:bg-cuspink/80 transition ease-in-out">
        <Pencil color="black" strokeWidth={2} />
        <span className="text-black font-semibold hidden lg:block">
          Edit details
        </span>
      </button>
      </Link>
    </>
  );
}
