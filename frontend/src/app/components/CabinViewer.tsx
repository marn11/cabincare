import Image from "next/image";
import type { CabinType } from "../(dashboard)/dashboard/page";


export default function CabinViewer({cabin} : {cabin : CabinType}) {
  const imageUrl = `http://localhost:3001/uploads/${cabin.image}`;

  return (
    <>
      <div className="flex flex-col gap-3 rounded-2xl bg-cusgray p-4 m-2 w-md relative h-fit border border-cusgreen/20 shadow-sm">
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
        </div>
        <div className="border border-cusgreen/20 rounded-xl p-3 bg-main/40 text-cusgreen">
          <h2 className="font-bold">
            Cabin name:{" "}
            <span className="font-semibold text-white">{cabin.cabin_name}</span>
          </h2>
          <h4 className="font-bold">
            Location:{" "}
            <span className="font-semibold text-white"> {cabin.location}</span>
          </h4>
        </div>
      </div>
    </>
  );
}
