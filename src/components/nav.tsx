"use client";
import { publicNav } from "@/constant/nav-groups";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Nav = () => {
  const pathname = usePathname();
  return (
    <div className="bg-slate-50 shadow-sm px-2 md:px-5 py-4">
      <div className="flex justify-between  items-center mx-auto max-w-[1600px]">
        <Image src="/greenie.png" alt="Greenie" width={40} height={40} />
        <ul className="flex gap-4">
          {publicNav.map((item) => (
            <li key={item.title}>
              <Link
                href={item.link}
                className={`${
                  pathname !== "/" &&
                  item.link.includes(pathname) &&
                  "text-primary font-semibold"
                }`}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Nav;
