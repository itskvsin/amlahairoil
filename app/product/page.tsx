"use client";

import Navbar from "@/components/layout/Navbar";
import AddedToCart from "@/components/AddedToCart";
import { Lexend } from "next/font/google";
import Image from "next/image";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const lexend = Lexend({
  subsets: ["latin"],
});

export default function ProductPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const amlaRef = useRef<HTMLDivElement>(null);
  const leavesRef = useRef<HTMLDivElement>(null);

  const [cart, setCart] = useState<{ [key: string]: number }>({});

  useGSAP(
    () => {
      const amlaBg = amlaRef.current;
      const leavesBg = leavesRef.current;
      if (!amlaBg || !leavesBg) return;

      const amlas = gsap.utils.toArray<HTMLImageElement>(".amla");
      amlas.forEach((amla) => {
        gsap.fromTo(
          amla,
          { y: 200 },
          {
            y: -200,
            ease: "none",
            scrollTrigger: {
              trigger: amlaBg,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      const leaves = gsap.utils.toArray<HTMLImageElement>(".leaf");
      leaves.forEach((leaf) => {
        gsap.fromTo(
          leaf,
          { y: 400 },
          {
            y: -450,
            ease: "none",
            scrollTrigger: {
              trigger: leavesBg,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: containerRef },
  );

  const products = [
    { id: "1", name: "Hair Oil", subtitle: "Hair Oil" },
    { id: "2", name: "Hair Oil", subtitle: "Hair Oil" },
    { id: "3", name: "Hair Oil", subtitle: "Hair Oil" },
    { id: "4", name: "Hair Oil", subtitle: "Hair Oil" },
  ];

  const increaseQty = (id: string) => {
    setCart((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const decreaseQty = (id: string) => {
    setCart((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };

  return (
    <main
      ref={containerRef}
      className={`bg-[#F4F3EE] min-h-screen relative overflow-hidden ${lexend.className}`}
    >
      <Navbar btnColor="black" />

      {/* PRODUCT SECTION */}
      <section
        ref={amlaRef}
        className="pt-32 pb-20 flex flex-col items-center relative z-10"
      >
        <Image
          src="/images/amla.png"
          alt="Blur Amla"
          width={300}
          height={300}
          className="amla absolute -top-60 left-1/2 -translate-x-1/2 blur-[8px] rotate-12"
        />

        <Image
          src="/images/leaves/leaf1.png"
          alt="Amla"
          width={250}
          height={250}
          className="amla absolute w-80 -right-40 -bottom-20 blur-[4px]"
        />

        <Image
          src="/images/leaves/leaf3.png"
          alt="Leaf"
          width={250}
          height={250}
          className="leaf absolute -left-40 rotate-100 -top-90"
        />

        {products.map((product) => (
          <div
            key={product.id}
            className="w-[750px] bg-white rounded-[40px] shadow-md flex items-center justify-between px-10 pt-2 mb-12 transition hover:shadow-xl"
          >
            <div className="flex items-center gap-2">
              <Image
                src="/images/product_3.png"
                alt="Product"
                width={100}
                height={100}
              />

              <div>
                <h2 className="text-2xl font-semibold text-[#4E482E]">
                  {product.name}
                </h2>
                <p className="text-sm text-gray-500">{product.subtitle}</p>
              </div>
            </div>

            <div className="flex flex-col items-center bg-[#A6B11E] rounded-2xl px-3 py-3 text-white">
              <button
                onClick={() => decreaseQty(product.id)}
                className="text-2xl px-4"
              >
                −
              </button>

              <span className="text-xl px-6">{cart[product.id] || 1}</span>

              <button
                onClick={() => increaseQty(product.id)}
                className="text-2xl px-4"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* REVIEW SECTION */}
      <section
        ref={leavesRef}
        className="relative min-h-screen bg-[#F4F3EE] flex flex-col items-center justify-center py-40"
      >
        <h1
          className="absolute -bottom-10 text-[360px] font-extrabold text-transparent pointer-events-none select-none"
          style={{ WebkitTextStroke: "2px #A6B11E" }}
        >
          Reviews
        </h1>

        <img
          src="/images/amla.png"
          className="amla absolute -top-10 left-1/2 -translate-x-1/2 blur-[8px] rotate-12 w-72"
        />

        <img
          src="/images/amla.png"
          className="amla absolute -bottom-90 left-1/3 w-52 -rotate-22"
        />

        <Image
          src="/images/leaves/leaf1.png"
          alt="Leaf"
          width={250}
          height={250}
          className="leaf absolute w-80 -left-40 top-20 rotate-102"
        />

        <Image
          src="/images/leaves/leaf1.png"
          alt="Leaf"
          width={250}
          height={250}
          className="leaf absolute w-80 -right-40 bottom-20 blur-[4px]"
        />

        <div className="flex gap-12 relative z-10">
          {["Ravina", "Heena", "Ravina"].map((name, index) => (
            <div
              key={index}
              className="w-[380px] bg-white rounded-[40px] shadow-xl overflow-hidden"
            >
              <div className="p-10 text-[#4E482E] leading-relaxed">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, .
              </div>

              <div className="bg-[#A6B11E] text-white text-center py-6 text-2xl font-semibold">
                {name}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
