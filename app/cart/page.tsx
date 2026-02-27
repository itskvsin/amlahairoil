"use client";

import Navbar from "@/components/layout/Navbar";
import { Lexend } from "next/font/google";
import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/Button";
import Link from "next/link";
import { useCartStore } from "@/lib/cartStore";

gsap.registerPlugin(ScrollTrigger);

const lexend = Lexend({
  subsets: ["latin"],
});

export default function CartPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const amlaRef = useRef<HTMLDivElement>(null);

  const { items, addToCart, removeFromCart } = useCartStore();

  useGSAP(
    () => {
      const amlaBg = amlaRef.current;
      if (!amlaBg) return;

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
          }
        );
      });
    },
    { scope: containerRef }
  );

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <main
      ref={containerRef}
      className={`bg-[#F4F3EE] min-h-screen relative overflow-hidden ${lexend.className}`}
    >
      <Navbar />

      <section
        ref={amlaRef}
        className="pt-32 pb-20 flex flex-col items-center relative z-10"
      >
        {/* Decorative Amla */}
        <Image
          src="/images/amla.png"
          alt="Amla"
          width={300}
          height={300}
          className="amla absolute -top-60 left-1/2 -translate-x-1/2 blur-sm rotate-12"
        />

        <h1 className="text-4xl font-bold text-[#4E482E] mb-10">
          Your Cart
        </h1>

        {items.length === 0 ? (
          <p className="text-gray-600 text-lg">
            Your cart is empty.
          </p>
        ) : (
          <>
            {items.map((item) => (
              <div
                key={item.id}
                className="w-[750px] bg-white rounded-[40px] shadow-md flex items-center justify-between px-10 py-6 mb-8"
              >
                <div className="flex items-center gap-6">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={100}
                    height={100}
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-[#4E482E]">
                      {item.name}
                    </h2>
                    <p className="text-gray-500">
                      ₹ {item.price}
                    </p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-center bg-[#A6B11E] rounded-2xl px-3 text-white">
                    <button
                      onClick={() =>
                        addToCart({
                          id: item.id,
                          name: item.name,
                          price: item.price,
                          image: item.image,
                        })
                      }
                      className="text-2xl px-4"
                    >
                      +
                    </button>

                    <span className="text-xl px-6">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                      className="text-2xl px-4"
                    >
                      −
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Total Section */}
            <div className="w-[750px] flex justify-between items-center mt-8">
              <h2 className="text-2xl font-semibold text-[#4E482E]">
                Total:
              </h2>
              <h2 className="text-2xl font-bold text-[#4E482E]">
                ₹ {totalPrice}
              </h2>
            </div>

            <section className="flex items-center justify-center mt-10 hover:scale-105 transition duration-300">
              <Link href="/payment">
                <Button bgColor="black" title="Proceed to Checkout" />
              </Link>
            </section>
          </>
        )}
      </section>
    </main>
  );
}