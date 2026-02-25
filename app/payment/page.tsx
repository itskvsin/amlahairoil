"use client";

import Image from "next/image";
import { useState } from "react";
import { Lexend } from "next/font/google";

const lexend = Lexend({ subsets: ["latin"] });

type Step =
  | "shipping"
  | "summary"
  | "success"
  | "failed";

export default function PaymentPage() {
  const [step, setStep] = useState<Step>("shipping");
  const [paymentMethod, setPaymentMethod] = useState("");

  const completePurchase = () => {
    setStep("summary");
  };

  const handlePayment = () => {
    if (paymentMethod === "") return;

    // simulate payment result
    const success = Math.random() > 0.4;

    if (success) setStep("success");
    else setStep("failed");
  };

  return (
    <main
      className={`relative min-h-screen flex items-center justify-center ${lexend.className}`}
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/amlaBg.png"
          alt="Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />
      </div>

      {/* ================= SHIPPING ================= */}
      {step === "shipping" && (
        <Card>
          <h2 className="text-2xl text-black font-semibold text-center mb-6">
            Shipping Information
          </h2>

          {["Full Name", "Address", "City", "Country", "Postal Code"].map(
            (field, i) => (
              <input
                key={i}
                placeholder={field}
                className="w-full mb-4 px-4 py-3 text-black rounded-md border border-gray-400 outline-none bg-white"
              />
            )
          )}

          <button
            onClick={completePurchase}
            className="w-full bg-black text-white py-4 rounded-md mt-6 hover:opacity-90 transition"
          >
            Complete Purchase
          </button>

          <div className="text-center mt-6 text-black">
            <h3 className="text-lg  font-medium">
              Estimated Delivery
            </h3>
            <p>
              Delivery by Saturday, 29 Oct 2026
            </p>
          </div>
        </Card>
      )}

      {/* ================= SUMMARY ================= */}
      {step === "summary" && (
        <Card>
          <h2 className="text-xl text-black font-semibold text-center mb-4">
            Apply Discount Code
          </h2>

          <input
            placeholder="Enter Discount code"
            className="w-full mb-6 px-4 py-3 rounded-md border text-black border-gray-400 outline-none bg-white"
          />

          <h3 className="text-lg font-semibold mb-4">
            Order Summary
          </h3>

          <div className="space-y-2 mb-4">
            <p>Sub total</p>
            <p>Taxes</p>
            <p>Shipping</p>
            <hr />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>Price</span>
            </div>
          </div>

          <h3 className="text-lg font-semibold mb-2">
            Payment Option
          </h3>

          {[
            "Credit Card",
            "UPI",
            "Debit Card",
            "Cash On Delivery",
          ].map((method) => (
            <label key={method} className="block mb-2">
              <input
                type="radio"
                name="payment"
                value={method}
                onChange={() => setPaymentMethod(method)}
                className="mr-2"
              />
              {method}
            </label>
          ))}

          <button
            onClick={handlePayment}
            className="w-full bg-black text-white py-3 mt-6 rounded-md hover:opacity-90 transition"
          >
            Pay Now
          </button>
        </Card>
      )}

      {/* ================= SUCCESS ================= */}
      {step === "success" && (
        <Card>
          <h2 className="text-2xl font-semibold text-center mb-2">
            Shipping Information
          </h2>

          <p className="text-center font-medium mb-6">
            Your order is confirmed
          </p>

          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 border-4 border-green-500 rounded-full flex items-center justify-center">
              <span className="text-green-500 text-5xl">✔</span>
            </div>
          </div>

          <h3 className="text-green-600 text-2xl font-semibold text-center mb-2">
            Payment Successful
          </h3>

          <p className="text-center mb-6">
            Estimated Delivery by Saturday, 29 Oct 2026
          </p>

          <button
            onClick={() => setStep("shipping")}
            className="w-full bg-black text-white py-4 rounded-md"
          >
            Shop More
          </button>
        </Card>
      )}

      {/* ================= FAILED ================= */}
      {step === "failed" && (
        <Card>
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 border-4 border-red-500 rounded-full flex items-center justify-center">
              <span className="text-red-500 text-5xl">✕</span>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-center mb-2">
            Payment Failed
          </h3>

          <p className="text-center mb-6">
            Try again, payment failed
          </p>

          <button
            onClick={() => setStep("summary")}
            className="underline text-center w-full"
          >
            Go back to cart
          </button>
        </Card>
      )}
    </main>
  );
}

/* ================= REUSABLE CARD ================= */

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-[450px] bg-[#F5F3EE] text-black rounded-xl shadow-xl p-8 border border-gray-400">
      {children}
      <div className="text-right text-sm mt-8">
        © 2026 Ayurveda Shop
      </div>
    </div>
  );
}