import Link from "next/link";
import { HEADER_ITEMS } from "./constants";
import clsx from "clsx";
import Image from "next/image";
export default function Home() {
  return (
    <section>
      <header className="">
        <ul className="flex justify-center items-start">
          {HEADER_ITEMS.map((item, index) => {
            return (
              <li
                key={index}
                className={clsx(
                  "bg-black duration-200 hover:bg-white border-transparent hover:border-indigo-800 hover:text-indigo-800 border text-white text-[1.5rem] first:rounded-bl-xl last:rounded-br-xl",
                  item.isBig && "rounded-b-xl",
                )}
              >
                <Link
                  href={item.link}
                  className={clsx(
                    "capitalize block",
                    item.isBig && "p-[3rem] px-[4rem] text-[2rem]",
                    !item.isBig && "p-[2rem] px-[3rem]",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
        {/* user */}
        <div
          className="fixed right-0 top-0 p-[1rem] bg-black rounded-3xl"
          title="username-level"
        >
          <Image
            width={300}
            height={300}
            alt="card"
            src={"/items/gold.svg"}
            className="w-[4rem] h-[4rem] object-cover"
            priority
          />
        </div>
      </header>
      <main></main>
      <footer></footer>
    </section>
  );
}
