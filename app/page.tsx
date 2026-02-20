"use client";

import BottleScene from "@/components/BottleScene";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Lexend } from "next/font/google";
import { useRef } from "react";


const lexend = Lexend({
  subsets: ['latin'],
})

export default function Home() {

  const fadeBg = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const bg = fadeBg.current;
    if (!bg) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    tl.to(bg, {
      opacity: 0,
      duration: 1,
    })
  })

  return (
    <main className={`bg-white ${lexend.className}`}>
      <BottleScene />

      <section ref={fadeBg} className="h-screen bg-[url(/images/amlaBg.png)] bg-center bg-no-repeat bg-cover text-white flex items-center justify-center">
      <div className="h-screen w-screen bg-black/20 "></div>
        <h1 className="text-pretty text-[160px] leading-tight font-extrabold w-1/6 absolute left-80 ">Nature's Answer To Hairfall</h1>
      </section>

    <section className="h-screen relative bg-linear-to-l  from-[#FFFEFE26] to-[#DFE2D2] text-[#4E482E] flex items-center justify-center">
        <h1 className="text-pretty text-[160px] leading-tight font-normal w-1/6 absolute left-70 top-30 text-6xl">Rooted in <span className="font-extrabold">Amla</span></h1>
      </section>

      <section className="h-screen bg-zinc-800 text-white flex items-center justify-center">
        <h1 className="text-6xl">Section 3</h1>
      </section>

      <section className="h-screen bg-zinc-700 text-white flex items-center justify-center">
        <h1 className="text-6xl">Section 4</h1>
      </section>
    </main>
  );
}