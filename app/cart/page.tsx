"use client";

import Navbar from "@/components/layout/Navbar";
import AddedToCart from "@/components/AddedToCart";
import { Lexend } from "next/font/google";
import Image from "next/image";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/Button";
import Link from "next/link";

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
    { id: "1", name: "Hair Oil", subtitle: "Hair Oil", productImage: "/images/oil/product1.png" },
    { id: "2", name: "Hair Lepa", subtitle: "Hair Lepa", productImage: "/images/hairLepa/product1.png" },
    { id: "3", name: "Hair Tablets", subtitle: "Hair Tablets", productImage: "/images/tablets/product1.png" },
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
            className="w-187.5 bg-white rounded-[40px] shadow-md flex items-center justify-between px-10 py-4 mb-12 transition hover:shadow-xl"
          >
            <div className="flex items-center gap-2">
              <Image
                src={`${product.productImage}`}
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

            <div className="flex flex-col items-center bg-[#A6B11E] rounded-2xl px-3  text-white">
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
      <section className="flex items-center justify-center hover:scale-105 transition duration-300">
        <Link href="/payment">
          <Button bgColor="black" title="Proceed to Checkout" />
        </Link>
      </section>
    </main>
  );
}
