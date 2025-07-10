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

const Card = ({ className, children, ...props }: { className?: string; children: React.ReactNode; [key: string]: any }) => {
  return (
    <div className={`text-card-foreground shadow ${className}`} {...props}>
      {children}
    </div>
  );
};

const CardContent = ({ className, children, ...props }: { className?: string; children: React.ReactNode; [key: string]: any }) => {
  return (
    <div className={`p-6 pt-0 ${className}`} {...props}>
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
        "linear-gradient(135deg,rgba(0,150,8,0.8) 0%,rgba(0,120,6,0.6) 15%,rgba(0,80,4,0.2) 30%,rgba(0,0,0,1) 100%)",
    },
    {
      id: "aro-lite",
      title: "ARO Lite",
      image: "/GetANodePicture/mask-group-2.png",
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
        "linear-gradient(135deg,rgba(0,150,8,0.8) 0%,rgba(0,120,6,0.6) 15%,rgba(0,80,4,0.2) 30%,rgba(0,0,0,1) 100%)",
    },
    {
      id: "aro-client",
      title: "ARO Client",
      image: "/GetANodePicture/mask-group-3.png",
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
        "linear-gradient(135deg,rgba(0,150,8,0.8) 0%,rgba(0,120,6,0.6) 15%,rgba(0,80,4,0.2) 30%,rgba(0,0,0,1) 100%)",
    },
    {
      id: "aro-link",
      title: "ARO Link",
      image: "/GetANodePicture/mask-group-4.png",
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
        "linear-gradient(315deg,rgba(0,150,8,0.8) 0%,rgba(0,120,6,0.6) 15%,rgba(0,80,4,0.2) 30%,rgba(0,0,0,1) 100%)",
    },
  ];

  return (
    <div className="w-container m-auto md:w-full mo:w-full px-[100px] md:px-[60px] mo:px-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 mo:gap-4 justify-items-center">
      {nodeOptions.map((node) => (
        <Card
          key={node.id}
          className="flex w-full max-w-[544px] h-auto min-h-[216px] items-center gap-[30px] md:gap-5 mo:gap-4 p-5 md:p-4 mo:p-4 mo:flex-col mo:text-center rounded-3xl border-2 border-solid border-transparent backdrop-blur-md backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(12px)_brightness(100%)] relative overflow-hidden"
          style={{
            background: `padding-box linear-gradient(0deg,rgba(255,255,255,0.06) 0%,rgba(255,255,255,0.06) 100%), border-box ${node.gradient}`,
            backgroundClip: 'padding-box, border-box',
          }}
        >
          <CardContent className="p-0 flex items-center gap-[30px] md:gap-5 mo:gap-4 w-full mo:flex-col">
            <div className="inline-flex flex-col items-start mo:items-center gap-4 relative flex-[0_0_auto]">
              <div
                className="relative w-[196px] h-[130px] md:w-[150px] md:h-[100px] mo:w-[120px] mo:h-[80px] bg-center bg-no-repeat bg-contain"
                style={{ backgroundImage: `url(${node.image})` }}
                aria-label={`${node.title} image`}
              />

              <Button 
                onClick={() => handleOrderClick(node.id)}
                className="flex w-[196px] md:w-[150px] mo:w-[180px] h-[30px] items-center justify-center gap-2.5 px-9 py-0 rounded-3xl shadow-[0px_4px_4px_#00000040,inset_-1px_-1px_5.8px_#8b8b8b3b] bg-[linear-gradient(90deg,rgba(113,255,108,1)_0%,rgba(193,249,103,1)_100%)] hover:bg-[linear-gradient(90deg,rgba(113,255,108,0.9)_0%,rgba(193,249,103,0.9)_100%)] cursor-pointer">
                <span className="relative w-fit [font-family:'Albert_Sans',Helvetica] font-medium text-[#11111c] text-xs tracking-[0] leading-[normal] whitespace-nowrap">
                  {node.buttonText}
                </span>
              </Button>
            </div>

            <div className="flex flex-col w-[265px] mo:w-full items-start mo:items-center gap-5 relative">
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
        </Card>
      ))}
      </div>
    </div>
  );
};

