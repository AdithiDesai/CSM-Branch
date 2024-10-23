import React from "react";

export default function Home() {
  return (
    <div className="grid outline-dotted outline-red-600 w-screen h-screen place-items-center">
      <h1>Register New Agent</h1>
      <form action="" className="flex items-center flex-col">
        <div className="flex justify-around">
          <label htmlFor="name">Name:</label>
          <input type="text" />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
