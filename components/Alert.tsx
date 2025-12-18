"use client";
import React from "react";
export default function Alert() {
  return (
    <div>
      <input type="text" />
      <button style={{ cursor: "pointer" }} onClick={() => alert("sfds")}>
        Click
      </button>
    </div>
  );
}
