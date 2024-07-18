"use client";
import { sideNav } from "@/constant/nav-groups";
import Link from "next/link";
import React from "react";
import {
  AiFillDollarCircle,
  AiOutlineHome,
  AiFillHome,
  AiOutlineDollar,
} from "react-icons/ai";
import { MdOutlineLeaderboard, MdLeaderboard } from "react-icons/md";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  RiCalendarEventLine,
  RiCalendarEventFill,
  RiBillLine,
  RiBillFill,
} from "react-icons/ri";

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
    {
      normal: <RiCalendarEventLine />,
      bold: <RiCalendarEventFill />,
    },
  ];
  return (
    <>
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
    </>
  );
}

export default SideNav;