const EarningStepsSection = () => {
  const maxWidthClassName = 'max-w-screen-xl w-full mx-auto px-4 md:px-8 lg:px-16';
  return (
    <div className="flex flex-col items-center gap-11 mo:gap-8">
      <TitleText text="Get Started in 3 Steps" />
      <div className={cn("grid grid-cols-3 gap-11 mo:grid-cols-1 mo:gap-5", maxWidthClassName)}>
        <LinerGridentBorder type="2" className="rounded-3xl">
          <div className="px-6 pt-5 pb-12 flex flex-col items-center gap-[30px]">
            <div className="w-full text-white font-medium text-xl font-Space_Grotesk text-center">1. Install it</div>
            <img alt="Install it" src="/installnodes.svg" className="w-[190px] h-[220px] md:w-[150px] md:h-[180px] mo:w-[120px] mo:h-[140px]" />
          </div>
        </LinerGridentBorder>
        <LinerGridentBorder type="3" className="rounded-3xl">
          <div className="px-6 pt-5 pb-12 flex flex-col items-center gap-[30px]">
            <div className="w-full text-white font-medium text-xl font-Space_Grotesk text-center">2. Run it</div>
            <img alt="Run it" src="/runit.svg" className="w-[244px] h-[183px] md:w-[180px] md:h-[140px] mo:w-[120px] mo:h-[100px] mt-8" />
          </div>
        </LinerGridentBorder>
        <LinerGridentBorder type="4" className="rounded-3xl">
          <div className="px-6 pt-5 pb-12 flex flex-col items-center gap-[60px] md:gap-[40px] mo:gap-[30px] justify-between">
            <div className="w-full text-white font-medium text-xl font-Space_Grotesk text-center">3. Start Earning</div>
            <div className="flex flex-col gap-10 md:gap-6 px-6 items-center w-full">
              <div className="text-xs md:text-xs mo:text-[10px] text-[#969696] flex flex-col gap-2 ">
                <div className="flex items-center gap-2 text-base md:text-base mo:text-sm font-medium text-white">
                  <img alt="Earn" src="/earn.svg" className="w-[30px] h-[30px] md:w-6 md:h-6 mo:w-5 mo:h-5" />
                  Earn $ARO Rewards
                </div>
                Stack Jades during Testnet, convert them to $ARO tokens at mainnet launch.
              </div>
              <div className="text-xs md:text-xs mo:text-[10px] text-[#969696] flex flex-col gap-2">
                <div className="flex items-center gap-2 text-base md:text-base mo:text-sm font-medium text-white">
                  <img alt="Earn" src="/friends.svg" className="w-[30px] h-[30px] md:w-6 md:h-6 mo:w-5 mo:h-5" />
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
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/GetANodePicture/bg1.png)'
        }}
      />
      
      <div className="absolute w-[2178px] h-[1116px] top-0 left-0 mo:w-full mo:h-full">
        <div className="absolute w-[1116px] h-[1116px] top-0 left-[1062px] bg-[#5cc92e] opacity-50 rounded-[558px] blur-[200px] md:w-[600px] md:h-[600px] md:left-1/2 md:transform md:-translate-x-1/2 md:blur-[150px] mo:w-[300px] mo:h-[300px] mo:left-1/2 mo:transform mo:-translate-x-1/2 mo:blur-[100px]" />
      </div>
      
      <div className="relative z-10 pb-20 md:pb-15 mo:pb-10">
        <div className="pt-[124px] md:pt-20 mo:pt-16 pb-16 md:pb-12 mo:pb-8">
          <div className="flex flex-col items-center gap-6 mo:gap-4 w-container m-auto md:w-full mo:w-full px-[100px] md:px-[60px] mo:px-5">
            <h1 className="bg-[linear-gradient(353deg,rgba(0,228,42,1)_17%,rgba(255,255,255,1)_59%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Poppins',Helvetica] font-bold text-transparent text-[50px] tracking-[-2.50px] leading-[60.0px] text-center md:text-[36px] md:leading-[44px] mo:text-[28px] mo:leading-[36px] mo:whitespace-normal">
              Pick Your ARO Node
            </h1>
            <p className="[font-family:'Poppins',Helvetica] font-normal text-[#d3d3d6] text-lg text-center tracking-[0] leading-[29.4px] max-w-[798px] md:text-base md:leading-[26px] mo:text-sm mo:leading-[22px] mo:px-2">
              Explore ARO Network&apos;s diverse nodes—hardware, software, and browser extensions—then choose the perfect ARO Node for you.
            </p>
          </div>
        </div>

        <div className="pb-20 md:pb-15 mo:pb-10">
          <NodeSelectionSection />
        </div>
        
        <div>
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
  );
};

export default AGetANode;