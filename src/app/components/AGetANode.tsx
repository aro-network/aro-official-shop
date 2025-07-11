'use client'
import React from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/app/utils/cn";
import TitleText from "./TitleText";
import LinerGridentBorder from "./LinerGridentBorder";
import AosAnimItem from "./AosAnimItem";
import { MBtn } from "./Header";

const Badge = ({ className, children, ...props }: { className?: string; children: React.ReactNode; [key: string]: any }) => {
  return (
    <div className={`inline-flex items-center px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`} {...props}>
      {children}
    </div>
  );
};

const Button = ({ className, children, ...props }: { className?: string; children: React.ReactNode; [key: string]: any }) => {
  return (
    <button className={`inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 ${className}`} {...props}>
      {children}
    </button>
  );
};



const CardContent = ({ className, children, ...props }: { className?: string; children: React.ReactNode; [key: string]: any }) => {
  return (
    <div className={`p-5 pt-5 ${className}`} {...props}>
      {children}
    </div>
  );
};

const NodeSelectionSection = () => {
  const router = useRouter();
  
  const handleOrderClick = (nodeId: string) => {
    if (nodeId === 'aro-pod') {
      router.push('/aro-pod');
    }
  };
  
  const nodeOptions = [
    {
      id: "aro-pod",
      title: "ARO Pod",
      image: "/GetANodePicture/AroPod.png",
      buttonText: "Order ARO Pod",
      description: [
        "• A plug-and-play device that runs 24/7 with low energy use.",
        "• Best for household runners.",
      ],
      cost: "Cost: $",
      rewards: "Rewards: ⭐⭐⭐",
      userFriendly: "User-friendly: ⭐⭐⭐",
      comingSoon: false,
      gradient:
"bg-[linear-gradient(0deg,rgb(255,255,255,0.06),rgb(255,255,255,0.06)),linear-gradient(124.57deg,rgb(0,255,13,0.5)_-10.04%,rgb(115,115,115,0)_38.35%)] backdrop-blur-[12px] rounded-3xl flex-none order-0"  },
    {
      id: "aro-lite",
      title: "ARO Lite",
      image: "/GetANodePicture/AroLite.png",
      buttonText: "Download Extension (v1.0.4)",
      description: [
        "• A lightweight browser extension.",
        "• Runs with zero cost and minimal effort.",
      ],
      cost: "Cost: 0",
      rewards: "Rewards: ⭐",
      userFriendly: "User-friendly: ⭐⭐⭐",
      comingSoon: true,
      gradient:
"bg-[linear-gradient(0deg,rgb(255,255,255,0.06),rgb(255,255,255,0.06)),linear-gradient(124.57deg,rgb(0,255,13,0.5)_-10.04%,rgb(115,115,115,0)_38.35%)] backdrop-blur-[12px] rounded-3xl flex-none order-0"   },
    {
      id: "aro-client",
      title: "ARO Client",
      image: "/GetANodePicture/AroClient.png",
      buttonText: "Download .ISO",
      description: [
        "• A software image for your server or PC.",
        "• Perfect for pro users with strong internet.",
      ],
      cost: "Cost: your device",
      rewards: "Rewards: Flexible",
      userFriendly: "User-friendly: ⭐",
      comingSoon: false,
      gradient:
"bg-[linear-gradient(0deg,rgb(255,255,255,0.06),rgb(255,255,255,0.06)),linear-gradient(124.57deg,rgb(0,255,13,0.5)_-10.04%,rgb(115,115,115,0)_38.35%)] backdrop-blur-[12px] rounded-3xl flex-none order-0"    },
    {
      id: "aro-link",
      title: "ARO Link",
      image: "/GetANodePicture/AroLink.png",
      buttonText: "Order ARO Link",
      description: [
        "• A Wi-Fi router with a built-in ARO node.",
        "• Ideal for business use",
      ],
      cost: "Cost: $$",
      rewards: "Rewards: ⭐⭐⭐",
      userFriendly: "User-friendly: ⭐⭐⭐",
      comingSoon: true,
      gradient:
"bg-[linear-gradient(0deg,rgb(255,255,255,0.06),rgb(255,255,255,0.06)),linear-gradient(281.06deg,rgb(0,255,13,0.5)_-9.12%,rgb(115,115,115,0)_39.24%)] backdrop-blur-[12px] rounded-3xl flex-none order-3"    },
  ];

  const maxWidthClassName = 'ultrawide:max-w-[2800px] 4xl:max-w-[2400px] 3xl:max-w-[2000px] 2xl:max-w-[1600px] xl:max-w-[1500px] llg:max-w-[1440px] lg:max-w-[1200px] md:max-w-[900px] mo:max-w-full sm:max-w-full xsm:max-w-full w-full mx-auto ultrawide:px-20 4xl:px-18 3xl:px-16 2xl:px-16 xl:px-16 llg:px-[100px] lg:px-[80px] md:px-[60px] mo:px-8 sm:px-4 xsm:px-5';
  
  return (
    <div className={cn("flex flex-col items-center", maxWidthClassName)}>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(27.5rem,1fr))] md:grid-cols-2 mo:grid-cols-1 w-full gap-5 md:gap-4">
      {nodeOptions.map((node,index) => (
        <LinerGridentBorder
          key={node.id}
          type={`${index ==3 ?'7' : '1'}`}
          className="rounded-3xl"
          // className="flex w-full max-w-[544px] h-auto max-h-[216px] items-center gap-[30px] md:gap-5 mo:gap-4 p-5 md:p-4 mo:p-4 mo:flex-col mo:text-center rounded-3xl border-2 border-solid border-transparent backdrop-blur-md backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(12px)_brightness(100%)] relative overflow-hidden"
          // style={{
          //   background: `padding-box linear-gradient(0deg,rgba(255,255,255,0.06) 0%,rgba(255,255,255,0.06) 100%), border-box ${node.gradient}`,
          //   backgroundClip: 'padding-box, border-box',
          // }}
        >
          <CardContent className="p-20px flex items-center gap-[30px] md:gap-4 mo:gap-4 w-full md:flex-col mo:flex-col">
            <div className="inline-flex flex-col items-start md:items-center mo:items-center gap-4 relative flex-[0_0_auto]">
              <div
                className="relative w-[196px] h-[130px] md:w-[150px] md:h-[100px] mo:w-[120px] mo:h-[80px] bg-center bg-no-repeat bg-contain"
                style={{ backgroundImage: `url(${node.image})` }}
                aria-label={`${node.title} image`}
              />

              <Button 
                onClick={() => handleOrderClick(node.id)}
                className="flex w-[196px] md:w-[160px] mo:w-[180px] h-[30px] items-center justify-center gap-2.5 px-9 py-0 rounded-3xl shadow-[0px_4px_4px_#00000040,inset_-1px_-1px_5.8px_#8b8b8b3b] bg-[linear-gradient(90deg,rgba(113,255,108,1)_0%,rgba(193,249,103,1)_100%)] hover:bg-[linear-gradient(90deg,rgba(113,255,108,0.9)_0%,rgba(193,249,103,0.9)_100%)] cursor-pointer">
                <span className="relative w-fit [font-family:'Albert_Sans',Helvetica] font-medium text-[#11111c] text-xs tracking-[0] leading-[normal] whitespace-nowrap">
                  {node.buttonText}
                </span>
              </Button>
            </div>

            <div className="flex flex-col w-[265px] md:w-full mo:w-full items-start md:items-center mo:items-center gap-5 relative">
              <div className="flex flex-col items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
                <div className="inline-flex items-center gap-2.5 relative flex-[0_0_auto]">
                  <h3 className="w-fit mt-[-1.00px] font-medium text-white text-xl tracking-[0] leading-[30px] whitespace-nowrap relative [font-family:'Poppins',Helvetica]">
                    {node.title}
                  </h3>

                  {node.comingSoon && (
                    <Badge className="inline-flex items-center justify-center gap-2.5 px-1 py-0.5 relative flex-[0_0_auto] bg-[#02b421] rounded">
                      <span className="relative w-fit mt-[-1.00px] [font-family:'Poppins',Helvetica] font-medium text-white text-[8px] tracking-[0.08px] leading-[8px] whitespace-nowrap">
                        Coming Soon
                      </span>
                    </Badge>
                  )}
                </div>

                <div className="relative self-stretch [font-family:'Poppins',Helvetica] font-normal text-white text-[13px] tracking-[0] leading-[19.5px]">
                  {node.description.map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      {index < node.description.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className="relative w-fit [font-family:'Poppins',Helvetica] font-normal text-white text-[13px] tracking-[0] leading-[19.5px]">
                {node.cost}
                <br />
                {node.rewards}
                <br />
                {node.userFriendly}
              </div>
            </div>
          </CardContent>
        </LinerGridentBorder>
      ))}
      </div>
    </div>
  );
};

