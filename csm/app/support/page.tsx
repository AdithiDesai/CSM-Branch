"use client";

import React, { FormEvent, useEffect, useRef, useState } from "react";
import {
  MagnifyingGlass,
  Paperclip,
  Smiley,
  PlusCircle,
  SignOut,
  Tray,
} from "@phosphor-icons/react/dist/ssr";

import Image from "next/image";
import Message from "../components/Message";
import MessageCard from "../components/MessageCard";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../api/configs/firebaseconfig";
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import * as Accordion from "@radix-ui/react-accordion";
import { Archive, CaretDown, PaperPlaneTilt } from "@phosphor-icons/react";
import styles from "./styles.module.css";
import Avatar from "boring-avatars";

const fetchConversation = (
  setConversationMessages: any,
  currentconversationId: any,
  iscurrentArchived: boolean
) => {
  let conversationMessageRef;

  if (iscurrentArchived) {
    conversationMessageRef = collection(firestore, "archivedConversations");
  } else {
    conversationMessageRef = collection(firestore, "conversations");
  }

  console.log(iscurrentArchived);

  // currentconversationId
  const q = query(conversationMessageRef);

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const messagesArray: any = [];
    querySnapshot.forEach((doc) => {
      if (doc.id == currentconversationId) {
        messagesArray.push({ ...doc.data(), id: doc.id });
      }
    });
    setConversationMessages(messagesArray);
  });
  return unsubscribe;
};

