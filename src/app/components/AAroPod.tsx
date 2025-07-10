'use client'
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";


export const AAroPod = ({
  onPreorder,
}: AAroPodProps = {}): JSX.Element => {
  const navItems = [
    { label: "Get a Node", href: "/get-a-node" },
    { label: "Blog", href: "/blog" },
    { label: "Docs", href: "/docs" },
    { label: "Dashboard", href: "/dashboard" },
  ];

  return (
    <div
      className="bg-black flex flex-row justify-center w-full"
      data-model-id="1392:24"
    >
      <div className="bg-black overflow-hidden w-full max-w-[1440px] h-[750px] llg:h-[750px] lg:h-[650px] md:h-[550px] mo:h-[450px] sm:h-[350px] xsm:h-[400px] m-auto">
        <div className="relative h-[750px] llg:h-[750px] lg:h-[650px] md:h-[550px] mo:h-[450px] sm:h-[350px] xsm:h-[400px]">
          <div className="absolute w-full h-full top-0 left-0 bg-gradient-to-br from-green-900/20 via-black to-black" />
            <img
            className="absolute w-full h-full top-0 left-0 object-cover object-center"
            alt="ARO Pod background"
            src="/ARO Pod/WechatIMG54.jpg"
            />

          <div className="absolute top-[200px] llg:top-[180px] lg:top-[150px] md:top-[120px] mo:top-[80px] sm:top-[60px] xsm:top-[80px] w-full flex justify-start items-start px-[150px] llg:px-[120px] lg:px-[80px] md:px-[60px] mo:px-[30px] sm:px-[20px] xsm:px-[24px]">
            <div className="flex flex-col max-w-[600px] llg:max-w-[550px] lg:max-w-[500px] md:max-w-[450px] mo:max-w-[400px] sm:max-w-full xsm:max-w-full">
              <h1 className="[text-shadow:0px_4px_4px_#00000099] font-['Poppins',Helvetica] font-bold text-white text-[130px] llg:text-[120px] lg:text-[100px] md:text-[80px] mo:text-[60px] sm:text-[36px] xsm:text-[42px] tracking-[-6.50px] llg:tracking-[-6px] lg:tracking-[-5px] md:tracking-[-4px] mo:tracking-[-3px] sm:tracking-[-1.5px] xsm:tracking-[-2px] leading-[130px] llg:leading-[120px] lg:leading-[100px] md:leading-[80px] mo:leading-[60px] sm:leading-[36px] xsm:leading-[42px] mb-6 llg:mb-5 lg:mb-4 md:mb-4 mo:mb-3 sm:mb-2 xsm:mb-3">
                ARO Pod
              </h1>
              
              <p className="[text-shadow:0px_4px_4px_#00000040] font-['Poppins',Helvetica] font-normal text-white text-[26px] llg:text-[24px] lg:text-[22px] md:text-[20px] mo:text-[18px] sm:text-[14px] xsm:text-[16px] leading-[36.4px] llg:leading-[34px] lg:leading-[32px] md:leading-[28px] mo:leading-[26px] sm:leading-[20px] xsm:leading-[24px] mb-8 llg:mb-7 lg:mb-6 md:mb-5 mo:mb-4 sm:mb-3 xsm:mb-4">
                A plug-and-play device that runs 24/7 with low energy use.
                <br className="lg:block mo:hidden sm:hidden xsm:hidden" />
                <span className="lg:hidden mo:inline sm:inline xsm:inline hidden"> </span>
                Best for household runners.
              </p>
              
              <Button 
                onClick={onPreorder}
                className="w-[166px] llg:w-[160px] lg:w-[150px] md:w-[140px] mo:w-[130px] sm:w-[110px] xsm:w-[120px] h-12 llg:h-12 lg:h-11 md:h-10 mo:h-10 sm:h-8 xsm:h-9 px-9 llg:px-8 lg:px-7 md:px-6 mo:px-5 sm:px-3 xsm:px-4 rounded-3xl shadow-[0px_4px_4px_#00000040,inset_-1px_-1px_5.8px_#8b8b8b3b] bg-[linear-gradient(90deg,rgba(113,255,108,1)_0%,rgba(193,249,103,1)_100%)] text-[#11111c] font-['Poppins',Helvetica] font-normal text-base llg:text-base lg:text-sm md:text-sm mo:text-sm sm:text-xs xsm:text-sm hover:shadow-lg transition-all duration-200 active:scale-95 touch-manipulation"
              >
                Preorder Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export interface AAroPodProps {
  onPreorder?: () => void;
}

export default AAroPod;