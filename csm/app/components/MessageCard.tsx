import React from "react";
import Avatar from "boring-avatars";

export interface MessageInfo {
  content: string;
  displayName: string;
  assigned: Boolean;
}

function MessageCard(props: MessageInfo) {
  return (
    <div className=" p-4 w-full self-end flex items-center hover:bg-[#2b2d31] rounded-xl hover:cursor-pointer mb-3">
      <div className="mr-5">
        <Avatar
          size={52}
          name={props.displayName}
          variant="beam"
          colors={["#A7C5BD", "#E5DDCB", "#EB7B59", "#CF4647", "#524656"]}
        />
      </div>
      <div>
        <span className="text-xl font-bold">{props.displayName}</span>
        <br />
        <span className="opacity-60 text-sm line-clamp-2">
          {" "}
          {props.content}
        </span>
      </div>
    </div>
  );
}

export default MessageCard;