function page() {
  const [username, setUsername] = useState("");
  const [userUUID, setUUID] = useState("");
  const [conversationMessages, setConversationMessages] = useState([]);

  const [currentConversationId, setCurrentConversationId] = useState("");
  const [currentAgentName, setCurrentAgentName] = useState("");
  const [currentAgentUUID, setCurrentAgentUUID] = useState("");

  const q3 = query(collection(firestore, "agents"));
  const [agentsCount] = useCollectionData(q3);

  console.log({ conversationMessages });

  // Add a subscription to the current conversation
  useEffect(() => {
    if (!currentConversationId) {
      return;
    }
    const unsubscribe = fetchConversation(
      setConversationMessages,
      currentConversationId,
      false
    );
    return () => {
      unsubscribe();
    };
  }, [currentConversationId]);

  useEffect(() => {
    if (!currentConversationId) {
      return;
    }
    // Check if an agent has been assigned to the conversation
    const conversationRef = doc(
      firestore,
      "conversations",
      currentConversationId
    );
    const q = query(
      collection(firestore, "conversations"),
      where("id", "==", currentConversationId)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        setCurrentAgentUUID(data["agentuuid"]);
      });
    });

    return () => {
      unsubscribe();
    };
  }, [currentConversationId]);

  useEffect(() => {
    if (!currentAgentUUID) {
      return;
    }
    // Get the agent's name
    const agentRef = doc(firestore, "agents", currentAgentUUID);
    const q = query(
      collection(firestore, "agents"),
      where("uuid", "==", currentAgentUUID)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        setCurrentAgentName(data["name"]);
      });
    });

    return () => {
      unsubscribe();
    };
  }, [currentAgentUUID]);

  useEffect(() => {
    if (!sessionStorage.getItem("UUID")) {
      redirect("/");
    }

    const name = sessionStorage.getItem("NAME");
    const uuid = sessionStorage.getItem("UUID");
    const role = sessionStorage.getItem("ROLE");

    if (name && uuid) {
      setUsername(name);
      setUUID(uuid);
    }
  }, []);

  const [messageData, setMessageData] = useState({
    content: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const { name, value } = event.target;
    setMessageData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleMessageSend = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let newData = {
      content: messageData.content,
      senderuuid: userUUID,
      timestamp: Date.now(),
    };

    try {
      if (!currentConversationId) {
        // create a new conversation and add it to the conversations collection
        const conversationRef = collection(firestore, "conversations");
        const newConversation = {
          agentuuid: "",
          senderuuid: userUUID,
          timestarted: Date.now(),
          username: username,
          messages: [newData],
        };

        const docRef = await addDoc(conversationRef, newConversation);

        // update the current conversation id
        setCurrentConversationId(docRef.id);
        setMessageData({ content: "" });
      } else {
        const conversationRef = doc(
          firestore,
          "conversations",
          currentConversationId
        );

        await updateDoc(conversationRef, { messages: arrayUnion(newData) });
        setMessageData({ content: "" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!currentConversationId) {
      return;
    }
    // Move conversation to archive
    const archiveConversation = async () => {
      const conversationRef = doc(
        firestore,
        "conversations",
        currentConversationId
      );

      const archiveRef = collection(firestore, "archivedConversations");

      const conversationData = await getDoc(conversationRef);
      const data = conversationData.data();

      await addDoc(archiveRef, data);
      await deleteDoc(conversationRef);
    };

    // On close, archive the conversation
    window.addEventListener("beforeunload", archiveConversation);

    return () => {
      window.removeEventListener("beforeunload", archiveConversation);
    };
  }, []);

  // const exportConversation = async () => {
  //   let data = {
  //     agentid: userUUID,
  //   };
  //   const response = await fetch("/api/exportConversation", {
  //     method: "POST",
  //     body: JSON.stringify(data),
  //   });

  //   if (response.ok) {
  //     return;
  //   }
  //   console.error("Error Exporting Conversations: ");
  // };

  const conversationItems = conversationMessages.map((convo, index) => {
    const messagesArray = convo["messages"] as Chat[];

    type Chat = {
      content: string;
      internal: boolean;
      senderuuid: string;
      timestamp: string;
    };

    const messageItems = messagesArray.map((message, messageIndex) => (
      <Message
        key={messageIndex}
        content={message["content"]}
        time={new Date(parseInt(message["timestamp"]) * 1000).toTimeString()}
        internal={message["senderuuid"] == userUUID}
      />
    ));

    return messageItems;
  });

  return (
    <div className="grid grid-cols-4 h-full p-4 bg-[#1e1f22]">
      <div
        id="leftPane"
        className="h-full flex flex-col justify-center col-span-1 overflow-hidden"
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
      </div>
      <div
        className="col-span-3 h-full p-3 bg-[#2b2d31] rounded-md overflow-hidden grid grid-rows-[auto_auto_1fr] gap-4"
        id="rightPane"
      >
        <div id="TopPanel">
          <div id="contactInfo" className="grid grid-cols-3 items-center p-4">
            <div className="rounded-xl col-span-2 flex flex-row">
              <div className="mr-5">
                <Avatar
                  size={56}
                  name={currentAgentName}
                  variant="beam"
                  colors={[
                    "#A7C5BD",
                    "#E5DDCB",
                    "#EB7B59",
                    "#CF4647",
                    "#524656",
                  ]}
                />
              </div>

              <div>
                <span className={["text-xl font-bold"].join("")}>
                  {currentAgentName}
                </span>
                <br />
                <span className="font-semibold opacity-70">
                  @more_sender_info
                </span>
              </div>
            </div>
            <div className="w-full h-full grid place-items-center">
              <div className="flex flex-row items-center gap-3">
                <div className={[styles.glow].join(" ")}></div>
                <span className="text-sm opacity-50 font">
                  {agentsCount?.length} online
                </span>
              </div>
            </div>
          </div>
        </div>
        <hr style={{ margin: "auto" }} className="opacity-50 w-11/12 p-3" />
        <div className="container px-9 grid grid-rows-[1fr_auto] overflow-y-auto">
          <div id="MessagesBody" className="flex flex-col overflow-y-auto">
            {conversationItems}
          </div>
          <div id="InputBox" className="w-full" style={{ margin: "auto" }}>
            <div className="flex flex-row bg-[#1e1f22] rounded-xl p-2">
              <PlusCircle color="#879099" size={28} />
              <form
                className="w-11/12 flex flex-row items-center"
                onSubmit={handleMessageSend}
              >
                <input
                  name="content"
                  type="text"
                  className="bg-transparent ml-3 focus:border-0 focus:outline-0 w-11/12"
                  placeholder="Type your message"
                  onChange={handleInputChange}
                  value={messageData.content}
                />
                <button className="ml-4" type="submit">
                  <PaperPlaneTilt
                    className=""
                    color="#879099"
                    weight="fill"
                    size={28}
                  />
                </button>
              </form>

              <div className="flex flex-row">
                <Smiley className="mr-3" color="#879099" size={28} />
                <Paperclip color="#879099" size={28} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
