import Image from "next/image";
import React from "react";

interface Props {
  maxHp: number;
  hp: number;
}

const HpBar = ({ maxHp = 4000, hp = 3000 }: Props) => {
  const percent = hp > maxHp ? 0 : Math.abs((hp / maxHp) * 100 - 100);
  //   console.log({ percent });

  return (
    <div className="relative w-[40rem] h-[10rem] flex items-center">
      <div className="h-full absolute right-[0.2rem] top-0 w-[83%]">
        <Image
          width={300}
          height={300}
          alt="card"
          src={"/items/hp_point.svg"}
          style={{ right: percent + 2 + "%" }}
          className="w-auto h-[10rem] object-cover absolute right-[0] duration-300"
          priority
        />
      </div>
      <Image
        width={300}
        height={300}
        alt="card"
        src={"/items/hp_bar.svg"}
        className="w-auto h-[10rem] object-cover absolute"
        priority
      />
      <span className="absolute text-red-600 font-semibold text-xl right-[4rem]">
        {hp > maxHp ? maxHp : hp}
      </span>
    </div>
  );
};

export default HpBar;
