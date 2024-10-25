"use client";
import { useState, useEffect, useRef } from "react";
import { CARD_TYPES, CARDS } from "../constants";
import Card from "../components/card/Card";
import { ICard } from "../types";
import "@/app/styles/cardDesk.css";
import clsx from "clsx";

const CardDesk = () => {
  const [cardsSorted, setCardsSorted] = useState<ICard[][]>([]);
  const [cardType, setCardType] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    const CardFilteredByType = CARDS.filter((card) => card.type === cardType);
    const cards1Star = CardFilteredByType.filter((card) => card.star === 1);
    const cards2Star = CardFilteredByType.filter((card) => card.star === 2);
    const cards3Star = CardFilteredByType.filter((card) => card.star === 3);
    const cards4Star = CardFilteredByType.filter((card) => card.star === 4);
    const cards5Star = CardFilteredByType.filter((card) => card.star === 5);
    const cards6Star = CardFilteredByType.filter((card) => card.star === 6);
    const cards7Star = CardFilteredByType.filter((card) => card.star === 7);
    setCardsSorted(
      [
        cards1Star,
        cards2Star,
        cards3Star,
        cards4Star,
        cards5Star,
        cards6Star,
        cards7Star,
      ].filter((cards) => cards.length > 0),
    );
  }, [cardType]);

  const handleCardTypeChange = (type: number) => {
    setCardType(type);
  };
  return (
    <div className="">
      <audio src="" ref={audioRef}></audio>
      <header className="fixed right-0 top-0 z-10 bg-white p-[1rem]">
        <ul className="flex ">
          {CARD_TYPES.map((type) => {
            return (
              <li
                className={clsx("button-89 capitalize duration-300", {
                  selected: cardType === type.id,
                })}
                role="button"
                key={type.id}
                onClick={() => handleCardTypeChange(type.id)}
              >
                {type.label}
              </li>
            );
          })}
        </ul>
      </header>
      {cardsSorted.map((cards, index) => {
        return (
          <section
            className={clsx("flex-col", {
              "mt-[8rem]": index === 0,
            })}
            key={index}
          >
            <h2 className="font-bold text-[4rem]">{cards[0].star} star</h2>
            <div className="flex flex-wrap">
              {cards.map((card, index_child) => {
                return (
                  <div className="mr-[1rem] mb-[1rem]" key={index_child}>
                    <Card
                      data={card}
                      // canFlip
                      flipVolumeOn={false}
                    />
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default CardDesk;
