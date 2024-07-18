"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RxAvatar } from "react-icons/rx";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const DashboardNav = ({
  session,
  title,
}: {
  session: Session | null;
  title: string;
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const claimSaving = async () => {
    const res = await fetch("/api/claim-reward");
    let data = null;
    switch (res.status) {
      case 200:
        data = await res.json();
        toast({
          title: data.message,
        });
        return;
      case 400:
        data = await res.json();
        toast({
          title: data.message,
        });
        return;
      default:
        toast({
          variant: "destructive",
          title: "Something went wrong",
        });
        return;
    }
  };
  return (
    <div className="bg-slate-50 px-4 py-3 flex items-center justify-between">
      <h1 className="text-lg font-semibold">{title}</h1>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <RxAvatar size={25} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{session?.user.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              claimSaving();
            }}
          >
            Claim saving
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              signOut();
              router.push("/login");
            }}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DashboardNav;
