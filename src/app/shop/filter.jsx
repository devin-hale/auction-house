"use client";
import { useEffect } from "react";
import itemData from "./../../data.JSON";
import { useState } from "react";
import Icon from "@mdi/react";
import { mdiFilter, mdiChevronDown, mdiChevronUp } from "@mdi/js";

export const Filters = ({
  typeFilter,
  setTypeFilter,
  uniqueTypeFilter,
  setUniqueTypeFilter,
}) => {
  const itemDB = itemData;

  const itemTypeMap = itemDB.items.map((item) => item.itemtype);

  const uniqueItemTypes = itemTypeMap.filter(
    (item, index, arr) => arr.indexOf(item) === index
  );

  const UniqueTypeMap = () =>
    itemDB.items
      .filter((item) => item.itemtype == typeFilter)
      .map((itm) => itm.type)
      .filter((it, index, arr) => arr.indexOf(it) === index)
      .map((slottype) => {
        return (
          <div key={slottype}>
            <input
              type="radio"
              readOnly
              checked={uniqueTypeFilter === slottype}
              onClick={() => setUniqueTypeFilter(slottype)}
              name="uniqueTypeFilter"
              id={slottype}
            ></input>
            <label htmlFor={slottype}> {slottype}</label>
          </div>
        );
      });

  const ItemTypeMap = () =>
    uniqueItemTypes.map((type) => {
      return (
        <div key={type}>
          <input
            type="radio"
            id={type}
            readOnly
            name="itemTypeFilter"
            checked={typeFilter === type}
            onClick={() => {
              setTypeFilter(type);
              setUniqueTypeFilter("All");
            }}
          ></input>
          <label htmlFor={type}> {type} </label>
        </div>
      );
    });

  return (
    <div className="p-2 m-2 rounded drop-shadow-[0_2px_5px_rgba(0,0,0,.25)] transition-transform bg-white">
      <div>
        <div className="flex-nowrap flex flex-row font-semibold underline">
          <Icon path={mdiFilter} className="w-[20px]" />
          Filters
        </div>
      </div>
      <div>
        <h1 className="font-bold underline">Item Type:</h1>
        <div key="All">
          <input
            type="radio"
            id="All"
            name="itemTypeFilter"
            checked={typeFilter === "All"}
            readOnly
            onClick={() => {
              setTypeFilter("All");
              setUniqueTypeFilter("All");
            }}
          ></input>
          <label htmlFor="All"> All</label>
        </div>
        <ItemTypeMap />
      </div>
      <br></br>
      {/** Unique Item type */}

      {typeFilter !== "All" && (
        <div key="UniqueAll">
          <h2 className="font-bold underline">{typeFilter} Type:</h2>
          <input
            type="radio"
            checked={uniqueTypeFilter === "All"}
            onClick={() => setUniqueTypeFilter("All")}
            readOnly
            key="UniqueAll"
            id="UniqueAll"
            name="uniqueTypeFilter"
          ></input>
          <label htmlFor="UniqueAll"> All</label>
          <UniqueTypeMap />
        </div>
      )}
    </div>
  );
};
