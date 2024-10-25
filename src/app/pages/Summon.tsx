"use client";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRef } from "react";
import Card from "../components/card/Card";
import "@/app/components/card/card.css";
import { CARDS } from "../constants";
import { getStarCard } from "../methods";
import { ICard } from "../types";
import TenCard from "../components/tenCard";
import Currency from "../components/currency";
const Summon = () => {
  const SUMMON_VIDEO_DISABLED = "summon_video_disabled";
  const FLIP_CARD_VOLUME = "flip-card-volume";
  const refVideo = useRef<HTMLVideoElement>(null);
  const [videoDisabled, setVideoDisabled] = useState<boolean>(false);
  const [flipVolumeOn, setFlipVolumeOn] = useState<boolean>(false);
  const [showVideo, setVideoShow] = useState<boolean>(false);
  const [isPlayed, setPlayed] = useState<boolean>(false);
  const [cardAtOne, setCardAtOne] = useState<ICard | undefined>(undefined);
  const [starAtTen, setStarAtTen] = useState<number[]>(
    Array.from({ length: 10 }),
  );
  const handlePlayVideo = (time: number) => {
    // console.log(cardAtOne);
    if (!showVideo) {
      setVideoShow(true);
    }
    if (!isPlayed) {
      setPlayed(true);
      if (refVideo.current?.paused) {
        refVideo.current?.play();
      }
    }
    if (time === 1) {
      const star = getStarCard();
      const filterCardsByStar = CARDS.filter(
        (card) => card.star === star && card.sound.includes(""),
      );
      // console.log(filterCardsByStar);
      const randomCardIndex = Math.ceil(
        Math.random() * filterCardsByStar.length - 1,
      );
      setCardAtOne(filterCardsByStar[randomCardIndex]);
    }
    if (time >= 10) {
      const tenStars = [];
      for (let i = 0; i < 10; i++) {
        tenStars.push(getStarCard());
      }
      setStarAtTen(tenStars);
    }
  };

  const handleVideoDisabled = () => {
    setVideoDisabled((prev) => {
      window.localStorage.setItem(SUMMON_VIDEO_DISABLED, JSON.stringify(!prev));
      return !prev;
    });
  };

  const handleVolumeSet = () => {
    setFlipVolumeOn((prev) => {
      window.localStorage.setItem(FLIP_CARD_VOLUME, JSON.stringify(!prev));
      return !prev;
    });
  };

  // console.log({ starAtTen });

  const handlePauseVideo = () => {
    setPlayed(false);
    refVideo.current?.pause();
  };

  useEffect(() => {
    const savedValueVideoDisabled: boolean = JSON.parse(
      window.localStorage.getItem(SUMMON_VIDEO_DISABLED) || "false",
    );
    const savedValueFlipCardVolumeOn: boolean = JSON.parse(
      window.localStorage.getItem(FLIP_CARD_VOLUME) || "false",
    );
    setVideoDisabled(savedValueVideoDisabled);
    setFlipVolumeOn(savedValueFlipCardVolumeOn);
  }, []);

  return (
    <div>
      <section className="fixed top-0 left-0 w-screen h-screen ">
        <Image
          width={200}
          height={200}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-auto object-cover"
          src={"/images/summon_gate.svg"}
          priority
          alt="summon_gate_card_player"
        />
        <div className="absolute right-[10rem] top-[3.5rem]">
          <Currency />
        </div>
      </section>
      {/* disabled video summon button */}
      <button
        className="fixed right-[4rem] top-[4rem]"
        onClick={handleVideoDisabled}
        title={`Summon animation: ${videoDisabled ? " OFF" : " ON"}`}
      >
        {videoDisabled ? (
          <svg
            fill="none"
            height="5rem"
            viewBox="0 0 24 24"
            width="5rem"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill={"#b40000"}>
              <path d="m21.28 15.72c-.65-.45-1.44-.72-2.28-.72-.94 0-1.81.33-2.5.88-.92.73-1.5 1.86-1.5 3.12 0 .75.21 1.46.58 2.06.04.07.09.14.15.21.7 1.04 1.9 1.73 3.27 1.73 1.01 0 1.93-.37 2.63-1 .31-.26.58-.58.79-.94.37-.6.58-1.31.58-2.06 0-1.36-.68-2.56-1.72-3.28zm-.68 4.86c-.15.15-.34.22-.53.22s-.38-.07-.53-.22l-.53-.53-.55.55c-.15.15-.34.22-.53.22s-.38-.07-.53-.22c-.29-.29-.29-.77 0-1.06l.55-.55-.53-.53c-.29-.29-.29-.77 0-1.06s.77-.29 1.06 0l.53.53.5-.5c.29-.29.77-.29 1.06 0s.29.77 0 1.06l-.5.5.53.53c.29.29.29.76 0 1.06z" />
              <path d="m21.8507 10.2506c-.78-4.44995-4.61-7.89995-9.12-8.21995-6.1-.44-11.14 4.61-10.7 10.69995.32 4.51 3.77 8.33 8.22 9.11 1.15.2 2.27.2 3.34.02.31-.05.49-.39.37-.67-.3-.68-.46-1.43-.46-2.2 0-1.69.75-3.25 2.07-4.29.97-.78 2.19-1.21 3.43-1.21.78 0 1.52.16 2.19.46.29.13.62-.06.68-.37.18-1.06.18-2.18-.02-3.33zm-7.35 3.32-1.2.69-1.2.69c-1.49.86-2.71.16-2.71-1.57v-1.38-1.39c0-1.71995 1.22-2.42995 2.71-1.56995l1.2.69 1.2.68995c1.49.88 1.49 2.28 0 3.15z" />
            </g>
          </svg>
        ) : (
          <svg
            fill="none"
            height="5rem"
            width="5rem"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm2.66 11.73-1.28.74-1.28.74c-1.65.95-3 .17-3-1.73v-1.48-1.48c0-1.91 1.35-2.68 3-1.73l1.28.74 1.28.74c1.65.95 1.65 2.51 0 3.46z"
              fill="#292d32"
            />
          </svg>
        )}
      </button>
      <button
        className="fixed right-[4rem] top-[10rem]"
        onClick={handleVolumeSet}
        title={`Flip Card Volume Status: ${flipVolumeOn ? " ON" : " OFF"}`}
      >
        {!flipVolumeOn ? (
          <svg
            fill="none"
            height="5rem"
            width="5rem"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="#b40000">
              <path d="m22.5314 13.4197-1.45-1.45 1.4-1.4c.29-.29.29-.77001 0-1.06001s-.77-.29-1.06 0l-1.4 1.40001-1.45-1.45001c-.29-.29-.77-.29-1.06 0s-.29.77001 0 1.06001l1.45 1.45-1.49 1.49c-.29.29-.29.77 0 1.06.15.15.34.22.53.22s.38-.07.53-.22l1.49-1.49 1.45 1.45c.15.15.34.22.53.22s.38-.07.53-.22c.29-.29.29-.76 0-1.06z" />
              <path d="m14.02 3.78168c-1.12-.62-2.55-.46-4.01.45l-2.92 1.83c-.2.12-.43.19-.66.19h-.93-.5c-2.42 0-3.75 1.33-3.75 3.75002v4c0 2.42 1.33 3.75 3.75 3.75h.5.93c.23 0 .46.07.66.19l2.92 1.83c.88.55 1.74.82 2.54.82.52 0 1.02-.12 1.47-.37 1.11-.62 1.73-1.91 1.73-3.63v-9.18002c0-1.72-.62-3.01-1.73-3.63z" />
            </g>
          </svg>
        ) : (
          <svg
            fill="none"
            height="5rem"
            width="5rem"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="#292d32">
              <path d="m18.0003 16.7503c-.16 0-.31-.05-.45-.15-.33-.25-.4-.72-.15-1.05 1.57-2.09 1.57-5.01 0-7.10003-.25-.33-.18-.8.15-1.05s.8-.18 1.05.15c1.96 2.62003 1.96 6.28003 0 8.90003-.15.2-.37.3-.6.3z" />
              <path d="m19.8284 19.2503c-.16 0-.31-.05-.45-.15-.33-.25-.4-.72-.15-1.05 2.67-3.56 2.67-8.54003 0-12.10003-.25-.33-.18-.8.15-1.05s.8-.18 1.05.15c3.07 4.09 3.07 9.81003 0 13.90003-.14.2-.37.3-.6.3z" />
              <path d="m14.02 3.78168c-1.12-.62-2.55-.46-4.01.45l-2.92 1.83c-.2.12-.43.19-.66.19h-.93-.5c-2.42 0-3.75 1.33-3.75 3.75002v4c0 2.42 1.33 3.75 3.75 3.75h.5.93c.23 0 .46.07.66.19l2.92 1.83c.88.55 1.74.82 2.54.82.52 0 1.02-.12 1.47-.37 1.11-.62 1.73-1.91 1.73-3.63v-9.18002c0-1.72-.62-3.01-1.73-3.63z" />
            </g>
          </svg>
        )}
      </button>
      {showVideo && (
        <video
          onPause={handlePauseVideo}
          ref={refVideo}
          autoPlay
          width={"320"}
          height={"240"}
          className="fixed top-0 left-0 w-screen h-screen object-fill"
        >
          <source
            src={
              videoDisabled
                ? "/videos/summon_anim_2.mp4"
                : "/videos/summon_anim_1.mp4"
            }
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      )}

      {/* result */}
      {showVideo && !isPlayed && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {/* summon x1 */}
          {cardAtOne && (
            <div className={clsx("animate-faded0.5", {})}>
              <Card data={cardAtOne} canFlip flipVolumeOn={flipVolumeOn} />
            </div>
          )}
          {/* summon x10 */}
          {starAtTen?.[0] && (
            <div className={clsx("animate-faded0.5", {})}>
              <TenCard tenStars={starAtTen} />
            </div>
          )}
        </div>
      )}

      {((!isPlayed && showVideo) || !showVideo) && (
        <div
          className={clsx(
            "flex fixed bottom-[4rem] left-1/2 -translate-x-1/2 duration-300 animate-faded2",
          )}
        >
          <button
            className="text-[2rem] w-[20rem] primary-btn-effect px-6 py-4 mr-[10rem] rounded-xl"
            onClick={() => handlePlayVideo(1)}
          >
            Summon x1
          </button>
          <button
            className="text-[2rem] w-[20rem] primary-btn-effect px-6 py-4 rounded-xl"
            onClick={() => handlePlayVideo(10)}
          >
            Summon x10
          </button>
        </div>
      )}
    </div>
  );
};

export default Summon;