const EarningStepsSection = () => {
  const maxWidthClassName = 'max-w-screen-xl w-full mx-auto px-4 md:px-8 lg:px-16';
  return (
    <div className="flex flex-col items-center gap-11 md:gap-8 mo:gap-8">
      <TitleText text="Get Started in 3 Steps" />
      <div className={cn("grid grid-cols-3 md:grid-cols-2 mo:grid-cols-1 gap-11 md:gap-6 mo:gap-5", maxWidthClassName)}>
        <LinerGridentBorder type="2" className="rounded-3xl">
          <div className="px-6 pt-5 pb-12 flex flex-col items-center gap-[30px] md:gap-5">
            <div className="w-full text-white font-medium text-xl md:text-lg font-Space_Grotesk text-center">1. Install it</div>
            <img alt="Install it" src="/installnodes.svg" className="w-[190px] h-[220px] md:w-[140px] md:h-[160px] mo:w-[120px] mo:h-[140px]" />
          </div>
        </LinerGridentBorder>
        <LinerGridentBorder type="3" className="rounded-3xl">
          <div className="px-6 pt-5 pb-12 flex flex-col items-center gap-[30px] md:gap-5">
            <div className="w-full text-white font-medium text-xl md:text-lg font-Space_Grotesk text-center">2. Run it</div>
            <img alt="Run it" src="/runit.svg" className="w-[244px] h-[183px] md:w-[160px] md:h-[120px] mo:w-[120px] mo:h-[100px] mt-8 md:mt-4" />
          </div>
        </LinerGridentBorder>
        <LinerGridentBorder type="4" className="rounded-3xl md:col-span-2 mo:col-span-1">
          <div className="px-6 pt-5 pb-12 flex flex-col items-center gap-[60px] md:gap-[30px] mo:gap-[30px] justify-between">
            <div className="w-full text-white font-medium text-xl md:text-lg font-Space_Grotesk text-center">3. Start Earning</div>
            <div className="flex flex-col gap-10 md:gap-5 px-6 items-center w-full">
              <div className="text-xs md:text-xs mo:text-[10px] text-[#969696] flex flex-col gap-2 ">
                <div className="flex items-center gap-2 text-base md:text-sm mo:text-sm font-medium text-white">
                  <img alt="Earn" src="/earn.svg" className="w-[30px] h-[30px] md:w-5 md:h-5 mo:w-5 mo:h-5" />
                  Earn $ARO Rewards
                </div>
                Stack Jades during Testnet, convert them to $ARO tokens at mainnet launch.
              </div>
              <div className="text-xs md:text-xs mo:text-[10px] text-[#969696] flex flex-col gap-2">
                <div className="flex items-center gap-2 text-base md:text-sm mo:text-sm font-medium text-white">
                  <img alt="Earn" src="/friends.svg" className="w-[30px] h-[30px] md:w-5 md:h-5 mo:w-5 mo:h-5" />
                  Recommend
                </div>
                Refer your friend and earn extra 15% commission.
              </div>
            </div>
          </div>
        </LinerGridentBorder>
      </div>
    </div>
  );
};
const GetStartedSection = () => {
  const dashboardSignup = "https://dashboard.aro.network/signup";
  
  return (
    <AosAnimItem className="flex justify-center w-full">
      <MBtn
        type="2"
        onClick={() => window.open(dashboardSignup, '_blank')}
        content="Get Started Now"
        className={cn('mt-[52px] mb-[124px] mo:mb-16 font-Space_Grotesk text-lg px-12 py-4 mo:px-8 mo:py-3 mo:text-base')} 
      />
    </AosAnimItem>
  );
};

