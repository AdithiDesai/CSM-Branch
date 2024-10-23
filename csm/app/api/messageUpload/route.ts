import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../configs/firebaseconfig";

export async function POST(request: Request) {
  const body = await request.json();

  try {
    body.forEach((obj: { [x: string]: any }, index: any) => {
      const docRef = addDoc(collection(firestore, "messages"), {
        "User ID": obj["User ID"],
        "Timestamp (UTC)": obj["Timestamp (UTC)"],
        "Message Body": obj["Message Body"],
        Name: obj["Name"],
        "Message ID": obj["Message ID"],
      });
      console.log("Document written");
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }

  return new Response("All Messages have been uploaded", { status: 200 });
}
