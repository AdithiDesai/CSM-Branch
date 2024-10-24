// This api route is meant to register a new pool of users -> either agents or customers
// It expects [ username, UUID, role ] and returns a unique ID for the user in the database
// UUID is a unique identifier that is created from the UI side

import { addDoc, collection, getDocs } from "firebase/firestore";
import { firestore } from "../configs/firebaseconfig";

export async function POST(request: Request) {
  const body = await request.json();

  if (body.role === "agent") {
    const col = collection(firestore, "agents");

    try {
      const docRef = await addDoc(collection(firestore, "agents"), {
        name: body["name"],
        uuid: body["UUID"],
        isOccupied: false,
      });
      console.log("Document written with ID: ", docRef.id);
      return new Response(JSON.stringify({ dbId: docRef.id }), { status: 200 });
    } catch (e) {
      console.error("Error adding document: ", e);
      return new Response(JSON.stringify(e), { status: 500 });
    }
  } else {
    const col = collection(firestore, "customers");

    try {
      const docRef = await addDoc(collection(firestore, "customers"), {
        name: body["name"],
        uuid: body["UUID"],
      });
      console.log("Document written with ID: ", docRef.id);
      return new Response(JSON.stringify({ dbId: docRef.id }), { status: 200 });
    } catch (e) {
      console.error("Error adding document: ", e);
      return new Response(JSON.stringify(e), { status: 500 });
    }
  }
}
