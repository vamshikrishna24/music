"use client";
import React, { useState } from "react";
import { Themetoggler } from "@/components/ThemeToggler";
import Link from "next/link";
import Chat from "./Chat";
import { useAppState } from "@/store/store";
import { UserAvatar } from "./UserAvatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

function Header() {
  const { group } = useAppState();
  const [navigation, setNavigation] = useState("online");
  const router = useRouter();
  const handleChange = (value: string) => {
    router.push(`/${value}`);
  };
  return (
    <div className="flex justify-between p-2 bg-slate-800 items-center border-b-2 text-white dark:bg-slate-900">
      <div className="text-3xl font-semibold font-sans">
        <DropdownMenu>
          <DropdownMenuTrigger>MusicApp</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup
              value={navigation}
              onValueChange={setNavigation}
            >
              <DropdownMenuRadioItem
                value="online"
                onClick={() => handleChange("online")}
              >
                Online songs
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                value="music"
                onClick={() => handleChange("music")}
              >
                Uploaded songs
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {navigation === "music" && (
          <span className="text-sm font-normal ml-4 hover:underline ">
            <Link href="/upload">Upload</Link>
          </span>
        )}
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
