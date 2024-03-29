"use client";
import Icon from "@mdi/react";
import { mdiChevronLeftBox, mdiChevronRightBox } from "@mdi/js";
import marketingData from "./marketing.JSON";
import { useState, useLayoutEffect } from "react";
import "./marketingSC.css";

export const MarketingSC = () => {
  const [currentImg, setCurrentImg] = useState(marketingData[0]);
  const [nextImg, setNextImg] = useState(null);
  const [prevImg, setPrevImg] = useState(null);
  const [firstImg, setFirstImg] = useState(null);
  const [lastImg, setLastImg] = useState(null);
  const [changing, setChanging] = useState(null);

  useLayoutEffect(() => {
    handleUpdate();
  }, []);

  useLayoutEffect(() => {
    let currentIndex = marketingData.indexOf(currentImg);
    setPrevImg(
      marketingData[
        (currentIndex - 1 + marketingData.length) % marketingData.length
      ]
    );
    setNextImg(marketingData[(currentIndex + 1) % marketingData.length]);
    setFirstImg(
      marketingData[
        (currentIndex - 2 + marketingData.length) % marketingData.length
      ]
    );
    setLastImg(marketingData[(currentIndex + 2) % marketingData.length]);
  }, [currentImg]);

  const handleUpdate = () => {
    let currentIndex = marketingData.indexOf(currentImg);
    //First Image.  Logic to wrap around.
    if (currentIndex - 2 < 0)
      setFirstImg(marketingData[marketingData.length - 2]);
    else setFirstImg(marketingData[currentIndex - 2]);
    //Previous Image.  Logic to wrap around.
    if (currentIndex - 1 < 0)
      setPrevImg(marketingData[marketingData.length - 1]);
    else setPrevImg(marketingData[currentIndex - 1]);
    //Next Image.  Logic to wrap around.
    if (currentIndex + 1 > marketingData.length - 1)
      setNextImg(marketingData[marketingData[0]]);
    else setNextImg(marketingData[currentIndex + 1]);
    //Last Image.  Logic to wrap around.
    if (currentIndex + 2 > marketingData.length - 1)
      setLastImg(marketingData[marketingData[1]]);
    else setLastImg(marketingData[currentIndex + 2]);
  };

  {
    /*useLayoutEffect(() => {
    setTimeout(() => {
      handleNext();
    }, 10000);
  }, [nextImg]);*/
  }

  const handleNext = () => {
    setChanging("next");
    setTimeout(() => {
      setCurrentImg(nextImg);
      setChanging(null);
    }, 500);
  };

  const handlePrev = () => {
    setChanging("prev");
    setTimeout(() => {
      setPrevImg(null);
      setCurrentImg(prevImg);
      setNextImg(currentImg);
      setChanging(null);
    }, 500);
  };

  const handleStyleFirst = () => {
    switch (changing) {
      case "next":
        return {};
      case "prev":
        return { animation: "firstIn .5s ease forwards" };
      case null:
        return {};
    }
  };

  const handleStyleNext = () => {
    switch (changing) {
      case "next":
        return { animation: "nextIn .5s ease forwards" };
      case "prev":
        return { animation: "nextOut .5s ease forwards" };
      case null:
        return {};
    }
  };

  const handleStyleLast = () => {
    switch (changing) {
      case "next":
        return { animation: "lastIn .5s ease forwards" };
      case "prev":
        return { animation: "lastOut .5s ease forwards" };
      case null:
        return {};
    }
  };

  const handleStylePrev = () => {
    switch (changing) {
      case null:
        return {};
      case "next":
        return { animation: "prevOut .5s ease forwards" };
      case "prev":
        return { animation: "prevIn .5s ease forwards" };
    }
  };

  const handleStyleCurrent = () => {
    switch (changing) {
      case null:
        return {};
      case "next":
        return { animation: "currentNext .5s ease forwards" };
      case "prev":
        return { animation: "currentPrev .5s ease forwards" };
      case "start":
        return { animation: "currentStart .5s ease forwards" };
    }
  };

  const handleTextCurrent = () => {
    switch (changing) {
      case null:
        return {};
      case "next":
        return { animation: "textFadeOut .25s ease forwards" };
      case "prev":
        return { animation: "textFadeOut .25s ease forwards" };
    }
  };

  const handleTextNext = () => {
    switch (changing) {
      case null:
        return {};
      case "next":
        return { animation: "textFadeIn .25s ease .25s forwards" };
      case "prev":
        return {};
    }
  };

  const handleTextPrev = () => {
    switch (changing) {
      case null:
        return {};
      case "next":
        return {};
      case "prev":
        return { animation: "textFadeIn .25s ease .25s forwards" };
    }
  };

  return (
    <div>
      <div className=" drop-shadow-lg relative m-auto overflow-x-hidden text-center select-none">
        <div
          className="font-lifeCraft absolute inset-x-0 inset-y-0 z-30 text-white"
          style={handleTextCurrent()}
        >
          <p className="text-[30px] sm:text-[60px] m-auto text-shadow-md">
            {currentImg.text}
          </p>
          <p className="text-[20px] sm:text-[30px] text-shadow-md">
            <em>{currentImg.subtext}</em>
          </p>
        </div>
        {prevImg && (
          <div
            className=" font-lifeCraft absolute inset-x-0 inset-y-0 z-30 text-white opacity-0"
            style={handleTextPrev()}
          >
            <p className="text-[30px] sm:text-[60px] m-auto text-shadow-md">
              {prevImg.text}
            </p>
            <p className="text-[20px] sm:text-[30px] text-shadow-md">
              <em>{prevImg.subtext}</em>
            </p>
          </div>
        )}
        {nextImg && (
          <div
            className=" font-lifeCraft drop-shadow-lg absolute inset-x-0 inset-y-0 z-30 text-white opacity-0"
            style={handleTextNext()}
          >
            <p className="text-[30px] sm:text-[60px] m-auto text-shadow-md">
              {nextImg.text}
            </p>
            <p className="text-[20px] sm:text-[30px] text-shadow-md">
              <em>{nextImg.subtext}</em>
            </p>
          </div>
        )}
        <div className=" rounded-xl relative">
          <img
            className="rounded-xl z-20 m-auto"
            style={handleStyleCurrent()}
            src={currentImg.img}
            alt=""
          />
        </div>
        <div className="absolute inset-x-0 inset-y-[90%] sm:inset-y-[96%] z-30 max-w-[640px] m-auto flex flex-row justify-center">
          {marketingData.map((el) => {
            return (
              <div
                className=" m-2 transition-all w-[75px] h-[2.5px] bg-white rounded-md shadow-md"
                key={el.id}
                style={
                  currentImg === el
                    ? { background: `white` }
                    : { background: `grey` }
                }
              ></div>
            );
          })}
        </div>
        <div className=" items-center absolute inset-x-0 inset-y-0 z-30 max-w-[640px] m-auto flex flex-row justify-between max-h-[400px] rounded-xl ">
          <Icon
            className="hover:scale-[105%] active:scale-[95%] cursor-pointer"
            path={mdiChevronLeftBox}
            size={2}
            color="white"
            onClick={changing ? null : () => handlePrev()}
          />

          <Icon
            className="hover:scale-[105%] active:scale-[95%] cursor-pointer"
            path={mdiChevronRightBox}
            onClick={changing ? null : () => handleNext()}
            size={2}
            color="white"
          />
        </div>
        {prevImg && (
          <img
            className="absolute inset-x-0 inset-y-0 m-auto translate-x-[-105%] opacity-[.5] scale-[90%] z-10 rounded-xl"
            src={prevImg.img}
            alt=""
            style={handleStylePrev()}
          />
        )}
        {nextImg && (
          <img
            className="absolute inset-x-0 inset-y-0 m-auto translate-x-[105%] opacity-[.5] scale-[90%] z-10 rounded-xl "
            src={nextImg.img}
            alt=""
            style={handleStyleNext()}
          />
        )}
        {lastImg && (
          <img
            className="absolute inset-x-0 inset-y-0 m-auto translate-x-[200%] opacity-[0] scale-[80%] rounded-xl"
            src={lastImg.img}
            alt=""
            style={handleStyleLast()}
          />
        )}
        {firstImg && (
          <img
            className="absolute inset-x-0 inset-y-0 m-auto translate-x-[-200%] opacity-[0] scale-[80%] rounded-xl"
            src={firstImg.img}
            alt=""
            style={handleStyleFirst()}
          />
        )}
      </div>
    </div>
  );
};
