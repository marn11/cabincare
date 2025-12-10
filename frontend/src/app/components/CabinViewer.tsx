import Image from "next/image";
import {
  BadgeCheck,
  Pencil,
  BadgeX,
  Badge,
  MoveUpRight,
  MoveHorizontal,
  MoveDownRight,
  Eye,
} from "lucide-react";
import EditDetails from "./EditDetails";
import ViewCabin from "./ViewCabin";
import type { CabinType } from "../(dashboard)/dashboard/page";
import LogNewTask from "./LogNewTask"


export default function CabinViewer({cabin} : {cabin : CabinType}) {
  const imageUrl = `http://localhost:3001/uploads/${cabin.image}`;

  return (
    <>
      {" "}
      <div className="flex flex-col gap-2 rounded-xl bg-cusgray p-4 m-2 w-md relative h-fit border">
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
        </div>
        <div className="border rounded-xl p-2">
          <h2 className="font-bold">
            Cabin name:{" "}
            <span className="font-semibold text-cusgreen">{cabin.cabin_name}</span>
          </h2>
          <h4 className="font-bold">
            Location:{" "}
            <span className="font-semibold text-cusgreen"> {cabin.location}</span>
          </h4>
          <h3 className="font-bold">
            Tasks:
            <span className="font-medium">
              {" "}
              3 pending, 2 Ongoing, 1 complete (dir les icones hna)
            </span>
          </h3>
          {/* <span className="font-normal">Leaky faucet in main bath (and three more) <span>view all tasks dirlha link</span></span> */}
          <h3 className="font-bold">
            Priority:
            <div className="flex">
              <MoveUpRight color="red" /> <MoveHorizontal color="orange" />{" "}
              <MoveDownRight color="green" />
            </div>
          </h3>
          <h3 className="font-bold">
            Status:
            <div className="flex">
              <BadgeCheck color="green" /> <BadgeX color="red" />
              <Badge color="black" />
            </div>
          </h3>
        </div>
      </div>
    </>
  );
}
