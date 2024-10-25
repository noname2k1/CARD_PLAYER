"use client";
import { useState } from "react";
import HpBar from "../components/hpBar";
import Game from "../components/game";

const Battle = () => {
  const maxHp = 4000;
  const [hp, setHp] = useState(4000);
  return (
    <div className="overflow-x-hidden">
      {/* <HpBar maxHp={maxHp} hp={hp} />
      <button
        className="w-10 h-3"
        onClick={() => {
          setHp((prev) => {
            if (prev + 100 >= maxHp) {
              return maxHp;
            }
            return prev + 100;
          });
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          setHp((prev) => {
            if (prev - 100 <= 0) {
              return 0;
            }
            return prev - 100;
          });
        }}
      >
        -
      </button> */}
      <Game />
    </div>
  );
};

export default Battle;
