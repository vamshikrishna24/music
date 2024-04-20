"use client";
import React from "react";
import { Themetoggler } from "@/components/ThemeToggler";
import Link from "next/link";
import Chat from "./Chat";
import { useAppState } from "@/store/store";
import { UserAvatar } from "./UserAvatar";

function Header() {
  const { group } = useAppState();

  return (
    <div className="flex justify-between p-2 bg-slate-800 items-center border-b-2 text-white dark:bg-slate-900">
      <div className="text-3xl font-semibold font-sans">
        <Link href="/music">Music App</Link>
        <span className="text-sm font-normal ml-4 hover:underline ">
          <Link href="/upload">Upload</Link>
        </span>
        {group && (
          <span className="text-sm font-normal ml-4 hover:underline cursor-pointer">
            <Chat />
          </span>
        )}
      </div>
      <div className="flex space-x-4">
        <Themetoggler />
        {group && <UserAvatar />}
      </div>
    </div>
  );
}

export default Header;
