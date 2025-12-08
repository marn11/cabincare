import { Metadata } from "next";
import {
  BadgeCheck,
  Pencil,
  BadgeX,
  Badge,
  MoveUpRight,
  MoveHorizontal,
  MoveDownRight,
} from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function Dashboard() {
  return (
    <>
      <div className="text-black">
        <h1 className="text-xl font-medium text-cuspink">Latest cabins added: </h1>
        <div className="border flex gap-2 flex-wrap">
          <div className="border rounded-xl bg-cusgray p-4 w-md relative">
            <div className="flex">
              <Image
                src={"/leaky.jpg"}
                width={448}
                height={448}
                quality={100}
                alt="cabin issue attachment"
                className="border rounded-xl"
              ></Image>
              <button
                className="absolute right-5 top-5 flex items-center px-4 py-2
                rounded-xl bg-cuspink gap-2
              cursor-pointer hover:bg-cuspink/80 transition ease-in-out"
              >
                <Pencil color="black" strokeWidth={2} />
                <span className="text-black font-semibold hidden lg:block">
                  Edit details
                </span>
              </button>
            </div>
            <h2>Cabin name: Marrakech mansion</h2>
            <h3>Description: Leaky faucet in main bath</h3>
            <h4>Location: Marrakech, Morocco</h4>
            <h3>
              Priority:
              <div className="flex">
                <MoveUpRight color="red" /> <MoveHorizontal color="orange" />{" "}
                <MoveDownRight color="green" />
              </div>
            </h3>
            <h3>
              Status:
              <div className="flex">
                <BadgeCheck color="green" /> <BadgeX color="red" />{" "}
                <Badge color="black" />
              </div>
            </h3>
          </div>
          <div className="border rounded-xl bg-cusgray p-4 w-md relative">
            <div className="flex">
              <Image
                src={"/leaky.jpg"}
                width={448}
                height={448}
                quality={100}
                alt="cabin issue attachment"
                className="border rounded-xl"
              ></Image>
              <button
                className="absolute right-5 top-5 flex items-center px-4 py-2
                rounded-xl bg-cuspink gap-2
              cursor-pointer hover:bg-cuspink/80 transition ease-in-out"
              >
                <Pencil color="black" strokeWidth={2} />
                <span className="text-black font-semibold hidden lg:block">
                  Edit details
                </span>
              </button>
            </div>
            <h2>Cabin name: Marrakech mansion</h2>
            <h3>Description: Leaky faucet in main bath</h3>
            <h4>Location: Marrakech, Morocco</h4>
            <h3>
              Priority:
              <div className="flex">
                <MoveUpRight color="red" /> <MoveHorizontal color="orange" />{" "}
                <MoveDownRight color="green" />
              </div>
            </h3>
            <h3>
              Status:
              <div className="flex">
                <BadgeCheck color="green" /> <BadgeX color="red" />{" "}
                <Badge color="black" />
              </div>
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}
