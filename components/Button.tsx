import Image from "next/image";

const Button = ({ bgColor, title }: { bgColor: string, title: string }) => {
  return (
    <button
      className={`text-xl flex text-white items-center cursor-pointer ${bgColor == "black" ? "bg-black" : "bg-[#4E482E] text-white px-8 py-4 rounded-full cursor-pointer text-lg hover:scale-105 transition"} py-4 px-6 rounded-full font-Montagu_Slab font-light`}
    >
      {title}
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
