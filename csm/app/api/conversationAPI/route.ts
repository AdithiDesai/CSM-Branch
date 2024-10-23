import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../configs/firebaseconfig";

export async function POST(request: Request) {
  const body = await request.json();
  let newData = {
    content: body.content,
    senderuuid: body.userid,
    timestamp: body.timestamp,
    // messageid:body.messageid
  };

  try {
    const conversationRef = doc(
      firestore,
      "conversations",
      body.currentConversationId
    );

    await updateDoc(conversationRef, { messages: arrayUnion(newData) });
    // console.log(newData);
    return new Response("Message Recieved", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error: " + error, { status: 400 });
  }
}