interface AGetANodeProps {
  children?: React.ReactNode;
  className?: string;
}

export const AGetANode: React.FC<AGetANodeProps> = ({ children, className }) => {
  return (
    <div className={cn("w-full bg-black relative", className)}>
      <div 
        className=" w-full h-full bg-bottom bg-contain  bg-no-repeat bg-[url(/GetANodePicture/bg1.png)] ">
      
      
      <div className="absolute ultrawide:w-[2800px] 4xl:w-[2400px] 3xl:w-[2200px] 2xl:w-[2000px] xl:w-[1900px] llg:w-[1800px] lg:w-[1600px] md:w-[1200px] mo:w-full sm:w-full xsm:w-full ultrawide:h-[1400px] 4xl:h-[1300px] 3xl:h-[1200px] 2xl:h-[1150px] xl:h-[1120px] llg:h-[1116px] lg:h-[1000px] md:h-[800px] mo:h-full sm:h-full xsm:h-full top-0 left-0">
        <div className="absolute ultrawide:w-[1400px] ultrawide:h-[1400px] 4xl:w-[1300px] 4xl:h-[1300px] 3xl:w-[1200px] 3xl:h-[1200px] 2xl:w-[1150px] 2xl:h-[1150px] xl:w-[1120px] xl:h-[1120px] llg:w-[1116px] llg:h-[1116px] lg:w-[1000px] lg:h-[1000px] md:w-[600px] md:h-[600px] mo:w-[400px] mo:h-[400px] sm:w-[300px] sm:h-[300px] xsm:w-[350px] xsm:h-[350px] top-0 ultrawide:left-[1400px] 4xl:left-[1200px] 3xl:left-[1100px] 2xl:left-[1000px] xl:left-[950px] llg:left-[900px] lg:left-[800px] md:left-1/2 mo:left-1/2 sm:left-1/2 xsm:left-1/2 md:transform md:-translate-x-1/2 mo:transform mo:-translate-x-1/2 sm:transform sm:-translate-x-1/2 xsm:transform xsm:-translate-x-1/2 bg-[#5cc92e] opacity-50 ultrawide:rounded-[700px] 4xl:rounded-[650px] 3xl:rounded-[600px] 2xl:rounded-[575px] xl:rounded-[560px] llg:rounded-[558px] lg:rounded-[500px] md:rounded-[300px] mo:rounded-[200px] sm:rounded-[150px] xsm:rounded-[175px] ultrawide:blur-[250px] 4xl:blur-[230px] 3xl:blur-[220px] 2xl:blur-[210px] xl:blur-[205px] llg:blur-[200px] lg:blur-[180px] md:blur-[120px] mo:blur-[100px] sm:blur-[80px] xsm:blur-[90px]" />
      </div>
      
      <div className="relative z-10 ultrawide:pb-24 4xl:pb-22 3xl:pb-20 2xl:pb-20 xl:pb-20 llg:pb-20 lg:pb-18 md:pb-15 mo:pb-12 sm:pb-10 xsm:pb-11">
        <div className="ultrawide:pt-[140px] 4xl:pt-[130px] 3xl:pt-[125px] 2xl:pt-[124px] xl:pt-[124px] llg:pt-[124px] lg:pt-[100px] md:pt-20 mo:pt-16 sm:pt-14 xsm:pt-15 ultrawide:pb-20 4xl:pb-18 3xl:pb-16 2xl:pb-16 xl:pb-16 llg:pb-16 lg:pb-14 md:pb-12 mo:pb-10 sm:pb-8 xsm:pb-9">
          <div className="flex flex-col items-center ultrawide:gap-8 4xl:gap-7 3xl:gap-6 2xl:gap-6 xl:gap-6 llg:gap-6 lg:gap-5 md:gap-4 mo:gap-4 sm:gap-3 xsm:gap-3 w-container m-auto ultrawide:max-w-[2800px] 4xl:max-w-[2400px] 3xl:max-w-[2000px] 2xl:max-w-[1600px] xl:max-w-[1500px] llg:max-w-[1440px] md:w-full mo:w-full sm:w-full xsm:w-full ultrawide:px-20 4xl:px-18 3xl:px-16 2xl:px-16 xl:px-16 llg:px-[100px] lg:px-[80px] md:px-[60px] mo:px-6 sm:px-4 xsm:px-5">
            <h1 className="bg-[linear-gradient(353deg,rgba(0,228,42,1)_17%,rgba(255,255,255,1)_59%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Poppins',Helvetica] font-bold text-transparent ultrawide:text-[80px] 4xl:text-[70px] 3xl:text-[60px] 2xl:text-[55px] xl:text-[52px] llg:text-[50px] lg:text-[45px] md:text-[32px] mo:text-[30px] sm:text-[26px] xsm:text-[28px] ultrawide:tracking-[-4.00px] 4xl:tracking-[-3.50px] 3xl:tracking-[-3.00px] 2xl:tracking-[-2.75px] xl:tracking-[-2.60px] llg:tracking-[-2.50px] lg:tracking-[-2.25px] md:tracking-[-1.60px] mo:tracking-[-1.50px] sm:tracking-[-1.30px] xsm:tracking-[-1.40px] ultrawide:leading-[88px] 4xl:leading-[77px] 3xl:leading-[66px] 2xl:leading-[60.5px] xl:leading-[57.2px] llg:leading-[55px] lg:leading-[49.5px] md:leading-[35.2px] mo:leading-[33px] sm:leading-[28.6px] xsm:leading-[30.8px] text-center mo:whitespace-normal sm:whitespace-normal xsm:whitespace-normal">
              Pick Your ARO Node
            </h1>
            <p className="[font-family:'Poppins',Helvetica] font-normal text-[#d3d3d6] ultrawide:text-2xl 4xl:text-xl 3xl:text-lg 2xl:text-lg xl:text-lg llg:text-lg lg:text-base md:text-sm mo:text-sm sm:text-xs xsm:text-sm text-center tracking-[0] ultrawide:leading-[38.4px] 4xl:leading-[32px] 3xl:leading-[28.8px] 2xl:leading-[28.8px] xl:leading-[28.8px] llg:leading-[28.8px] lg:leading-[25.6px] md:leading-[22.4px] mo:leading-[22.4px] sm:leading-[19.2px] xsm:leading-[22.4px] ultrawide:max-w-[1200px] 4xl:max-w-[1000px] 3xl:max-w-[900px] 2xl:max-w-[850px] xl:max-w-[820px] llg:max-w-[798px] lg:max-w-[700px] md:max-w-[500px] mo:max-w-[400px] sm:max-w-[300px] xsm:max-w-[350px] md:px-4 mo:px-2 sm:px-1 xsm:px-2">
              Explore ARO Network&apos;s diverse nodes—hardware, software, and browser extensions—then choose the perfect ARO Node for you.
            </p>
          </div>
        </div>

        <div className="ultrawide:pb-24 4xl:pb-22 3xl:pb-20 2xl:pb-20 xl:pb-20 llg:pb-20 lg:pb-18 md:pb-15 mo:pb-12 sm:pb-10 xsm:pb-11">
          <NodeSelectionSection />
        </div>
        
        <div className="ultrawide:pb-24 4xl:pb-22 3xl:pb-20 2xl:pb-20 xl:pb-20 llg:pb-20 lg:pb-18 md:pb-15 mo:pb-12 sm:pb-10 xsm:pb-11">
          <EarningStepsSection />
        </div>
        
        <div>
          <GetStartedSection />
        </div>
        
        {children && (
          <div className="relative z-10">
            {children}
          </div>
        )}
      </div>
    </div>
    </div>

  );
};

export default AGetANode;