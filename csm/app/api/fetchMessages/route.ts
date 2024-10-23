// Fetch all documents in the messages collection
// 'Messages' are defined as messages that have not yet been replied to by an agent,
// The moment the thread is replied to, it becomes a conversation with two parties.

import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { firestore } from "../configs/firebaseconfig";
import { type } from "os";
import { MeasureMemoryMode } from "vm";

interface Message {
  userId: string;
  timestamp: number;
  // Add other properties of your message if necessary
}

interface MessagesByUser {
  [userID: string]: any[];
}

export async function POST(request: Request) {
  try {
    const q = query(
      collection(firestore, "messages"),
      orderBy("Timestamp (UTC)", "asc")
    );
    const snapshot = await getDocs(q);

    const messagesByUser: MessagesByUser = {};

    snapshot.forEach((doc) => {
      const messageData = doc.data();
      const userID = messageData["User ID"];

      if (!messagesByUser[userID]) {
        messagesByUser[userID] = [];
      }
      messagesByUser[userID].push(messageData);
    });

    for (const userID in messagesByUser) {
      messagesByUser[userID].sort(
        (a, b) => a["Timestampp (UTC)"] - b["Timestampp (UTC)"]
      );
    }
    return new Response(JSON.stringify(messagesByUser), { status: 200 });
  } catch (error) {
    console.log("Error: " + error);
    return new Response("Check Logs", { status: 500 });
  }
}
