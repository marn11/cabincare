/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { redirect, useParams } from "next/navigation";
import type { CabinType } from "@/app/(dashboard)/dashboard/page";
import { Camera } from "lucide-react";

export default function Page() {
  const [cabin, setCabin] = useState<CabinType>();
  const params = useParams();
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const imageUrl = `http://localhost:3001/uploads/${cabin?.image}`;
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

  useEffect(() => {
    const fetchCabin = async () => {
      const numId = Number(params.id);
      if (isNaN(numId)) return;
      await getCabinById(numId);
    };
    fetchCabin();
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cabin) return;

    const fd = new FormData();
    if (name !== cabin.cabin_name) fd.append("name", name);
    if (location !== cabin.location) fd.append("location", location);
    if (image) fd.append("image", image);
    if ([...fd.entries()].length === 0) {
      console.log("No changes to update");
      return;
    }
    const res = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL! + `cabins/${cabin.id}`,
      {
        method: "PUT",
        body: fd,
      }
    );
    if (!res.ok){
      console.error("update failed");
      return;
    }
    redirect("/dashboard");
  };
  // mli tsali redirecti luser ldik lcabin bdbt /cabin/id dialha
  return (
    <>
      <div className="flex items-center justify-center h-full w-full">
        <form
          className="flex-col items-center justify-between p-4 h-fit w-fit rounded-xl border bg-cusgray"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold text-black my-2 text-center">
            Edit cabin:
          </h2>
          <div className="flex flex-col gap-5 text-black font-semibold">
            <div className="flex gap-2 items-center">
              <span className="w-15">Name:</span>
              <input
                type="text"
                placeholder={cabin?.cabin_name}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="focus:outline-none p-2 border rounded-xl placeholder:font-medium"
              />
            </div>
            <div className="flex gap-2 items-center">
              <span className="w-15">Location:</span>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder={cabin?.location}
                className="focus:outline-none p-2 border rounded-xl placeholder:font-medium"
              />
            </div>
            <div className="flex gap-2 items-center">
              <span className="w-15">Image:</span>
              <div className="flex relative justify-center group">
                {/* eslint@next/next/no-img-element */}
                <img
                  className="my-2 border-2 rounded-full relative aspect-square object-cover border-cusgreen group-hover:grayscale transition duration-200 ease-in-out cursor-pointer"
                  src={imageUrl || "/leaky.jpg"}
                  width={128}
                  height={128}
                  alt="profile pic"
                ></img>
                <label
                  htmlFor="Image"
                  className="cursor-pointer absolute top-1/2"
                >
                  <div className="opacity-0 group-hover:opacity-100 transition duration-200 ease-in-out">
                    <Camera color="black" />
                  </div>
                  <input
                    id="Image"
                    type="file"
                    name="cabin image"
                    className="hidden"
                    accept=".jpg, .jpeg, .png"
                    onChange={async (e) => {
                      if (!e.target.files || !e.target.files[0]) return;
                      const allowed = ["image/jpeg", "image/jpg", "image/png"];
                      if (!allowed.includes(e.target.files[0].type)) {
                        console.error("wrong format");
                        e.target.value = "";
                        return;
                      }
                      if (e.target.files[0].size > 5 * 1024 * 1024) {
                        console.error("size too big");
                        e.target.value = "";
                        return;
                      }
                      const file = e.target.files[0];
                      setImage(file);
                      return;
                    }}
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center m-4">
            <button className="border p-2 rounded-xl cursor-pointer">
              Submit
            </button>
          </div>
          {/* onclick sumbit the post request */}
        </form>
      </div>
    </>
  );
}
