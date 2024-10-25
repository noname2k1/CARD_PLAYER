"use client";

import { ICard } from "@/app/types";
import clsx from "clsx";
import Image from "next/image";
import { useState, useRef, SyntheticEvent } from "react";
import "@/app/components/card/card.css";
import { createPortal } from "react-dom";
const Card = ({
  data,
  canFlip = false,
  flipVolumeOn = true,
  own = false,
}: {
  data: ICard;
  canFlip?: boolean;
  own?: boolean;
  flipVolumeOn?: boolean;
}) => {
  const soundRef = useRef<HTMLAudioElement>(null);
  const [isFront, setIsFront] = useState<boolean>(false);
  const [zoomSrc, setZoomSrc] = useState<{
    type: "img" | "video";
    src: string;
  }>({
    type: "img",
    src: "",
  });
  const handleFlipCard = (e: SyntheticEvent) => {
    if (canFlip) {
      setIsFront((prev) => !prev);
      const wrapper = e.currentTarget.closest(".card");
      wrapper?.classList.toggle("is-flipped");
      if (soundRef.current?.paused && !isFront) {
        soundRef.current?.play();
      }
    } else {
      if (data.star && !canFlip) {
        setZoomSrc(
          data.video
            ? { type: "video", src: data.video }
            : { type: "img", src: data.thumbnail },
        );
      }
    }
  };

  const handleChangeZoomSrcImage = (e: SyntheticEvent, action: "+" | "-") => {
    e.stopPropagation();
    if (zoomSrc.type === "img") {
    }
  };

  const handleRemoveZoomSrcImage = (e: SyntheticEvent) => {
    e.stopPropagation();
    if (zoomSrc.type === "img") setZoomSrc({ type: "img", src: "" });
  };
  const handleRemoveZoomSrc = (e: SyntheticEvent) => {
    e.stopPropagation();
    setZoomSrc({ type: "img", src: "" });
  };
  // console.log(star);
  return (
    <article
      className={clsx("card w-[14rem] h-[20rem] select-none", {
        "is-flipped": !canFlip,
      })}
      onClick={(e) => handleFlipCard(e)}
    >
      {canFlip && flipVolumeOn && (
        <audio src={data.sound} ref={soundRef}></audio>
      )}
      <div className="card__content cursor-pointer h-full text-center relative p-20 transition-transform duration-1000 text-white font-bold">
        <div className="card__front absolute top-0 bottom-0 right-0 left-0 p-8 flex items-center justify-center">
          <Image
            width={200}
            height={300}
            priority
            alt="card"
            src={"/images/card_behind.webp"}
            className="w-full h-full absolute rotate-180 top-0 left-0"
          />
        </div>
        {/* pure effect */}
        {data.star === 5 && (
          <div className="absolute w-full h-full top-0 left-0 box-animation"></div>
        )}
        {data.star === 6 && (
          <div className="absolute w-full h-full top-0 left-0 box-animation-special"></div>
        )}
        {data.star === 7 && (
          <div className="absolute w-full h-full top-0 left-0 box-animation-legend"></div>
        )}
        <div className="card__back absolute top-0 bottom-0 right-0 left-0 bg-black/90 p-8 flex items-center justify-center">
          <Image
            width={200}
            height={300}
            alt="card"
            src={data.thumbnail}
            loading="lazy"
            className="w-auto h-[calc(100%-6rem)] absolute top-[3rem] left-1/2 -translate-x-1/2 object-fill"
          />
          <Image
            width={200}
            height={300}
            alt="card"
            loading="lazy"
            src={data.frontPath}
            className="w-full h-full absolute top-0 left-0"
          />
          <span
            title={data.name}
            className={clsx(
              "block absolute capitalize cursor-default max-w-[8rem] font-bold max-h-[1rem] text-[0.8rem] text-ellipsis overflow-hidden top-[1.3rem] left-[1rem]",
              {
                "text-yellow-500": data.star === 5,
                "text-red-500": data.star === 6,
                "bg-gradient-to-r from-teal-500 to-yellow-500 text-transparent bg-clip-text":
                  data.star === 7,
              },
            )}
          >
            {data.name}
          </span>
          <div className="absolute right-[1.5rem] bottom-[2rem]">
            {Array.from({ length: data.star > 5 ? 5 : data.star }).map(
              (item, index) => (
                <Image
                  key={index}
                  width={200}
                  height={300}
                  priority
                  alt="card"
                  src={
                    data.star === 6
                      ? "/images/star_L.webp"
                      : data.star === 7
                      ? "/images/star_G.webp"
                      : "/images/star.webp"
                  }
                  className="w-[1rem] h-[1rem] object-cover mt-[0.5rem]"
                />
              ),
            )}
          </div>
          {/* pure effect */}
          {data.star === 5 && (
            <div className="absolute w-full h-full top-0 left-0 box-animation"></div>
          )}
          {data.star === 6 && (
            <div className="absolute w-full h-full top-0 left-0 box-animation-special"></div>
          )}
          {data.star === 7 && (
            <div className="absolute w-full h-full top-0 left-0 box-animation-legend"></div>
          )}
          {/* {!own && (
            <div className="absolute top-0 left-0 bg-black/80 w-full h-full"></div>
          )} */}
        </div>
      </div>
      {zoomSrc.src &&
        createPortal(
          <div
            className="w-screen h-screen fixed top-0 left-0 z-20 bg-black/70 flex justify-center"
            onClick={handleRemoveZoomSrcImage}
          >
            {zoomSrc.type === "video" && data.video ? (
              <video
                width={200}
                height={300}
                autoPlay
                controls
                loop
                src={zoomSrc.src}
                className="w-screen h-screen object-fill"
              />
            ) : (
              <Image
                width={200}
                height={300}
                priority
                alt="card-player-zoom-image-7-star"
                src={zoomSrc.src}
                className="w-auto h-full object-cover"
              />
            )}
            <button
              onClick={handleRemoveZoomSrc}
              className="absolute primary-btn-effect flex items-center justify-center text-[2rem] p-[2rem] w-[2rem] h-[2rem] top-[2rem] right-[3rem] rounded-full bg-orange-700"
            >
              X
            </button>
          </div>,
          document.body,
        )}
    </article>
  );
};

export default Card;
