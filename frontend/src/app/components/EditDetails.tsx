import { Pencil } from "lucide-react";
import Link from "next/link";

export default function EditDetails({cabinId} : {cabinId: number}) {
  return (
    <>
      <Link href={`cabins/edit/${cabinId}`}>
      <button className="absolute right-5 top-5 flex items-center px-4 py-2 rounded-xl bg-cusgreen text-main gap-2 cursor-pointer hover:-translate-y-0.5 transition ease-in-out shadow-sm border border-cusgreen/40">
        <Pencil color="#0b1610" strokeWidth={2} />
        <span className="font-semibold hidden lg:block">
          Edit details
        </span>
      </button>
      </Link>
    </>
  );
}
