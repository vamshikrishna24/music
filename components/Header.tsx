import React from "react";
import { Themetoggler } from "@/components/ThemeToggler";
import Link from "next/link";

function Header() {
  return (
    <div className="flex justify-between p-2 bg-slate-800 items-center border-b-2 text-white dark:bg-slate-900">
      <div className="text-3xl font-semibold font-sans">
        <Link href="./">Music App</Link>
        <span className="text-sm font-normal ml-3 hover:underline">
          <Link href="/upload">Upload</Link>
        </span>
      </div>
      <Themetoggler />
    </div>
  );
}

export default Header;
