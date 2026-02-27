import Image from "next/image";
import { useCartStore } from "@/lib/cartStore";

const AddToCart = ({id, name, price, img }: {id: string, name: string, price: number, img: any }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  return (
    <button
      onClick={() =>
        addToCart({
          id: id,
          name: name,
          price: price,
          image: img,
        })
      }
      className={` items-center cursor-pointer flex gap-2 bg-[#4E482E] text-white text-lg hover:scale-105 transition py-4 px-6 rounded-full font-Montagu_Slab font-light`}
    >
      Add to Cart
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

export default AddToCart;
