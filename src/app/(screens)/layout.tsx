import Link from "next/link";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Link
        className="fixed z-50 primary-btn-effect flex items-center justify-center text-[2rem] p-[2rem] w-[2rem] h-[2rem] top-[2rem] left-[2rem] rounded-full bg-orange-700"
        href={"/"}
      >
        {"<<"}
      </Link>
      {children}
    </div>
  );
};

export default layout;
