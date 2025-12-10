import { Pencil } from "lucide-react";

interface props {
	onOpen: () => void;
}

export default function EditTask({onOpen} : props) {
  return (
    <>
      <button onClick={onOpen} className="flex items-center px-4 py-2 rounded-xl bg-cusgreen text-main gap-2 cursor-pointer hover:-translate-y-0.5 transition ease-in-out shadow-sm border border-cusgreen/40">
        <Pencil color="#0b1610" strokeWidth={2} />
        <span className="font-semibold hidden lg:block">
          Edit Status
        </span>
      </button>
    </>
  );
}
