"use client";
import { useState } from "react";
import { redirect } from "next/navigation";

export default function Page() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", name);
  fd.append("location", location);
    if (image) {
      fd.append("image", image);
      await fetch(process.env.NEXT_PUBLIC_BACKEND_URL! + "cabins", {
        method: "POST",
        body: fd,
      });
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
          <h2 className="text-2xl font-bold my-2">Create a new Cabin</h2>
          <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-cusgreen/90">Name</span>
              <input
                type="text"
                required
                placeholder="cabin name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="focus:outline-none p-3 border border-cusgreen/20 rounded-xl bg-main text-cusgreen focus:ring-2 focus:ring-cuspink/70"
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-cusgreen/90">Location</span>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="cabin location"
                className="focus:outline-none p-3 border border-cusgreen/20 rounded-xl bg-main text-cusgreen focus:ring-2 focus:ring-cuspink/70"
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-cusgreen/90">Image</span>
              <input
                type="file"
                placeholder="cabin image"
                className="focus:outline-none p-3 border border-cusgreen/20 rounded-xl bg-main text-cusgreen file:bg-cusgreen file:text-main file:border-0 file:px-3 file:py-2"
                id="Image"
                name="cabin image"
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
            </div>
          </div>
          <div className="flex items-center justify-end gap-3 mt-6 w-full">
            <button
              type="submit"
              className="px-5 py-3 bg-cusgreen text-main font-semibold rounded-xl cursor-pointer shadow-sm hover:-translate-y-0.5 transition border border-cusgreen/40"
            >
              Submit
            </button>
          </div>
          {/* onclick submit the post request */}
        </form>
      </div>
    </>
  );
}
