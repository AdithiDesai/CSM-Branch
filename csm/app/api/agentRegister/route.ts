// This api route is meant to register a new working agent to the pool of agents.
// It expects [ agent name, UUID]
// UUID is a unique identifier that is created from the UI side

import { addDoc, collection, getDocs } from "firebase/firestore";
import Head from "next/head";
import { app, firestore } from "../configs/firebaseconfig";

export async function POST(request: Request) {
  const col = collection(firestore, "agents");
  const body = await request.json();

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
}
