"use client";
import {
  incrementProduct,
  decrementProduct,
  setProductAmount,
} from "../components/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Image from "next/image";
import { RemoveModal } from "../components/deleteConfirmation";
import { useRouter } from "next/navigation";

const CartGrid = () => {
  const cart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const router = useRouter();

  const itemColor = (item) => {
    switch (item.quality) {
      case 0:
        return "#ffffff";
      case 1:
        return "#1eff00";
      case 2:
        return "#0070dd";
      case 3:
        return "#a335ee";
      case 4:
        return "#ff8000";
    }
  };

  const individualCostMultiplier = (itemQuantity, priceG, priceS, priceC) => {
    const totalCopper = (priceG * 10000 + priceS * 100 + priceC) * itemQuantity;
    const totalG = Math.floor(totalCopper / 10000);
    const totalS = Math.floor((totalCopper - totalG * 10000) / 100);
    const totalC = totalCopper - totalG * 10000 - totalS * 100;
    return { totalG: totalG, totalS: totalS, totalC: totalC };
  };

  const handleInputChange = (e, item) => {
    dispatch(setProductAmount({ item: item, value: e.target.value }));
  };

  const MapCart = () =>
    cart.map((item) => {
      if (item.amount > 0)
        return (
          <div
            key={item.item.id}
            className={`flex flex-row justify-evenly bg-gradient-to-t from-gray-200 to-slate-50 text-black border-2 border-solid border-white rounded drop-shadow-[0_2px_4px_rgba(0,0,0,.25)] mt-2 mb-2 sm:p-2 items-center w-[100%] m-auto relative p-6`}
          >
            {/* Item Image */}
            <div
              className={` min-w-[25%] translate-x-8 sm:w-[25%] sm:translate-x-0 sm:min-w-auto flex flex-row items-center justify-evenly drop-shadow-[0_2px_4px_rgba(0,0,0,.25)]`}
            >
              <img
                className="m-auto rounded w-[75px] cursor-pointer"
                src={item.item.img}
                style={{ border: `2px solid ${itemColor(item.item)}` }}
                onClick={() => router.push(`/shop/${item.item.id}`)}
                alt=""
              />
            </div>
            {/* Item Name */}
            <div className="min-w-[75px] sm:min-w-[150px] select-none z-0">
              <p
                className={`text-center text-[17.5px] font-frizquad absolute sm:relative w-[100%] inset-x-[-15px] sm:inset-x-auto inset-y-[-15px] sm:inset-y-auto h-fit sm:h-auto sm:text-[25px] sm:w-auto m-4 hover:underline cursor-pointer`}
                style={{ color: `${itemColor(item.item)}` }}
                onClick={() => router.push(`/shop/${item.item.id}`)}
              >
                {item.item.name}
              </p>
            </div>
            {/* Quantity */}
            <div className="min-w-[75px] sm:min-w-[150px] flex flex-row justify-evenly items-center select-none">
              {item.amount > 1 ? (
                <div
                  className="w-[20px] h-[20px] border-solid border-slate-300 border-2 rounded text-center cursor-pointer transition-all hover:bg-white hover:text-black hover:transition-all"
                  onClick={() => dispatch(decrementProduct(item.item))}
                >
                  <p className="mt-[-5px]">-</p>
                </div>
              ) : (
                <div className="w-[20px] h-[20px] text-gray-400 border-solid border-gray-400 border-2 rounded text-center">
                  <p className="mt-[-5px]">-</p>
                </div>
              )}

              <input
                className="text-black w-[25px] rounded border-slate-400 border-solid border-2 bg-white text-center"
                type="number"
                item={item.item}
                value={item.amount}
                min="1"
                max="99"
                onChange={(e) => handleInputChange(e, item)}
                onClick={(e) => e.target.select()}
              ></input>
              <div
                className="w-[20px] h-[20px] border-solid border-slate-300 border-2 rounded text-center cursor-pointer transition-all hover:bg-white hover:text-black hover:transition-all select-none"
                onClick={() => dispatch(incrementProduct(item.item))}
              >
                <p className="mt-[-5px]">+</p>
              </div>
            </div>
            {/* Gold Cost */}
            <div className="flex flex-row font-bold flex-wrap sm:flex-nowrap items-center m-2 justify-evenly min-w-[25px] sm:min-w-[125px]">
              <div className="flex flex-row flex-nowrap items-center max-h-[20px] align-middle justify-evenly">
                <p>
                  {
                    individualCostMultiplier(
                      item.amount,
                      item.item.priceG,
                      item.item.priceS,
                      item.item.priceC
                    ).totalG
                  }
                </p>
                <Image
                  className="m-auto"
                  height={20}
                  width={20}
                  src="/assets/goldIMG/Gold.webp"
                  alt="Gold"
                />
              </div>
              <div className="flex flex-row flex-nowrap w-[50px] max-h-[20px] items-center align-middle justify-evenly">
                <p>
                  {
                    individualCostMultiplier(
                      item.amount,
                      item.item.priceG,
                      item.item.priceS,
                      item.item.priceC
                    ).totalS
                  }
                </p>
                <Image
                  height={10}
                  width={20}
                  src="/assets/goldIMG/Silver.webp"
                  alt="Silver"
                />
              </div>
              <div className="flex flex-row flex-nowrap w-[50px] max-h-[20px] align-middle items-center justify-evenly">
                <p>
                  {
                    individualCostMultiplier(
                      item.amount,
                      item.item.priceG,
                      item.item.priceS,
                      item.item.priceC
                    ).totalC
                  }
                </p>
                <Image
                  height={10}
                  width={20}
                  src="/assets/goldIMG/Copper.webp"
                  alt="Copper"
                />
              </div>
            </div>
            {/* Delete Button */}
            <div
              onClick={() => {
                setDeleteConfirm(!deleteConfirm);
                setDeleteItem(item);
              }}
              className="w-[25px] h-[20px] text-red-500 border-solid border-red-500 border-2 rounded text-center transition-all hover:transition-all hover:bg-red-300 cursor-pointer"
            >
              <p className="mt-[-10px] font-bold p-1">x</p>
            </div>
          </div>
        );
    });

  return (
    <div className="text-white w-[85%] sm:w-[85%] m-auto">
      {deleteConfirm && (
        <RemoveModal
          deleteConfirm={deleteConfirm}
          setDeleteConfirm={setDeleteConfirm}
          item={deleteItem}
        />
      )}
      <MapCart />
    </div>
  );
};

export default CartGrid;
