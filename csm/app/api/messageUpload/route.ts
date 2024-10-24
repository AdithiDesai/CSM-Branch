import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../configs/firebaseconfig";

export async function POST(request: Request) {
  const body = await request.json();
  // console.log(body.length());
  try {
    for (const index in body) {
      const docRef = addDoc(
        collection(firestore, "archivedConversations"),
        body[index]
      );
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }

  return new Response("All Messages have been uploaded", { status: 200 });
}
