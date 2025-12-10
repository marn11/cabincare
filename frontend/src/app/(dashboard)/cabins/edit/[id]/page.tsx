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
  }, [params.id]);
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
  return (
    <>
      <div className="flex items-center justify-center h-full w-full bg-main text-cusgreen">
        <form
          className="flex-col items-center justify-between p-6 h-fit w-full max-w-xl rounded-2xl border border-cusgreen/25 bg-cusgray shadow-lg"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold my-2 text-center">Edit cabin</h2>
          <div className="flex flex-col gap-5 font-semibold w-full">
            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-cusgreen/90">Name</span>
              <input
                type="text"
                placeholder={cabin?.cabin_name}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="focus:outline-none p-3 border border-cusgreen/20 rounded-xl placeholder:font-medium bg-main text-cusgreen focus:ring-2 focus:ring-cuspink/70"
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-cusgreen/90">Location</span>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder={cabin?.location}
                className="focus:outline-none p-3 border border-cusgreen/20 rounded-xl placeholder:font-medium bg-main text-cusgreen focus:ring-2 focus:ring-cuspink/70"
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-cusgreen/90">Image</span>
              <div className="flex relative justify-start gap-4 items-center">
                {/* eslint@next/next/no-img-element */}
                <img
                  className="my-2 border-2 rounded-full aspect-square object-cover border-cusgreen/50 w-24 h-24 bg-main"
                  src={imageUrl || "/leaky.jpg"}
                  width={96}
                  height={96}
                  alt="current cabin"
                ></img>
                <label
                  htmlFor="Image"
                  className="cursor-pointer px-4 py-2 rounded-xl bg-cusgreen text-main font-semibold shadow-sm hover:-translate-y-0.5 transition border border-cusgreen/40"
                >
                  <div className="flex items-center gap-2">
                    <Camera color="#0b1610" />
                    <span>Update image</span>
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
          <div className="flex items-center justify-end mt-6 w-full">
            <button className="px-5 py-3 bg-cusgreen font-semibold text-main rounded-xl cursor-pointer shadow-sm hover:-translate-y-0.5 transition border border-cusgreen/40">
              Submit
            </button>
          </div>
          {/* onclick submit the post request */}
        </form>
      </div>
    </>
  );
}
