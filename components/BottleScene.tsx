"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function BottleScene() {
  const bottleRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    const bottle = bottleRef.current;
    if (!bottle) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    tl.fromTo(
      bottle,
      { y: 72,x: 50 ,opacity: 1, rotate: 82 },
      { y: 0, opacity: 1,rotate: 76 ,duration: 1 },
    )
      .to(bottle, {
        rotate: "-=136",
        scale: 2.2,
        yPercent: 80,
        xPercent: 30,
        duration: 1,
      })
      .to(bottle, {
        x: 400,
        rotate: "+=360",
        duration: 1,
      })
      .to(bottle, {
        scale: 0.5,
        opacity: 0,
        duration: 1,
      });
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
      <Image
        ref={bottleRef} 
        src="/images/bottle.png"
        alt="Bottle"
        height={100000000000}
        width={100000000000}
        className="w-180"
      />
    </div>
  );
}
