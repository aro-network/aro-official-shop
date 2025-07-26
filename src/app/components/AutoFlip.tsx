import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { PropsWithChildren, ReactNode, useRef } from "react";
import { cn } from "../utils/cn";

gsap.registerPlugin(useGSAP);

export function AutoFlip(p: { children: ReactNode } & { className?: string }) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.set(".flip_item", { alpha: 0 });
      gsap.to(".flip_item", { alpha: 1, yPercent: 0, stagger: 0.1, duration: 0.5, ease: "back.out", startAt: { alpha: 0, yPercent: 30 } });
    },
    { scope: container }
  );
  return (
    <div className={cn("overflow-hidden bodyBg", p.className)} ref={container}>
      {p.children}
    </div>
  );
}
