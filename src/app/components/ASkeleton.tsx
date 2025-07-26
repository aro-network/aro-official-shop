// components/Skeleton.js
import React from "react";

export default function Skeleton({ className = "" }) {
  return (
    <div className="absolute inset-0 bg-gray-300 animate-pulse flex items-center justify-center z-10">
    </div>
  );
}
