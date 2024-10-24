"use client";
import React, { useEffect, useState } from "react";
import { FormEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter();
  const [formData, setFormData] = useState<{
    name: string;
    UUID: string;
    role: "agent" | "customer";
  }>({
    name: "",
    UUID: generateUUID(),
    role: "agent",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSelectElementChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
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
      sessionStorage.setItem("ROLE", formData.role);
      sessionStorage.setItem("DBID", data["dbId"]);

      if (formData.role === "agent") router.push("/chat");
      else router.push("/support");
    }
  };

  function generateUUID() {
    return uuidv4().toString();
  }
  useEffect(() => {
    if (sessionStorage.getItem("UUID")) {
      if (sessionStorage.getItem("ROLE") === "agent") {
        router.push("/chat");
      } else {
        router.push("/support");
      }
    }
  });

  // Animate Create agent button to prevent multiple clicks
  type ButtonState = "normal" | "loading";
  const [buttonState, setButtonState] = useState<ButtonState>("normal");

  const changeState = () => {
    setButtonState("loading");
  };

  return (
    <div className="bg-[#1e1f22] w-full h-full grid place-items-center">
      <div className="bg-[#2b2d31] flex flex-col items-center p-3 rounded-lg">
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
            placeholder="Username"
          />
          <input required type="hidden" name="UUID" value={formData.UUID} />
          <select
            name="role"
            onChange={handleSelectElementChange}
            value={formData.role}
            className="ml-3 focus:border-0 focus:outline-0 bg-[#1e1f22] rounded-md p-2 mb-6"
          >
            <option value="agent">Agent</option>
            <option value="customer">Customer</option>
          </select>
          <button
            className="bg-[#cbd4f0] text-black p-2 rounded-md"
            type="submit"
            onClick={changeState}
          >
            {buttonState === "normal" ? (
              `Create ${formData.role === "agent" ? "Agent" : "Customer"}`
            ) : (
              <svg
                aria-hidden="true"
                role="status"
                className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="#1C64F2"
                ></path>
              </svg>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default page;
