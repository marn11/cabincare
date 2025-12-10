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
      <div className="flex items-center justify-center h-full w-full">
        <form
          className="flex-col items-center justify-between p-4 h-fit w-fit rounded-xl border bg-cusgray"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold text-black my-2">
            Create a new Cabin:
          </h2>
          <div className="flex flex-col gap-5">
            <div className="flex gap-2 items-center">
              <span className="w-15">Name:</span>
              <input
                type="text"
                required
                placeholder="cabin name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="focus:outline-none p-2 border rounded-xl"
              />
            </div>
            <div className="flex gap-2 items-center">
              <span className="w-15">Location:</span>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="cabin location"
                className="focus:outline-none p-2 border rounded-xl"
              />
            </div>
            <div className="flex gap-2 items-center">
              <span className="w-15">Image:</span>
              <input
                type="file"
                placeholder="cabin image"
                className="focus:outline-none p-2 border rounded-xl"
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
          <div className="flex items-center justify-center m-4">
            <button
              type="submit"
              className="border p-2 rounded-xl cursor-pointer"
            >
              Submit
            </button>
          </div>
          {/* onclick sumbit the post request */}
        </form>
      </div>
    </>
  );
}
