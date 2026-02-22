import Image from "next/image";

const Button = ({ bgColor }: { bgColor: string }) => {
  return (
    <button
      className={`text-xl flex text-white items-center ${bgColor == "black" ? "bg-black" : "border-white border-2 bg-transparent"} py-4 px-6 rounded-full font-Montagu_Slab font-light`}
    >
      Shop Now
      <Image
        src="/images/navbar/arrow-up-right.png"
        alt="Logo"
        width={10000}
        height={10000}
        className="w-5"
      />
    </button>
  );
};

export default Button;
