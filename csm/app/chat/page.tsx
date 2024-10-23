import React from "react";
import {
  MagnifyingGlass,
  Paperclip,
  Smiley,
  PlusCircle,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { Inter } from "next/font/google";
import Message from "../components/Message";

const inter = Inter({ subsets: ["latin"] });

function page() {
  return (
    <div className="grid grid-cols-4 h-full p-4 bg-[#1e1f22]">
      <div
        id="leftPane"
        className="h-full flex flex-col justify-center col-span-1"
      >
        <div id="appName" className="p-4 flex mb-2">
          <svg
            fill="#cbd4f0"
            height={56}
            width={56}
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>csm</title>
            <path d="M11.07 8.82S9.803 1.079 5.145 1.097C2.006 1.109.78 4.124 3.055 4.802c0 0-2.698.973-2.698 2.697 0 1.725 4.274 3.54 10.713 1.32zm1.931 5.924s.904 7.791 5.558 7.991c3.136.135 4.503-2.82 2.262-3.604 0 0 2.74-.845 2.82-2.567.08-1.723-4.105-3.737-10.64-1.82zm-3.672-1.55s-7.532 2.19-6.952 6.813c.39 3.114 3.53 3.969 3.93 1.63 0 0 1.29 2.559 3.002 2.351 1.712-.208 3-4.67.02-10.794zm5.623-2.467s7.727-1.35 7.66-6.008c-.046-3.138-3.074-4.333-3.728-2.051 0 0-1-2.686-2.726-2.668-1.724.018-3.494 4.312-1.206 10.727z" />
          </svg>

          <div className="ml-3">
            <span className="text-xl font-bold">Branch Support Chat</span>
            <br />
            <span className="text-sm font-semibold">version 1.0</span>
          </div>
        </div>
        <hr style={{ margin: "auto" }} className="opacity-50 p-1 w-10/12" />

        <div
          id="conversations"
          className="flex flex-row justify-center mt-2 h-full"
        >
          <div id="Search Box" className="mb-4 w-9/12">
            <div
              className="flex items-center p-2 bg-[#2b2d31] justify-start rounded-xl"
              id="SearchBox"
            >
              <MagnifyingGlass color="#89929b" size={28} />
              <input
                type="text"
                className="bg-transparent ml-3 focus:border-0 focus:outline-0"
                placeholder="Search Here"
              />
            </div>
          </div>
        </div>
        <hr style={{ margin: "auto" }} className="opacity-50 w-10/12 p-3" />
        <div id="userDetails" className="flex flex-row p-4">
          <div className="mr-3">
            <Image
              src="/boy.png"
              height={42}
              width={42}
              alt="User Profile Image"
            ></Image>
          </div>
          <div>
            <span className={["text-xl font-bold"].join("")}>
              Simon Shashava
            </span>
            <br />
            <span className="font-semibold opacity-70">
              @agent_uuid_goes_here
            </span>
          </div>
        </div>
      </div>
      <div
        className="col-span-3 h-full p-3 bg-[#2b2d31] rounded-md overflow-hidden"
        id="rightPane"
      >
        <div id="TopPanel">
          <div id="contactInfo" className="flex flex-row items-center p-4">
            <div className="rounded-xl">
              <Image
                className="mr-5"
                src="/krusha.png"
                height={56}
                width={56}
                alt="User Profile Image"
              ></Image>
            </div>
            <div>
              <span className={["text-xl font-bold"].join("")}>
                Grusha Vashnadze
              </span>
              <br />
              <span className="font-semibold opacity-70">
                @more_sender_info
              </span>
            </div>
          </div>
        </div>
        <hr style={{ margin: "auto" }} className="opacity-50 w-11/12 p-3" />
        <div id="MessagesBody" className="h-5/6 flex flex-col overflow-y-auto">
          <Message content="Tester Message" time="3:10 pm" internal={false} />
          <Message
            content="Do you mind taking a cab to GitHub HQ?"
            time="3:21 pm"
            internal={true}
          />
          <Message content="Sure bet" time="3:23 pm" internal={false} />
        </div>
        <div id="InputBox" className="w-11/12 " style={{ margin: "auto" }}>
          <div className="flex flex-row bg-[#1e1f22] rounded-xl p-2">
            <PlusCircle color="#879099" size={28} />
            <input
              type="text"
              className="bg-transparent ml-3 focus:border-0 focus:outline-0 w-11/12"
              placeholder="Type your message"
            />

            <div className="flex flex-row">
              <Smiley className="mr-3" color="#879099" size={28} />
              <Paperclip color="#879099" size={28} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
