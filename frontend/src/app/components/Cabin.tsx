"use client";

import Image from "next/image";
import EditDetails from "./EditDetails";
import ViewCabin from "./ViewCabin";
import type { CabinType } from "../(dashboard)/dashboard/page";
import { useEffect, useState } from "react";
import { TaskType } from "../(dashboard)/cabins/[id]/page";

export default function Cabin({ cabin }: { cabin: CabinType }) {
  const imageUrl = `http://localhost:3001/uploads/${cabin.image}`;
  const [tasks, setTasks] = useState<TaskType[]>([]);

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
      await getCabinTasks(cabin.id);
    };
    fetchCabin();
  }, [cabin.id]);
  return (
    <>
      <div className="flex flex-col gap-3 rounded-2xl bg-cusgray p-4 w-md relative h-fit border border-cusgreen/20 shadow-sm">
        <div className="flex border border-cusgreen/20 rounded-xl overflow-hidden bg-main/60">
          <Image
            src={imageUrl || "/leaky.jpg"}
            // mnb3d rdha image
            width={448}
            height={448}
            unoptimized
            alt="cabin issue attachment"
            className="border border-cusgreen/20 rounded-xl aspect-square object-cover"
          ></Image>
          <EditDetails cabinId={cabin.id} />
          <ViewCabin cabinId={cabin.id} />
        </div>
        <div className="border border-cusgreen/20 rounded-xl p-3 bg-main/40 text-cusgreen">
          <h2 className="font-bold">
            Cabin name:{" "}
            <span className="font-semibold text-white">
              {cabin.cabin_name}
            </span>
          </h2>
          <h4 className="font-bold">
            Location:{" "}
            <span className="font-semibold text-white">
              {" "}
              {cabin.location}
            </span>
          </h4>
          <h3 className="font-bold">
            Tasks:
            <span className="font-medium text-white">
              {tasks.length} <span className="font-semibold text-white">total</span> <br />
              {tasks.filter((task) => task.status === "COMPLETE").length}{" "}
              <span className="font-semibold text-cusgreen">completed</span>,{" "}
              {tasks.filter((task) => task.status === "IN_PROGRESS").length}{" "}
              <span className="font-semibold text-cuspink">in progress</span>, and{" "}
              {tasks.filter((task) => task.status === "PENDING").length}{" "}
              <span className="font-semibold text-red-400">pending</span>
            </span>
          </h3>
          <h3 className="font-bold">
            Priority:
            <span className="font-medium text-white">
              {tasks.filter((task) => task.priority === "HIGH").length}{" "}
              <span className="font-semibold text-red-400">high</span>, {tasks.filter((task) => task.priority === "MEDIUM").length}{" "}
              <span className="font-semibold text-cuspink">medium</span>, and {tasks.filter((task) => task.priority === "LOW").length}{" "}
              <span className="font-semibold text-cusgreen">low</span>
            </span>
          </h3>
        </div>
      </div>
    </>
  );
}
