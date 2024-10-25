import { formatCurrency } from "@/app/methods";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {}

const Currency = (props: Props) => {
  return (
    <section className="flex items-center bg-teal-600 py-[0.5rem] px-[2rem] rounded-3xl">
      <div className="flex items-center">
        <Image
          width={300}
          height={300}
          alt="card"
          src={"/items/gold.svg"}
          className="w-[4rem] h-[4rem] object-cover"
          priority
        />
        <span className="ml-[0.5rem] text-yellow-500 font-semibold text-[1.5rem]">
          {formatCurrency(100000)}
        </span>
        <Link href="/get-currency?c=gold" className="text-[3rem]">
          <span className="ml-[0.5rem]">+</span>
        </Link>
      </div>
      <div className="flex items-center ml-[2rem]">
        <Image
          width={300}
          height={300}
          alt="card"
          src={"/items/summon_chip.svg"}
          className="w-[4rem] h-[4rem] object-cover"
          priority
        />
        <span className="ml-[0.5rem] text-yellow-500 font-semibold text-[1.5rem]">
          {formatCurrency(1000)}
        </span>
        <Link href="/get-currency?c=summon_chip" className="text-[3rem]">
          <span className="ml-[0.5rem]">+</span>
        </Link>
      </div>
    </section>
  );
};

export default Currency;
