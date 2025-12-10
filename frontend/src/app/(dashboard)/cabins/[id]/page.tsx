"use client";
import { useEffect, useState } from "react";
import CabinViewer from "@/app/components/CabinViewer";
import type { CabinType } from "../../dashboard/page";
import { useParams } from "next/navigation";
import LogNewTask from "@/app/components/LogNewTask";
import Task from "@/app/components/Task";
import { redirect } from "next/navigation";

export interface TaskType {
  description: string;
  cabin_id: number;
  status: string;
  priority: string;
}

export default function Page() {
  const [cabin, setCabin] = useState<CabinType>();
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const params = useParams();
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("PENDING");
  const [priority, setPriority] = useState("MEDIUM");

  const getCabinById = async (numId: number) => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL! + `cabins/${numId}`
      );
      const data = await res.json();
      if (!res.ok) {
        console.error("error fetching this cabin", res.status);
        return;
      }
      setCabin(data);
    } catch (err) {
      console.error("error fetching this cabin", err);
    }
  };
  const getCabinTasks = async (numId: number) => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL! + `tasks/${numId}`
      );
      const data = await res.json();
      if (!res.ok) {
        console.error("error fetching this cabin's tasks", res.status);
        return;
      }
      setTasks(data);
    } catch (err) {
      console.error("error fetching this cabin's tasks", err);
    }
  };

  useEffect(() => {
    const fetchCabin = async () => {
      const numId = Number(params.id);
      if (isNaN(numId)) {
        redirect("/dashboard");
      }
      await getCabinById(numId);
      await getCabinTasks(numId);
    };
    fetchCabin();
  }, [params.id]);
  const newTask = async () => {
    const numId = Number(params.id);
    if (!description.trim() || isNaN(numId)) return;
    const newTask: TaskType = {
      description: description,
      cabin_id: numId,
      priority: priority,
      status: status,
    };
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL! + "tasks", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newTask),
      });
      const data = await res.json();
      if (!res.ok) {
        console.error("error adding task", res.status);
        return;
      }
      setTasks([data, ...tasks]);
    } catch(err) {
      console.error("Error Adding task", err);
    }
    setDescription("");
  };
  
  return (
    <>
      <div className="flex items-center border h-full">
        {cabin ? <CabinViewer cabin={cabin}></CabinViewer> : <p>Loading...</p>}
        <div className="border p-4 bg-cusgray flex-1 rounded-xl gap-2 m-2 flex flex-col h-120 overflow-auto text-black">
          <div className="flex justify-between items-center">
            <h2 className="text-black text-2xl font-bold">All tasks:</h2>
            <LogNewTask onOpen={() => setShowModal(true)} />
          </div>
          {tasks.map((task, i) => {
            return <Task key={i} task={task} />;
          })}
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 text-black">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                newTask();
                setShowModal(false);
              }}
            >
              <h2 className="text-xl font-bold mb-4">New task</h2>
              <input
                type="text"
                required
                placeholder="task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded-md mb-3"
              />
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-2 border rounded-md mb-4"
              >
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In progress</option>
                <option value="COMPLETE">Complete</option>
              </select>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full p-2 border rounded-md mb-4"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded cursor-pointer"
                  onClick={() => {
                    setDescription("");
                    setShowModal(false);
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
