"use client";
import { sideNav } from "@/constant/nav-groups";
import Link from "next/link";
import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { AiFillHome } from "react-icons/ai";
import { RiBillLine } from "react-icons/ri";
import { RiBillFill } from "react-icons/ri";
import { AiOutlineDollar } from "react-icons/ai";
import { AiFillDollarCircle } from "react-icons/ai";
import { MdOutlineLeaderboard } from "react-icons/md";
import { MdLeaderboard } from "react-icons/md";
import { usePathname } from "next/navigation";
import Image from "next/image";

type Props = {};

function SideNav({}: Props) {
  const pathname = usePathname();
  const icons = [
    {
      bold: <AiFillHome />,
      normal: <AiOutlineHome />,
    },
    {
      bold: <RiBillFill />,
      normal: <RiBillLine />,
    },
    {
      bold: <AiFillDollarCircle />,
      normal: <AiOutlineDollar />,
    },
    {
      bold: <MdLeaderboard />,
      normal: <MdOutlineLeaderboard />,
    },
  ];
  return (
    <div className="bg-slate-50 h-full shadow-md py-2">
      <div className="flex justify-center">
        <Image
          src="/logo-title.png"
          alt="greenie logo"
          width={70}
          height={70}
        />
      </div>
      <ul className="text-sm flex flex-col gap-y-2 px-2 py-2">
        {sideNav.map((nav, index) => (
          <Link href={nav.link} key={nav.title}>
            <li
              className={`flex gap-2 border items-center p-2 rounded-md ${
                nav.link.includes(pathname)
                  ? "border-primary bg-primary/10 text-primary shadow-sm font-semibold"
                  : "border-slate-50"
              }`}
            >
              {nav.link.includes(pathname)
                ? icons[index].bold
                : icons[index].normal}
              {nav.title}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default SideNav;
