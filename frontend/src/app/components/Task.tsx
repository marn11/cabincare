import { TaskType } from "../(dashboard)/cabins/[id]/page";
import {
  BadgeX,
  Badge,
  BadgeCheck,
  MoveUpRight,
  MoveHorizontal,
  MoveDownRight,
} from "lucide-react";
import EditTask from "./EditTask";
import { useState } from "react";

export default function Task({ task }: { task: TaskType }) {
  const [showEdit, setShowEdit] = useState(false);
  const [status, setStatus] = useState(task.status);
  const [savedStatus, setSavedStatus] = useState(task.status);
  const changeStatus = async () => {
    const newStatus = { status };
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL! + `tasks/${task.id}`,
        {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(newStatus),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.error("error editing task", res.status);
        return;
      }
      setSavedStatus(data.status);
    } catch (err) {
      console.error("error editing task", err);
    }
  };
  return (
    <>
      <div className="flex items-center justify-between border border-cusgreen/20 bg-cusgray rounded-2xl p-4 shadow-sm">
        <div className="space-y-2 text-cusgreen">
          <h3 className="font-semibold">
            Description: <span className="font-medium text-white/90">{task.description}</span>
          </h3>
          <h3 className="flex gap-2 items-center">
            Status: <span className="font-semibold text-white/90">{savedStatus}</span>
            {task.status === "PENDING" && <BadgeX color="#f87171" />}
            {task.status === "IN_PROGRESS" && <Badge color="#38d37b" />}
            {task.status === "COMPLETE" && <BadgeCheck color="#22c55e" />}
          </h3>
          <h3 className="flex gap-2 items-center">
            Priority: <span className="font-semibold text-white/90">{task.priority}</span>
            {task.priority === "HIGH" && <MoveUpRight color="#f87171" />}
            {task.priority === "MEDIUM" && <MoveHorizontal color="#8ae6c0" />}
            {task.priority === "LOW" && <MoveDownRight color="#22c55e" />}
          </h3>
        </div>
        <EditTask onOpen={() => setShowEdit(true)} />
      </div>
      {showEdit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-cusgray rounded-2xl p-6 w-96 text-cusgreen shadow-xl border border-cusgreen/30">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                changeStatus();
                setShowEdit(false);
              }}
            >
              <h2 className="text-xl font-bold mb-4">Edit task status</h2>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-3 border border-cusgreen/20 rounded-xl mb-4 bg-main text-cusgreen focus:ring-2 focus:ring-cuspink/70 focus:outline-none"
              >
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In progress</option>
                <option value="COMPLETE">Complete</option>
              </select>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-main text-cusgreen border border-cusgreen/30 rounded-xl cursor-pointer hover:bg-cuspink/50"
                  onClick={() => {
                    setStatus(task.status);
                    setShowEdit(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cusgreen text-main rounded-xl font-semibold cursor-pointer shadow-sm hover:-translate-y-0.5"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
