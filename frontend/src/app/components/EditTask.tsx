import { Pencil } from "lucide-react";

interface props {
	onOpen: () => void;
}

export default function EditTask({onOpen} : props) {
  return (
    <>
      <button onClick={onOpen} className="flex items-center px-4 py-2 rounded-xl bg-cuspink gap-2 cursor-pointer hover:bg-cuspink/80 transition ease-in-out">
        <Pencil color="black" strokeWidth={2} />
        <span className="text-black font-semibold hidden lg:block">
          Edit Status
        </span>
      </button>
    </>
  );
}
