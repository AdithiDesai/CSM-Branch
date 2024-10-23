import { deleteDoc, collection, doc } from "firebase/firestore";
import { firestore } from "../configs/firebaseconfig";

export async function POST(request: Request) {
  const col = collection(firestore, "agents");
  const body = await request.json();

  try {
    const docRef = await deleteDoc(
      doc(firestore, "agents", body["documentId"])
    );

    return new Response("deleted", { status: 200 });
  } catch (e) {
    console.error("Error adding document: ", e);
  }

  return new Response("Still Testing", { status: 200 });
}
