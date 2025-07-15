'use client'
import { Button } from "@/components/ui/button";
import { cn } from "../utils/cn";
import AosAnimItem from "./AosAnimItem";
import { MBtn } from "./Header";


export const AAroPod = () => {
  const maxWidthClassName = 'max-w-[1440px] px-4 w-full mx-auto'


  return (
    <div className="h-screen bg-no-repeat bg-[url(/AroPodbg.png)]">
      <div className={cn("flex items-center  mx-auto relative mo:px-0 h-full w-full  flex-wrap  ", maxWidthClassName)}>
        <div className=" text-white mo:gap-11  flex items-center justify-center text-nowrap md:flex-wrap-reverse mo:flex-wrap-reverse">
          <div className=" ">
            <div className="font-SGrotesk font-bold text-[134px] mo:text-5xl mo:text-center md:text-center ">
              ARO Pod
            </div>
            <div className="text-[26px] mo:text-sm mo:text-center mo:mt-3 text-[#D3D3D6]  md:text-center">
              A plug-and-play device that runs 24/7 with<br /> low energy use.<br />
              Best for household runners.
            </div>
            <AosAnimItem className="flex  mt-[45px] h-12  mo:justify-center  md:justify-center">
              <MBtn
                type="2"
                onClick={() => window.open('https://order.aro.network/product/aro-pod', '_blank')}
                content="Preorder Now"
                className={cn('  font-Space_Grotesk text-sm  ')}
              />
            </AosAnimItem>
          </div>
          <img src="./ARODesk.png" className='relative w-[58%] mo:!w-full ' />

        </div>

      </div>


    </div>
  );
};


export default AAroPod;