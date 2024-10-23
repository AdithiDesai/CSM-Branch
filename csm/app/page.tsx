"use client";
import React, { useEffect, useState } from "react";
import { FormEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    UUID: generateUUID(),
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const registerAgent = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch("/api/agentRegister", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      const data = await response.json();

      sessionStorage.setItem("UUID", formData.UUID);
      sessionStorage.setItem("NAME", formData.name);
      sessionStorage.setItem("DBID", data["dbId"]);

      router.push("/chat");
    }
  };

  function generateUUID() {
    return uuidv4().toString();
  }
  useEffect(() => {
    if (sessionStorage.getItem("UUID")) {
      redirect("/chat");
    }
  });

  return (
    <div className="bg-[#1e1f22] w-full h-full grid place-items-center">
      <div className="bg-[#2b2d31] w-3/12 h-2/6 flex flex-col items-center p-3 rounded-lg">
        <svg
          className="mt-6"
          fill="#cbd4f0"
          height={56}
          width={56}
          role="img"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Branch Support Chat Logo</title>
          <path d="M11.07 8.82S9.803 1.079 5.145 1.097C2.006 1.109.78 4.124 3.055 4.802c0 0-2.698.973-2.698 2.697 0 1.725 4.274 3.54 10.713 1.32zm1.931 5.924s.904 7.791 5.558 7.991c3.136.135 4.503-2.82 2.262-3.604 0 0 2.74-.845 2.82-2.567.08-1.723-4.105-3.737-10.64-1.82zm-3.672-1.55s-7.532 2.19-6.952 6.813c.39 3.114 3.53 3.969 3.93 1.63 0 0 1.29 2.559 3.002 2.351 1.712-.208 3-4.67.02-10.794zm5.623-2.467s7.727-1.35 7.66-6.008c-.046-3.138-3.074-4.333-3.728-2.051 0 0-1-2.686-2.726-2.668-1.724.018-3.494 4.312-1.206 10.727z" />
        </svg>
        <h1 className="text-2xl font-bold mb-6 mt-6">Branch Support Chat</h1>
        <form className="flex flex-col" onSubmit={registerAgent}>
          <input
            type="text"
            name="name"
            onChange={handleInputChange}
            value={formData.name}
            className="ml-3 focus:border-0 focus:outline-0 bg-[#1e1f22] rounded-md p-2 mb-6 mt-6"
            placeholder="Agent Name"
          />
          <input type="hidden" name="UUID" value={formData.UUID} />
          <button
            className="bg-[#cbd4f0] text-black p-2 rounded-md"
            type="submit"
          >
            Create Agent
          </button>
        </form>
      </div>
    </div>
  );
}

export default page;
