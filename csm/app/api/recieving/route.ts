// This is the endpoint that deals with unanswered messages. These are new messages that have not been assigned yet.

import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../configs/firebaseconfig";

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const docRef = await addDoc(collection(firestore, "newMessages"), {
      userid: await body["userid"],
      timestamp: await body["timestamp"],
      content: await body["content"],
      name: await body["name"],
      messageid: await body["messageid"],
    });

    console.log("Document written:" + docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }

  return new Response("Message Recieved and added to Queue", { status: 200 });
}
