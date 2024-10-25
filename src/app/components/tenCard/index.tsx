import React from "react";
import { CARDS } from "@/app/constants";
import Card from "../card/Card";
interface Props {
  tenStars: number[];
}
const positionConfig = [
  {
    r: "-rotate-45",
    x: "translate-y-[3rem]",
    y: "translate-x-[25rem]",
  },
  {
    r: "-rotate-[35deg]",
    x: "-translate-y-[5rem]",
    y: "translate-x-[20rem]",
  },
  {
    r: "-rotate-[25deg]",
    x: "-translate-y-[10rem]",
    y: "translate-x-[15rem]",
  },
  {
    r: "-rotate-[15deg]",
    x: "-translate-y-[13rem]",
    y: "translate-x-[10rem]",
  },
  {
    r: "-rotate-[5deg]",
    x: "-translate-y-[15rem]",
    y: "translate-x-[4rem]",
  },
  {
    r: "rotate-[5deg]",
    x: "-translate-y-[15rem]",
    y: "-translate-x-[2rem]",
  },
  {
    r: "rotate-[15deg]",
    x: "-translate-y-[13rem]",
    y: "-translate-x-[8rem]",
  },
  {
    r: "rotate-[25deg]",
    x: "-translate-y-[10rem]",
    y: "-translate-x-[15rem]",
  },
  {
    r: "rotate-[35deg]",
    x: "-translate-y-[5rem]",
    y: "-translate-x-[20rem]",
  },
  {
    r: "rotate-[45deg]",
    x: "translate-y-[3rem]",
    y: "-translate-x-[25rem]",
  },
];
const TenCard = ({ tenStars }: Props) => {
  return (
    <div className="flex">
      {Array.from({ length: 10 }).map((item, index) => (
        <div
          className={`${positionConfig[index].r} ${positionConfig[index].x} ${positionConfig[index].y}`}
          key={index}
        >
          <Card
            data={CARDS[0]}
            // canFlip
          />
        </div>
      ))}
    </div>
  );
};

export default TenCard;
