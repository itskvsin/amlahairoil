import React from "react";
import { DM_Sans } from "next/font/google";
import { Montagu_Slab } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import Button from "../Button";
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

const dmSans = DM_Sans({
  subsets: ["latin"],
});

// { btnColor }: { btnColor: string }

const Navbar = () => {
  return (
    <div
      className={`${dmSans.className} z-99 bg-transparent text-black fixed h-40 text-2xl font-600 flex items-center right-1/5 w-6xl font-semibold`}
    >
      <div className="flex items-center justify-between w-full">
        <div className="img flex items-center">
          <Link href="/login">
            <div className="p-4 bg-white rounded-full">
              <FaUser className="h-6 w-6 " />
            </div>
          </Link>
        </div>
        <div className="links flex gap-14">
          <Link href="/collections" className="px-4">
            Collections
          </Link>
          <Link href="/" className="px-4">
            Our Story
          </Link>
          <Link href="/" className="px-4">
            Education
          </Link>
          <Link href="/contact" className="px-4">
            Contact
          </Link>
        </div>
        <div className="button">
          <Link href="/cart" className="cursor-pointer">
            <div className="p-4 bg-white rounded-full">
              <FaShoppingCart className="h-6 w-6 " />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

// <Link href="/shop">
//   {/* <button className="text-xl flex text-white items-center  bg-black py-4 px-6 rounded-full font-Montagu_Slab font-light">
//     Shop Now
//     <Image
//       src="/images/navbar/arrow-up-right.png"
//       alt="Logo"
//       width={10000}
//       height={1000}
//       className="w-5"
//     />
//   </button> */}
//   <Button bgColor={btnColor} title="Shop Now" />
// </Link>
