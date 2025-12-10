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
      {" "}
      <div className="flex flex-col gap-2 rounded-xl bg-cusgray p-4 w-md relative h-fit border">
        <div className="flex border rounded-xl">
          <Image
            src={imageUrl || "/leaky.jpg"}
            // mnb3d rdha image
            width={448}
            height={448}
            unoptimized
            alt="cabin issue attachment"
            className="border rounded-xl aspect-square object-cover"
          ></Image>
          <EditDetails cabinId={cabin.id} />
          <ViewCabin cabinId={cabin.id} />
        </div>
        <div className="border rounded-xl p-2">
          <h2 className="font-bold">
            Cabin name:{" "}
            <span className="font-semibold text-cusgreen">
              {cabin.cabin_name}
            </span>
          </h2>
          <h4 className="font-bold">
            Location:{" "}
            <span className="font-semibold text-cusgreen">
              {" "}
              {cabin.location}
            </span>
          </h4>
          <h3 className="font-bold">
            Tasks:
            <span className="font-medium">
              {tasks.length} <span className="font-semibold">total</span> <br />
              {tasks.filter((task) => task.status === "COMPLETE").length}{" "}
              <span className="font-semibold text-green-600">completed</span>,{" "}
              {tasks.filter((task) => task.status === "IN_PROGRESS").length}{" "}
              <span className="font-semibold text-yellow-600">in progress</span>, and{" "}
              {tasks.filter((task) => task.status === "PENDING").length}{" "}
              <span className="font-semibold text-red-600">pending</span>
            </span>
          </h3>
        </div>
      </div>
    </>
  );
}
