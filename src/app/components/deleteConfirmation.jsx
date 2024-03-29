"use client";
import { useDispatch, useSelector } from "react-redux";
import cartSlice from "./cartSlice";
import { removeProduct } from "./cartSlice";
import Image from "next/image";

export const RemoveModal = ({ item, deleteConfirm, setDeleteConfirm }) => {
  const dispatch = useDispatch();

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

  return (
    <div className="bg-[rgba(0,0,0,.75)] fixed inset-x-0 inset-y-0 z-10">
      <div className="w-fit h-fit bg-gray-950 fixed inset-x-0 inset-y-0 flex flex-col items-center p-1 m-auto text-center text-white border-2 border-white border-solid rounded">
        <p>
          Remove{" "}
          <span style={{ color: `${itemColor(item.item)}` }}>
            [{item.item.name}]
          </span>{" "}
          from Cart?
        </p>
        <br></br>
        <Image
          className="rounded m-auto w-[100px]"
          width={100}
          height={100}
          src={item.item.img}
          style={{ border: `2px solid ${itemColor(item.item)}` }}
          alt=""
        />
        <br></br>
        <div className="flex-nowrap justify-evenly flex flex-row">
          <button
            type="button"
            onClick={() => {
              setDeleteConfirm(!deleteConfirm);
              dispatch(removeProduct(item.item));
            }}
            className="border-red-400 mr-2 border-solid border-2 rounded p-1 text-[14px] cursor-pointer transition-all hover:transition-all hover:bg-red-300"
          >
            Remove
          </button>
          <button
            type="button"
            onClick={() => setDeleteConfirm(!deleteConfirm)}
            className="border-gray-400 p-1 text-[14px] border-2 rounded cursor-pointer border-solid transition-all hover:transition-all hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
