"use client";
import Link from "next/link";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import Icon from "@mdi/react";
import { mdiCart, mdiShopping, mdiHome } from "@mdi/js";

const NavBar = () => {
  const path = usePathname();

  const cart = useSelector((state) => state.cart.value);

  const cartAmount = cart.reduce(
    (accumulator, currentItem) => accumulator + currentItem.amount,
    0
  );

  return (
    <>
      <div className=" hidden w-[85%] sm:flex flex-row justify-between font-frizquad hover:transition-all transition-all m-auto text-[20px] mt-0 mb-3">
        <div className="justify-evenly flex flex-row items-center">
          <Link
            className={`hover:transition-all border-b-2 hover:border-red-400 p-5 transition-all ${
              path === `/` ? `border-b-red-400` : null
            }`}
            href="/"
          >
            <div className="flex-nowrap flex flex-row">
              <img
                src="./assets/icons/coinLogo.svg"
                alt=""
                className="h-[30px] mr-3"
              />
              <p className=" line-clamp-1">The Auction House</p>
            </div>
          </Link>
          <Link
            className={`hover:transition-all border-b-2 hover:border-red-400 p-5 transition-all ${
              path === `/shop` ? `border-b-red-400` : null
            }`}
            href="/shop"
          >
            Shop
          </Link>
        </div>
        <Link
          className={`flex-nowrap hover:transition-all hover:border-red-400 flex flex-row p-5 transition-all border-b-2 ${
            path === `/cart` ? `border-b-red-400` : null
          }
            `}
          href="/cart"
        >
          <Icon path={mdiCart} className="w-[30px]" />
          <p className=" line-clamp-1">Cart ({cartAmount})</p>
        </Link>
      </div>

      <div className="justify-evenly fixed sm:hidden bottom-[-2.5px] flex flex-row bg-black w-[100%] h-[50px] text-center items-center z-[100]">
        <Link href="/" className="w-[33.3%] flex justify-center">
          <Icon path={mdiHome} color={`white`} className="w-[30px]" />
        </Link>
        <Link href="/shop" className="w-[33.3%] flex justify-center">
          <Icon path={mdiShopping} color={`white`} className="w-[30px]" />
        </Link>
        <Link
          href="/cart"
          className="w-[33.4%] flex flex-row flex-nowrap items-center justify-center"
        >
          <Icon path={mdiCart} color={`white`} className="w-[30px]" />
          <p className="font-bold text-white">{cartAmount}</p>
        </Link>
      </div>
    </>
  );
};

export default NavBar;
