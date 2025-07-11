'use client'
import { AAroPod } from "@/app/components/AAroPod";
import Header from "@/app/components/Header";

export default function AROPodPage() {
  return (
    <div className="">
      <div className="z-[100000] lg:relative w-full min-h-screen bg-black">
        <Header />
        <AAroPod 
          onPreorder={() => {
            console.log('Preorder clicked');
          }}
        />
      </div>
    </div>
  );
}