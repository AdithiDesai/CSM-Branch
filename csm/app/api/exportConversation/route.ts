// Fetch all documents in the messages collection
// 'Messages' are defined as messages that have not yet been replied to by an agent,
// The moment the thread is replied to, it becomes a conversation with two parties.

import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { firestore } from "../configs/firebaseconfig";

interface Message {
  userId: string;
  timestamp: number;
}

interface MessagesByUser {
  [userID: string]: any[];
}

export async function POST(request: Request) {
  const body = await request.json();
  try {
    const q = query(
      collection(firestore, "conversations"),
      where("agentuuid", "==", body.agentid)
    );
    const snapshot = await getDocs(q);

    snapshot.forEach((document) => {
      const conversationData = document.data();

      const conversationRef = doc(
        firestore,
        "archivedConversations",
        document.id
      );

      setDoc(conversationRef, conversationData);

      //   Delete the document from the Conversations Document
      deleteDoc(document.ref);
    });

    return new Response("Conversation Archived", { status: 200 });
  } catch (error) {
    console.log("Error: " + error);
    return new Response("Check Logs", { status: 500 });
  }
}
