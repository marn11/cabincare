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
        process.env.NEXT_PUBLIC_BACKEND_URL! + `tasks/${task.cabin_id}`,
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
      <div className="flex items-center justify-between border p-2">
        <div>
          <h3>
            Description: <span>{task.description}</span>
          </h3>
          <h3 className="flex gap-2">
            Status: <span>{savedStatus}</span>
            {task.status === "PENDING" && <BadgeX color="red" />}
            {task.status === "IN_PROGRESS" && <Badge color="black" />}
            {task.status === "COMPLETE" && <BadgeCheck color="green" />}
          </h3>
          <h3 className="flex gap-2">
            Priority: <span>{task.priority}</span>
            {task.priority === "HIGH" && <MoveUpRight color="red" />}
            {task.priority === "MEDIUM" && <MoveHorizontal color="black" />}
            {task.priority === "LOW" && <MoveDownRight color="green" />}
          </h3>
        </div>
        <EditTask onOpen={() => setShowEdit(true)} />
      </div>
      {showEdit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 text-black">
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
                className="w-full p-2 border rounded-md mb-4"
              >
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In progress</option>
                <option value="COMPLETE">Complete</option>
              </select>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded cursor-pointer"
                  onClick={() => {
                    setStatus(task.status);
                    setShowEdit(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cuspink rounded text-black font-semibold cursor-pointer"
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
