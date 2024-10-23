import React from "react";
export interface Message {
  content: string;
  time: string;
  internal: boolean;
}

function Message(props: Message) {
  if (props.internal) {
    return (
      <div className="p-4 w-fit self-end flex flex-col">
        <div className="rounded-xl outline-solid outline-1 outline-[#303236] p-4 bg-[#5865f2]">
          <p className="text-white text-md">{props.content}</p>
        </div>
        <div className="mt-3 ml-2 self-end">
          <span className="text-sm opacity-70">Today at {props.time}</span>
        </div>
      </div>
    );
  } else {
    return (
      <div className="p-4 w-fit ">
        <div className="rounded-xl outline-solid outline-1 outline-[#303236] p-4 bg-[#1e1f22]">
          <p className="text-[#b9bdc1f0] text-md">{props.content}</p>
        </div>
        <div className="mt-3 ml-2">
          <span className="text-sm opacity-70">Today at {props.time}</span>
        </div>
      </div>
    );
  }
}

export default Message;
